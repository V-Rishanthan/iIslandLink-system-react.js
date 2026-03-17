import CategoryPageLayout, {
  type Product,
} from "../components/CategoryPageLayout";

import heroImg from "../assets/categories/personal_care.png";

import img1 from "../assets/personalCareItems/Dettol.jpg";
import img2 from "../assets/personalCareItems/Dove Body Wash.jpg";
import img3 from "../assets/personalCareItems/Hot Water Bottle.jpg";
import img4 from "../assets/personalCareItems/Mask.jpg";
import img5 from "../assets/personalCareItems/Plastic Gloves.jpg";
import img6 from "../assets/personalCareItems/Rose Dettol.jpg";
import img7 from "../assets/personalCareItems/Sanitizer.jpg";
import img8 from "../assets/personalCareItems/Toothbrush.jpg";
import img9 from "../assets/personalCareItems/Towel.jpg";
import img10 from "../assets/personalCareItems/Underarm Crutches.jpg";

const products: Product[] = [
  {
    id: 1,
    name: "Colgate Extra Clean Toothbrush (6 Pack)",
    sku: "PC-TBR-001",
    category: "Oral Care",
    image: img1,
    price: "LKR 1,250",
    unit: "pack",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Dettol Original Liquid Handwash 875ml",
    sku: "PC-HW-002",
    category: "Hand Hygiene",
    image: img2,
    price: "LKR 680",
    unit: "bottle",
    badge: "Popular",
  },
  {
    id: 3,
    name: "Dove Nourishing Body Wash",
    sku: "PC-BW-003",
    category: "Bath & Body",
    image: img3,
    price: "LKR 950",
    unit: "bottle",
  },
  {
    id: 4,
    name: "Personal Care Essentials Kit",
    sku: "PC-KIT-004",
    category: "Bath & Body",
    image: img4,
    price: "LKR 2,500",
    unit: "kit",
    badge: "Value Pack",
  },
  {
    id: 5,
    name: "Hot Water Bottle with Knitted Cover 2L",
    sku: "PC-HWB-005",
    category: "Health & Wellness",
    image: img5,
    price: "LKR 1,800",
    unit: "piece",
  },
  {
    id: 6,
    name: "Disposable Gloves – Kitchen & Food Handling (1000 Pcs)",
    sku: "PC-GLV-006",
    category: "Health & Wellness",
    image: img6,
    price: "LKR 3,200",
    unit: "box",
  },
  {
    id: 7,
    name: "Aluminum Underarm Crutches – Youth",
    sku: "PC-CRT-007",
    category: "Health & Wellness",
    image: img7,
    price: "LKR 4,500",
    unit: "pair",
  },
  {
    id: 8,
    name: "Premium Skincare Cream",
    sku: "PC-SKN-008",
    category: "Skincare",
    image: img8,
    price: "LKR 1,350",
    unit: "jar",
  },
  {
    id: 9,
    name: "Daily Moisturizing Lotion",
    sku: "PC-SKN-009",
    category: "Skincare",
    image: img9,
    price: "LKR 780",
    unit: "bottle",
  },
  {
    id: 10,
    name: "Hair Care Shampoo & Conditioner Set",
    sku: "PC-HC-010",
    category: "Hair Care",
    image: img10,
    price: "LKR 1,600",
    unit: "set",
    badge: "New",
  },
];

export default function PersonalCare() {
  return (
    <CategoryPageLayout
      title="Personal Care"
      subtitle="Health & Hygiene Essentials"
      description="Soaps, shampoos, skincare, oral care, and hygiene products for everyday consumers. Quality brands at wholesale prices."
      accentColor="pink"
      accentHex="#EC4899"
      products={products}
      heroImage={heroImg}
      backPath="/"
    />
  );
}
