"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/* ─── scroll reveal hook ─── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.08 }
    );
    document
      .querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale")
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── data ─── */
const NAV_LINKS = [
  { label: "Inicio", href: "#hero" },
  { label: "Sobre Nosotros", href: "#about" },
  { label: "Carta", href: "#menu" },
  { label: "Galería", href: "#gallery" },
  { label: "Opiniones", href: "#reviews" },
  { label: "Contacto", href: "#contact" },
];

const REVIEWS_ROW1 = [
  { name: "Suny M.", rating: 5, text: "Comida de excelente calidad... el personal atento con una calidez genuina hizo que todo fuera perfecto.", date: "Oct 2025" },
  { name: "Juan Jesús B.", rating: 5, text: "Calidad extraordinaria y servicio amable. Sabores profundos y técnica magnífica que justifican unos precios justos.", date: "Sep 2025" },
  { name: "Armando S.", rating: 5, text: "Una grata sorpresa. La comida estaba genuinamente deliciosa con un trato excelente en todo momento.", date: "Ago 2023" },
  { name: "Isabel", rating: 5, text: "Cocina de calidad, personal profesional, precios razonables. La celebración de cumpleaños fue ejecutada a la perfección.", date: "Jul 2023" },
  { name: "staffalicante", rating: 5, text: "Cliente desde hace casi una década. Los arroces son excepcionales. El equipo profesional entrega de forma consistente.", date: "Jun 2024" },
  { name: "María T.", rating: 5, text: "Un lugar mágico con sabores que te transportan. Los mariscos están siempre fresquísimos y la atención es impecable.", date: "Mar 2025" },
  { name: "Carlos R.", rating: 5, text: "Las carrilleras ibéricas son una obra maestra. Volvemos cada vez que visitamos Alicante, nunca decepciona.", date: "Nov 2024" },
  { name: "Ana P.", rating: 5, text: "Celebramos nuestra boda aquí y fue perfecto. El equipo se desvivió para que todo saliera increíble.", date: "May 2024" },
];

const REVIEWS_ROW2 = [
  { name: "Pedro L.", rating: 5, text: "El mejor arroz a banda que he probado nunca. La fideuá también es espectacular. Volveremos sin duda.", date: "Ene 2025" },
  { name: "Laura G.", rating: 5, text: "Ambiente acogedor y familiar. El solomillo de ternera al foie es una experiencia inolvidable.", date: "Feb 2025" },
  { name: "Miguel A.", rating: 5, text: "Increíble carta de vinos con explicaciones detalladas. El sommelier nos guió perfectamente. Maridaje perfecto.", date: "Dic 2024" },
  { name: "Quest58710", rating: 4, text: "Buen sitio para comer. Todo bien preparado con precios muy razonables para la calidad que ofrecen.", date: "Oct 2024" },
  { name: "Sandra V.", rating: 5, text: "Las gambas al ajillo son las mejores de toda la costa. El pulpo a la gallega, extraordinario.", date: "Ago 2024" },
  { name: "Roberto F.", rating: 5, text: "Cada plato es una sorpresa. Las torrijas del chef con helado de mantecado son adictivas.", date: "Jul 2024" },
  { name: "Elena M.", rating: 5, text: "Lugar perfecto para una cena especial. La escalibada casera con hueva y mojama es única.", date: "Sep 2024" },
  { name: "Francisco J.", rating: 5, text: "Impresionante relación calidad-precio. El rabo de toro se deshace en la boca. Servicio atento.", date: "Abr 2025" },
];

type MenuCategory = "entrantes" | "delmar" | "plancha" | "sopas" | "arroces" | "carnes" | "pescados" | "postres";

const MENU: Record<MenuCategory, { name: string; desc: string; price: string }[]> = {
  entrantes: [
    { name: "Jamón Ibérico", desc: "Cured ham produced in Spain", price: "15€" },
    { name: "Queso Curado", desc: "Cured Spanish Cheese", price: "12€" },
    { name: "Escalibada Casera", desc: "Roasted Pepper Salad with fish roe & mojama", price: "15€" },
    { name: "Foie con Dulce de Tomate", desc: "Foie gras with tomato jam", price: "15€" },
    { name: "Espetos Alicantinos", desc: "Roasted sardines in espeto, Chef Style", price: "2,5€" },
    { name: "Croquetas de Jamón Ibérico", desc: "Iberic Ham Croquettes", price: "1,5€" },
    { name: "Queso Frito", desc: "Fried Cheese with red fruit jam", price: "12€" },
  ],
  delmar: [
    { name: "Gambas al Ajillo", desc: "Prawns with olive oil, garlic & cayenne", price: "24€" },
    { name: "Pulpo a la Gallega", desc: "Galician Octopus", price: "15€" },
    { name: "Pimiento Piquillo Relleno", desc: "Stuffed Piquillo Pepper with cod", price: "2,5€" },
    { name: "Delicias de Rape y Gamba", desc: "Monkfish and prawn delights", price: "2€" },
    { name: "Buñuelos de Bacalao", desc: "Cod fritters", price: "1,5€" },
    { name: "Calamar a la Andaluza", desc: "Squid a la Andaluza", price: "12€" },
    { name: "Quisquilla Hervida", desc: "Boiled shrimps quisquilla", price: "S/M€" },
  ],
  plancha: [
    { name: "Calamar Nacional", desc: "Spanish squid", price: "17€" },
    { name: "Zamburiñas", desc: "Saint Jacques shells", price: "2,5€" },
    { name: "Alcachofas Plancha", desc: "Grilled artichokes", price: "8€" },
    { name: "Alcachofas Confitadas", desc: "Confit Artichoke with foie", price: "3€" },
    { name: "Bogavante Plancha o Frito", desc: "Lobster with garlic sprouts or grilled", price: "S/M€" },
    { name: "Sepionet Plancha", desc: "Grilled cuttlefish", price: "S/M€" },
    { name: "Gamba Roja", desc: "Red prawns", price: "S/M€" },
  ],
  sopas: [
    { name: "Tartar de Salmón", desc: "With soy sauce gelatin & EVOO ice cream", price: "15€" },
    { name: "Consomé con Relleno", desc: "Meatball soup", price: "8€" },
    { name: "Sopa de Ave", desc: "Chicken soup", price: "5€" },
    { name: "Sopa de Cocido", desc: "Stew soup", price: "5€" },
    { name: "Gazpacho Andaluz", desc: "Andalusian gazpacho (seasonal)", price: "5€" },
    { name: "Pan Tostado, Tomate y Ali Oli", desc: "Toasted bread, tomato & garlic mayo (pax)", price: "1,5€" },
  ],
  arroces: [
    { name: "Arroz de Bogavante", desc: "Lobster rice", price: "20€" },
    { name: "Arroz de Marisco", desc: "Seafood rice", price: "15€" },
    { name: "Fideuà", desc: "Short noodles, similar to paella", price: "15€" },
    { name: "Gazpacho de Mero y Gambas", desc: "Gazpacho with grouper and prawns", price: "15€" },
    { name: "Arroz de Bacalao y Verduras", desc: "Rice with cod and vegetables", price: "13€" },
    { name: "Arroz de Sepionet y Ajetes", desc: "Rice with cuttlefish and garlic sprouts", price: "12€" },
    { name: "Arroz de Conejo y Caracoles", desc: "Rice with rabbit and snails", price: "12€" },
    { name: "Arroz a Banda con Tropezones", desc: "A banda rice", price: "10€" },
    { name: "Arroz Negro", desc: "Black rice", price: "10€" },
    { name: "Arroz de Magro y Verduras", desc: "Rice with lean pork and vegetables", price: "10€" },
    { name: "Arroz de la Huerta", desc: "Rice with vegetables", price: "9€" },
  ],
  carnes: [
    { name: "Solomillo de Ternera al Foie", desc: "Beef Steak with Foie", price: "25€" },
    { name: "Solomillo de Ternera", desc: "Beef Steak", price: "23€" },
    { name: "Entrecot de Ternera", desc: "Beef Entrecote", price: "18€" },
    { name: "Carrilleras Ibéricas", desc: "Beef cheeks with wine and orange sauce", price: "15€" },
    { name: "Rabo de Toro", desc: "Ox Tail", price: "15€" },
    { name: "Solomillo Ibérico", desc: "Iberian sirloin", price: "12€" },
    { name: "Manitas de Cerdo", desc: "Pork hands", price: "12€" },
  ],
  pescados: [
    { name: "Merluza Plancha", desc: "Grilled Hake", price: "18€" },
    { name: "Corvina Estilo Chef", desc: "Sea Croaker with shrimp and zucchini noodles", price: "15€" },
    { name: "Lubina Bilbaína", desc: "Sea bass with clams and shrimps", price: "15€" },
    { name: "Dorada Bilbaína", desc: "Sea bream with clams and shrimps", price: "15€" },
    { name: "Bacalao Noruego Confitado", desc: "Norwegian confit cod with alioli", price: "15€" },
  ],
  postres: [
    { name: "Tarta Tatín", desc: "Apple Pie Tatín with vanilla ice cream", price: "6€" },
    { name: "Derretidos", desc: "Dark & white chocolate with nougat", price: "5€" },
    { name: "Arroz con Leche", desc: "Rice pudding, chocolate ring & coconut ice cream", price: "5€" },
    { name: "Leche Frita", desc: "Fried milk pudding with nougat ice cream", price: "4,5€" },
    { name: "Torrijas Chef", desc: "French toast, shortbread ice cream & coconut milk", price: "4€" },
    { name: "Tarta de Queso", desc: "Cheesecake", price: "4€" },
    { name: "Tarta de la Abuela", desc: "Grandma's cake", price: "4€" },
    { name: "Cortijillo", desc: "Custard, biscuit and chocolate", price: "3€" },
    { name: "Pan de Calatrava", desc: "Calatrava bread pudding", price: "3€" },
    { name: "Flan de Huevo", desc: "Egg custard", price: "3€" },
  ],
};

const MENU_CATEGORIES: { key: MenuCategory; label: string }[] = [
  { key: "entrantes", label: "Entrantes" },
  { key: "delmar", label: "Del Mar" },
  { key: "plancha", label: "Plancha" },
  { key: "sopas", label: "Sopas" },
  { key: "arroces", label: "Arroces" },
  { key: "carnes", label: "Carnes" },
  { key: "pescados", label: "Pescados" },
  { key: "postres", label: "Postres" },
];

const GALLERY_IMAGES = [
  { src: "/images/gambas-ajillo.webp", alt: "Gambas al Ajillo" },
  { src: "/images/arroz-banda.webp", alt: "Arroz a Banda" },
  { src: "/images/pulpo-gallega.jpg", alt: "Pulpo a la Gallega" },
  { src: "/images/dining-room.jpg", alt: "Salón del restaurante" },
  { src: "/images/zamburinas.webp", alt: "Zamburiñas a la plancha" },
  { src: "/images/grilled-meat.jpg", alt: "Solomillo a la plancha" },
  { src: "/images/sepionet.webp", alt: "Sepionet plancha" },
  { src: "/images/torrijas-dessert.jpg", alt: "Torrijas del Chef" },
  { src: "/images/gambas-plancha.webp", alt: "Gambas a la plancha" },
  { src: "/images/arroz-bacalao.webp", alt: "Arroz de bacalao" },
  { src: "/images/exterior.webp", alt: "Fachada del restaurante" },
  { src: "/images/bar-interior.webp", alt: "Barra del restaurante" },
];

/* ─── small components ─── */
function Stars({ count }: { count: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} className={i < count ? "text-gold" : "text-white/20"} width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: (typeof REVIEWS_ROW1)[0] }) {
  return (
    <div className="review-card rounded-2xl p-6 w-[360px] flex-shrink-0 mx-3">
      <div className="flex items-center justify-between mb-4">
        <Stars count={review.rating} />
        <span className="text-white/40 text-xs" style={{ fontFamily: "var(--font-inter)" }}>{review.date}</span>
      </div>
      <p className="text-white/75 text-sm leading-relaxed mb-4" style={{ fontFamily: "var(--font-inter)" }}>
        &ldquo;{review.text}&rdquo;
      </p>
      <p className="text-gold text-sm font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>
        {review.name}
      </p>
    </div>
  );
}

/* ─── main page ─── */
export default function Home() {
  useReveal();
  const [menuCat, setMenuCat] = useState<MenuCategory>("arroces");
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const playfair = { fontFamily: "var(--font-playfair)" };
  const lora = { fontFamily: "var(--font-lora)" };
  const inter = { fontFamily: "var(--font-inter)" };

  return (
    <>
      {/* ═══ NAV ═══ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "nav-blur py-3" : "py-5"
        }`}
        style={{ backgroundColor: scrolled ? "rgba(13,13,13,0.92)" : "transparent", borderBottom: scrolled ? "1px solid rgba(201,169,110,0.1)" : "none" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gradient-gold tracking-wide" style={playfair}>
              El Cortijillo
            </span>
          </a>
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-white/70 hover:text-gold transition-colors tracking-wide uppercase" style={inter}>
                {l.label}
              </a>
            ))}
            <a href="tel:+34965682817" className="ml-2 px-6 py-2.5 border border-gold/50 text-gold text-sm rounded-full hover:bg-gold hover:text-dark transition-all tracking-wide" style={inter}>
              Reservar
            </a>
          </div>
          <button className="lg:hidden text-white/80" onClick={() => setNavOpen(!navOpen)} aria-label="Menu">
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {navOpen ? <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" /> : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        {navOpen && (
          <div className="lg:hidden nav-blur mt-2" style={{ backgroundColor: "rgba(13,13,13,0.96)", borderTop: "1px solid rgba(201,169,110,0.1)" }}>
            <div className="flex flex-col items-center py-8 gap-6">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setNavOpen(false)} className="text-white/70 hover:text-gold transition-colors tracking-wide uppercase text-sm" style={inter}>{l.label}</a>
              ))}
              <a href="tel:+34965682817" className="px-6 py-2.5 border border-gold/50 text-gold text-sm rounded-full hover:bg-gold hover:text-dark transition-all" style={inter}>Reservar</a>
            </div>
          </div>
        )}
      </nav>

      {/* ═══ HERO ═══ */}
      <section id="hero" className="relative w-full overflow-hidden" style={{ height: "100vh", minHeight: "700px" }}>
        <div className="absolute inset-0" style={{ filter: "blur(6px)", transform: "scale(1.1)" }}>
          <Image
            src="/images/dining-room.jpg"
            alt="El Cortijillo de Juan Diego"
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.7)" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6 max-w-4xl">
            <p className="reveal text-gold tracking-[0.35em] uppercase text-sm mb-6" style={inter}>
              Tapería &middot; Arrocería &middot; Restaurante
            </p>
            <h1 className="reveal text-5xl sm:text-7xl md:text-8xl font-bold text-white leading-[1.05] mb-6" style={playfair}>
              El{" "}
              <span className="text-gradient-gold italic" style={lora}>Cortijillo</span>
            </h1>
            <p className="reveal text-white/60 italic text-xl sm:text-2xl mb-4" style={lora}>
              de Juan Diego
            </p>
            <div className="reveal gold-line mx-auto my-8" />
            <p className="reveal text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10" style={inter}>
              Cocina mediterránea de autor en el corazón de Torrellano, Alicante.
              Tradición, sabor y pasión desde hace más de una década.
            </p>
            <div className="reveal flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#menu" className="px-8 py-3.5 bg-gold text-dark font-semibold rounded-full hover:bg-gold-light transition-all text-sm tracking-wide uppercase" style={inter}>
                Ver Carta
              </a>
              <a href="tel:+34965682817" className="px-8 py-3.5 border border-white/30 text-white rounded-full hover:border-gold hover:text-gold transition-all text-sm tracking-wide uppercase" style={inter}>
                Reservar Mesa
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-gold/60" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section style={{ backgroundColor: "var(--color-charcoal)", borderTop: "1px solid rgba(201,169,110,0.1)", borderBottom: "1px solid rgba(201,169,110,0.1)" }}>
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "4.6/5", label: "Google" },
            { value: "2.912+", label: "Opiniones" },
            { value: "#2", label: "en Torrellano" },
            { value: "10+", label: "Años de historia" },
          ].map((s) => (
            <div key={s.label} className="reveal">
              <p className="text-3xl md:text-4xl font-bold text-gradient-gold" style={playfair}>{s.value}</p>
              <p className="text-white/50 text-sm mt-2" style={inter}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" style={{ padding: "120px 0" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div className="reveal-left">
              <p className="text-gold tracking-[0.3em] uppercase text-xs mb-5" style={inter}>
                Nuestra Historia
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6" style={playfair}>
                Donde la{" "}
                <span className="italic text-gradient-gold" style={lora}>tradición</span>{" "}
                se encuentra con la pasión
              </h2>
              <div className="gold-line mb-8" />
              <p className="text-white/65 leading-relaxed mb-6 text-base" style={inter}>
                El Cortijillo de Juan Diego es mucho más que un restaurante. Es un lugar donde
                la cocina mediterránea, española y europea se fusionan para crear experiencias
                gastronómicas inolvidables. Ubicados en la Calle Violeta de Torrellano, Alicante,
                nuestro equipo se dedica a ofrecer platos elaborados con productos frescos y de
                la más alta calidad.
              </p>
              <p className="text-white/65 leading-relaxed mb-8 text-base" style={inter}>
                Galardonados con el Travellers&apos; Choice Award y con más de 2.900 opiniones
                positivas, somos el segundo restaurante mejor valorado de Torrellano.
                Nuestros arroces, mariscos y carnes son el reflejo de años de experiencia
                y dedicación.
              </p>
              <div className="flex flex-wrap gap-4">
                {["Mediterránea", "Española", "Europea"].map((c) => (
                  <span key={c} className="text-sm text-gold/80 px-5 py-2 rounded-full" style={{ ...inter, border: "1px solid rgba(201,169,110,0.2)" }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="reveal-right">
              <div className="grid grid-cols-2 gap-4" style={{ maxHeight: "550px" }}>
                <div className="img-zoom rounded-2xl overflow-hidden row-span-2">
                  <Image src="/images/gambas-ajillo.webp" alt="Gambas al Ajillo" width={400} height={600} className="object-cover w-full h-full" />
                </div>
                <div className="img-zoom rounded-2xl overflow-hidden">
                  <Image src="/images/arroz-banda.webp" alt="Arroz a Banda" width={400} height={280} className="object-cover w-full h-full" />
                </div>
                <div className="img-zoom rounded-2xl overflow-hidden">
                  <Image src="/images/zamburinas.webp" alt="Zamburiñas" width={400} height={280} className="object-cover w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* ═══ MENU ═══ */}
      <section id="menu" style={{ padding: "120px 0" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 reveal">
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-5" style={inter}>
              Carta Gastronómica
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5" style={playfair}>
              Nuestra{" "}
              <span className="italic text-gradient-gold" style={lora}>Carta</span>
            </h2>
            <div className="gold-line mx-auto mb-6" />
            <p className="text-white/55 max-w-xl mx-auto text-base" style={inter}>
              Descubre nuestra selección de platos mediterráneos elaborados con los mejores
              productos de la tierra y el mar.
            </p>
          </div>

          {/* Category tabs */}
          <div className="reveal flex flex-wrap justify-center gap-2 sm:gap-3 mb-14">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setMenuCat(cat.key)}
                className={`px-5 py-2.5 text-sm rounded-full transition-all tracking-wide ${
                  menuCat === cat.key
                    ? "bg-gold text-dark font-semibold"
                    : "text-white/55 hover:text-gold"
                }`}
                style={{ ...inter, border: menuCat === cat.key ? "none" : "1px solid rgba(255,255,255,0.08)" }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Menu items */}
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-1">
            {MENU[menuCat].map((item, i) => (
              <div
                key={item.name}
                className="flex justify-between items-baseline py-5 group"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", animationDelay: `${i * 50}ms` }}
              >
                <div className="flex-1 min-w-0 mr-4">
                  <h3 className="text-lg font-semibold text-white group-hover:text-gold transition-colors" style={playfair}>
                    {item.name}
                  </h3>
                  <p className="text-white/40 text-sm mt-1" style={inter}>{item.desc}</p>
                </div>
                <span className="text-gold font-bold text-lg whitespace-nowrap" style={playfair}>{item.price}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-14 reveal">
            <p className="text-white/30 text-xs italic" style={inter}>
              S/M = Según mercado &middot; IVA incluido &middot; Consulte alérgenos con nuestro personal
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* ═══ WINE HIGHLIGHT ═══ */}
      <section className="relative overflow-hidden" style={{ padding: "120px 0" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(74,31,36,0.2), transparent)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div className="reveal-left">
              <p className="text-gold tracking-[0.3em] uppercase text-xs mb-5" style={inter}>Nuestra Bodega</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6" style={playfair}>
                Carta de{" "}
                <span className="italic text-gradient-gold" style={lora}>Vinos</span>
              </h2>
              <div className="gold-line mb-8" />
              <p className="text-white/65 leading-relaxed mb-10 text-base" style={inter}>
                Una cuidada selección de más de 30 referencias de las mejores denominaciones
                de origen españolas. Desde los frescos Albariños de las Rías Baixas hasta los
                potentes Ribera del Duero, pasando por Riojas de crianza y los mejores champagnes.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { region: "Ribera del Duero", count: "15 referencias" },
                  { region: "Rueda", count: "5 referencias" },
                  { region: "Rías Baixas", count: "5 referencias" },
                  { region: "Rioja", count: "4 referencias" },
                ].map((w) => (
                  <div key={w.region} className="rounded-xl p-5" style={{ border: "1px solid rgba(201,169,110,0.12)" }}>
                    <p className="font-semibold text-white text-sm" style={playfair}>{w.region}</p>
                    <p className="text-gold/50 text-xs mt-1.5" style={inter}>{w.count}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal-right flex justify-center">
              <div className="relative">
                <div className="absolute -inset-8 rounded-3xl" style={{ background: "linear-gradient(135deg, rgba(201,169,110,0.04), transparent)" }} />
                <div className="relative grid grid-cols-2 gap-4">
                  {[
                    { name: "Bollinger", price: "60€", type: "Champagne" },
                    { name: "Möet", price: "48€", type: "Champagne" },
                    { name: "Tomás Postigo", price: "35€", type: "Ribera del Duero" },
                    { name: "Tinto Pesquera", price: "30€", type: "Ribera del Duero" },
                    { name: "Mar de Frades", price: "19€", type: "Albariño" },
                    { name: "Muga Crianza", price: "20€", type: "Rioja" },
                  ].map((w) => (
                    <div key={w.name} className="rounded-xl p-5 hover:border-gold/30 transition-all" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,169,110,0.1)" }}>
                      <p className="font-bold text-white text-sm" style={playfair}>{w.name}</p>
                      <p className="text-gold/45 text-xs italic mt-1" style={inter}>{w.type}</p>
                      <p className="text-gold font-bold mt-3" style={playfair}>{w.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* ═══ GALLERY ═══ */}
      <section id="gallery" style={{ padding: "120px 0" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 reveal">
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-5" style={inter}>Nuestra Galería</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5" style={playfair}>
              Un{" "}
              <span className="italic text-gradient-gold" style={lora}>Festín</span>{" "}
              Visual
            </h2>
            <div className="gold-line mx-auto" />
          </div>
          <div className="columns-2 md:columns-3 gap-5 [&>div]:mb-5">
            {GALLERY_IMAGES.map((img, i) => (
              <div key={img.src} className="reveal-scale img-zoom rounded-2xl overflow-hidden break-inside-avoid" style={{ transitionDelay: `${i * 60}ms` }}>
                <Image src={img.src} alt={img.alt} width={600} height={450} className="object-cover w-full h-auto" quality={80} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* ═══ REVIEWS ═══ */}
      <section id="reviews" className="overflow-hidden" style={{ padding: "120px 0" }}>
        <div className="max-w-6xl mx-auto px-6 text-center mb-16 reveal">
          <p className="text-gold tracking-[0.3em] uppercase text-xs mb-5" style={inter}>
            Lo Que Dicen Nuestros Clientes
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5" style={playfair}>
            <span className="italic text-gradient-gold" style={lora}>Opiniones</span>{" "}
            Reales
          </h2>
          <div className="gold-line mx-auto mb-8" />
          <div className="flex items-center justify-center gap-3">
            <Stars count={5} />
            <span className="text-white/55 text-sm" style={inter}>
              4.6 / 5 en Google &middot; 2.912+ opiniones
            </span>
          </div>
        </div>

        {/* Carousel Row 1 - scrolls left */}
        <div className="mb-6 overflow-hidden">
          <div className="carousel-left flex" style={{ width: "max-content" }}>
            {[...REVIEWS_ROW1, ...REVIEWS_ROW1].map((r, i) => (
              <ReviewCard key={`r1-${i}`} review={r} />
            ))}
          </div>
        </div>

        {/* Carousel Row 2 - scrolls right */}
        <div className="overflow-hidden">
          <div className="carousel-right flex" style={{ width: "max-content" }}>
            {[...REVIEWS_ROW2, ...REVIEWS_ROW2].map((r, i) => (
              <ReviewCard key={`r2-${i}`} review={r} />
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* ═══ FEATURES ═══ */}
      <section style={{ padding: "120px 0" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Horario",
                desc: "Mar - Jue: 7:30 - 18:00\nVie - Sáb: 7:30 - 00:00\nDomingo: 7:30 - 18:00\nLunes: Cerrado",
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.746 3.746 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                ),
                title: "Servicios",
                desc: "Bar completo\nOpciones vegetarianas y sin gluten\nAccesible en silla de ruedas\nApto para familias",
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                ),
                title: "Pago",
                desc: "Visa y Mastercard\nAparcamiento en la calle\nReservas por teléfono\nEventos privados",
              },
            ].map((f) => (
              <div key={f.title} className="reveal text-center rounded-2xl p-10 hover:border-gold/25 transition-all" style={{ border: "1px solid rgba(201,169,110,0.1)" }}>
                <div className="flex justify-center mb-5">{f.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4" style={playfair}>{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed whitespace-pre-line" style={inter}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* ═══ CONTACT / MAP ═══ */}
      <section id="contact" style={{ padding: "120px 0" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 reveal">
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-5" style={inter}>Encuéntranos</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5" style={playfair}>
              Ven a{" "}
              <span className="italic text-gradient-gold" style={lora}>Visitarnos</span>
            </h2>
            <div className="gold-line mx-auto" />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="reveal-left">
              <h3 className="text-2xl font-bold text-white mb-8" style={playfair}>
                El Cortijillo de Juan Diego
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <svg className="w-5 h-5 text-gold mt-1 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <div>
                    <p className="text-white" style={inter}>Calle Violeta 4, 03320</p>
                    <p className="text-white/45 text-sm mt-0.5" style={inter}>Torrellano, Alicante, España</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <svg className="w-5 h-5 text-gold mt-1 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <div>
                    <a href="tel:+34965682817" className="text-white hover:text-gold transition-colors" style={inter}>
                      +34 965 68 28 17
                    </a>
                    <p className="text-white/45 text-sm mt-0.5" style={inter}>Reservas y consultas</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <svg className="w-5 h-5 text-gold mt-1 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm" style={inter}>
                    {[
                      { day: "Lunes", hours: "Cerrado", dim: true },
                      { day: "Mar - Jue", hours: "7:30 - 18:00", dim: false },
                      { day: "Vie - Sáb", hours: "7:30 - 00:00", dim: false },
                      { day: "Domingo", hours: "7:30 - 18:00", dim: false },
                    ].map((h) => (
                      <div key={h.day} className="flex justify-between gap-10 py-1">
                        <span className="text-white/45">{h.day}</span>
                        <span className={h.dim ? "text-white/25" : "text-white"}>{h.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-10">
                <a
                  href="https://www.instagram.com/cortijillodejuandiego/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white/65 hover:text-gold hover:border-gold/50 transition-all text-sm"
                  style={{ ...inter, border: "1px solid rgba(201,169,110,0.2)" }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Instagram
                </a>
                <a
                  href="https://www.tripadvisor.es/Restaurant_Review-g667204-d4028567-Reviews-Cortijillo_de_Juan_Diego-Torrellano_Costa_Blanca_Province_of_Alicante_Valencian_C.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white/65 hover:text-gold hover:border-gold/50 transition-all text-sm"
                  style={{ ...inter, border: "1px solid rgba(201,169,110,0.2)" }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M12 7l1.5 3 3.5.5-2.5 2.5.5 3.5L12 15l-3 1.5.5-3.5L7 10.5l3.5-.5z" />
                  </svg>
                  TripAdvisor
                </a>
              </div>
            </div>
            <div className="reveal-right rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(201,169,110,0.1)", height: "420px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3129.123!2d-0.5521!3d38.3672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6236e4f6b4c8f9%3A0x8e0f9c0b0b0b0b0b!2sCalle%20Violeta%2C%204%2C%2003320%20Torrellano%2C%20Alicante!5e0!3m2!1ses!2ses!4v1690000000000!5m2!1ses!2ses"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de El Cortijillo de Juan Diego"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className="relative overflow-hidden" style={{ padding: "100px 0" }}>
        <Image src="/images/grilled-meat.jpg" alt="Cocina del Cortijillo" fill className="object-cover" quality={75} sizes="100vw" />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(13,13,13,0.82)" }} />
        <div className="relative z-10 text-center px-6 reveal">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5" style={playfair}>
            ¿Listo para una{" "}
            <span className="italic text-gradient-gold" style={lora}>experiencia</span>{" "}
            inolvidable?
          </h2>
          <p className="text-white/55 mb-10 max-w-lg mx-auto text-base" style={inter}>
            Reserva tu mesa y déjate conquistar por los sabores del Mediterráneo.
          </p>
          <a href="tel:+34965682817" className="inline-block px-10 py-4 bg-gold text-dark font-bold rounded-full hover:bg-gold-light transition-all text-sm tracking-wider uppercase" style={inter}>
            Llamar para Reservar: 965 68 28 17
          </a>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ backgroundColor: "var(--color-charcoal)", borderTop: "1px solid rgba(201,169,110,0.1)", padding: "60px 0" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gradient-gold mb-1" style={playfair}>El Cortijillo</h3>
              <p className="text-white/30 text-sm italic" style={lora}>de Juan Diego</p>
            </div>
            <div className="flex items-center gap-6 flex-wrap justify-center">
              {NAV_LINKS.slice(1).map((l) => (
                <a key={l.href} href={l.href} className="text-white/40 hover:text-gold text-xs transition-colors uppercase tracking-wide" style={inter}>{l.label}</a>
              ))}
            </div>
            <div className="flex gap-5">
              <a href="https://www.instagram.com/cortijillodejuandiego/" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-gold transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="tel:+34965682817" className="text-white/30 hover:text-gold transition-colors" aria-label="Teléfono">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="section-divider mt-10 mb-8" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-xs" style={inter}>
              &copy; {new Date().getFullYear()} El Cortijillo de Juan Diego. Todos los derechos reservados.
            </p>
            <p className="text-white/20 text-xs" style={inter}>
              Calle Violeta 4, 03320 Torrellano, Alicante
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
