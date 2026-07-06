import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { MoveRight, Star, MapPin, Clock, Phone, ArrowUpRight, ArrowRight, ArrowLeft } from "lucide-react";
import Navbar from "./components/Navbar";
import ShinyText from "./components/ui/ShinyText";
import BlurText from "./components/ui/BlurText";

// Menu Data Preserved
const MENU_CATEGORIES = [
  {
    title_fr: "LE PLUS COMMANDÉ",
    title_en: "MOST ORDERED",
    items: [
      { id: "#4", name_fr: "Combo de poulet et kebab", name_en: "Chicken and kebab combo", price: "$21.99", desc_en: "", desc_fr: "" },
      { id: "#1", name_fr: "Brochette de poulet ou kebab", name_en: "Chicken or kebab skewer", price: "$18.99", desc_en: "Served with basmati rice, 2 choices of salads, greek potatoes with a sauce of your choice.", desc_fr: "Servi avec riz basmati, 2 choix de salades, pommes de terre grecques avec une sauce au choix." },
      { id: "#3", name_fr: "Sandwich Villa sur pain naan", name_en: "Villa Sandwich on naan bread", price: "$15.99", desc_fr: "Poulet ou kebab servi avec pommes de terre à la grecque ou riz ou salade.", desc_en: "Chicken or kebab served with greek potatoes or rice or salad." },
      { id: "#2", name_fr: "Assiette de filet de poulet", name_en: "Chicken fillet plate", price: "$18.99", desc_fr: "", desc_en: "" },
      { id: "#10", name_fr: "Poulet et crevettes papillon", name_en: "Chicken and butterfly shrimp", price: "$20.99", desc_fr: "", desc_en: "" },
      { id: "#9", name_fr: "Assiette de crevettes papillon", name_en: "Butterfly shrimp plate", price: "$20.99", desc_fr: "", desc_en: "" }
    ],
    image: "/media/most_ordered.jpg",
    desc_en: "Here are the dishes and items most frequently ordered at this business.",
    desc_fr: "Voici les plats et les articles le plus souvent commandés à ce commerce."
  },
  {
    title_fr: "MENU PRINCIPAL",
    title_en: "MAIN MENU",
    items: [
      { id: "#6", name_fr: "Jarret d'agneau", name_en: "Lamb shank", price: "$22.99", desc_en: "", desc_fr: "" },
      { id: "#7", name_fr: "Assiette de brochette crevettes grillées plus poulet", name_en: "Plate of grilled shrimp skewer with chicken", price: "$22.99", desc_en: "", desc_fr: "" },
      { id: "#11", name_fr: "Assiette de brochette de crevettes grillées", name_en: "Plate of grilled shrimp skewer", price: "$17.99", desc_en: "", desc_fr: "" },
      { id: "#5", name_fr: "Faux filet de steak", name_en: "Steak faux fillet", price: "$22.99", desc_en: "", desc_fr: "" },
      { id: "#8", name_fr: "Filet de poisson", name_en: "Fish fillet", price: "$21.99", desc_en: "", desc_fr: "" },
      { id: "#14", name_fr: "Salade de poulet", name_en: "Chicken salad", price: "$17.99", desc_en: "", desc_fr: "" },
      { id: "#12", name_fr: "Salade de crevettes", name_en: "Grilled shrimp salad", price: "$17.99", desc_en: "", desc_fr: "" },
      { id: "#15", name_fr: "Assiette végétarienne", name_en: "Vegetarian plate", price: "$17.99", desc_en: "", desc_fr: "" },
    ],
    image: "/media/main_menu.jpg",
    desc_en: "All our principal plates are served with 2 choices of salads, Basmati rice and Greek potatoes with a sauce of your choice.",
    desc_fr: "Toutes nos assiettes principales sont servies avec 2 choix de salades, riz basmati et pommes de terre grecques avec une sauce au choix."
  },
  {
    title_fr: "ACCOMPAGNEMENTS",
    title_en: "SIDE ORDERS",
    items: [
      { id: "", name_fr: "Patates", name_en: "Potatoes", price: "$4.99" },
      { id: "", name_fr: "Extra poulet brochette", name_en: "Extra Chicken Skewer", price: "$5.99" },
      { id: "", name_fr: "Extra crevette brochette", name_en: "Extra Shrimp Skewer", price: "$5.99" },
      { id: "", name_fr: "Extra salade maison", name_en: "Extra House Salad", price: "$4.99" },
      { id: "", name_fr: "Extra Steak", name_en: "Extra Steak", price: "$10.99" },
      { id: "", name_fr: "Extra filet de poulet", name_en: "Extra Chicken Fillet", price: "$2.99" },
      { id: "", name_fr: "Extra Kabab", name_en: "Extra Kabab", price: "$4.99" },
      { id: "", name_fr: "Extra salade césar", name_en: "Extra Caesar Salad", price: "$4.99" },
      { id: "", name_fr: "Riz Basmati", name_en: "Basmati Rice", price: "$4.99" },
    ],
    image: "/media/side_orders.jpg",
    desc_en: "The perfect additions to complete your dining experience.",
    desc_fr: "Les ajouts parfaits pour compléter votre expérience culinaire."
  },
  {
    title_fr: "BOISSONS",
    title_en: "DRINKS",
    items: [
      { id: "", name_fr: "Oasis jus Orange", name_en: "Oasis Orange Juice", price: "$4.99", desc_en: "Juice available in lemon, orange, or apple flavors.", desc_fr: "Jus disponible aux saveurs de citron, d'orange ou de pomme." },
      { id: "", name_fr: "Red Bull", name_en: "Red Bull", price: "$4.99", desc_en: "Invigorating Energy Surge: The Classic Red Bull Experience", desc_fr: "Une poussée d'énergie vivifiante : L'expérience classique de Red Bull." },
      { id: "", name_fr: "Pepsi", name_en: "Pepsi", price: "$2.99", desc_en: "Classic, refreshing cola soda.", desc_fr: "Soda cola classique et rafraîchissant." },
      { id: "", name_fr: "7Up", name_en: "7Up", price: "$2.99", desc_en: "Crisp, refreshing lemon-lime carbonated drink for a rejuvenating burst of flavor.", desc_fr: "Boisson gazeuse citron-lime vive et rafraîchissante pour une explosion de saveur rajeunissante." },
    ],
    image: "/media/drinks.jpg",
    desc_en: "Refresh and sweeten the end of your magical Greek journey.",
    desc_fr: "Rafraîchissez et adoucissez la fin de votre voyage grec magique."
  },
  {
    title_fr: "DESSERTS",
    title_en: "DESSERTS",
    items: [
      { id: "", name_fr: "Baklava grec", name_en: "Greek Baklava", price: "$4.99", desc_en: "Layers of flaky filo pastry, typically includes chopped nuts, sweetened with syrup.", desc_fr: "Couches de pâte filo feuilletée, comprenant généralement des noix hachées, sucrées avec du sirop." },
    ],
    image: "/media/desserts.jpg",
    desc_en: "Perfect sweet ending to your meal.",
    desc_fr: "Parfaite douceur pour terminer votre repas."
  }
];

const REVIEWS = [
  {
    text: "The people are so nice and helpful. I come from Rawdon just to have a meal. The service was the best! It's been a long time since I had service like that. The owner is always giving specials, he is so sweet.",
    author: "Melanie McLean"
  },
  {
    text: "Best restaurant in Joliette!!! Amazing service! Super friendly staff! And great tasting food! I recommend it to anyone.",
    author: "Sin T"
  },
  {
    text: "I was in the city for some work visits and I decided to eat here... I have to say that they surprised me with a wonderful service and the food is of very good quality. I recommend it.",
    author: "Francisco Oliveira"
  },
  {
    text: "This place is incredible, their casa sandwich and butterfly shrimp is delicious. I can't recommend it more! Amazing friendly staff, impeccable service.",
    author: "Callum Biddle Patrick"
  },
  {
    text: "Loved my experience there, found the food to be tasty and affordable! Staff was very kind and polite, will definitely come back!",
    author: "Manika Sansoa"
  },
  {
    text: "A fantastic chef and top-notch cuisine! We were able to taste the chicken before ordering, and it was delicious. Absolutely succulent! Thank you so much.",
    author: "Aurelie Le texier"
  },
  {
    text: "Extremely good, very kind and very pleasant 10/10.",
    author: "Laurent Martin"
  },
  {
    text: "Absolutely delicious! The service was impeccable, honestly, friendly, and funny, and I even got to try the chicken. It was perfectly seasoned, everything was absolutely perfect.",
    author: "Gracielle-Eugénie Ricard"
  }
];



export default function HomePage() {
  const [lang, setLang] = useState<"en" | "fr">("en");
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <div className="w-full bg-sand font-sans text-mediterranean selection:bg-gold selection:text-sand">
      {/* Navbar (Absolute, not sticky) */}
      <div className="absolute top-0 left-0 right-0 z-50 px-6 py-6 mix-blend-difference pointer-events-none">
        <Navbar lang={lang} setLang={setLang} className="pointer-events-auto shadow-none" />
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden bg-mediterranean/90">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <img 
            src="/media/hero.jpeg" 
            alt="Villa Grecque" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-mediterranean/80 via-transparent to-mediterranean/90" />
        </motion.div>

        <div className="relative z-10 flex flex-col items-center justify-center px-4 w-full max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="font-serif text-5xl md:text-8xl lg:text-[110px] leading-[0.9] text-sand mb-6">
              Savor the <em className="text-gold italic font-light">exquisite</em> <br />
              flavors here
            </h1>
            <BlurText
              text={lang === "fr"
                ? "Embarquez pour une odyssée culinaire spéciale où chaque plat est une symphonie de saveurs et chaque bouchée est un voyage."
                : "Embark on a special culinary odyssey where every dish is a symphony of flavors and every bite is a journey."}
              delay={60}
              animateBy="words"
              direction="top"
              stepDuration={0.2}
              className="text-sand/80 font-sans text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light tracking-wide justify-center"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <button 
              onClick={() => scrollTo("menu")}
              className="bg-transparent border border-sand text-sand px-10 py-4 rounded-full font-serif font-bold text-lg hover:bg-sand/10 transition-all duration-300 flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              {lang === "fr" ? "Voir le Menu" : "Explore Menu"}
              <ArrowRight size={18} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="https://maps.google.com/?q=Montreal,+QC" target="_blank" rel="noopener noreferrer" className="flex items-center h-14 bg-sand/10 hover:bg-sand/20 backdrop-blur-md border border-sand/20 rounded-full transition-all group pr-6">
              <div className="w-14 h-14 flex items-center justify-center shrink-0 rounded-full bg-sand/10 group-hover:bg-gold/20 mr-2 transition-colors">
                <MapPin size={20} className="text-sand group-hover:text-gold transition-colors" />
              </div>
              <span className="text-sand/90 group-hover:text-sand font-sans text-sm tracking-wide">
                Montreal, QC
              </span>
            </a>
            
            <a href="tel:+14384048385" className="flex items-center h-14 bg-sand/10 hover:bg-sand/20 backdrop-blur-md border border-sand/20 rounded-full transition-all group pr-6">
              <div className="w-14 h-14 flex items-center justify-center shrink-0 rounded-full bg-sand/10 group-hover:bg-gold/20 mr-2 transition-colors">
                <Phone size={20} className="text-sand group-hover:text-gold transition-colors" />
              </div>
              <span className="text-sand/90 group-hover:text-sand font-serif text-lg tracking-widest">
                438-404-8385
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Modern Menu Section */}
      <section id="menu" className="w-full py-24 md:py-32 bg-sand text-mediterranean">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <motion.h1
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="font-serif text-5xl md:text-7xl mb-4"
            >
              <ShinyText
                text={lang === "fr" ? "Nos Menus" : "Menus"}
                color="#112330"
                shineColor="#b28e57"
                speed={3}
              />
            </motion.h1>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            <button className="px-8 py-3 font-sans text-xs font-bold uppercase tracking-[0.2em] text-mediterranean border border-mediterranean bg-transparent hover:bg-mediterranean hover:text-sand transition-colors rounded-none">
              {lang === "fr" ? "À La Carte" : "À La Carte"}
            </button>
            <a 
              href="#"
              className="px-8 py-3 font-sans text-xs font-bold uppercase tracking-[0.2em] text-mediterranean/60 border border-transparent hover:border-mediterranean/20 transition-colors rounded-none whitespace-nowrap"
            >
               {lang === "fr" ? "Livraison" : "Delivery"}
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-x-24 lg:gap-y-24">
            {/* Left Column (0, 2, 4) */}
            <div className="flex flex-col gap-16 lg:gap-24">
              {[0, 2, 4].map((catIndex) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  key={catIndex} 
                  className="flex flex-col"
                >
                  <div className="border-b border-mediterranean/10 mb-8 pb-6">
                    <h2 className="font-serif text-4xl md:text-5xl text-mediterranean mb-2 text-center">
                      {lang === "fr" ? MENU_CATEGORIES[catIndex].title_fr : MENU_CATEGORIES[catIndex].title_en}
                    </h2>
                    {(lang === "fr" ? MENU_CATEGORIES[catIndex].desc_fr : MENU_CATEGORIES[catIndex].desc_en) && (
                      <BlurText
                        text={lang === "fr" ? MENU_CATEGORIES[catIndex].desc_fr : MENU_CATEGORIES[catIndex].desc_en}
                        delay={60}
                        animateBy="words"
                        direction="top"
                        stepDuration={0.2}
                        className="text-mediterranean/70 italic font-serif text-center text-lg max-w-sm mx-auto mt-4 justify-center"
                      />
                    )}
                  </div>
                  <ul className="flex flex-col gap-8">
                    {MENU_CATEGORIES[catIndex].items.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
                        whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: idx * 0.07, ease: 'easeOut' }}
                        className="flex flex-col gap-2 w-full group"
                      >
                        <div className="flex justify-between items-baseline gap-4 w-full">
                          <p className="font-sans font-bold text-[13px] md:text-sm tracking-[0.1em] uppercase text-mediterranean/90 group-hover:text-mediterranean transition-colors">
                            {lang === "fr" ? item.name_fr : item.name_en}
                          </p>
                          <div className="border-b-[1.5px] border-dotted border-mediterranean/20 flex-1 opacity-50 relative top-[-4px]"></div>
                          <span className="font-sans text-[13px] md:text-sm font-bold tracking-widest text-mediterranean">
                            {item.price}
                          </span>
                        </div>
                        {(lang === "fr" ? item.desc_fr : item.desc_en) && (
                          <p className="text-[15px] md:text-base text-mediterranean/60 font-serif italic pr-12 leading-relaxed">
                            {lang === "fr" ? item.desc_fr : item.desc_en}
                          </p>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Right Column (1, 3) */}
            <div className="flex flex-col gap-16 lg:gap-24">
              {[1, 3].map((catIndex) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  key={catIndex} 
                  className="flex flex-col"
                >
                  <div className="border-b border-mediterranean/10 mb-8 pb-6">
                    <h2 className="font-serif text-4xl md:text-5xl text-mediterranean mb-2 text-center">
                      {lang === "fr" ? MENU_CATEGORIES[catIndex].title_fr : MENU_CATEGORIES[catIndex].title_en}
                    </h2>
                    {(lang === "fr" ? MENU_CATEGORIES[catIndex].desc_fr : MENU_CATEGORIES[catIndex].desc_en) && (
                      <BlurText
                        text={lang === "fr" ? MENU_CATEGORIES[catIndex].desc_fr : MENU_CATEGORIES[catIndex].desc_en}
                        delay={60}
                        animateBy="words"
                        direction="top"
                        stepDuration={0.2}
                        className="text-mediterranean/70 italic font-serif text-center text-lg max-w-sm mx-auto mt-4 justify-center"
                      />
                    )}
                  </div>
                  <ul className="flex flex-col gap-8">
                    {MENU_CATEGORIES[catIndex].items.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
                        whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: idx * 0.07, ease: 'easeOut' }}
                        className="flex flex-col gap-2 w-full group"
                      >
                        <div className="flex justify-between items-baseline gap-4 w-full">
                          <p className="font-sans font-bold text-[13px] md:text-sm tracking-[0.1em] uppercase text-mediterranean/90 group-hover:text-mediterranean transition-colors">
                            {lang === "fr" ? item.name_fr : item.name_en}
                          </p>
                          <div className="border-b-[1.5px] border-dotted border-mediterranean/20 flex-1 opacity-50 relative top-[-4px]"></div>
                          <span className="font-sans text-[13px] md:text-sm font-bold tracking-widest text-mediterranean">
                            {item.price}
                          </span>
                        </div>
                        {(lang === "fr" ? item.desc_fr : item.desc_en) && (
                          <p className="text-[15px] md:text-base text-mediterranean/60 font-serif italic pr-12 leading-relaxed">
                            {lang === "fr" ? item.desc_fr : item.desc_en}
                          </p>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="about" className="relative w-full py-24 md:py-32 bg-mediterranean text-sand overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img 
            src="/media/experience_bg.jpg"
            alt="Mediterranean"
            className="w-full h-full object-cover grayscale"
          />
        </div>
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="w-full md:w-1/2">
            <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-8">
              <ShinyText
                text="Experience"
                color="#fbf8f4"
                shineColor="#b28e57"
                speed={3}
              />
              <br/> <em className="text-gold">Luxurious</em> Dining
            </h2>
            <BlurText
              text={lang === "fr"
               ? "Découvrez un monde où chaque plat est un chef-d'œuvre, conçu avec les ingrédients locaux les plus frais de la Méditerranée et du Québec. Villa Grecque allie les traditions culinaires helléniques à une élégance intemporelle."
               : "Discover a new world where every dish is a masterpiece, crafted with the freshest local ingredients and Mediterranean finesse. Villa Grecque marries Hellenic culinary traditions with timeless elegance."}
              delay={60}
              animateBy="words"
              direction="top"
              stepDuration={0.2}
              className="text-sand/80 font-sans text-lg max-w-md leading-relaxed"
            />
          </div>
          <div className="w-full md:w-1/2">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                 src="/media/experience_fg.jpg" 
                 alt="Chef Cooking" 
                 className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Marquee */}
      <section id="testimonials" className="w-full py-24 md:py-32 bg-sand-dark text-mediterranean overflow-hidden">
         <div className="max-w-6xl mx-auto px-6 md:px-16 mb-16 text-center">
           <p className="text-gold font-bold tracking-[0.25em] text-sm uppercase mb-4">
             {lang === "fr" ? "Témoignages" : "Testimonials"}
           </p>
           <h2 className="font-serif text-4xl md:text-6xl mb-10">
             <ShinyText
               text={lang === "fr" ? "Avis Clients" : "Client Reviews"}
               color="#112330"
               shineColor="#b28e57"
               speed={3}
             />
           </h2>

           {/* Google Reviews CTA */}
           <a
             href="https://maps.google.com/?q=Montreal,+QC"
             target="_blank"
             rel="noopener noreferrer"
             className="inline-flex items-center gap-5 bg-sand border border-gold/40 rounded-2xl p-5 md:p-6 hover:border-gold transition-all group shadow-md max-w-xl w-full text-left"
           >
             <div className="w-11 h-11 rounded-xl bg-gold/15 flex items-center justify-center shrink-0 group-hover:bg-gold/25 transition-colors">
               <Star size={20} className="fill-gold text-gold" />
             </div>
             <div className="flex-1">
               <p className="font-serif text-mediterranean font-semibold text-base leading-snug">
                 {lang === "fr" ? "Vous avez apprécié votre expérience ? Laissez-nous un avis Google 5 étoiles !" : "Enjoyed your experience? Leave us a 5-star Google review!"}
               </p>
               <p className="text-mediterranean/50 text-sm mt-0.5 font-sans">
                 {lang === "fr" ? "Aidez d'autres convives à nous découvrir." : "It helps more guests discover us."}
               </p>
             </div>
             <div className="shrink-0 flex items-center gap-2 bg-gold text-mediterranean font-bold text-xs tracking-wider uppercase px-4 py-2.5 rounded-xl group-hover:bg-gold-light transition-colors whitespace-nowrap">
               {lang === "fr" ? "Nous noter" : "Review Us"}
               <ArrowUpRight size={14} />
             </div>
           </a>
         </div>

         <div className="w-full relative flex flex-col gap-8 md:gap-12 mt-12 overflow-hidden py-10 pointer-events-none">
            {/* Top Row - Scrolling Left */}
            <div className="flex w-max gap-8 md:gap-12 animate-marquee pause-on-hover pointer-events-auto group">
              {[...REVIEWS, ...REVIEWS].map((review, idx) => (
                <div key={`row1-${idx}`} className="w-[320px] md:w-[450px] p-8 md:p-10 shrink-0 bg-sand flex flex-col justify-between border border-gold/20 shadow-xl rounded-bl-[4rem] rounded-tr-[4rem] relative group-hover:opacity-50 hover:!opacity-100 transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute top-0 right-0 p-6 text-gold/10">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                  
                  <div>
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="font-serif text-lg md:text-xl text-mediterranean/80 leading-relaxed italic relative z-10 line-clamp-4 max-w-sm">
                      "{review.text}"
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-gold/20">
                    <p className="font-sans font-bold text-mediterranean uppercase tracking-wider text-xs">
                      — {review.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Row - Scrolling Right (Reversed) */}
            <div className="flex w-max gap-8 md:gap-12 pl-[300px] animate-marquee-reverse pause-on-hover pointer-events-auto group">
              {[...[...REVIEWS].reverse(), ...[...REVIEWS].reverse()].map((review, idx) => (
                <div key={`row2-${idx}`} className="w-[320px] md:w-[450px] p-8 md:p-10 shrink-0 bg-mediterranean text-sand flex flex-col justify-between border border-gold/10 shadow-xl rounded-br-[4rem] rounded-tl-[4rem] relative group-hover:opacity-50 hover:!opacity-100 transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute top-0 right-0 p-6 text-gold/5">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                  
                  <div>
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="font-serif text-lg md:text-xl text-sand/80 leading-relaxed italic relative z-10 line-clamp-4 max-w-sm">
                      "{review.text}"
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-gold/10">
                    <p className="font-sans font-bold text-gold uppercase tracking-wider text-xs">
                      — {review.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
         </div>

      </section>

      {/* Footer */}
      <footer className="bg-[#0b1720] text-sand w-full">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-20 flex flex-col md:flex-row justify-between gap-16">
           
           <div className="w-full md:w-1/4 flex flex-col gap-6 md:pr-8">
             <div className="font-serif text-3xl tracking-[0.2em] text-sand opacity-90 uppercase">
               VILLA GRECQUE
             </div>
             <p className="text-sand/50 text-sm font-sans leading-relaxed">
               {lang === "fr" ? "L'excellence culinaire méditerranéenne en plein cœur de Joliette." : "Mediterranean culinary excellence in the heart of Joliette."}
             </p>
           </div>

           <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

              <div className="flex flex-col gap-6">
                 <h6 className="font-serif text-2xl text-sand">Links</h6>
                 <div className="flex flex-col gap-4">
                   <a href="#about" className="font-sans text-sand/60 hover:text-gold transition-colors text-sm">{lang === "fr" ? "À Propos" : "About"}</a>
                 </div>
              </div>

              <div className="flex flex-col gap-6">
                 <h6 className="font-serif text-2xl text-sand">Menu</h6>
                 <div className="flex flex-col gap-4">
                   <a href="#menu" className="font-sans text-sand/60 hover:text-gold transition-colors text-sm">Appetizer & Mains</a>
                   <a href="#menu" className="font-sans text-sand/60 hover:text-gold transition-colors text-sm">Salad</a>
                   <a href="#menu" className="font-sans text-sand/60 hover:text-gold transition-colors text-sm">Dessert & Drinks</a>
                 </div>
              </div>

              <div className="flex flex-col gap-6">
                 <h6 className="font-serif text-2xl text-sand">Location</h6>
                 <div className="flex flex-col gap-3 text-sand/60 text-sm">
                   <a href="https://maps.google.com/?q=Montreal,+QC" target="_blank" rel="noopener noreferrer" className="text-sand leading-relaxed hover:text-gold transition-colors">
                     Montreal, QC
                   </a>
                   <a href="tel:+14384048385" className="font-sans text-sand/60 hover:text-gold transition-colors">
                     +1 (438) 404-8385
                   </a>
                 </div>
              </div>

              <div className="flex flex-col gap-6">
                 <h6 className="font-serif text-2xl text-sand">Hours</h6>
                 <div className="flex flex-col gap-2 text-sm">
                   <p className="text-sand/60">Tue – Sun</p>
                   <p className="text-sand font-medium">11:00 – 21:00</p>
                   <p className="text-sand/50 mt-1">{lang === "fr" ? "Fermé le lundi" : "Closed on Monday"}</p>
                 </div>
              </div>

           </div>
        </div>

        <div className="w-full border-t border-sand/5 py-8">
           <div className="max-w-[1440px] mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-sand/40 text-xs tracking-wider">
                COPYRIGHT © {new Date().getFullYear()} VILLA GRECQUE. ALL RIGHTS RESERVED.
              </p>

              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-sand/60 text-xs font-bold uppercase tracking-widest hover:text-gold transition-colors border-b border-transparent hover:border-gold pb-1"
              >
                Back to Top
              </button>
           </div>
        </div>
      </footer>
    </div>
  );
}
