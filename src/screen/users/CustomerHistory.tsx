import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  ShoppingBag,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Receipt,
  Star,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

type OrderStatus = "delivered" | "processing" | "shipped" | "cancelled";

interface OrderProduct {
  id: number;
  name: string;
  sku: string;
  qty: number;
  price: string;
  priceValue: number;
  category: string;
}

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  products: OrderProduct[];
  notes?: string;
  total: number;
}

// ── Mock Data ─────────────────────────────────────────────────────────────────

const ORDERS: Order[] = [
  {
    id: "ORD-20240312-001",
    date: "2024-03-12",
    status: "delivered",
    customer: {
      name: "Ravi Krishnamurthy",
      phone: "+94 77 345 6789",
      email: "ravi.k@example.com",
      address: "45, Main Street, Colombo 03",
    },
    products: [
      {
        id: 1,
        name: "Ajax Multi-Purpose Cleaner",
        sku: "CL-AJX-001",
        qty: 3,
        price: "LKR 720",
        priceValue: 720,
        category: "Surface Cleaners",
      },
      {
        id: 2,
        name: "Harpic Toilet Cleaner – Power Plus",
        sku: "CL-HRP-002",
        qty: 2,
        price: "LKR 480",
        priceValue: 480,
        category: "Bathroom Cleaning",
      },
      {
        id: 3,
        name: "Microfiber Cleaning Cloth (5 Pack)",
        sku: "CL-CLT-014",
        qty: 1,
        price: "LKR 750",
        priceValue: 750,
        category: "Surface Cleaners",
      },
    ],
    notes: "Please deliver before 6 PM.",
    total: 4470,
  },
  {
    id: "ORD-20240305-002",
    date: "2024-03-05",
    status: "shipped",
    customer: {
      name: "Shalini Fernando",
      phone: "+94 76 123 4567",
      email: "shalini.f@example.com",
      address: "12, Lake Road, Kandy",
    },
    products: [
      {
        id: 4,
        name: "Esperanza Rotary Mop – Spin Dry",
        sku: "CL-MOP-003",
        qty: 1,
        price: "LKR 3,500",
        priceValue: 3500,
        category: "Mops & Brooms",
      },
      {
        id: 5,
        name: "Garden Hose – 30m Flexible",
        sku: "CL-GTL-008",
        qty: 1,
        price: "LKR 4,200",
        priceValue: 4200,
        category: "Garden Tools",
      },
    ],
    notes: "Fragile items – handle with care.",
    total: 7700,
  },
  {
    id: "ORD-20240228-003",
    date: "2024-02-28",
    status: "processing",
    customer: {
      name: "Nimal Perera",
      phone: "+94 71 987 6543",
      email: "nimal.p@example.com",
      address: "78, Galle Road, Matara",
    },
    products: [
      {
        id: 6,
        name: "Long Handled Dust Brush Set",
        sku: "CL-BRS-005",
        qty: 2,
        price: "LKR 1,200",
        priceValue: 1200,
        category: "Mops & Brooms",
      },
      {
        id: 7,
        name: "All-Purpose Cleaning Spray",
        sku: "CL-SPR-011",
        qty: 4,
        price: "LKR 550",
        priceValue: 550,
        category: "Surface Cleaners",
      },
    ],
    total: 4600,
  },
  {
    id: "ORD-20240215-004",
    date: "2024-02-15",
    status: "cancelled",
    customer: {
      name: "Asha Weerasinghe",
      phone: "+94 70 555 4321",
      email: "asha.w@example.com",
      address: "23, Temple Lane, Gampaha",
    },
    products: [
      {
        id: 8,
        name: "Garden Axe – Heavy Duty",
        sku: "CL-GTL-007",
        qty: 1,
        price: "LKR 2,800",
        priceValue: 2800,
        category: "Garden Tools",
      },
    ],
    notes: "Customer requested cancellation.",
    total: 2800,
  },
  {
    id: "ORD-20240201-005",
    date: "2024-02-01",
    status: "delivered",
    customer: {
      name: "Chamara Jayawardena",
      phone: "+94 77 111 2222",
      email: "chamara.j@example.com",
      address: "5, Peradeniya Road, Kandy",
    },
    products: [
      {
        id: 9,
        name: "Cotton Floor Mop – Classic",
        sku: "CL-MOP-004",
        qty: 2,
        price: "LKR 850",
        priceValue: 850,
        category: "Mops & Brooms",
      },
      {
        id: 10,
        name: "Disinfectant Floor Cleaner 2L",
        sku: "CL-FLC-012",
        qty: 3,
        price: "LKR 890",
        priceValue: 890,
        category: "Surface Cleaners",
      },
      {
        id: 11,
        name: "Sponge & Scourer Combo Pack",
        sku: "CL-SCR-013",
        qty: 5,
        price: "LKR 320",
        priceValue: 320,
        category: "Scrub Brushes",
      },
      {
        id: 12,
        name: "Outdoor Stiff Sweeping Brush (Set of 2)",
        sku: "CL-BRM-006",
        qty: 1,
        price: "LKR 1,950",
        priceValue: 1950,
        category: "Mops & Brooms",
      },
    ],
    total: 9220,
  },
];

// ── Status Helpers ─────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  OrderStatus,
  {
    label: string;
    icon: React.ElementType;
    color: string;
    bg: string;
    border: string;
    dot: string;
  }
> = {
  delivered: {
    label: "Delivered",
    icon: CheckCircle,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/25",
    dot: "bg-emerald-400",
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/25",
    dot: "bg-blue-400",
  },
  processing: {
    label: "Processing",
    icon: Clock,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/25",
    dot: "bg-amber-400",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/25",
    dot: "bg-red-400",
  },
};

// ── Sub-components ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cfg.color} ${cfg.bg} ${cfg.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse`} />
      <Icon size={11} />
      {cfg.label}
    </span>
  );
}

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);

  const formattedDate = new Date(order.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const totalItems = order.products.reduce((s, p) => s + p.qty, 0);

  return (
    <div
      className={`rounded-2xl border border-white/8 bg-[#0E1015] overflow-hidden transition-all duration-300 hover:border-violet-500/20 hover:shadow-xl hover:shadow-violet-500/5`}
    >
      {/* ── Card Header ── */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 py-4 cursor-pointer select-none"
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Left: order ID + date */}
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center shrink-0 mt-0.5">
            <Receipt size={16} className="text-violet-400" />
          </div>
          <div>
            <p className="text-white font-bold text-sm font-mono tracking-wide">
              {order.id}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <Calendar size={11} className="text-white/35" />
              <p className="text-white/40 text-xs">{formattedDate}</p>
            </div>
          </div>
        </div>

        {/* Center: customer name + item count */}
        <div className="hidden md:block text-center">
          <p className="text-white/80 text-sm font-medium">
            {order.customer.name}
          </p>
          <p className="text-white/35 text-xs mt-0.5">
            {totalItems} item{totalItems !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Right: total + status + toggle */}
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="text-right">
            <p className="text-violet-400 font-bold text-sm">
              LKR {order.total.toLocaleString()}
            </p>
            <p className="text-white/35 text-[10px] mt-0.5">Total Value</p>
          </div>
          <StatusBadge status={order.status} />
          <button className="text-white/30 hover:text-white/70 transition-colors ml-1">
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {/* ── Expanded Detail ── */}
      {expanded && (
        <div className="border-t border-white/6 px-5 py-5 space-y-5 animate-in fade-in slide-in-from-top-1 duration-200">
          {/* Products table */}
          <div>
            <p className="text-white/45 text-[10px] font-bold uppercase tracking-widest mb-3">
              Order Items
            </p>
            <div className="rounded-xl overflow-hidden border border-white/6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/3 border-b border-white/6">
                    <th className="text-left text-white/35 text-[10px] font-semibold uppercase tracking-wider px-4 py-2.5">
                      Product
                    </th>
                    <th className="text-left text-white/35 text-[10px] font-semibold uppercase tracking-wider px-4 py-2.5 hidden sm:table-cell">
                      SKU
                    </th>
                    <th className="text-left text-white/35 text-[10px] font-semibold uppercase tracking-wider px-4 py-2.5 hidden md:table-cell">
                      Category
                    </th>
                    <th className="text-center text-white/35 text-[10px] font-semibold uppercase tracking-wider px-4 py-2.5">
                      Qty
                    </th>
                    <th className="text-right text-white/35 text-[10px] font-semibold uppercase tracking-wider px-4 py-2.5">
                      Unit Price
                    </th>
                    <th className="text-right text-white/35 text-[10px] font-semibold uppercase tracking-wider px-4 py-2.5">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((product, idx) => (
                    <tr
                      key={product.id}
                      className={`border-b border-white/4 last:border-0 transition-colors hover:bg-white/2 ${
                        idx % 2 === 0 ? "" : "bg-white/1"
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center shrink-0">
                            <Package size={12} className="text-violet-400" />
                          </div>
                          <span className="text-white text-xs font-medium leading-snug">
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="text-white/35 text-[11px] font-mono">
                          {product.sku}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-white/45 text-xs">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/6 text-white text-xs font-bold">
                          {product.qty}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-white/65 text-xs font-medium">
                          {product.price}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-violet-400 text-xs font-bold">
                          LKR{" "}
                          {(product.priceValue * product.qty).toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-violet-500/5 border-t border-violet-500/15">
                    <td
                      colSpan={5}
                      className="px-4 py-3 text-right text-white/60 text-xs font-semibold"
                    >
                      Order Total
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-violet-300 font-extrabold text-sm">
                        LKR {order.total.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Customer info + Notes row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Customer Details */}
            <div className="rounded-xl bg-white/3 border border-white/7 p-4 space-y-3">
              <p className="text-white/45 text-[10px] font-bold uppercase tracking-widest">
                Customer Details
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-white/6 flex items-center justify-center shrink-0">
                    <Star size={11} className="text-white/40" />
                  </div>
                  <span className="text-white text-sm font-semibold">
                    {order.customer.name}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-white/6 flex items-center justify-center shrink-0">
                    <Phone size={11} className="text-white/40" />
                  </div>
                  <span className="text-white/65 text-xs">
                    {order.customer.phone}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-white/6 flex items-center justify-center shrink-0">
                    <Mail size={11} className="text-white/40" />
                  </div>
                  <span className="text-white/65 text-xs">
                    {order.customer.email}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-white/6 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={11} className="text-white/40" />
                  </div>
                  <span className="text-white/65 text-xs leading-relaxed">
                    {order.customer.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Notes / Status */}
            <div className="rounded-xl bg-white/3 border border-white/7 p-4 space-y-3">
              <p className="text-white/45 text-[10px] font-bold uppercase tracking-widest">
                Order Notes & Status
              </p>
              <div className="flex items-center gap-2">
                <p className="text-white/40 text-xs">Current Status:</p>
                <StatusBadge status={order.status} />
              </div>

              {/* Progress Steps */}
              <div className="flex items-center gap-1 mt-2">
                {(["processing", "shipped", "delivered"] as OrderStatus[]).map(
                  (step, i) => {
                    const stepOrder = ["processing", "shipped", "delivered"];
                    const currentIndex = stepOrder.indexOf(order.status);
                    const stepIndex = stepOrder.indexOf(step);
                    const isActive = stepIndex <= currentIndex;
                    const isCancelled = order.status === "cancelled";
                    return (
                      <div key={step} className="flex items-center flex-1">
                        <div
                          className={`flex-1 h-1 rounded-full transition-all ${
                            isCancelled
                              ? "bg-red-500/30"
                              : isActive
                              ? "bg-violet-500"
                              : "bg-white/10"
                          } ${i === 0 ? "hidden" : ""}`}
                        />
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[9px] font-bold transition-all ${
                            isCancelled
                              ? "border-red-500/40 bg-red-500/10 text-red-400"
                              : isActive
                              ? "border-violet-500 bg-violet-500 text-white"
                              : "border-white/15 bg-white/5 text-white/25"
                          }`}
                        >
                          {i + 1}
                        </div>
                        <div
                          className={`flex-1 h-1 rounded-full transition-all ${
                            isCancelled
                              ? "bg-red-500/30"
                              : isActive && stepIndex < currentIndex
                              ? "bg-violet-500"
                              : "bg-white/10"
                          } ${i === 2 ? "hidden" : ""}`}
                        />
                      </div>
                    );
                  }
                )}
              </div>
              <div className="flex justify-between text-[9px] text-white/30 px-0.5">
                <span>Processing</span>
                <span>Shipped</span>
                <span>Delivered</span>
              </div>

              {order.notes && (
                <div className="rounded-lg bg-white/4 border border-white/6 px-3 py-2.5 mt-1">
                  <p className="text-white/35 text-[10px] font-semibold uppercase tracking-wider mb-1">
                    Note
                  </p>
                  <p className="text-white/55 text-xs leading-relaxed italic">
                    "{order.notes}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

const CustomerHistory = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");

  const statuses: { key: "all" | OrderStatus; label: string }[] = [
    { key: "all", label: "All Orders" },
    { key: "processing", label: "Processing" },
    { key: "shipped", label: "Shipped" },
    { key: "delivered", label: "Delivered" },
    { key: "cancelled", label: "Cancelled" },
  ];

  const filtered = ORDERS.filter((o) => {
    const q = search.toLowerCase();
    const matchSearch =
      o.id.toLowerCase().includes(q) ||
      o.customer.name.toLowerCase().includes(q) ||
      o.customer.phone.includes(q) ||
      o.products.some((p) => p.name.toLowerCase().includes(q));
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Summary stats
  const totalOrders = ORDERS.length;
  const totalRevenue = ORDERS.reduce((s, o) => s + o.total, 0);
  const deliveredCount = ORDERS.filter((o) => o.status === "delivered").length;
  const processingCount = ORDERS.filter(
    (o) => o.status === "processing" || o.status === "shipped"
  ).length;

  return (
    <div className="min-h-screen bg-[#08080C] font-sans">
      {/* ── Header ── */}
      <div className="relative overflow-hidden">
        {/* Gradient blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 px-6 md:px-14 pt-8 pb-10">
          {/* Back nav */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium group mb-8"
          >
            <ArrowLeft
              size={15}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Home
          </Link>

          {/* Title */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-2">
                Order Management
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Customer{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-indigo-400">
                  History
                </span>
              </h1>
              <p className="text-white/40 text-sm mt-3 max-w-lg leading-relaxed">
                View and manage all customer order enquiries, track delivery
                statuses, and review order details from iIslandLink.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-white/4 border border-white/8 rounded-xl px-4 py-3 shrink-0">
              <ShoppingBag size={16} className="text-violet-400" />
              <span className="text-white font-bold">{totalOrders}</span>
              <span className="text-white/40 text-sm">Total Orders</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="px-6 md:px-14 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Total Revenue",
              value: `LKR ${totalRevenue.toLocaleString()}`,
              icon: Receipt,
              color: "text-violet-400",
              bg: "bg-violet-500/10",
              border: "border-violet-500/20",
            },
            {
              label: "Delivered",
              value: deliveredCount,
              icon: CheckCircle,
              color: "text-emerald-400",
              bg: "bg-emerald-500/10",
              border: "border-emerald-500/20",
            },
            {
              label: "In Progress",
              value: processingCount,
              icon: Truck,
              color: "text-blue-400",
              bg: "bg-blue-500/10",
              border: "border-blue-500/20",
            },
            {
              label: "Cancelled",
              value: ORDERS.filter((o) => o.status === "cancelled").length,
              icon: XCircle,
              color: "text-red-400",
              bg: "bg-red-500/10",
              border: "border-red-500/20",
            },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`rounded-2xl border ${stat.border} ${stat.bg} px-5 py-4 flex items-center gap-4`}
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0`}
                >
                  <Icon size={18} className={stat.color} />
                </div>
                <div>
                  <p className={`text-xl font-extrabold ${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="px-6 md:px-14 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
            />
            <input
              id="order-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order ID, customer, product…"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-violet-500/40 focus:bg-white/7 transition-all"
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={13} className="text-white/30 shrink-0" />
            {statuses.map((s) => (
              <button
                key={s.key}
                id={`filter-${s.key}`}
                onClick={() => setStatusFilter(s.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  statusFilter === s.key
                    ? "bg-violet-600 text-white shadow-sm shadow-violet-500/30"
                    : "bg-white/5 text-white/45 hover:bg-white/10 hover:text-white"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-white/30 text-xs mt-3">
          {filtered.length} order{filtered.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* ── Orders List ── */}
      <div className="px-6 md:px-14 pb-24 space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4">
              <ShoppingBag size={28} className="text-violet-400/50" />
            </div>
            <p className="text-white/40 font-medium">No orders found</p>
            <p className="text-white/25 text-sm mt-1">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          filtered.map((order) => <OrderCard key={order.id} order={order} />)
        )}
      </div>
    </div>
  );
};

export default CustomerHistory;
