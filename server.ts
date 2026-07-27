import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Lazy-initialize Gemini AI client on demand
  function getGeminiClient() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  // API Route: AI Water Operations Analysis & Diagnostic
  app.post("/api/ai/analyze-station", async (req, res) => {
    try {
      const { stationName, date, stats, targets, recentBreakdowns, recentRecords } = req.body;

      const ai = getGeminiClient();

      const prompt = `
أنت خبير محطات مياه الشرب واستشاري التشغيل بالشركة القابضة لمياه الشرب والصرف الصحي بمصر (HCWW).
قدم تحليلاً هندسياً شاملاً وتقريراً تشغيلياً لمحطة: "${stationName}" بتاريخ ${date || "اليوم"}.

البيانات التشغيلية الحالية:
- إجمالي المياه المنتجة: ${stats.total_prod} م³
- إجمالي المياه العكرة: ${stats.total_turbid} م³
- متوسط كفاءة المحطة: ${(stats.avg_eff * 100).toFixed(1)}% (الكفاءة المستهدفة: ${targets?.efficiency_target ? targets.efficiency_target * 100 : 90}%)
- متوسط استهلاك الكهرباء لكل م³: ${stats.avg_kwh_m3} ك.و/م³ (النطاق المستهدف: ${targets?.kwh_per_m3_min || 0.18} - ${targets?.kwh_per_m3_max || 0.28})
- متوسط معامل القدرة (Power Factor): ${stats.avg_power_factor || "غير محدد"}
- إجمالي الشبة السائلة المستخدمة: ${stats.total_alum} طن
- إجمالي الكلور المستخدم: ${stats.total_chlorine} طن
- تقدير كمية الروبة الناتجة: ${stats.sludge_m3} م³
- عدد الأعطال المسجلة: ${recentBreakdowns?.length || 0}

المطلوب تقديم تقرير باللغة العربية بتنسيق Markdown يحتوي على:
1. **تقييم الأداء العام**: هل المحطة ضمن المعايير القومية؟ (الكفاءة، استهلاك الطاقة، جرعات الكيماويات).
2. **رصد الانحرافات والمخاطر**: أي خلل في معامل القدرة (PF < 0.85)، هدر مياه الغسيل، ارتفاع ك.و/م³، أو زيادة العكارة.
3. **التوصيات الهندسية المباشرة**: خطوات عملية لرفع الكفاءة، تقليل فاقد المياه، ترشيد الكهرباء، وصيانة المعدات.
4. **توصيات السلامة والبيئة**: التعامل مع غاز الكلور، تصريف الروبة، والوقاية.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

      res.json({ success: true, text: response.text });
    } catch (error: any) {
      console.error("Error in AI analysis:", error);
      res.status(500).json({ success: false, error: error.message || "فشل في التواصل مع المساعد الذكي" });
    }
  });

  // API Route: AI Jar Test Advisor (اختبار الجار لإيجاد الجرعة المثلى للشبة والكلور)
  app.post("/api/ai/jartest-advisor", async (req, res) => {
    try {
      const { turbidityNTU, pH, temperatureC, rawFlowM3h, stationName } = req.body;

      const ai = getGeminiClient();

      const prompt = `
أنت رئيس قطاع المعامل والجودة بشركة مياه الشرب.
بناءً على نتائج القياسات المعملية للمياه الخام بمحطة "${stationName || "محطة مياه"}":
- درجة العكارة (Turbidity): ${turbidityNTU} NTU
- الرقم الهيدروجيني (pH): ${pH}
- درجة الحرارة: ${temperatureC} °م
- تصرف المياه الخام المطلوب معالجته: ${rawFlowM3h} م³/ساعة

المطلوب حساب وتقديم التوصيات التالية باللغة العربية:
1. **جرعة الشبة السائلة التقديرية (PPM / جم/م³)** بناءً على منحنيات Jar Test القياسية لنهر النيل.
2. **معدل ضخ الشبة بالساعة (كجم/ساعة و لتر/ساعة)** لمحلول الشبة بتركيز 10%.
3. **جرعة الكلور الابتدائي والنهائي التقديرية (PPM)** والوصول لنقطة الكسر (Break Point Chlorination).
4. **ملاحظات التشغيل بالترويق والترشيح**: زمن التنديف (Flocculation time)، سرعة المقلبات، وزمن الترسيب المتوقع في المروقات.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

      res.json({ success: true, text: response.text });
    } catch (error: any) {
      console.error("Error in Jar Test AI:", error);
      res.status(500).json({ success: false, error: error.message || "فشل في حساب نتائج الجار تست" });
    }
  });

  // API Route: AI Equipment Fault Diagnoser
  app.post("/api/ai/diagnose-breakdown", async (req, res) => {
    try {
      const { assetType, assetLabel, description, severity, stationName } = req.body;

      const ai = getGeminiClient();

      const prompt = `
أنت مهندس صيانة أول بمحطات مياه الشرب والرفع.
تم تسجيل العطل التالي في محطة "${stationName}":
- المنظومة: ${assetType} (${assetLabel})
- درجة الخطورة: ${severity}
- وصف العطل والظواهر: "${description}"

قدم تحليلاً هندسياً فورياً شامل:
1. **الأسباب المحتملة للأعطال (Root Cause Analysis)** ميكانيكياً وكهربائياً.
2. **خطوات الفحص والإصلاح الموصى بها** بالترتيب للأطقم الفنية.
3. **الإجراءات الاحترازية لمنع توقف المحطة** وإعادة توجيه التدفقات أو تشغيل الطلمبات البديلة.
4. **قطع الغيار الأساسية المتوقع إحلالها**.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

      res.json({ success: true, text: response.text });
    } catch (error: any) {
      console.error("Error in breakdown AI:", error);
      res.status(500).json({ success: false, error: error.message || "فشل في تحليل العطل" });
    }
  });

  // Vite middleware for dev or static serving for prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Water Treatment Plants Server running on http://localhost:${PORT}`);
  });
}

startServer();
