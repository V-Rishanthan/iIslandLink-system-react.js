import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Layers,
  Store,
  Building2,
  UserCog,
  ChevronRight,
  ArrowLeft,
  User,
  Briefcase,
  Phone,
  Mail,
  MapPinned,
  Lock,
  CreditCard,
  Hash,
  CheckCircle2,
} from "lucide-react";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

/* ─────────────────────────────────── Types ─────────────────────────────── */

type RoleKey = "retail-customer" | "rdc-staff" | "head-office";

const roleCards = [
  {
    role: "retail-customer" as RoleKey,
    title: "Retail Customer",
    desc: "Retailers, supermarkets and resellers placing FMCG product orders.",
    icon: Store,
    tag: "Self-service ordering",
  },
  {
    role: "rdc-staff" as RoleKey,
    title: "RDC Staff",
    desc: "Regional distribution centre staff managing stock and deliveries.",
    icon: Building2,
    tag: "Inventory & dispatch",
  },
  {
    role: "head-office" as RoleKey,
    title: "Head Office Manager",
    desc: "Management team overseeing sales, reporting and operations.",
    icon: UserCog,
    tag: "Analytics & oversight",
  },
];

/* ─────────────────────── Shared Field Components ───────────────────────── */

const FieldWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">{children}</div>
);

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[11px] font-bold uppercase tracking-wider text-white/60">
    {children}
  </span>
);

const IconInput = ({
  id,
  icon: Icon,
  type = "text",
  placeholder,
  hint,
}: {
  id: string;
  icon: React.ElementType;
  type?: string;
  placeholder: string;
  hint?: string;
}) => (
  <div className="flex flex-col gap-1">
    <div className="relative">
      <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className="bg-[#080b10] border-white/8 text-white placeholder:text-white/20 h-11 pl-9 text-sm focus-visible:border-brand focus-visible:ring-brand/20"
      />
    </div>
    {hint && <p className="text-[10px] text-white/30 pl-1">{hint}</p>}
  </div>
);

const SelectField = ({
  placeholder,
  children,
}: {
  placeholder: string;
  children: React.ReactNode;
}) => (
  <Select>
    <SelectTrigger className="w-full h-11 bg-[#080b10] border-white/8 text-white text-sm data-placeholder:text-white/30 focus-visible:border-brand">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent className="bg-dark-card border-dark-border text-white z-200">
      {children}
    </SelectContent>
  </Select>
);

/* ─────────────────── Role-specific Field Sets ───────────────────────────── */

const RetailCustomerFields = () => (
  <div className="flex flex-col gap-4">
    <div className="border-b border-white/5 pb-3 mb-1">
      <p className="text-[11px] text-brand font-bold uppercase tracking-widest">Business Identity</p>
    </div>

    <FieldWrapper>
      <FieldLabel>Customer ID</FieldLabel>
      <IconInput id="customerId" icon={Hash} placeholder="Auto-generated on approval" hint="Assigned by system — no input needed" />
    </FieldWrapper>
    <FieldWrapper>
      <FieldLabel>Business Name</FieldLabel>
      <IconInput id="businessName" icon={Briefcase} placeholder="ABC Supermarket" />
    </FieldWrapper>
    <FieldWrapper>
      <FieldLabel>Contact Person</FieldLabel>
      <IconInput id="contactPerson" icon={User} placeholder="Primary representative name" />
    </FieldWrapper>

    <div className="grid grid-cols-2 gap-4">
      <FieldWrapper>
        <FieldLabel>Phone Number</FieldLabel>
        <IconInput id="phone" icon={Phone} placeholder="+94 77 123 4567" />
      </FieldWrapper>
      <FieldWrapper>
        <FieldLabel>Email Address</FieldLabel>
        <IconInput id="email" icon={Mail} type="email" placeholder="orders@shop.lk" hint="Used for invoices & alerts" />
      </FieldWrapper>
    </div>

    <FieldWrapper>
      <FieldLabel>Business Type</FieldLabel>
      <SelectField placeholder="Select business type">
        <SelectItem value="supermarket">Supermarket</SelectItem>
        <SelectItem value="reseller">Reseller</SelectItem>
        <SelectItem value="outlet">Retail Outlet</SelectItem>
      </SelectField>
    </FieldWrapper>

    <div className="border-b border-white/5 pb-3 mb-1 mt-2">
      <p className="text-[11px] text-brand font-bold uppercase tracking-widest">Location & Delivery</p>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <FieldWrapper>
        <FieldLabel>District</FieldLabel>
        <SelectField placeholder="Select district">
          <SelectItem value="colombo">Colombo</SelectItem>
          <SelectItem value="kandy">Kandy</SelectItem>
          <SelectItem value="galle">Galle</SelectItem>
          <SelectItem value="jaffna">Jaffna</SelectItem>
          <SelectItem value="trinco">Trincomalee</SelectItem>
          <SelectItem value="kuru">Kurunegala</SelectItem>
          <SelectItem value="anura">Anuradhapura</SelectItem>
          <SelectItem value="badulla">Badulla</SelectItem>
        </SelectField>
      </FieldWrapper>
      <FieldWrapper>
        <FieldLabel>Province</FieldLabel>
        <SelectField placeholder="Select province">
          <SelectItem value="western">Western</SelectItem>
          <SelectItem value="central">Central</SelectItem>
          <SelectItem value="southern">Southern</SelectItem>
          <SelectItem value="northern">Northern</SelectItem>
          <SelectItem value="eastern">Eastern</SelectItem>
          <SelectItem value="north-western">North Western</SelectItem>
          <SelectItem value="north-central">North Central</SelectItem>
          <SelectItem value="uva">Uva</SelectItem>
          <SelectItem value="sabaragamuwa">Sabaragamuwa</SelectItem>
        </SelectField>
      </FieldWrapper>
    </div>

    <FieldWrapper>
      <FieldLabel>Delivery Address</FieldLabel>
      <IconInput id="address" icon={MapPinned} placeholder="No. 25, Main Street, Colombo 03" hint="Full shipping address" />
    </FieldWrapper>

    <FieldWrapper>
      <FieldLabel>Assigned RDC</FieldLabel>
      <SelectField placeholder="Servicing regional centre">
        <SelectItem value="central">Central RDC (Head Office)</SelectItem>
        <SelectItem value="north">North RDC</SelectItem>
        <SelectItem value="south">South RDC</SelectItem>
        <SelectItem value="east">East RDC</SelectItem>
        <SelectItem value="west">West RDC</SelectItem>
      </SelectField>
    </FieldWrapper>

    <div className="border-b border-white/5 pb-3 mb-1 mt-2">
      <p className="text-[11px] text-brand font-bold uppercase tracking-widest">Payment & Credit</p>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <FieldWrapper>
        <FieldLabel>Payment Method</FieldLabel>
        <SelectField placeholder="Select method">
          <SelectItem value="cash">Cash</SelectItem>
          <SelectItem value="cheque">Cheque</SelectItem>
          <SelectItem value="online">Online Transfer</SelectItem>
        </SelectField>
      </FieldWrapper>
      <FieldWrapper>
        <FieldLabel>Credit Limit</FieldLabel>
        <IconInput id="creditLimit" icon={CreditCard} placeholder="e.g. LKR 50,000" hint="Approved credit ceiling" />
      </FieldWrapper>
    </div>

    <div className="border-b border-white/5 pb-3 mb-1 mt-2">
      <p className="text-[11px] text-brand font-bold uppercase tracking-widest">Portal Login</p>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <FieldWrapper>
        <FieldLabel>Password</FieldLabel>
        <IconInput id="password" icon={Lock} type="password" placeholder="Create password" />
      </FieldWrapper>
      <FieldWrapper>
        <FieldLabel>Confirm Password</FieldLabel>
        <IconInput id="confirmPassword" icon={Lock} type="password" placeholder="Confirm password" />
      </FieldWrapper>
    </div>

    <FieldWrapper>
      <FieldLabel>Account Status</FieldLabel>
      <SelectField placeholder="Initial account status">
        <SelectItem value="active">Active</SelectItem>
        <SelectItem value="suspended">Suspended</SelectItem>
      </SelectField>
    </FieldWrapper>
  </div>
);

const RdcStaffFields = () => (
  <div className="flex flex-col gap-4">
    <div className="border-b border-white/5 pb-3 mb-1">
      <p className="text-[11px] text-brand font-bold uppercase tracking-widest">Staff Identity</p>
    </div>

    <FieldWrapper>
      <FieldLabel>Staff ID</FieldLabel>
      <IconInput id="staffId" icon={Hash} placeholder="Auto-generated on approval" hint="Assigned by system" />
    </FieldWrapper>

    <div className="grid grid-cols-2 gap-4">
      <FieldWrapper>
        <FieldLabel>First Name</FieldLabel>
        <IconInput id="firstName" icon={User} placeholder="First name" />
      </FieldWrapper>
      <FieldWrapper>
        <FieldLabel>Last Name</FieldLabel>
        <IconInput id="lastName" icon={User} placeholder="Last name" />
      </FieldWrapper>
    </div>

    <FieldWrapper>
      <FieldLabel>Job Role</FieldLabel>
      <SelectField placeholder="Select position">
        <SelectItem value="clerk">Clerk</SelectItem>
        <SelectItem value="supervisor">Supervisor</SelectItem>
        <SelectItem value="driver">Delivery Driver</SelectItem>
        <SelectItem value="warehouse">Warehouse Officer</SelectItem>
      </SelectField>
    </FieldWrapper>

    <FieldWrapper>
      <FieldLabel>Assigned RDC</FieldLabel>
      <SelectField placeholder="Select your centre">
        <SelectItem value="central">Central RDC (Head Office)</SelectItem>
        <SelectItem value="north">North RDC</SelectItem>
        <SelectItem value="south">South RDC</SelectItem>
        <SelectItem value="east">East RDC</SelectItem>
        <SelectItem value="west">West RDC</SelectItem>
      </SelectField>
    </FieldWrapper>

    <div className="grid grid-cols-2 gap-4">
      <FieldWrapper>
        <FieldLabel>Phone Number</FieldLabel>
        <IconInput id="staffPhone" icon={Phone} placeholder="+94 77 000 0000" hint="Internal contact" />
      </FieldWrapper>
      <FieldWrapper>
        <FieldLabel>Work Email</FieldLabel>
        <IconInput id="staffEmail" icon={Mail} type="email" placeholder="staff@islandlink.com" />
      </FieldWrapper>
    </div>

    <div className="border-b border-white/5 pb-3 mb-1 mt-2">
      <p className="text-[11px] text-brand font-bold uppercase tracking-widest">System Access</p>
    </div>

    <FieldWrapper>
      <FieldLabel>Access Level</FieldLabel>
      <SelectField placeholder="Select permissions tier">
        <SelectItem value="tier-1">Tier 1 — View Only</SelectItem>
        <SelectItem value="tier-2">Tier 2 — Entry Level</SelectItem>
        <SelectItem value="tier-3">Tier 3 — Supervisor</SelectItem>
      </SelectField>
    </FieldWrapper>

    <div className="grid grid-cols-2 gap-4">
      <FieldWrapper>
        <FieldLabel>Password</FieldLabel>
        <IconInput id="staffPassword" icon={Lock} type="password" placeholder="Create password" />
      </FieldWrapper>
      <FieldWrapper>
        <FieldLabel>Confirm Password</FieldLabel>
        <IconInput id="staffConfirmPassword" icon={Lock} type="password" placeholder="Confirm" />
      </FieldWrapper>
    </div>

    <FieldWrapper>
      <FieldLabel>Account Status</FieldLabel>
      <SelectField placeholder="Initial status">
        <SelectItem value="active">Active</SelectItem>
        <SelectItem value="inactive">Inactive</SelectItem>
      </SelectField>
    </FieldWrapper>
  </div>
);

const HeadOfficeFields = () => (
  <div className="flex flex-col gap-4">
    <div className="border-b border-white/5 pb-3 mb-1">
      <p className="text-[11px] text-brand font-bold uppercase tracking-widest">Manager Identity</p>
    </div>

    <FieldWrapper>
      <FieldLabel>Manager ID</FieldLabel>
      <IconInput id="managerId" icon={Hash} placeholder="Auto-generated on approval" hint="Assigned by system" />
    </FieldWrapper>

    <div className="grid grid-cols-2 gap-4">
      <FieldWrapper>
        <FieldLabel>First Name</FieldLabel>
        <IconInput id="managerFirst" icon={User} placeholder="First name" />
      </FieldWrapper>
      <FieldWrapper>
        <FieldLabel>Last Name</FieldLabel>
        <IconInput id="managerLast" icon={User} placeholder="Last name" />
      </FieldWrapper>
    </div>

    <FieldWrapper>
      <FieldLabel>Department</FieldLabel>
      <SelectField placeholder="Select department">
        <SelectItem value="procurement">Procurement</SelectItem>
        <SelectItem value="operations">Operations</SelectItem>
        <SelectItem value="finance">Finance</SelectItem>
        <SelectItem value="logistics">Logistics</SelectItem>
        <SelectItem value="hr">Human Resources</SelectItem>
        <SelectItem value="it">IT & Systems</SelectItem>
      </SelectField>
    </FieldWrapper>

    <FieldWrapper>
      <FieldLabel>Designation / Title</FieldLabel>
      <IconInput id="designation" icon={Briefcase} placeholder="e.g. Operations Manager" />
    </FieldWrapper>

    <div className="grid grid-cols-2 gap-4">
      <FieldWrapper>
        <FieldLabel>Direct Phone</FieldLabel>
        <IconInput id="managerPhone" icon={Phone} placeholder="+94 11 000 0000" hint="Direct line" />
      </FieldWrapper>
      <FieldWrapper>
        <FieldLabel>Corporate Email</FieldLabel>
        <IconInput id="managerEmail" icon={Mail} type="email" placeholder="manager@islandlink.com" />
      </FieldWrapper>
    </div>

    <div className="border-b border-white/5 pb-3 mb-1 mt-2">
      <p className="text-[11px] text-brand font-bold uppercase tracking-widest">System Access</p>
    </div>

    <FieldWrapper>
      <FieldLabel>Access Level</FieldLabel>
      <SelectField placeholder="Select access scope">
        <SelectItem value="full">Full Access</SelectItem>
        <SelectItem value="read-only">Read Only</SelectItem>
        <SelectItem value="dept-specific">Department-Specific</SelectItem>
      </SelectField>
    </FieldWrapper>

    <div className="grid grid-cols-2 gap-4">
      <FieldWrapper>
        <FieldLabel>Password</FieldLabel>
        <IconInput id="managerPassword" icon={Lock} type="password" placeholder="Create password" />
      </FieldWrapper>
      <FieldWrapper>
        <FieldLabel>Confirm Password</FieldLabel>
        <IconInput id="managerConfirmPassword" icon={Lock} type="password" placeholder="Confirm" />
      </FieldWrapper>
    </div>

    <FieldWrapper>
      <FieldLabel>Account Status</FieldLabel>
      <SelectField placeholder="Initial status">
        <SelectItem value="active">Active</SelectItem>
        <SelectItem value="inactive">Inactive</SelectItem>
      </SelectField>
    </FieldWrapper>
  </div>
);

const fieldComponents: Record<RoleKey, React.ReactNode> = {
  "retail-customer": <RetailCustomerFields />,
  "rdc-staff":       <RdcStaffFields />,
  "head-office":     <HeadOfficeFields />,
};

/* ───────────────────────────── Page ───────────────────────────────────── */

const RegisterPage = () => {
  const [step, setStep] = useState<"role" | "info" | "done">("role");
  const [selectedRole, setSelectedRole] = useState<RoleKey | "">("");

  const chosenCard = roleCards.find((r) => r.role === selectedRole);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("done");
  };

  return (
    <div className="min-h-screen bg-site-bg text-white flex flex-col">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-brand-subtle blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/5">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-xl bg-linear-to-br from-brand to-brand-dark flex items-center justify-center shadow-lg shadow-brand-glow">
            <Layers size={15} strokeWidth={2} className="text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-bold text-[14px]">ISDN</span>
            <span className="text-[9px] text-white/35 uppercase tracking-wider">IslandLink Network</span>
          </div>
        </Link>
        <p className="text-xs text-white/40">
          Already have an account?{" "}
          <Link to="/login" className="text-brand hover:underline font-medium">Sign in</Link>
        </p>
      </nav>

      {/* Step indicator */}
      <div className="relative z-10 flex justify-center pt-8 pb-2">
        <div className="flex items-center gap-2">
          {["Select Role", "Fill Details", "Done"].map((label, idx) => {
            const isActive = (step === "role" && idx === 0) || (step === "info" && idx === 1) || (step === "done" && idx === 2);
            const isPast   = (step === "info" && idx === 0) || (step === "done" && idx <= 1);
            return (
              <div key={label} className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                    isPast   ? "bg-brand text-white" :
                    isActive ? "bg-brand/30 border border-brand text-brand" :
                               "bg-white/5 border border-white/10 text-white/30"
                  }`}>
                    {isPast ? <CheckCircle2 size={13} /> : idx + 1}
                  </div>
                  <span className={`text-[11px] font-medium hidden sm:block ${isActive ? "text-white" : isPast ? "text-brand" : "text-white/30"}`}>{label}</span>
                </div>
                {idx < 2 && <div className={`w-8 h-px ${isPast ? "bg-brand" : "bg-white/10"}`} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 justify-center px-4 py-8">
        <div className="w-full max-w-[560px]">

          {/* ── Step 1: Role Selection ── */}
          {step === "role" && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold mb-2">Create your account</h1>
                <p className="text-white/45 text-sm">Select your role to get the right registration form.</p>
              </div>
              <div className="flex flex-col gap-4">
                {roleCards.map((card) => (
                  <button
                    key={card.role}
                    onClick={() => { setSelectedRole(card.role); setStep("info"); }}
                    className="group flex items-center gap-5 p-5 rounded-2xl border border-white/8 bg-dark-card hover:border-brand hover:bg-brand/8 transition-all text-left"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 group-hover:bg-brand group-hover:shadow-lg group-hover:shadow-brand-glow transition-all shrink-0">
                      <card.icon size={22} className="text-white/70 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-sm text-white">{card.title}</h3>
                        <span className="text-[10px] border border-brand-border text-brand px-2 py-0.5 rounded-full">{card.tag}</span>
                      </div>
                      <p className="text-xs text-white/45 leading-5">{card.desc}</p>
                    </div>
                    <ChevronRight size={18} className="text-white/20 group-hover:text-brand shrink-0 transition-colors" />
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ── Step 2: Fill Details ── */}
          {step === "info" && chosenCard && (
            <>
              <div className="mb-6">
                <button
                  onClick={() => { setStep("role"); setSelectedRole(""); }}
                  className="flex items-center gap-1.5 text-xs text-white/50 hover:text-brand transition-colors mb-4"
                >
                  <ArrowLeft size={13} /> Back to role selection
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center shadow-lg shadow-brand-glow shrink-0">
                    <chosenCard.icon size={18} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-extrabold">Register as {chosenCard.title}</h1>
                    <p className="text-xs text-white/40 mt-0.5">{chosenCard.desc}</p>
                  </div>
                </div>
              </div>

              <div className="bg-dark-card border border-dark-border rounded-3xl p-6 shadow-2xl shadow-black/30">
                <form onSubmit={handleSubmit} className="flex flex-col gap-1">
                  {fieldComponents[selectedRole as RoleKey]}

                  <button
                    type="submit"
                    className="mt-6 flex items-center justify-center gap-2 bg-brand text-brand-on h-11 rounded-xl text-sm font-bold shadow-lg shadow-brand-glow hover:bg-brand-dark hover:-translate-y-0.5 hover:shadow-brand transition-all duration-300"
                  >
                    Submit Registration
                  </button>

                  <p className="text-[11px] text-white/30 text-center mt-3 leading-5">
                    {selectedRole === "retail-customer"
                      ? "Retail accounts are reviewed and activated within 24 hours."
                      : "Staff accounts require verification by the ISDN admin team."}
                  </p>
                </form>
              </div>
            </>
          )}

          {/* ── Step 3: Done ── */}
          {step === "done" && (
            <div className="flex flex-col items-center text-center py-12">
              <div className="w-20 h-20 rounded-full bg-brand/20 border border-brand flex items-center justify-center mb-6 shadow-xl shadow-brand-glow">
                <CheckCircle2 size={40} className="text-brand" />
              </div>
              <h2 className="text-3xl font-extrabold mb-3">Registration Submitted!</h2>
              <p className="text-white/50 text-sm max-w-sm leading-relaxed mb-8">
                Your registration has been submitted for review. You'll receive a confirmation
                email once your account is activated by the ISDN team.
              </p>
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="bg-brand text-brand-on px-6 py-3 rounded-xl text-sm font-bold shadow-md hover:bg-brand-dark transition-all"
                >
                  Go to Login
                </Link>
                <Link
                  to="/"
                  className="border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
