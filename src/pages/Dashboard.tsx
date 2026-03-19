import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import PersonalCare from '../screen/PersonalCare';
import DeliveryBoy from '../screen/users/DeliveryBoy';

const Dashboard = () => {
  const { role, name, email } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!role) {
      navigate('/login');
    }
  }, [role, navigate]);

  if (!role) return null;

  return (
    <div className="min-h-screen bg-site-bg text-white">
      <header className="px-8 py-5 border-b border-white/5 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Welcome, {name || email}</h1>
          <p className="text-xs text-white/50 bg-brand/20 px-2 py-1 rounded inline-block mt-2">
            Role: {role}
          </p>
        </div>
      </header>
      
      <main className="p-8">
        {role === 'retail-customer' && (
          <div className="bg-dark-card border border-dark-border p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Retail Dashboard</h2>
            <p className="text-white/60 mb-6">Explore the catalog and manage your orders here.</p>
            {/* Instead of returning PersonalCare component completely, we can pass props or just show info here */}
            {/* Pass state as props as requested */}
            <RetailView name={name} email={email} />
          </div>
        )}

        {role === 'rdc-staff' && (
          <div className="bg-dark-card border border-dark-border p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">RDC Staff Dashboard</h2>
            <p className="text-white/60 mb-6">Manage deliveries and assignments.</p>
            <StaffView name={name} email={email} />
          </div>
        )}

        {role !== 'retail-customer' && role !== 'rdc-staff' && (
          <div className="bg-dark-card border border-dark-border p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Admin / Manager Dashboard</h2>
            <p className="text-white/60">Overview of system performance.</p>
          </div>
        )}
      </main>
    </div>
  );
};

// Extracted views that receive props (as requested: pass and manage the props redux)
const RetailView = ({ name, email }: { name: string | null, email: string | null }) => {
  return (
    <div className="mt-4 border-t border-white/10 pt-4">
      <h3 className="text-brand font-semibold">Retail Profile Details</h3>
      <ul className="mt-2 space-y-1 text-sm text-white/80">
        <li><strong>Name:</strong> {name}</li>
        <li><strong>Email:</strong> {email}</li>
      </ul>
      <div className="mt-6">
        <PersonalCare />
      </div>
    </div>
  );
}

const StaffView = ({ name, email }: { name: string | null, email: string | null }) => {
  return (
    <div className="mt-4 border-t border-white/10 pt-4">
      <h3 className="text-brand font-semibold">Staff Profile</h3>
      <ul className="mt-2 space-y-1 text-sm text-white/80">
        <li><strong>Staff Member:</strong> {name}</li>
        <li><strong>Contact:</strong> {email}</li>
      </ul>
      <div className="mt-6">
        <DeliveryBoy />
      </div>
    </div>
  );
}

export default Dashboard;
