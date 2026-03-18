import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Package,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

type DeliveryStatus = "pending" | "on-the-way" | "delivered";

interface Delivery {
  id: string;
  customer: string;
  phone: string;
  address: string;
  items: number;
  status: DeliveryStatus;
  time: string;
}

// ── Mock Data ─────────────────────────────────────────────────────────────────

const DELIVERIES: Delivery[] = [
  {
    id: "ORD-20240312-001",
    customer: "Ravi Krishnamurthy",
    phone: "+94 77 345 6789",
    address: "45, Main Street, Colombo 03",
    items: 3,
    status: "on-the-way",
    time: "10:30 AM",
  },
  {
    id: "ORD-20240305-002",
    customer: "Shalini Fernando",
    phone: "+94 76 123 4567",
    address: "12, Lake Road, Kandy",
    items: 2,
    status: "pending",
    time: "12:00 PM",
  },
  {
    id: "ORD-20240228-003",
    customer: "Nimal Perera",
    phone: "+94 71 987 6543",
    address: "78, Galle Road, Matara",
    items: 4,
    status: "delivered",
    time: "09:15 AM",
  },
  {
    id: "ORD-20240215-004",
    customer: "Asha Weerasinghe",
    phone: "+94 70 555 4321",
    address: "23, Temple Lane, Gampaha",
    items: 1,
    status: "delivered",
    time: "08:45 AM",
  },
  {
    id: "ORD-20240201-005",
    customer: "Chamara Jayawardena",
    phone: "+94 77 111 2222",
    address: "5, Peradeniya Road, Kandy",
    items: 5,
    status: "pending",
    time: "02:00 PM",
  },
];

// ── Status Config ─────────────────────────────────────────────────────────────

const STATUS: Record<
  DeliveryStatus,
  { label: string; icon: React.ElementType; color: string; bg: string; border: string; dot: string }
> = {
  "on-the-way": {
    label: "On the Way",
    icon: Truck,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/25",
    dot: "bg-blue-400",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/25",
    dot: "bg-amber-400",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/25",
    dot: "bg-emerald-400",
  },
};

// ── Main Component ─────────────────────────────────────────────────────────────

const DeliveryBoy = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>(DELIVERIES);

  function markDelivered(id: string) {
    setDeliveries((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "delivered" } : d))
    );
  }

  const pending = deliveries.filter((d) => d.status === "pending").length;
  const onWay = deliveries.filter((d) => d.status === "on-the-way").length;
  const delivered = deliveries.filter((d) => d.status === "delivered").length;

  return (
    <div className="min-h-screen bg-[#08080C] font-sans">
      {/* ── Header ── */}
      <div className="relative px-5 md:px-12 pt-8 pb-8">
        {/* Glow blob */}
        <div className="absolute top-0 right-1/3 w-72 h-72 bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/45 hover:text-white transition-colors text-sm group mb-8"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-1">
            Delivery Dashboard
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            My Deliveries
          </h1>
          <p className="text-white/35 text-sm mt-2">
            Manage your assigned delivery orders for today.
          </p>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="px-5 md:px-12 mb-7">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Pending", value: pending, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
            { label: "On the Way", value: onWay, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
            { label: "Delivered", value: delivered, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
          ].map((s) => (
            <div
              key={s.label}
              className={`rounded-2xl border ${s.border} ${s.bg} px-4 py-4 text-center`}
            >
              <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
              <p className="text-white/40 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Delivery Cards ── */}
      <div className="px-5 md:px-12 pb-20 space-y-3">
        {deliveries.map((d) => {
          const cfg = STATUS[d.status];
          const Icon = cfg.icon;

          return (
            <div
              key={d.id}
              className="rounded-2xl border border-white/8 bg-[#0E1015] px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-violet-500/20 transition-all duration-300"
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${cfg.bg} border ${cfg.border}`}
              >
                <Icon size={17} className={cfg.color} />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-white font-semibold text-sm">{d.customer}</p>
                  <span className="text-white/25 text-xs font-mono">{d.id}</span>
                </div>

                <div className="flex items-center gap-1.5 text-white/45 text-xs">
                  <MapPin size={11} />
                  <span className="truncate">{d.address}</span>
                </div>

                <div className="flex items-center gap-4 text-white/40 text-xs">
                  <span className="flex items-center gap-1">
                    <Phone size={10} />
                    {d.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Package size={10} />
                    {d.items} item{d.items !== 1 ? "s" : ""}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    {d.time}
                  </span>
                </div>
              </div>

              {/* Right: badge + action */}
              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cfg.color} ${cfg.bg} ${cfg.border}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse`} />
                  {cfg.label}
                </span>

                {d.status !== "delivered" && (
                  <button
                    id={`mark-delivered-${d.id}`}
                    onClick={() => markDelivered(d.id)}
                    className="px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-sm shadow-violet-500/30"
                  >
                    Mark Delivered
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryBoy;
