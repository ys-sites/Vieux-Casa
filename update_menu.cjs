const fs = require('fs');

const menuStr = `const MENU_CATEGORIES = [
  {
    title_en: "SIGNATURE SNACK",
    title_fr: "COLLATION SIGNATURE",
    items: [
      {
        id: "T01",
        name_fr: "Takoyaki (6 pièces)",
        name_en: "Takoyaki (6 pcs)",
        price: "$8.99",
        desc_fr: "Boulettes de poulpe classiques.",
        desc_en: "Classic octopus balls.",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=400"
      }
    ]
  },
  {
    title_en: "SNACKS & SIDES",
    title_fr: "ENTRÉES & ACCOMPAGNEMENTS",
    items: [
      {
        id: "B01",
        name_fr: "Soupe udon au bœuf braisé au cari",
        name_en: "Curry Beef Brisket Udon in Soup",
        price: "$17.99",
        desc_fr: "",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "B02",
        name_fr: "Cuisse de poulet frit croustillant avec salade de pommes de terre ou frites",
        name_en: "Crispy Fried Chicken Leg with Potato Salad or Fries",
        price: "$15.99",
        desc_fr: "",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1626082927389-6cd0b61cff9c?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "B03",
        name_fr: "Toast aux crevettes avec salade de pommes de terre ou frites",
        name_en: "Shrimp Toast with Potato Salad or Fries",
        price: "$14.99",
        desc_fr: "",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1541014741259-df5290ce50fb?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "B04",
        name_fr: "Poutine style Hong Kong au double fromage et sauce à la viande",
        name_en: "Poutine in Hong Kong Style (Double Cheese & Meat Sauce)",
        price: "$16.99",
        desc_fr: "",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1586805608485-add336722759?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "B05",
        name_fr: "Ailes de poulet croustillantes avec salade de pommes de terre ou frites",
        name_en: "Crispy Chicken Wings with Potato Salad or Fries",
        price: "$15.99",
        desc_fr: "",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "B07",
        name_fr: "Boulettes de poulet au cari style Hong Kong (15 mcx)",
        name_en: "Fish Balls in Hong Kong Style Curry (15 pcs)",
        price: "$8.99",
        desc_fr: "",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "B08",
        name_fr: "Soupe de wontons avec nouilles aux œufs ou nouilles de riz",
        name_en: "Wonton Noodle Soup (Egg Noodles or Flat Rice Noodles)",
        price: "$16.99",
        desc_fr: "",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "B10",
        name_fr: "Boulettes de bœuf au cari style Hong Kong (12 mcx)",
        name_en: "Beef Balls in Hong Kong Style Curry (12 pcs)",
        price: "$10.99",
        desc_fr: "",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "B11",
        name_fr: "Boulettes de poisson et de bœuf au cari style Hong Kong (12 mcx)",
        name_en: "Fish & Beef Balls in Hong Kong Style Curry (12 pcs)",
        price: "$12.99",
        desc_fr: "",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "B13",
        name_fr: "Ailes de poulet avec frites (sauce beurre ou miel et ail)",
        name_en: "Chicken Wings with Fries (Butter Sauce or Honey Garlic)",
        price: "$16.99",
        desc_fr: "",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "B16",
        name_fr: "Poulet Général Tao",
        name_en: "General Tso's Chicken",
        price: "$21.99",
        desc_fr: "",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1525118844146-24a73f84edce?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "B17",
        name_fr: "Calmars frits",
        name_en: "Deep Fried Calamari",
        price: "$18.99",
        desc_fr: "",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "B18",
        name_fr: "Bouchées de poulet au gingembre et oignons verts",
        name_en: "Ginger and Scallion Chicken Bites",
        price: "$19.99",
        desc_fr: "",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=400"
      }
    ]
  },
  {
    title_en: "SANDWICHES",
    title_fr: "SANDWICHS",
    items: [
      {
        id: "S09",
        name_fr: "Sandwich club (poulet pané, concombre, jambon, tomate, fromage)",
        name_en: "Club Sandwich (Chicken Cutlet, Cucumber, Ham, Tomato, Cheese)",
        price: "$14.99",
        desc_fr: "",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "S14",
        name_fr: "Sandwich au bœuf, oignons verts et œufs",
        name_en: "Scallion Beef and Eggs Sandwich",
        price: "$10.99",
        desc_fr: "",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "S19",
        name_fr: "Sandwich au luncheon meat halal et œufs",
        name_en: "Halal Luncheon Meat and Eggs Sandwich",
        price: "$9.99",
        desc_fr: "",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "S20",
        name_fr: "Sandwich aux tomates et œufs",
        name_en: "Tomato and Eggs Sandwich",
        price: "$9.99",
        desc_fr: "",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&q=80&w=400"
      }
    ]
  },
  {
    title_en: "TOAST / FRENCH TOAST",
    title_fr: "RÔTIES / PAIN DORÉ",
    items: [
      {
        id: "S10",
        name_fr: "Rôtie épaisse au bœuf épicé et œufs brouillés",
        name_en: "Spiced Diced Beef and Scrambled Eggs Toast",
        price: "$13.99",
        desc_fr: "五香牛肉滑蛋厚多士",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1506084868730-342b1f45ff9d?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "S11",
        name_fr: "Rôtie épaisse au bœuf satay et œufs satay",
        name_en: "Satay Beef and Scrambled Eggs Toast",
        price: "$13.99",
        desc_fr: "沙爹牛肉滑蛋厚多士",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1506084868730-342b1f45ff9d?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "S15",
        name_fr: "Rôtie au charbon avec beurre d'arachide",
        name_en: "Charcoal Toast with Peanut Butter",
        price: "$8.99",
        desc_fr: "花生酱黑炭厚多士",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "S16",
        name_fr: "Rôtie au charbon avec Milo et lait condensé",
        name_en: "Charcoal Toast with Milo & Condensed Milk",
        price: "$8.99",
        desc_fr: "美禄炼奶黑炭厚多士",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "S17",
        name_fr: "Pain doré au beurre d'arachide et lait condensé",
        name_en: "French Toast with Peanut Butter & Condensed Milk",
        price: "$12.99",
        desc_fr: "花生炼奶西多士",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "S21",
        name_fr: "Rôtie au charbon avec beurre et lait condensé",
        name_en: "Charcoal Toast with Butter & Condensed Milk",
        price: "$8.99",
        desc_fr: "牛油炼奶黑炭厚多士",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "S22",
        name_fr: "Rôtie au charbon avec œufs",
        name_en: "Charcoal Toast with Eggs",
        price: "$9.99",
        desc_fr: "黑炭厚多士",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "S23",
        name_fr: "Rôtie style \"Lau Nai Wah\" à l'Ovaltine et lait condensé",
        name_en: "Toast with Ovaltine & Condensed Milk",
        price: "$9.99",
        desc_fr: "漏奶华",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1506084868730-342b1f45ff9d?auto=format&fit=crop&q=80&w=400"
      }
    ]
  },
  {
    title_en: "MAIN DISH",
    title_fr: "PLATS PRINCIPAUX",
    items: [
      {
        id: "C01",
        name_fr: "Riz frit aux crevettes sakura et poulet",
        name_en: "Sakura Shrimp and Chicken Fried Rice",
        price: "$22.99",
        desc_fr: "樱花虾鸡拉炒饭",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "C02",
        name_fr: "Bœuf BBQ avec 2 œufs au plat sur riz au gras de bœuf ou riz blanc",
        name_en: "BBQ Beef with 2 Sunny Side Up Eggs on Beef Tallow or White Rice",
        price: "$23.99",
        desc_fr: "韶然销魂牛油拥饭(可改白饭)",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1546833999-296e4630f148?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "C03",
        name_fr: "Poulet sauce poivre noir sur riz",
        name_en: "Chicken with Black Pepper Sauce on Rice",
        price: "$21.99",
        desc_fr: "黑椒汁鸡扒饭",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "C04",
        name_fr: "Crevettes, bœuf et œufs brouillés sur riz",
        name_en: "Prawns and Beef with Scrambled Eggs on Rice",
        price: "$24.99",
        desc_fr: "香葱大虾牛肉滑蛋饭",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1544378730-8b5104b18790?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "C05",
        name_fr: "Bœuf épicé en dés avec œufs brouillés sur riz",
        name_en: "Spiced Diced Beef and Scrambled Eggs on Rice",
        price: "$22.99",
        desc_fr: "五香牛肉丁滑蛋饭",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "C06",
        name_fr: "Spaghetti sauté au bœuf sauce poivre noir",
        name_en: "Stir-fried Spaghetti with Beef in Black Pepper Sauce",
        price: "$22.99",
        desc_fr: "黑椒牛肉炒意粉",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "C07",
        name_fr: "Bœuf haché et œufs brouillés sur riz",
        name_en: "Scrambled Eggs and Minced Beef on Rice",
        price: "$21.99",
        desc_fr: "滑蛋免治肉饭",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1544378730-8b5104b18790?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "C08",
        name_fr: "Poulet sauce aux oignons sur riz",
        name_en: "Chicken with Onion Sauce on Rice",
        price: "$21.99",
        desc_fr: "洋葱鸡扒饭",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "C09",
        name_fr: "Côtes de bœuf AAA sauce poivre noir avec œuf au plat sur riz",
        name_en: "Black Pepper Beef Ribs with Sunny Side Up Egg on Rice",
        price: "$26.99",
        desc_fr: "AAA黑椒牛仔骨煎蛋饭",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "C10",
        name_fr: "Côtes de riz plates sautées au bœuf style Hong Kong",
        name_en: "Hong Kong Style Stir-fried Beef Flat Rice Noodles",
        price: "$23.99",
        desc_fr: "干炒牛河",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "C11",
        name_fr: "Pad thaï (poulet / bœuf / crevettes)",
        name_en: "Pad Thai (Chicken / Beef / Shrimp)",
        price: "$12.99 / $23.99 / $23.99",
        desc_fr: "炒泰式河粉 (鸡／牛／虾)",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "C12",
        name_fr: "Riz frit à l'ananas (poulet / bœuf / crevettes)",
        name_en: "Pineapple Fried Rice (Chicken / Beef / Shrimp)",
        price: "$23.99 / $25.99",
        desc_fr: "菠萝炒饭(鸡／牛／虾)",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=400"
      }
    ]
  },
  {
    title_en: "BAKED HONG KONG STYLE – DOUBLE FROMAGE",
    title_fr: "PLATS GRATINÉS STYLE HONG KONG – DOUBLE FROMAGE",
    items: [
      {
        id: "F01",
        name_fr: "Gratin au cari de bœuf braisé",
        name_en: "Curry Beef Brisket",
        price: "$22.99",
        desc_fr: "Au choix : riz au spaghetti",
        desc_en: "Choice of: Rice or Spaghetti",
        image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "F02",
        name_fr: "Gratin au poulet sauce crémeuse",
        name_en: "Chicken with Creamy Sauce",
        price: "$19.99",
        desc_fr: "Au choix : riz au spaghetti",
        desc_en: "Choice of: Rice or Spaghetti",
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "F03",
        name_fr: "Gratin au poulet sauce poivre noir",
        name_en: "Black Pepper Chicken Steak",
        price: "$19.99",
        desc_fr: "Au choix : riz au spaghetti",
        desc_en: "Choice of: Rice or Spaghetti",
        image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "F04",
        name_fr: "Gratin \"duo\" – spaghetti bolognaise et poulet sauce tomate sur riz",
        name_en: "Bolognese Spaghetti and Tomato Chicken Steak on Rice",
        price: "$21.99",
        desc_fr: "鸳鸯两煎",
        desc_en: "Choice of: Rice or Spaghetti",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "F05",
        name_fr: "Gratin à la sauce bolognaise",
        name_en: "Bolognese",
        price: "$18.99",
        desc_fr: "Au choix : riz au spaghetti",
        desc_en: "Choice of: Rice or Spaghetti",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "F06",
        name_fr: "Gratin spécial bœuf (cari de bœuf braisé & côtes sauce poivre noir)",
        name_en: "Curry Beef Brisket + Black Pepper Beef Ribs",
        price: "$24.99",
        desc_fr: "Au choix : riz au spaghetti",
        desc_en: "Choice of: Rice or Spaghetti",
        image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "F07",
        name_fr: "Gratin de filet de poisson sauce crémeuse aux champignons",
        name_en: "Cutlet Fish Fillet with Creamy Mushroom Sauce",
        price: "$21.99",
        desc_fr: "Au choix : riz au spaghetti",
        desc_en: "Choice of: Rice or Spaghetti",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=400"
      }
    ]
  },
  {
    title_en: "VEGETARIAN",
    title_fr: "PLATS VÉGÉTARIENS",
    items: [
      {
        id: "V01",
        name_fr: "Vermicelles de riz sautés végétariens",
        name_en: "Vegetarian Stir-fried Rice Vermicelli",
        price: "$14.99",
        desc_fr: "素炒米粉",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "V02",
        name_fr: "Riz frit végétarien (ananas en option)",
        name_en: "Vegetarian Fried Rice (Pineapple Optional)",
        price: "$13.99",
        desc_fr: "炒饭（素，可加菠萝）",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "V03",
        name_fr: "Tofu tendre doré poêlé",
        name_en: "Pan-fried Golden Soft Tofu",
        price: "$12.99",
        desc_fr: "煎黄金嫩豆腐",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "V04",
        name_fr: "Mapo tofu végétarien",
        name_en: "Vegetarian Mapo Tofu",
        price: "$15.99",
        desc_fr: "麻婆豆腐（素）",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "V05",
        name_fr: "Tofu braisé à la sauce soya",
        name_en: "Braised Tofu in Soy Sauce",
        price: "$13.99",
        desc_fr: "红烧豆腐",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400"
      }
    ]
  },
  {
    title_en: "INSTANT",
    title_fr: "INSTANT",
    items: [
      {
        id: "M01",
        name_fr: "Nouilles Lo Ding au curry et poitrine de bœuf braisée",
        name_en: "Curry Beef Brisket Lo Ding",
        price: "$18.99",
        desc_fr: "咖喱牛腩汤捞一丁",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "M02",
        name_fr: "Nouilles Lo Ding au poulet sauce soja et œufs brouillés",
        name_en: "Soy Sauce Chicken & Scrambled Egg Lo Ding",
        price: "$15.99",
        desc_fr: "豉油皇鸡滑蛋汤捞一丁",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1512058560366-cd242959828d?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "M03",
        name_fr: "Nouilles Lo Ding au bœuf satay et œufs brouillés",
        name_en: "Satay Beef & Scrambled Egg Lo Ding",
        price: "$15.99",
        desc_fr: "豉油皇沙爹牛肉滑蛋捞一丁",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "M04",
        name_fr: "Nouilles Lo Ding au luncheon meat halal et œufs brouillés",
        name_en: "Halal Luncheon Meat & Scrambled Egg Lo Ding",
        price: "$15.99",
        desc_fr: "Halal 午餐肉滑蛋捞一丁",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400"
      }
    ]
  },
  {
    title_en: "SIZZLING PLATES",
    title_fr: "PLATS SUR PLAQUE CHAUDE",
    items: [
      {
        id: "SP01",
        name_fr: "Côtelettes d'agneau sur plaque chaude",
        name_en: "Sizzling Lamb Chops",
        price: "$39.99",
        desc_fr: "铁板羊扒 (préparation env. 20 min / 稍候约20分钟)",
        desc_en: "prep time approx. 20 min",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "SP02",
        name_fr: "Contre-filet AAA Angus sur plaque chaude",
        name_en: "AAA Angus Striploin Steak",
        price: "$36.99",
        desc_fr: "AAA安格斯西冷牛扒 (préparation env. 20 min / 稍候约20分钟)",
        desc_en: "prep time approx. 20 min",
        image: "https://images.unsplash.com/photo-1546833999-296e4630f148?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "SP03",
        name_fr: "Poulet à l'ail sur plaque chaude",
        name_en: "Sizzling Garlic Chicken Chop",
        price: "$28.99",
        desc_fr: "铁板蒜蓉鸡扒 (préparation env. 20 min / 稍候约20分钟)",
        desc_en: "prep time approx. 20 min",
        image: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8dd?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "SP04",
        name_fr: "Filet de sole pané et poulet sur plaque chaude",
        name_en: "Sizzling Breaded Sole & Chicken Chop",
        price: "$31.99",
        desc_fr: "铁板吉列龙利鸡扒 (préparation env. 20 min / 稍候约20分钟)",
        desc_en: "prep time approx. 20 min",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=400"
      }
    ]
  },
  {
    title_en: "CURRY – STYLE HONG KONG",
    title_fr: "CARI – STYLE HONG KONG",
    items: [
      {
        id: "E01",
        name_fr: "Cari de bœuf braisé (sans accompagnement)",
        name_en: "Curry Beef Brisket (Only)",
        price: "$29.99",
        desc_fr: "咖喱牛腩净食",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "E02",
        name_fr: "Cari de côtelettes d'agneau (sans accompagnement)",
        name_en: "Curry Lamb Chop (Only)",
        price: "$33.99",
        desc_fr: "咖喱羊排净食",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "E03",
        name_fr: "Cari de légumes variés avec œuf sur riz",
        name_en: "Curry Mixed Vegetables with Egg on Rice",
        price: "$16.99",
        desc_fr: "咖喱杂菜蛋饭",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "E04",
        name_fr: "Cari de bœuf braisé sur riz",
        name_en: "Curry Beef Brisket on Rice",
        price: "$22.99",
        desc_fr: "咖喱牛腩饭",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "E05",
        name_fr: "Cari de poulet sur riz",
        name_en: "Curry Chicken Steak on Rice",
        price: "$18.99",
        desc_fr: "咖喱鸡扒饭",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "E06",
        name_fr: "Cari de bœuf sur riz",
        name_en: "Curry Beef on Rice",
        price: "$21.99",
        desc_fr: "咖喱牛肉饭",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1546833999-296e4630f148?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "E07",
        name_fr: "Cari de cuisse de poulet frit sur riz",
        name_en: "Curry Chicken Leg on Rice",
        price: "$19.99",
        desc_fr: "咖喱生炸鸡腿饭",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1626082927389-6cd0b61cff9c?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "E08",
        name_fr: "Cari de côtelettes d'agneau sur riz",
        name_en: "Curry Lamb Chop on Rice",
        price: "$27.99",
        desc_fr: "咖喱羊排饭",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400"
      }
    ]
  },
  {
    title_en: "DRINK",
    title_fr: "DRINK",
    items: [
      {
        id: "G03",
        name_fr: "Thé au lait à la hongkongaise",
        name_en: "Hong Kong Style Milk Tea",
        price: "$5.99",
        desc_fr: "港式奶茶",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "G04",
        name_fr: "Café",
        name_en: "Coffee",
        price: "$4.99",
        desc_fr: "咖啡",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "G05",
        name_fr: "Café et thé au lait mélangés (Yuenyeung)",
        name_en: "Coffee & Milk Tea Mix",
        price: "$5.99",
        desc_fr: "鸳鸯",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "G07",
        name_fr: "Thé au citron à la hongkongaise",
        name_en: "Hong Kong Style Lemon Tea",
        price: "$5.99",
        desc_fr: "港式柠檬茶",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "G08",
        name_fr: "Eau au citron",
        name_en: "Lemon Water",
        price: "$4.99",
        desc_fr: "柠檬水",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "G09",
        name_fr: "Limonade au miel",
        name_en: "Honey Lemonade",
        price: "$5.99",
        desc_fr: "蜂蜜柠檬",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "G10",
        name_fr: "Thé au lait \"Teddy Bear\"",
        name_en: "Teddy Bear Milk Tea",
        price: "$6.99",
        desc_fr: "熊熊丝袜奶茶",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "G11",
        name_fr: "Thé glacé au citron \"Teddy Bear\"",
        name_en: "Teddy Bear Lemon Tea",
        price: "$6.99",
        desc_fr: "熊熊柠檬红茶",
        desc_en: "",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400"
      }
    ]
  }
];`;

const content = fs.readFileSync('src/HomePage.tsx', 'utf8');
const startIdx = content.indexOf('const MENU_CATEGORIES = [');
let endIdx = content.indexOf('];', startIdx);
let brackets = 0;
for (let i = startIdx + 'const MENU_CATEGORIES = '.length; i < content.length; i++) {
  if (content[i] === '[') brackets++;
  if (content[i] === ']') {
    brackets--;
    if (brackets === 0) {
      endIdx = i + 1;
      if (content[i + 1] === ';') endIdx++;
      break;
    }
  }
}

const beforeMenu = content.slice(0, startIdx);
const afterMenu = content.slice(endIdx);
fs.writeFileSync('src/HomePage.tsx', beforeMenu + menuStr + afterMenu);
console.log("Updated HomePage.tsx!");
