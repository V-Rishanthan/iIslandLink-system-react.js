import {
  Boxes,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const links = {
    Platform: ["Retailer Portal", "RDC Dashboard", "Head Office Suite", "Mobile App"],
    Company: ["About ISDN", "Our Network", "Careers", "Press"],
    Support: ["Documentation", "Contact Us", "System Status", "Help Centre"],
  };

  return (
    <footer id="contact" className="bg-site-bg text-white border-t border-white/8">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-brand to-brand-dark flex items-center justify-center shadow-lg shadow-brand-glow">
                <Boxes size={18} className="text-white" />
              </div>

              <div>
                <div className="text-white font-bold text-[15px]">ISDN</div>
                <div className="text-[10px] text-white/35 uppercase tracking-wider">
                  IslandLink Network
                </div>
              </div>
            </div>

            <p className="text-white/45 text-sm leading-7 max-w-xs mb-8">
              Modernizing island-wide FMCG distribution through a centralized,
              real-time digital platform connecting retailers, RDCs, and Head Office.
            </p>

            <div className="flex gap-3">
              {[
                { label: "X", icon: <Twitter size={16} className="text-white" /> },
                { label: "LinkedIn", icon: <Linkedin size={16} className="text-white" /> },
              ].map((s) => (
                <button
                  key={s.label}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-brand-subtle border border-white/8 hover:border-brand-border flex items-center justify-center text-white/40 hover:text-brand transition-all duration-300"
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/25 mb-5">
                {section}
              </h4>
              <ul className="space-y-3.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="border-t border-white/8 pt-12 mb-10">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: Mail,
                label: "Email Us",
                value: "info@isdn.lk",
                sub: "Mon – Fri, 9am – 6pm",
              },
              {
                icon: Phone,
                label: "Call Us",
                value: "+94 11 234 5678",
                sub: "Head Office, Colombo",
              },
              {
                icon: MapPin,
                label: "Head Office",
                value: "Central Province, Sri Lanka",
                sub: "5 RDC locations island-wide",
              },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <c.icon size={18} className="text-white" />
                </div>

                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-white/25 mb-0.5">
                    {c.label}
                  </div>
                  <div className="text-sm font-semibold text-white/80">{c.value}</div>
                  <div className="text-xs text-white/30 mt-0.5">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} IslandLink Sales Distribution Network. All rights reserved.
          </p>

          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-white/25 hover:text-white/60 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


