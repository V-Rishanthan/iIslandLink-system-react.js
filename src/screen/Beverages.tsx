import CategoryPageLayout, {
  type Product,
} from "../components/CategoryPageLayout";

import heroImg from "../assets/categories/beverages.png";
import img1 from "../assets/beverages/Apple Juice.jpg";
import img2 from "../assets/beverages/Fanta.jpg";
import img3 from "../assets/beverages/Green tin mojito.jpg";
import img4 from "../assets/beverages/Juice Bottle Mockup (1).jpg";
import img5 from "../assets/beverages/Juice Bottle Mockup (2).jpg";
import img6 from "../assets/beverages/Juice Bottle Mockup.jpg";
import img7 from "../assets/beverages/Orange Juice.jpg";
import img8 from "../assets/beverages/mixed fruits.jpg";

const products: Product[] = [
  {
    id: 1,
    name: "Al Boustane Apple Juice – Fresh Press",
    sku: "BV-APJ-001",
    category: "Juices",
    image: img1,
    price: "LKR 650",
    unit: "bottle",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Fanta Orange – 500ml",
    sku: "BV-SFT-002",
    category: "Soft Drinks",
    image: img2,
    price: "LKR 280",
    unit: "bottle",
    badge: "Popular",
  },
  {
    id: 3,
    name: "Mojito Lime Mint – Sparkling Can",
    sku: "BV-SPA-003",
    category: "Sparkling Drinks",
    image: img3,
    price: "LKR 350",
    unit: "can",
    badge: "New",
  },
  {
    id: 4,
    name: "Fresh Tropical Juice – 1L",
    sku: "BV-JCE-004",
    category: "Juices",
    image: img4,
    price: "LKR 520",
    unit: "bottle",
  },
  {
    id: 5,
    name: "Mixed Berry Smoothie Bottle",
    sku: "BV-SMT-005",
    category: "Smoothies",
    image: img5,
    price: "LKR 780",
    unit: "bottle",
  },
  {
    id: 6,
    name: "Mango Passion Fruit Juice",
    sku: "BV-JCE-006",
    category: "Juices",
    image: img6,
    price: "LKR 480",
    unit: "bottle",
  },
  {
    id: 7,
    name: "Pfanner Premium Juice – 2L",
    sku: "BV-PFN-007",
    category: "Juices",
    image: img7,
    price: "LKR 1,200",
    unit: "carton",
    badge: "Value Pack",
  },
  {
    id: 8,
    name: "Energy Drink – Power Boost 500ml",
    sku: "BV-ENG-008",
    category: "Energy Drinks",
    image: img8,
    price: "LKR 420",
    unit: "can",
  },
];

export default function Beverages() {
  return (
    <CategoryPageLayout
      title="Beverages"
      subtitle="Drinks & Refreshments"
      description="Soft drinks, juices, water, energy drinks, sparkling beverages, and smoothies for retailers of all sizes."
      accentColor="blue"
      accentHex="#3B82F6"
      products={products}
      heroImage={heroImg}
      backPath="/"
    />
  );
}
