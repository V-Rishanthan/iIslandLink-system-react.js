import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useAppSelector } from "../store/hooks";
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
  ShoppingBag,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Receipt,
  Star,
  Loader2,
  UserCheck,
  Users,
  CreditCard,
  LogOut,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useAppDispatch } from "../store/hooks";
import { clearUser } from "../store/slices/authSlice";

// ── Types ────────────────────────────────────────────────────────────────────

type OrderStatus =
  | "pending_delivery"
  | "pending_payment"
  | "payment_complete"
  | "shipped"
  | "delivered"
  | "cancelled";

interface OrderProduct {
  id: number;
  name: string;
  sku: string;
  qty: number;
  price: string;
  category: string;
}

interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  customer: {
    name: string;
    phone: string;
    email: string;
    business: string | null;
  };
  products: OrderProduct[];
  notes?: string;
  total: number;
  paymentMethod: string;
  assignedTo?: string | null;
  assignedToName?: string | null;
}

interface DeliveryStaff {
  uid: string;
  name: string;
  phone?: string;
  email?: string;
}

// ── Status Config ─────────────────────────────────────────────────────────────

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
  pending_delivery: {
    label: "Pending Delivery",
    icon: Clock,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/25",
    dot: "bg-amber-400",
  },
  pending_payment: {
    label: "Pending Payment",
    icon: CreditCard,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/25",
    dot: "bg-orange-400",
  },
  payment_complete: {
    label: "Payment Complete",
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
  delivered: {
    label: "Delivered",
    icon: CheckCircle,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/25",
    dot: "bg-emerald-400",
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

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending_delivery;
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

function parsePrice(priceStr: string): number {
  const numericStr = priceStr.replace(/[^0-9.]/g, "");
  const val = parseFloat(numericStr);
  return isNaN(val) ? 0 : val;
}

// ── Order Card ─────────────────────────────────────────────────────────────────

function AdminOrderCard({
  order,
  deliveryStaff,
  onAssign,
}: {
  order: Order;
  deliveryStaff: DeliveryStaff[];
  onAssign: (orderId: string, staffUid: string, staffName: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState("");

  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = new Date(order.createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const totalItems = order.products.reduce((s, p) => s + p.qty, 0);

  return (
    <div
      className={`rounded-2xl border border-white/8 bg-[#0E1015] overflow-hidden transition-all duration-300 hover:border-violet-500/20 hover:shadow-xl hover:shadow-violet-500/5`}
    >
      {/* Card Header */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 py-4 cursor-pointer select-none"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center shrink-0 mt-0.5">
            <Receipt size={16} className="text-violet-400" />
          </div>
          <div>
            <p className="text-white font-bold text-sm font-mono tracking-wide">
              {order.id.slice(0, 12).toUpperCase()}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <Calendar size={11} className="text-white/35" />
              <p className="text-white/40 text-xs">
                {formattedDate} · {formattedTime}
              </p>
            </div>
          </div>
        </div>

        {/* Customer name */}
        <div className="hidden md:block text-center">
          <p className="text-white/80 text-sm font-medium">
            {order.customer.name}
          </p>
          <p className="text-white/35 text-xs mt-0.5">
            {totalItems} item{totalItems !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4 sm:gap-5">
          {order.assignedToName && (
            <div className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/25 px-2.5 py-1 rounded-full">
              <UserCheck size={11} className="text-blue-400" />
              <span className="text-blue-400 text-[10px] font-semibold">
                {order.assignedToName}
              </span>
            </div>
          )}
          <div className="text-right">
            <p className="text-violet-400 font-bold text-sm">
              LKR {order.total.toLocaleString()}
            </p>
            <p className="text-white/35 text-[10px] mt-0.5">Total</p>
          </div>
          <StatusBadge status={order.status} />
          <button className="text-white/30 hover:text-white/70 transition-colors ml-1">
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {/* Expanded Detail */}
      {expanded && (
        <div className="border-t border-white/6 px-5 py-5 space-y-5">
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
                      className={`border-b border-white/4 last:border-0 hover:bg-white/2 ${idx % 2 === 0 ? "" : "bg-white/1"}`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center shrink-0">
                            <Package size={12} className="text-violet-400" />
                          </div>
                          <span className="text-white text-xs font-medium">
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="text-white/35 text-[11px] font-mono">
                          {product.sku}
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
                          {(
                            parsePrice(product.price) * product.qty
                          ).toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-violet-500/5 border-t border-violet-500/15">
                    <td
                      colSpan={4}
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

          {/* Customer + Assign row */}
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
                {order.customer.business && (
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-white/6 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={11} className="text-white/40" />
                    </div>
                    <span className="text-white/65 text-xs leading-relaxed">
                      {order.customer.business}
                    </span>
                  </div>
                )}
              </div>

              {order.notes && (
                <div className="rounded-lg bg-white/4 border border-white/6 px-3 py-2.5 mt-2">
                  <p className="text-white/35 text-[10px] font-semibold uppercase tracking-wider mb-1">
                    Note
                  </p>
                  <p className="text-white/55 text-xs leading-relaxed italic">
                    "{order.notes}"
                  </p>
                </div>
              )}
            </div>

            {/* Assign Delivery Boy */}
            <div className="rounded-xl bg-white/3 border border-white/7 p-4 space-y-3">
              <p className="text-white/45 text-[10px] font-bold uppercase tracking-widest">
                Assign Delivery Staff
              </p>

              {order.assignedToName ? (
                <div className="rounded-xl bg-blue-500/10 border border-blue-500/25 p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <UserCheck size={16} className="text-blue-400" />
                    <span className="text-blue-300 font-bold text-sm">
                      Assigned
                    </span>
                  </div>
                  <p className="text-white font-semibold text-sm">
                    {order.assignedToName}
                  </p>
                  <p className="text-white/40 text-xs">
                    This order has been assigned for delivery.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-white/50 text-xs">
                    Select a delivery staff member to handle this order:
                  </p>
                  {deliveryStaff.length === 0 ? (
                    <p className="text-white/30 text-xs italic">
                      No delivery staff available.
                    </p>
                  ) : (
                    <>
                      <select
                        value={selectedStaff}
                        onChange={(e) => setSelectedStaff(e.target.value)}
                        className="w-full bg-[#08080C] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500/40 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">-- Select Staff --</option>
                        {deliveryStaff.map((staff) => (
                          <option key={staff.uid} value={staff.uid}>
                            {staff.name}{" "}
                            {staff.phone ? `(${staff.phone})` : ""}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => {
                          if (!selectedStaff) return;
                          const staff = deliveryStaff.find(
                            (s) => s.uid === selectedStaff
                          );
                          if (staff) {
                            onAssign(order.id, staff.uid, staff.name);
                            setSelectedStaff("");
                          }
                        }}
                        disabled={!selectedStaff}
                        className={`w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                          selectedStaff
                            ? "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/20 hover:-translate-y-0.5"
                            : "bg-white/5 text-white/25 cursor-not-allowed"
                        }`}
                      >
                        <Truck size={14} />
                        Assign to Delivery
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Payment info */}
              <div className="border-t border-white/6 pt-3 mt-2">
                <div className="flex items-center gap-2">
                  <CreditCard size={12} className="text-white/40" />
                  <p className="text-white/40 text-xs">Payment Method:</p>
                  <span className="text-white/70 text-xs font-semibold capitalize">
                    {order.paymentMethod === "card"
                      ? "Card Payment"
                      : "Cash on Delivery"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Admin Dashboard ───────────────────────────────────────────────────────

const AdminDashboard = () => {
  const authState = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [orders, setOrders] = useState<Order[]>([]);
  const [deliveryStaff, setDeliveryStaff] = useState<DeliveryStaff[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Redirect if not admin/head-office
  useEffect(() => {
    if (
      authState.role &&
      authState.role !== "admin" &&
      authState.role !== "head-office"
    ) {
      navigate("/");
    }
  }, [authState.role, navigate]);

  // Fetch ALL orders from Firestore
  useEffect(() => {
    const ordersRef = collection(db, "orders");
    const unsubscribe = onSnapshot(
      ordersRef,
      (snapshot) => {
        const fetched: Order[] = snapshot.docs.map((docSnap) => {
          const d = docSnap.data();
          return {
            id: docSnap.id,
            createdAt: d.createdAt || new Date().toISOString(),
            status: d.status || "pending_delivery",
            customer: {
              name: d.customerName || "",
              phone: d.customerPhone || "",
              email: d.customerEmail || "",
              business: d.customerBusiness || null,
            },
            products: (d.items || []).map((item: any, idx: number) => ({
              id: item.id ?? idx,
              name: item.name || "Unknown Product",
              sku: item.sku || "",
              qty: item.qty || 1,
              price: item.price || "LKR 0",
              category: item.category || "",
            })),
            notes: d.notes || "",
            total: d.subTotal || 0,
            paymentMethod: d.paymentMethod || "cash",
            assignedTo: d.assignedTo || null,
            assignedToName: d.assignedToName || null,
          };
        });
        fetched.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setOrders(fetched);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Fetch RDC staff (delivery boys)
  useEffect(() => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("role", "==", "rdc-staff"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const staff: DeliveryStaff[] = snapshot.docs.map((docSnap) => {
        const d = docSnap.data();
        return {
          uid: docSnap.id,
          name: d.name || d.firstName
            ? `${d.firstName || ""} ${d.lastName || ""}`.trim()
            : d.email || "Unknown",
          phone: d.phone || d.staffPhone || "",
          email: d.email || d.staffEmail || "",
        };
      });
      setDeliveryStaff(staff);
    });

    return () => unsubscribe();
  }, []);

  // Assign order to delivery staff
  const handleAssign = async (
    orderId: string,
    staffUid: string,
    staffName: string
  ) => {
    try {
      await updateDoc(doc(db, "orders", orderId), {
        assignedTo: staffUid,
        assignedToName: staffName,
        status: "shipped",
      });
    } catch (err) {
      console.error("Failed to assign order:", err);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    await signOut(auth);
    dispatch(clearUser());
    navigate("/login");
  };

  // Search filter
  const filtered = orders.filter((o) => {
    const q = search.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      o.customer.name.toLowerCase().includes(q) ||
      o.customer.phone.includes(q) ||
      o.customer.email.toLowerCase().includes(q) ||
      o.products.some((p) => p.name.toLowerCase().includes(q))
    );
  });

  // Stats
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const pendingCount = orders.filter(
    (o) =>
      o.status === "pending_delivery" ||
      o.status === "pending_payment" ||
      o.status === "payment_complete"
  ).length;
  const shippedCount = orders.filter((o) => o.status === "shipped").length;
  const deliveredCount = orders.filter((o) => o.status === "delivered").length;
  const unassignedCount = orders.filter((o) => !o.assignedTo).length;

  return (
    <div className="min-h-screen bg-[#08080C] font-sans">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 px-6 md:px-14 pt-8 pb-10">
          {/* Top nav */}
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium group"
            >
              <ArrowLeft
                size={15}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to Home
            </Link>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-white text-sm font-semibold">
                  {authState.name || authState.email}
                </p>
                <p className="text-white/40 text-[10px] uppercase tracking-wider">
                  {authState.role}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          </div>

          {/* Title */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-2">
                Admin Panel
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Order{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-indigo-400">
                  Dashboard
                </span>
              </h1>
              <p className="text-white/40 text-sm mt-3 max-w-lg leading-relaxed">
                View all customer orders, manage deliveries, and assign orders
                to delivery staff.
              </p>
            </div>

            <Link
              to="/delivery-tracking"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold shadow-lg shadow-violet-500/20 hover:-translate-y-0.5 transition-all w-full sm:w-auto justify-center"
            >
              <MapPin size={16} />
              Live Delivery Tracking
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="px-6 md:px-14 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            {
              label: "Total Orders",
              value: totalOrders,
              icon: ShoppingBag,
              color: "text-violet-400",
              bg: "bg-violet-500/10",
              border: "border-violet-500/20",
            },
            {
              label: "Total Revenue",
              value: `LKR ${totalRevenue.toLocaleString()}`,
              icon: Receipt,
              color: "text-violet-400",
              bg: "bg-violet-500/10",
              border: "border-violet-500/20",
            },
            {
              label: "Pending",
              value: pendingCount,
              icon: Clock,
              color: "text-amber-400",
              bg: "bg-amber-500/10",
              border: "border-amber-500/20",
            },
            {
              label: "Shipped",
              value: shippedCount,
              icon: Truck,
              color: "text-blue-400",
              bg: "bg-blue-500/10",
              border: "border-blue-500/20",
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
              label: "Unassigned",
              value: unassignedCount,
              icon: Users,
              color: "text-red-400",
              bg: "bg-red-500/10",
              border: "border-red-500/20",
            },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`rounded-2xl border ${stat.border} ${stat.bg} px-4 py-4 flex items-center gap-3`}
              >
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Icon size={16} className={stat.color} />
                </div>
                <div>
                  <p className={`text-lg font-extrabold ${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className="text-white/40 text-[10px] mt-0.5">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search */}
      <div className="px-6 md:px-14 mb-6">
        <div className="relative w-full sm:w-96">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
          />
          <input
            id="admin-order-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID, customer name, phone, email…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-violet-500/40 focus:bg-white/7 transition-all"
          />
        </div>
        <p className="text-white/30 text-xs mt-3">
          {filtered.length} order{filtered.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Orders List */}
      <div className="px-6 md:px-14 pb-24 space-y-3">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <Loader2
              size={32}
              className="text-violet-400 animate-spin mb-4"
            />
            <p className="text-white/40 font-medium">Loading all orders…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4">
              <ShoppingBag size={28} className="text-violet-400/50" />
            </div>
            <p className="text-white/40 font-medium">No orders found</p>
            <p className="text-white/25 text-sm mt-1">
              {orders.length === 0
                ? "No orders have been placed yet."
                : "Try adjusting your search."}
            </p>
          </div>
        ) : (
          filtered.map((order) => (
            <AdminOrderCard
              key={order.id}
              order={order}
              deliveryStaff={deliveryStaff}
              onAssign={handleAssign}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
