import { Star } from "lucide-react";

const testimonials = [
  { text: "ISDN helped us move faster without sacrificing accuracy. The platform feels production-ready.", name: "Cristofer Levin", role: "RDC Manager", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" },
  { text: "The attention to detail in ISDN is impressive. Saved me hours of repetitive work and time. Highly recommended.", name: "Rohan Mehta", role: "Retail Outlets Owner", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" },
  { text: "We were able ship faster using ISDN. The visibility across operations made distribution feel polished.", name: "Jason Kim", role: "Head of Logistics", image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60" },
  { text: "ISDN feels like it was built by people who actually understand FMCG. Dashboards are clean and easy to use.", name: "Alex Turner", role: "Operations Analyst", image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60" },
  { text: "ISDN helped us maintain supply consistency across multiple regions. It's now a core part of our business.", name: "Sofia Martinez", role: "Supply Chain Director", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop" },
  { text: "Our team productivity improved noticeably after adopting ISDN. It reduced ordering handoff friction.", name: "Daniel Wong", role: "Regional Supervisor", image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png" }
];

const rows = [
  { start: 0, end: 3, className: "animate-scroll" },
  { start: 3, end: 6, className: "animate-scroll-reverse" }
];

const renderCard = (testimonial: typeof testimonials[0], index: number) => (
  <div key={index} className="bg-dark-card border border-dark-border hover:border-brand-border rounded-xl p-6 shrink-0 w-[350px] transition-colors duration-300">
    <div className="flex mb-4 gap-1">
      {Array(5).fill(0).map((_, i) => (
        <Star key={i} size={16} className="text-brand fill-brand" />
      ))}
    </div>
    <p className="text-white/60 text-sm mb-6 leading-relaxed">{testimonial.text}</p>
    <div className="flex items-center gap-3">
      <img src={testimonial.image} alt={testimonial.name} className="w-11 h-11 rounded-full object-cover"/>
      <div>
        <p className="font-medium text-white text-sm">{testimonial.name}</p>
        <p className="text-white/40 text-xs">{testimonial.role}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <>
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scrollReverse {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-scroll {
            animation: scroll 25s linear infinite;
          }
          .animate-scroll-reverse {
            animation: scrollReverse 25s linear infinite;
          }
          /* Pause animation on hover for better readability */
          .group-hover\\:pause-scroll:hover .animate-scroll,
          .group-hover\\:pause-scroll:hover .animate-scroll-reverse {
            animation-play-state: paused;
          }
        `}
      </style>

      <section className="bg-site-bg py-24 px-4 overflow-hidden border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 border border-brand-border bg-brand-subtle px-4 py-1.5 rounded-full mb-6">
              <span className="text-xs font-bold text-brand uppercase tracking-widest">Loved by Partners</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
              What our network is saying
            </h2>
            <p className="text-white/45 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
              Real feedback from retailers, RDC managers, and Head Office executives building a smarter distribution future.
            </p>
          </div>

          <div className="space-y-6 relative group group-hover:pause-scroll">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="relative flex overflow-hidden w-full max-w-[150vw] md:max-w-none pt-2 pb-2">
                
                {/* Gradient Masks for smooth fading edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-site-bg to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-site-bg to-transparent z-10 pointer-events-none" />

                <div className={`flex gap-6 w-max ${row.className}`}>
                  {/* We duplicate the array to create a seamless infinite scroll loop */}
                  {[...testimonials.slice(row.start, row.end), ...testimonials.slice(row.start, row.end), ...testimonials.slice(row.start, row.end)].map((testimonial, index) =>
                    renderCard(testimonial, index)
                  )}
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </section>
    </>
  );
};

export default Testimonials;
