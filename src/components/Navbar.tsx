import { useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";

export default function Navbar({
  className,
  lang = "en",
  setLang,
}: {
  className?: string;
  lang?: "en" | "fr";
  setLang?: (lang: "en" | "fr") => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <div
        className={cn(
          "flex justify-between items-center bg-mediterranean/80 backdrop-blur-xl border border-mediterranean-light rounded-2xl p-2 pr-2 md:pr-4 shadow-2xl",
          className,
        )}
      >
        <div className="flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 mr-2 md:mr-4 border border-sand/10 rounded-[14px] hover:bg-white/10 transition-colors lg:hidden"
          >
            <Menu size={20} className="text-sand" />
          </button>

          <div
            className="font-serif w-max mx-2 text-[18px] md:text-xl xl:text-2xl whitespace-nowrap tracking-[0.2em] uppercase mr-3 lg:mr-4 xl:mr-10 text-sand hover:opacity-80 transition-opacity cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            VIEUX CASA
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6 xl:gap-10 text-[11px] xl:text-[13px] font-bold tracking-[0.15em] xl:tracking-[0.18em] uppercase text-sand whitespace-nowrap">
          <button
            onClick={() => scrollTo("menu")}
            className="transition-colors hover-underline-animation hover:text-gold"
          >
            {lang === "fr" ? "Menu" : "Menu"}
          </button>
          <button
            onClick={() => scrollTo("about")}
            className="transition-colors hover-underline-animation hover:text-gold"
          >
            {lang === "fr" ? "Notre Histoire" : "Our Story"}
          </button>
          <button
            onClick={() => scrollTo("gallery")}
            className="transition-colors hover-underline-animation hover:text-gold"
          >
            {lang === "fr" ? "Galerie" : "Gallery"}
          </button>
          <button
            onClick={() => scrollTo("testimonials")}
            className="transition-colors hover-underline-animation hover:text-gold"
          >
            {lang === "fr" ? "Avis" : "Reviews"}
          </button>
          <button
            onClick={() => scrollTo("reservation")}
            className="transition-colors hover-underline-animation hover:text-gold"
          >
            {lang === "fr" ? "Réservation" : "Reservation"}
          </button>
        </div>

        <div className="flex items-center gap-2 md:gap-3 ml-auto">
          {setLang && (
            <div className="flex bg-mediterranean-light/80 border border-sand/10 rounded-full p-1 text-[10px] tracking-widest font-bold font-sans">
              <button
                onClick={() => setLang("en")}
                className={cn(
                  "px-2 py-1 md:px-3 md:py-1.5 rounded-full transition-all uppercase whitespace-nowrap",
                  lang === "en"
                    ? "bg-gold text-mediterranean"
                    : "text-sand hover:text-gold",
                )}
              >
                EN
              </button>
              <button
                onClick={() => setLang("fr")}
                className={cn(
                  "px-2 py-1 md:px-3 md:py-1.5 rounded-full transition-all uppercase whitespace-nowrap",
                  lang === "fr"
                    ? "bg-gold text-mediterranean"
                    : "text-sand hover:text-gold",
                )}
              >
                FR
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay — rendered via portal to escape overflow:hidden + transform parent */}
      {menuOpen && createPortal(
        <div className="fixed inset-0 z-[200] bg-mediterranean/95 backdrop-blur-2xl flex flex-col lg:hidden">
          <div className="flex justify-between items-center p-6 border-b border-sand/10">
            <div
              className="font-serif text-xl tracking-[0.2em] uppercase text-sand cursor-pointer"
              onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setMenuOpen(false); }}
            >
              VIEUX CASA
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 border border-sand/10 rounded-[14px] hover:bg-white/10 transition-colors"
            >
              <X size={20} className="text-sand" />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center px-8 gap-6">
            {[
              { id: "menu", en: "Menu", fr: "Menu" },
              { id: "about", en: "Our Story", fr: "Notre Histoire" },
              { id: "gallery", en: "Gallery", fr: "Galerie" },
              { id: "testimonials", en: "Reviews", fr: "Avis" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="font-serif text-left text-3xl sm:text-4xl text-sand hover:text-gold transition-colors tracking-wide"
              >
                {lang === "fr" ? item.fr : item.en}
              </button>
            ))}
          </nav>

          {setLang && (
            <div className="p-8 flex justify-start border-t border-sand/10">
              <div className="flex bg-mediterranean-light/80 border border-sand/10 rounded-full p-1 text-[10px] tracking-widest font-bold font-sans">
                <button
                  onClick={() => setLang("en")}
                  className={cn(
                    "px-4 py-2 rounded-full transition-all uppercase",
                    lang === "en"
                      ? "bg-gold text-mediterranean"
                      : "text-sand hover:text-gold",
                  )}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang("fr")}
                  className={cn(
                    "px-4 py-2 rounded-full transition-all uppercase",
                    lang === "fr"
                      ? "bg-gold text-mediterranean"
                      : "text-sand hover:text-gold",
                  )}
                >
                  FR
                </button>
              </div>
            </div>
          )}
        </div>,
        document.body
      )}
    </>
  );
}
