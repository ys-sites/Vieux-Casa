const fs = require('fs');

let content = fs.readFileSync('src/HomePage.tsx', 'utf8');

const titleUpdates = {
  "SIGNATURE SNACK": "SIGNATURE SNACK 招牌小吃",
  "SNACKS & SIDES": "SNACKS & SIDES 小食",
  "SANDWICHES": "SANDWICHES 三文治",
  "TOAST / FRENCH TOAST": "TOAST / FRENCH TOAST 多士／西多士",
  "MAIN DISH": "MAIN DISH 主食",
  "BAKED HONG KONG STYLE – DOUBLE FROMAGE": "BAKED HONG KONG STYLE – DOUBLE FROMAGE 港式雙重芝士焗飯／焗意粉",
  "VEGETARIAN": "VEGETARIAN 素食專區",
  "INSTANT": "INSTANT 面",
  "SIZZLING PLATES": "SIZZLING PLATES 鐵板系列",
  "CURRY – STYLE HONG KONG": "CURRY – STYLE HONG KONG 港式咖喱",
  "DRINK": "DRINK 飲品"
};

for (const [oldTitle, newTitle] of Object.entries(titleUpdates)) {
  content = content.replace(`title_en: "${oldTitle}"`, `title_en: "${newTitle}"`);
}

fs.writeFileSync('src/HomePage.tsx', content);
console.log('Updated titles');
