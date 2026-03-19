import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { CheckCircle2, CreditCard, Layers, ShieldCheck } from "lucide-react";

export default function PaymentPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;

    setIsProcessing(true);
    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      await updateDoc(doc(db, "orders", orderId), {
        status: "payment_complete",
        paymentDate: new Date().toISOString(),
      });
      setIsSuccess(true);
      setTimeout(() => navigate("/dashboard"), 3000);
    } catch (err) {
      console.error(err);
      alert("Payment failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!orderId) {
    return (
      <div className="min-h-screen bg-[#08080C] text-white flex items-center justify-center">
        Invalid Payment Request
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#08080C] text-white flex flex-col items-center justify-center p-6">
        <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center mb-6 animate-pulse">
          <CheckCircle2 size={40} className="text-green-500" />
        </div>
        <h2 className="text-3xl font-bold mb-3">Payment Successful!</h2>
        <p className="text-white/50 text-sm mb-2 text-center">
          Thank you. Your order #{orderId.slice(0, 8).toUpperCase()} has been confirmed.
        </p>
        <p className="text-white/30 text-xs">Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080C] text-white flex flex-col items-center p-6 pt-16">
      <Link to="/" className="flex items-center gap-3 mb-10 opacity-70 hover:opacity-100 transition">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center">
          <Layers size={15} className="text-white" />
        </div>
        <span className="text-white font-bold text-[14px]">ISDN Secure Checkout</span>
      </Link>

      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Total to Pay</h2>
          <span className="text-2xl font-black text-brand">LKR {amount}</span>
        </div>

        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label className="text-white/40 text-xs mb-1 block uppercase tracking-wider font-semibold">
              Name on Card
            </label>
            <input
              required
              placeholder="JOHN DOE"
              className="w-full bg-[#08080C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-brand transition-colors"
            />
          </div>

          <div>
            <label className="text-white/40 text-xs mb-1 block uppercase tracking-wider font-semibold">
              Card Number
            </label>
            <div className="relative">
              <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                required
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="0000 0000 0000 0000"
                className="w-full bg-[#08080C] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-brand transition-colors font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white/40 text-xs mb-1 block uppercase tracking-wider font-semibold">
                Expiry (MM/YY)
              </label>
              <input
                required
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="12/26"
                className="w-full bg-[#08080C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-brand transition-colors font-mono"
              />
            </div>
            <div>
              <label className="text-white/40 text-xs mb-1 block uppercase tracking-wider font-semibold">
                CVV
              </label>
              <input
                required
                type="password"
                maxLength={4}
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                className="w-full bg-[#08080C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-brand transition-colors font-mono"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-white/40 text-[11px] justify-center mt-6 mb-6">
            <ShieldCheck size={14} className="text-green-500" />
            <span>Payments are secure and encrypted.</span>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full py-4 rounded-xl text-white font-bold text-sm transition-all shadow-lg ${isProcessing ? "opacity-50 bg-white/10 cursor-not-allowed" : "bg-brand hover:bg-brand-dark shadow-brand-glow hover:-translate-y-0.5"
              }`}
          >
            {isProcessing ? "Processing..." : `Pay LKR ${amount}`}
          </button>
        </form>
      </div>
    </div>
  );
}
