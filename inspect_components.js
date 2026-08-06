import fs from 'fs';

const html = fs.readFileSync('water-stations-hub.html', 'utf8');

// Search for switch or conditional renders on page name
const pages = [
  'central/dashboard',
  'station/dashboard',
  'central/compare',
  'central/entry',
  'station/entry',
  'central/records',
  'station/records',
  'central/monthly',
  'station/monthly',
  'acct/overview',
  'acct/chemicals',
  'central/breakdowns',
  'station/breakdowns',
  'central/stations',
  'station/static',
  'central/users',
  'central/scada',
  'station/scada',
  'central/jartest',
  'station/jartest'
];

console.log('Searching for page occurrences in html:');
pages.forEach(p => {
  const count = (html.match(new RegExp(p, 'g')) || []).length;
  console.log(`Page '${p}': ${count} occurrences`);
});
