import CategoryPageLayout, {
  type Product,
} from "../components/CategoryPageLayout";

import heroImg from "../assets/homeCleaning/AJAX.jpg";
import img1 from "../assets/homeCleaning/Axe.jpg";
import img2 from "../assets/homeCleaning/Cotton Mop.jpg";
import img3 from "../assets/homeCleaning/Dust Brush Set.jpg";
import img4 from "../assets/homeCleaning/Foolproof Tricks.jpg";
import img5 from "../assets/homeCleaning/Garden Hoses.jpg";
import img6 from "../assets/homeCleaning/Garden Rake.jpg";
import img7 from "../assets/homeCleaning/Harpi.jpg";
import img8 from "../assets/homeCleaning/Lemon Harpic.jpg";
import img9 from "../assets/homeCleaning/Rotary Mop Esperanza.jpg";
import img10 from "../assets/homeCleaning/Harpi.jpg";
import img11 from "../assets/homeCleaning/Lemon Harpic.jpg";
import img12 from "../assets/homeCleaning/Rotary Mop Esperanza.jpg";
import img13 from "../assets/homeCleaning/Shovel.jpg";
import img14 from "../assets/homeCleaning/Stiff Sweeping Brush.jpg";

const products: Product[] = [
  {
    id: 1,
    name: "Ajax Multi-Purpose Cleaner",
    sku: "CL-AJX-001",
    category: "Surface Cleaners",
    image: img1,
    price: "LKR 720",
    unit: "bottle",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Harpic Toilet Cleaner – Power Plus",
    sku: "CL-HRP-002",
    category: "Bathroom Cleaning",
    image: img2,
    price: "LKR 480",
    unit: "bottle",
    badge: "Popular",
  },
  {
    id: 3,
    name: "Esperanza Rotary Mop – Spin Dry",
    sku: "CL-MOP-003",
    category: "Mops & Brooms",
    image: img3,
    price: "LKR 3,500",
    unit: "set",
  },
  {
    id: 4,
    name: "Cotton Floor Mop – Classic",
    sku: "CL-MOP-004",
    category: "Mops & Brooms",
    image: img4,
    price: "LKR 850",
    unit: "piece",
  },
  {
    id: 5,
    name: "Long Handled Dust Brush Set",
    sku: "CL-BRS-005",
    category: "Mops & Brooms",
    image: img5,
    price: "LKR 1,200",
    unit: "set",
  },
  {
    id: 6,
    name: "Outdoor Stiff Sweeping Brush (Set of 2)",
    sku: "CL-BRM-006",
    category: "Mops & Brooms",
    image: img6,
    price: "LKR 1,950",
    unit: "set",
    badge: "Value Pack",
  },
  {
    id: 7,
    name: "Garden Axe – Heavy Duty",
    sku: "CL-GTL-007",
    category: "Garden Tools",
    image: img7,
    price: "LKR 2,800",
    unit: "piece",
  },
  {
    id: 8,
    name: "Garden Hose – 30m Flexible",
    sku: "CL-GTL-008",
    category: "Garden Tools",
    image: img8,
    price: "LKR 4,200",
    unit: "roll",
  },
  {
    id: 9,
    name: "Garden Rake – Steel Tines",
    sku: "CL-GTL-009",
    category: "Garden Tools",
    image: img9,
    price: "LKR 1,500",
    unit: "piece",
  },
  {
    id: 10,
    name: "Nail Brush & Cleaning Tools Set",
    sku: "CL-BRS-010",
    category: "Scrub Brushes",
    image: img10,
    price: "LKR 650",
    unit: "set",
  },
  {
    id: 11,
    name: "All-Purpose Cleaning Spray",
    sku: "CL-SPR-011",
    category: "Surface Cleaners",
    image: img11,
    price: "LKR 550",
    unit: "bottle",
    badge: "New",
  },
  {
    id: 12,
    name: "Disinfectant Floor Cleaner 2L",
    sku: "CL-FLC-012",
    category: "Surface Cleaners",
    image: img12,
    price: "LKR 890",
    unit: "bottle",
  },
  {
    id: 13,
    name: "Sponge & Scourer Combo Pack",
    sku: "CL-SCR-013",
    category: "Scrub Brushes",
    image: img13,
    price: "LKR 320",
    unit: "pack",
  },
  {
    id: 14,
    name: "Microfiber Cleaning Cloth (5 Pack)",
    sku: "CL-CLT-014",
    category: "Surface Cleaners",
    image: img14,
    price: "LKR 750",
    unit: "pack",
  },
];

export default function Cleaning() {
  return (
    <CategoryPageLayout
      title="Home Cleaning"
      subtitle="Cleaning & Garden Essentials"
      description="Detergents, disinfectants, surface cleaners, mops, brooms, and garden tools to keep your home and surroundings spotless."
      accentColor="violet"
      accentHex="#8B5CF6"
      products={products}
      heroImage={heroImg}
      backPath="/"
    />
  );
}
