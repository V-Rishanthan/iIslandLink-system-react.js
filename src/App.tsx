import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Categories from "./components/Categories";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PersonalCare from "./screen/PersonalCare";
import Cleaning from "./screen/Cleaning";
import PackagedFoods from "./screen/PackagedFoods";
import Beverages from "./screen/Beverages";
import CustomerHistory from "./screen/users/CustomerHistory";

function LandingLayout() {
  return (
    <main className="min-h-screen bg-site-bg flex flex-col font-sans">
      <Navbar />
      <Hero />
      {/* <About /> */}
      <Categories />
      <Features />
      <Testimonials />
      <Footer />
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingLayout />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/personal-care" element={<PersonalCare />} />
        <Route path="/cleaning" element={<Cleaning />} />
        <Route path="/packaged-food" element={<PackagedFoods />} />
        <Route path="/beverages" element={<Beverages />} />
        <Route path="/customer-history:id" element={<CustomerHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
