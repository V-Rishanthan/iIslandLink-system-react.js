import CategoryPageLayout, {
  type Product,
} from "../components/CategoryPageLayout";

import heroImg from "../assets/categories/packaged_foods.png";
import img1 from "../assets/packagedFoods/Chiken Pack.jpg";
import img2 from "../assets/packagedFoods/Chilli.jpg";
import img3 from "../assets/packagedFoods/Full Chiken Pack.jpg";
import img4 from "../assets/packagedFoods/Peanets.jpg";
import img5 from "../assets/packagedFoods/vegetable.jpg";
import img6 from "../assets/packagedFoods/cooking oil.jpg";
import img7 from "../assets/packagedFoods/mixed nuts.jpg";
import img8 from "../assets/packagedFoods/mixed vegetable.jpg";
import img9 from "../assets/packagedFoods/vegetable 1.jpg";
import img10 from "../assets/packagedFoods/vegetable 2.jpg";
const products: Product[] = [
  {
    id: 1,
    name: "Kravings Mixed Nuts – Premium Blend",
    sku: "PF-NUT-001",
    category: "Snacks",
    image: img1,
    price: "LKR 1,450",
    unit: "pack",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Gourmet Pasta – Italian Style Pack",
    sku: "PF-PST-002",
    category: "Dry Staples",
    image: img2,
    price: "LKR 890",
    unit: "box",
  },
  {
    id: 3,
    name: "Premium Cooking Oil – 5L",
    sku: "PF-OIL-003",
    category: "Cooking Essentials",
    image: img3,
    price: "LKR 3,200",
    unit: "bottle",
    badge: "Popular",
  },
  {
    id: 4,
    name: "Canned Beans – Ready to Eat",
    sku: "PF-CAN-004",
    category: "Canned Goods",
    image: img4,
    price: "LKR 320",
    unit: "can",
  },
  {
    id: 5,
    name: "Breakfast Cereal – Whole Grain",
    sku: "PF-CRL-005",
    category: "Cereals",
    image: img5,
    price: "LKR 1,100",
    unit: "box",
    badge: "New",
  },
  {
    id: 6,
    name: "Spice & Condiment Gift Set",
    sku: "PF-SPC-006",
    category: "Condiments",
    image: img6,
    price: "LKR 2,800",
    unit: "set",
    badge: "Value Pack",
  },
  {
    id: 7,
    name: "Instant Noodle Cups – Variety Pack",
    sku: "PF-NDL-007",
    category: "Snacks",
    image: img7,
    price: "LKR 750",
    unit: "pack",
  },
  {
    id: 8,
    name: "Rice Crackers – Assorted Flavours",
    sku: "PF-SNK-008",
    category: "Snacks",
    image: img8,
    price: "LKR 480",
    unit: "pack",
  },
  {
    id: 9,
    name: "Organic Tomato Ketchup – 500ml",
    sku: "PF-KTH-009",
    category: "Condiments",
    image: img9,
    price: "LKR 560",
    unit: "bottle",
  },
  {
    id: 10,
    name: "Dried Fruit & Trail Mix",
    sku: "PF-DFT-010",
    category: "Snacks",
    image: img10,
    price: "LKR 1,200",
    unit: "bag",
  },
];

export default function PackagedFoods() {
  return (
    <CategoryPageLayout
      title="Packaged Foods"
      subtitle="Food & Grocery Essentials"
      description="Cereals, canned goods, condiments, snacks, cooking oils, and dry staples distributed to retail shelves island-wide."
      accentColor="orange"
      accentHex="#F97316"
      products={products}
      heroImage={heroImg}
      backPath="/"
    />
  );
}
