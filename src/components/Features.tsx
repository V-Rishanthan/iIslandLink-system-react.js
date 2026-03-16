const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    title: "Retailer Self-Service Portal",
    desc: "Retailers can browse the full product catalogue, place orders, track deliveries, and view invoice history — all without making a phone call.",
    tag: "Ordering",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Real-Time Inventory Visibility",
    desc: "RDC staff and Head Office can monitor live stock levels at every distribution centre, reducing overstock and preventing shortfalls.",
    tag: "Inventory",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    title: "Live Delivery Tracking",
    desc: "Track every shipment in real-time from RDC dispatch to retailer doorstep. Automated status updates keep all parties informed.",
    tag: "Delivery",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Automated Digital Invoicing",
    desc: "Digital invoices are generated and shared instantly upon order confirmation — eliminating manual preparation and reducing billing disputes.",
    tag: "Invoicing",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
    title: "Business Intelligence Reports",
    desc: "Head Office gets instant access to sales trends, regional performance, top SKUs, and demand forecasts through an intuitive dashboard.",
    tag: "Reporting",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "Role-Based Access Control",
    desc: "Separate, purpose-built portals for Retailers, RDC Staff, and Head Office ensure every user sees exactly what they need.",
    tag: "Security",
  },
];

const Features = () => {
  return (
    <section id="features" className="bg-site-bg py-28 scroll-mt-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start mb-16">
          <div className="lg:w-1/2">
            <p className="text-xs font-bold uppercase tracking-widest text-brand mb-3">Platform Features</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Everything your distribution network needs
            </h2>
          </div>
          <div className="lg:w-1/2 flex flex-col justify-center">
            <p className="text-white/45 text-sm md:text-base leading-relaxed mb-6">
              ISDN was built to handle every touchpoint in the FMCG supply chain —
              from the moment a retailer places an order to the moment it's delivered,
              paid, and reported on.
            </p>
            <button
              id="features-demo-btn"
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-brand-on px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-md shadow-brand-glow hover:shadow-brand hover:-translate-y-0.5 self-start"
            >
              Request a Demo
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, i) => (
            <div
              key={i}
              className="group bg-dark-card rounded-3xl border border-dark-border hover:border-brand-border hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-glow/10 transition-all duration-300 p-7"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-brand-subtle border border-brand-border flex items-center justify-center text-brand group-hover:scale-105 transition-all duration-300">
                  {feat.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider border border-white/10 text-white/30 px-2.5 py-1 rounded-full">
                  {feat.tag}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-3">{feat.title}</h3>
              <p className="text-white/45 text-sm leading-7">{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* Role strip */}
        <div className="mt-16 bg-dark-card rounded-3xl border border-dark-border p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h4 className="text-xl font-extrabold text-white mb-2">Designed for every user role</h4>
            <p className="text-white/45 text-sm leading-7 max-w-lg">
              Whether you're a retailer placing an order, an RDC manager tracking shipments, or a Head Office analyst reviewing performance — ISDN has a tailored experience for you.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            {["🏪 Retailer", "🏭 RDC Staff", "🏢 Head Office"].map((role) => (
              <div key={role} className="border border-white/10 bg-white/5 rounded-2xl px-5 py-3 text-sm font-semibold text-white/60 whitespace-nowrap">
                {role}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;
