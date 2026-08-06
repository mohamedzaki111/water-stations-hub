import fs from 'fs';

const html = fs.readFileSync('water-stations-hub.html', 'utf8');

// Search for dialogs, modals, tabs, forms, or excel exports in water-stations-hub.html
const modalMatches = html.match(/style:\{[^}]*position:"fixed"[^}]*\}/g) || [];
console.log('Fixed position overlay elements / modals:', modalMatches.length);

// Search for CSV/Excel export, PDF, print or calculation functions
const exportCSV = html.indexOf('csv');
const exportExcel = html.indexOf('excel');
const exportJSON = html.indexOf('json');
const filterSearch = html.indexOf('filter');

console.log('Features search index in html:');
console.log('CSV:', exportCSV !== -1);
console.log('Excel:', exportExcel !== -1);
console.log('JSON Backup/Restore:', exportJSON !== -1);
