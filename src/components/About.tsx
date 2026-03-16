import { X, Check, ArrowRight } from "lucide-react";

const highlights = [
  { icon: "🏪", value: "5,000+",  label: "Retail Partners",       desc: "Active outlets, supermarkets, and resellers connected across all provinces." },
  { icon: "🚚", value: "24–48h",  label: "Delivery Window",        desc: "Fast delivery across all serviced districts through coordinated RDC operations." },
  { icon: "📦", value: "4 Lines", label: "Product Categories",     desc: "Packaged foods, beverages, home cleaning, and personal care items." },
  { icon: "🏭", value: "5 RDCs",  label: "Distribution Centres",   desc: "North, South, East, West and Central provinces with Head Office oversight." },
];

const challenges = [
  "Manual phone-based order collection",
  "Spreadsheet stock management",
  "Delayed delivery updates",
  "Manual invoice preparation",
  "End-of-month reporting bottlenecks",
];

const solutions = [
  "Retailer self-service ordering portal",
  "Real-time inventory visibility",
  "Live delivery tracking dashboard",
  "Automated digital invoicing",
  "Instant business intelligence reports",
];

const About = () => {
  return (
    <section id="about" className="bg-site-bg text-white scroll-mt-20">

      {/* Header banner */}
      <div className="relative overflow-hidden py-28 px-6 border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-subtle blur-3xl rounded-full" />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage:`linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)`, backgroundSize:"50px 50px" }} />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 border border-brand-border bg-brand-subtle px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-brand" />
            <span className="text-xs font-medium text-white/70 tracking-wide uppercase">About IslandLink ISDN</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Building a Smarter Future for{" "}
            <span className="text-brand">Island-Wide FMCG</span>
          </h2>
          <p className="text-white/45 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            IslandLink Sales Distribution Network is designed to modernize wholesale and retail distribution by replacing legacy manual processes with a centralized digital platform.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-20">

        {/* Who We Are / Network */}
        <div className="grid lg:grid-cols-2 gap-5 mb-16">
          {[
            { title: "Who We Are",  body: "ISDN is one of the island's leading wholesale and retail distribution companies, supplying more than 5,000 active retail outlets, supermarkets, and small resellers with a wide range of fast-moving consumer goods including packaged foods, beverages, home cleaning products, and personal care items." },
            { title: "Our Network", body: "The company operates through five Regional Distribution Centres located in the North, South, East, West, and Central provinces. Head Office is based in the Central region and oversees corporate planning, procurement, operational coordination, and strategic decision-making across the entire distribution network." },
          ].map((card) => (
            <div key={card.title} className="group bg-dark-card rounded-3xl border border-dark-border hover:border-brand-border hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-glow/10 transition-all duration-300 p-8">
              <div className="w-10 h-10 rounded-2xl bg-brand-subtle flex items-center justify-center mb-5">
                <div className="w-3 h-3 rounded-full bg-brand" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{card.title}</h3>
              <p className="text-white/50 leading-8 text-sm md:text-base">{card.body}</p>
            </div>
          ))}
        </div>

        {/* By the Numbers */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-brand mb-2">By the Numbers</p>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white">Distribution at Scale</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {highlights.map((h, i) => (
              <div key={i} className="group bg-dark-card rounded-3xl border border-dark-border hover:border-brand-border hover:-translate-y-1.5 hover:shadow-lg hover:shadow-brand-glow/10 transition-all duration-300 p-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-subtle flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300">{h.icon}</div>
                <div className="text-2xl font-extrabold text-white mb-0.5">{h.value}</div>
                <div className="text-xs font-bold uppercase tracking-wider text-brand mb-3">{h.label}</div>
                <p className="text-white/45 text-sm leading-6">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Problem vs Solution */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-brand mb-2">Why We Exist</p>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white">Problem. Solution. Impact.</h3>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Challenges */}
            <div className="bg-dark-card rounded-3xl border border-dark-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-red-900/30 border border-red-800/40 flex items-center justify-center">
                  <X size={18} className="text-red-400" />
                </div>
                <h4 className="text-xl font-bold text-white">Operational Challenges</h4>
              </div>
              <p className="text-white/45 text-sm leading-7 mb-6">Existing operations rely heavily on manual work, creating frequent errors, delays, and limited visibility.</p>
              <ul className="space-y-3">
                {challenges.map((c, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/60">
                    <div className="w-5 h-5 rounded-full bg-red-900/40 flex items-center justify-center shrink-0">
                      <X size={10} className="text-red-400" />
                    </div>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div className="bg-brand-subtle rounded-3xl border border-brand-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-brand-subtle border border-brand-border flex items-center justify-center">
                  <Check size={18} className="text-brand" />
                </div>
                <h4 className="text-xl font-bold text-white">ISDN Digital Solution</h4>
              </div>
              <p className="text-white/60 text-sm leading-7 mb-6">The ISDN platform replaces every manual bottleneck with smart digital workflows in real-time.</p>
              <ul className="space-y-3">
                {solutions.map((s, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                    <div className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center shrink-0">
                      <Check size={10} className="text-brand" />
                    </div>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-5 mb-20">
          {[
            { title: "Our Vision", icon: "🔭", content: "To become the most efficient and digitally connected FMCG distribution network on the island by delivering faster service, higher operational accuracy, and better retailer experience." },
            { title: "Our Mission", icon: "🎯", content: "To connect retailers, regional distribution centres, and Head Office through a unified digital platform that supports seamless ordering, stock visibility, delivery management, and data-driven decision-making." },
          ].map((item) => (
            <div key={item.title} className="group bg-dark-card rounded-3xl border border-dark-border hover:border-brand-border hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-glow/10 transition-all duration-300 p-8">
              <div className="text-3xl mb-5 group-hover:scale-110 transition-transform duration-300 inline-block">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-white/50 leading-8 text-sm md:text-base">{item.content}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="relative overflow-hidden bg-dark-card rounded-[32px] border border-dark-border p-10 md:p-16 text-center">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-subtle blur-3xl rounded-full" />
          </div>
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-widest text-brand mb-4">Ready to modernize?</p>
            <h3 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-5">
              Modern Distribution Starts<br className="hidden md:block" /> with Better Connectivity
            </h3>
            <p className="text-white/45 text-sm md:text-base max-w-2xl mx-auto leading-8 mb-10">
              ISDN brings order processing, inventory updates, delivery workflows, payments, and reporting into one efficient digital platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button id="about-explore-btn" className="group flex items-center gap-2 bg-brand hover:bg-brand-dark text-brand-on px-7 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-brand-glow hover:shadow-brand hover:-translate-y-0.5 transition-all duration-300">
                Explore Features
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button id="about-contact-btn" className="border border-white/10 hover:border-white/25 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300">
                Contact ISDN
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
