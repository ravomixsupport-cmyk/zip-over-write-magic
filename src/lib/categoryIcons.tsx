import {
  GraduationCap, Briefcase, Landmark, Heart, CreditCard, Building2, Hospital,
  Home, Banknote, Zap, Globe, Phone, ShoppingBag, Truck, Scale,
  Shield, Users, Baby, Plane, Car, Wifi, Tv, Flame, Droplets, 
  Construction, Package, Store, Receipt, FileWarning, AlertTriangle,
  Laptop, Gavel, Calculator, Mail, Rocket,
  type LucideIcon
} from "lucide-react";

// Application category icons
export const applicationCategoryIcons: Record<string, LucideIcon> = {
  "School / College": GraduationCap,
  "Office / Job": Briefcase,
  "Government / Legal": Landmark,
  "Medical / Health": Hospital,
  "Banking / Financial": CreditCard,
  "Banking": CreditCard,
  "Property / Housing": Building2,
  "Personal / General": Heart,
  "Travel / Immigration": Plane,
  "Vehicle / Transport": Car,
  "Work From Home / Corporate": Laptop,
  "Advocate / Legal": Gavel,
  "CA / Finance": Calculator,
  "Postal / Courier": Mail,
  "Startup / Business": Rocket,
};

// Complaint category icons
export const complaintCategoryIcons: Record<string, LucideIcon> = {
  "Housing / Property": Home,
  "Bank / Financial": Banknote,
  "Public Utility": Zap,
  "Service Provider": Wifi,
  "Consumer / Shopping": ShoppingBag,
  "Transport / Travel": Truck,
  "Workplace / Employment": Briefcase,
  "Education / School": GraduationCap,
  "Medical / Hospital": Hospital,
  "Health / Hospital": Hospital,
  "Legal / Government": Scale,
  "Legal / Police": Scale,
  "Municipal": Building2,
  "Cyber / Online": Globe,
  "Insurance": Shield,
  "Telecom": Phone,
  "E-Commerce": Package,
  "Food / Restaurant": Store,
  "Work From Home / Corporate": Laptop,
  "Advocate / Legal": Gavel,
  "CA / Finance": Calculator,
  "Postal / Courier": Mail,
};

// Get icon for a category, with fallback
export const getCategoryIcon = (category: string, type: 'application' | 'complaint'): LucideIcon => {
  const map = type === 'application' ? applicationCategoryIcons : complaintCategoryIcons;
  return map[category] || (type === 'application' ? FileWarning : AlertTriangle);
};
