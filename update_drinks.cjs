const fs = require('fs');

let content = fs.readFileSync('src/HomePage.tsx', 'utf8');

const oldCheck = `          {[
            "MAIN DISH",
            "BAKED HONG KONG STYLE – DOUBLE FROMAGE",
            "INSTANT",
            "SIZZLING PLATES",
            "CURRY – STYLE HONG KONG",
            "VEGETARIAN"
          ].includes(MENU_CATEGORIES[activeCategory].title_en) && (`;

const newCheck = `          {[
            "MAIN DISH",
            "BAKED HONG KONG STYLE – DOUBLE FROMAGE",
            "INSTANT",
            "SIZZLING PLATES",
            "CURRY – STYLE HONG KONG",
            "VEGETARIAN"
          ].some(t => MENU_CATEGORIES[activeCategory].title_en.startsWith(t)) && (`;

content = content.replace(oldCheck, newCheck);
fs.writeFileSync('src/HomePage.tsx', content);
console.log('Updated complimentary drink check');
