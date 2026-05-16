const fs = require('fs');

const content = fs.readFileSync('src/HomePage.tsx', 'utf8');

let newContent = content.replace(
  /(\{\s*title_en:\s*"SIGNATURE SNACK"[\s\S]*?\]\s*\},)\s*(\{\s*title_en:\s*"SNACKS & SIDES"[\s\S]*?\]\s*\}(,?))/, 
  "$2$1"
);

// We should check if the trailing comma is handled correctly.
// $1 has trailing comma. $2 might not have one if it's the last, but it's not the last.
// $2 has `},` so we just replace the block.
// Wait, $2 is `{\n title_en: "SNACKS ... },` so `$2$1` will be `... }, ... },` which is fine.

fs.writeFileSync('src/HomePage.tsx', newContent);
console.log('Done');
