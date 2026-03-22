import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Truck,
  CheckCircle,
  Phone,
  Package,
  Loader2,
  Mail,
  Receipt,
  Calendar,
  MapPin,
  Signal,
  SignalZero,
} from "lucide-react";
import { useAppSelector } from "../../store/hooks";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";

// ── Types ─────────────────────────────────────────────────────────────────────

type DeliveryStatus = "shipped" | "delivered";

interface Delivery {
  id: string;
  customer: string;
  phone: string;
  email: string;
  business: string | null;
  items: number;
  total: number;
  status: DeliveryStatus;
  createdAt: string;
  notes: string;
  paymentMethod: string;
}

// ── Status Config ─────────────────────────────────────────────────────────────

const STATUS: Record<
  DeliveryStatus,
  {
    label: string;
    icon: React.ElementType;
    color: string;
    bg: string;
    border: string;
    dot: string;
  }
> = {
  shipped: {
    label: "Assigned",
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
};

// ── Main Component ─────────────────────────────────────────────────────────────

const DeliveryBoy = () => {
  const auth = useAppSelector((state) => state.auth);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationSharing, setLocationSharing] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const watchIdRef = useRef<number | null>(null);

  // Fetch orders assigned to this delivery boy in real-time
  useEffect(() => {
    if (!auth.uid) {
      setLoading(false);
      return;
    }

    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("assignedTo", "==", auth.uid));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetched: Delivery[] = snapshot.docs.map((docSnap) => {
          const d = docSnap.data();
          const items = d.items || [];
          const totalItems = items.reduce(
            (sum: number, item: any) => sum + (item.qty || 1),
            0
          );

          return {
            id: docSnap.id,
            customer: d.customerName || "",
            phone: d.customerPhone || "",
            email: d.customerEmail || "",
            business: d.customerBusiness || null,
            items: totalItems,
            total: d.subTotal || 0,
            status: d.status === "delivered" ? "delivered" : "shipped",
            createdAt: d.createdAt || new Date().toISOString(),
            notes: d.notes || "",
            paymentMethod: d.paymentMethod || "cash",
          };
        });

        // Sort: non-delivered first, then by date
        fetched.sort((a, b) => {
          if (a.status === "delivered" && b.status !== "delivered") return 1;
          if (a.status !== "delivered" && b.status === "delivered") return -1;
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });

        setDeliveries(fetched);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching deliveries:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [auth.uid]);

  // GPS Location Sharing
  const updateLocation = useCallback(
    async (position: GeolocationPosition) => {
      if (!auth.uid) return;
      try {
        const activeCount = deliveries.filter((d) => d.status === "shipped").length;
        await setDoc(doc(db, "delivery_locations", auth.uid), {
          name: auth.name || auth.email || "Delivery Staff",
          phone: auth.phone || "",
          email: auth.email || "",
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          lastUpdated: new Date().toISOString(),
          activeDeliveries: activeCount,
        });
      } catch (err) {
        console.error("Failed to update location:", err);
      }
    },
    [auth.uid, auth.name, auth.email, auth.phone, deliveries]
  );

  const startLocationSharing = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setLocationError(null);
    setLocationSharing(true);

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        updateLocation(position);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocationError(
          error.code === 1
            ? "Location permission denied. Please allow location access."
            : error.code === 2
            ? "Location unavailable. Please check your GPS."
            : "Location request timed out."
        );
        setLocationSharing(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 5000,
      }
    );
  }, [updateLocation]);

  const stopLocationSharing = useCallback(async () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setLocationSharing(false);

    // Remove location doc from Firestore
    if (auth.uid) {
      try {
        await deleteDoc(doc(db, "delivery_locations", auth.uid));
      } catch (err) {
        console.error("Failed to remove location:", err);
      }
    }
  }, [auth.uid]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  // Mark an order as delivered in Firestore
  async function markDelivered(id: string) {
    try {
      await updateDoc(doc(db, "orders", id), {
        status: "delivered",
      });
    } catch (err) {
      console.error("Failed to mark delivered:", err);
    }
  }

  const pending = deliveries.filter((d) => d.status === "shipped").length;
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
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Home
        </Link>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-1">
              Delivery Dashboard
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">
              My Deliveries
            </h1>
            <p className="text-white/35 text-sm mt-2">
              Manage your assigned delivery orders.
            </p>
          </div>

          {/* Location Sharing Toggle */}
          {auth.uid && (
            <div className="flex flex-col items-end gap-2">
              <button
                id="toggle-location-sharing"
                onClick={() =>
                  locationSharing ? stopLocationSharing() : startLocationSharing()
                }
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  locationSharing
                    ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25"
                    : "bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10"
                }`}
              >
                {locationSharing ? (
                  <>
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                    </span>
                    <Signal size={14} />
                    Sharing Location
                  </>
                ) : (
                  <>
                    <SignalZero size={14} />
                    <MapPin size={14} />
                    Share Location
                  </>
                )}
              </button>

              {locationError && (
                <p className="text-red-400 text-xs max-w-[250px] text-right">
                  {locationError}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="px-5 md:px-12 mb-7">
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: "Total Assigned",
              value: deliveries.length,
              color: "text-violet-400",
              bg: "bg-violet-500/10",
              border: "border-violet-500/20",
            },
            {
              label: "Pending",
              value: pending,
              color: "text-amber-400",
              bg: "bg-amber-500/10",
              border: "border-amber-500/20",
            },
            {
              label: "Delivered",
              value: delivered,
              color: "text-emerald-400",
              bg: "bg-emerald-500/10",
              border: "border-emerald-500/20",
            },
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
        {loading ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <Loader2
              size={32}
              className="text-violet-400 animate-spin mb-4"
            />
            <p className="text-white/40 font-medium">
              Loading your deliveries…
            </p>
          </div>
        ) : !auth.uid ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4">
              <Truck size={28} className="text-violet-400/50" />
            </div>
            <p className="text-white/40 font-medium">
              Please log in to view your deliveries
            </p>
            <Link
              to="/login"
              className="mt-4 px-6 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all"
            >
              Go to Login
            </Link>
          </div>
        ) : deliveries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4">
              <Package size={28} className="text-violet-400/50" />
            </div>
            <p className="text-white/40 font-medium">
              No deliveries assigned yet
            </p>
            <p className="text-white/25 text-sm mt-1">
              Orders will appear here once admin assigns them to you.
            </p>
          </div>
        ) : (
          deliveries.map((d) => {
            const cfg = STATUS[d.status];
            const Icon = cfg.icon;

            const formattedDate = new Date(d.createdAt).toLocaleDateString(
              "en-US",
              { month: "short", day: "numeric" }
            );
            const formattedTime = new Date(d.createdAt).toLocaleTimeString(
              "en-US",
              { hour: "2-digit", minute: "2-digit" }
            );

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
                    <p className="text-white font-semibold text-sm">
                      {d.customer}
                    </p>
                    <span className="text-white/25 text-xs font-mono">
                      {d.id.slice(0, 10).toUpperCase()}
                    </span>
                  </div>

                  {d.business && (
                    <div className="flex items-center gap-1.5 text-white/50 text-xs">
                      <Receipt size={10} />
                      <span>{d.business}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-white/40 text-xs flex-wrap">
                    <span className="flex items-center gap-1">
                      <Phone size={10} />
                      {d.phone}
                    </span>
                    {d.email && (
                      <span className="flex items-center gap-1">
                        <Mail size={10} />
                        {d.email}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Package size={10} />
                      {d.items} item{d.items !== 1 ? "s" : ""}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={10} />
                      {formattedDate} · {formattedTime}
                    </span>
                  </div>

                  {d.notes && (
                    <p className="text-white/30 text-xs italic mt-1">
                      "{d.notes}"
                    </p>
                  )}
                </div>

                {/* Right: total + badge + action */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right mr-1">
                    <p className="text-violet-400 font-bold text-sm">
                      LKR {d.total.toLocaleString()}
                    </p>
                    <p className="text-white/30 text-[10px] capitalize">
                      {d.paymentMethod === "card" ? "Card" : "Cash"}
                    </p>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cfg.color} ${cfg.bg} ${cfg.border}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse`}
                    />
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
          })
        )}
      </div>
    </div>
  );
};

export default DeliveryBoy;
