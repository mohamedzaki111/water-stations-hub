import fs from 'fs';

const html = fs.readFileSync('water-stations-hub.html', 'utf8');

// Find all occurrences of headings, titles, or page components
const textMatches = html.match(/[\u0600-\u06FF\s—\(\)\d\:\.\,\-\+\#]{4,}/g) || [];
console.log('Total Arabic text phrases:', textMatches.length);

// Filter phrases that look like UI titles, section headers, or feature names
const uniquePhrases = Array.from(new Set(textMatches.map(t => t.trim()))).filter(t => t.length > 5 && t.length < 80);

console.log('Sample UI Titles and Headings:');
uniquePhrases.slice(0, 80).forEach(p => console.log('-', p));
