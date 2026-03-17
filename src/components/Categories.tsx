import { ChevronRight, Package, CupSoda, SprayCan, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import packagedFoodsImg from "../assets/categories/packaged_foods.png";
import beveragesImg from "../assets/categories/beverages.png";
import homeCleaningImg from "../assets/categories/home_cleaning.png";
import personalCareImg from "../assets/categories/personal_care.png";

const categories = [
  {
    icon: Package,
    name: "Packaged Foods",
    desc: "Cereals, canned goods, condiments, snacks, and dry staples distributed to retail shelves island-wide.",
    count: "1,200+ SKUs",
    image: packagedFoodsImg,
    accent: "from-orange-500/15 to-orange-500/5",
    border: "border-orange-500/20",
    glow: "hover:shadow-orange-500/10",
    overlay: "from-[#080b10] via-[#080b10]/90 to-transparent",
    link: "/packaged-food",
  },
  {
    icon: CupSoda,
    name: "Beverages",
    desc: "Soft drinks, juices, water, energy drinks, and hot beverages for retailers of all sizes.",
    count: "800+ SKUs",
    image: beveragesImg,
    accent: "from-blue-500/15 to-blue-500/5",
    border: "border-blue-500/20",
    glow: "hover:shadow-blue-500/10",
    overlay: "from-[#080b10] via-[#080b10]/90 to-transparent",
    link: "/beverages",
  },
  {
    icon: SprayCan,
    name: "Home Cleaning",
    desc: "Detergents, disinfectants, surface cleaners, and household hygiene essentials.",
    count: "600+ SKUs",
    image: homeCleaningImg,
    accent: "from-violet-500/15 to-violet-500/5",
    border: "border-violet-500/20",
    glow: "hover:shadow-violet-500/10",
    overlay: "from-[#080b10] via-[#080b10]/90 to-transparent",
    link: "/cleaning",
  },
  {
    icon: Sparkles,
    name: "Personal Care",
    desc: "Soaps, shampoos, skincare, oral care, and hygiene products for everyday consumers.",
    count: "700+ SKUs",
    image: personalCareImg,
    accent: "from-pink-500/15 to-pink-500/5",
    border: "border-pink-500/20",
    glow: "hover:shadow-pink-500/10",
    overlay: "from-[#080b10] via-[#080b10]/90 to-transparent",
    link: "/personal-care",
  },
];

const Categories = () => {
  return (
    <section
      id="categories"
      className="bg-site-bg py-28 scroll-mt-20 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-brand mb-3">
            Product Catalogue
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
            Four Core Product Categories
          </h2>
          <p className="text-white/45 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            ISDN distributes over 3,300 SKUs across four major FMCG product lines,
            ensuring comprehensive coverage for every retail outlet we serve.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <Link
              to={cat.link}
              key={i}
              className={`group relative border ${cat.border} rounded-3xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl ${cat.glow} transition-all duration-400 block`}
            >
              {/* Background image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div
                className={`absolute bottom-0 left-0 right-0 h-[80%] pointer-events-none bg-linear-to-t ${cat.overlay}`}
              />

              {/* Content */}
              <div className="relative z-10 p-6 flex flex-col h-full min-h-[380px]">
                {/* Watermark number */}
                <div className="absolute top-4 right-4 text-6xl font-black text-white/30 drop-shadow-md select-none pointer-events-none leading-none">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-auto bg-black/50 backdrop-blur-md border border-white/20 group-hover:scale-105 group-hover:bg-black/60 transition-all duration-300">
                  <cat.icon size={22} className="text-white" />
                </div>

                <div className="mt-auto">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1">
                    {cat.count}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {cat.name}
                  </h3>

                  <p className="text-white/60 text-sm leading-6 mb-5">
                    {cat.desc}
                  </p>

                  <div className="flex items-center gap-1 text-xs font-semibold text-white/50 group-hover:text-white group-hover:gap-2 transition-all duration-300">
                    View catalogue
                    <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats strip */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 bg-dark-card rounded-3xl border border-dark-border p-8">
          <div>
            <div className="text-3xl font-extrabold text-white mb-1">
              3,300+ <span className="text-brand">SKUs</span>
            </div>
            <p className="text-white/40 text-sm">
              Total products available across all four categories
            </p>
          </div>

          <div className="h-12 w-px bg-white/8 hidden md:block" />

          <div>
            <div className="text-3xl font-extrabold text-white mb-1">
              5,000+ <span className="text-brand">Outlets</span>
            </div>
            <p className="text-white/40 text-sm">
              Active retail partners receiving regular deliveries
            </p>
          </div>

          <div className="h-12 w-px bg-white/8 hidden md:block" />

          <div>
            <div className="text-3xl font-extrabold text-white mb-1">
              5 <span className="text-brand">Regions</span>
            </div>
            <p className="text-white/40 text-sm">
              Distribution centres covering the entire island
            </p>
          </div>

          <button
            id="categories-contact-btn"
            className="ml-auto md:ml-0 bg-brand hover:bg-brand-dark text-brand-on px-6 py-3 rounded-xl font-bold text-sm shadow-md shadow-brand-glow hover:shadow-brand hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
          >
            Become a Partner →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;