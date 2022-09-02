import {
  CogIcon,
  CreditCardIcon,
  HomeIcon,
  LogoutIcon,
  ShoppingBagIcon,
  ClipboardListIcon,
  AnnotationIcon,
  QrcodeIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import { CashIcon, StarIcon } from "@heroicons/react/solid";

export const navigationData = [
  { name: "Home", href: "/home", icon: HomeIcon, current: true },
  { name: "Shop", href: "/shop", icon: ShoppingBagIcon, current: false },
  { name: "Withdraw", href: "/withdraw", icon: CreditCardIcon, current: false },
  {
    name: "Transactions",
    href: "/transactions",
    icon: ClipboardListIcon,
    current: false,
  },
];
export const navigationDataAdmin = [
  { name: "Top ups", href: "/top-ups", icon: QrcodeIcon, current: false },
  {
    name: "Withdrawals",
    href: "/withdrawals",
    icon: CreditCardIcon,
    current: false,
  },
  { name: "Staffs", href: "/staffs", icon: UserGroupIcon, current: false },
];
export const navigationDataStaff = [
  { name: "Top ups", href: "/top-ups", icon: QrcodeIcon, current: false },
  {
    name: "Withdrawals",
    href: "/withdrawals",
    icon: CreditCardIcon,
    current: false,
  },
];
export const secondaryNavigationData = [
  { name: "Settings", href: "/settings", icon: CogIcon },
  {
    name: "Need Help?",
    href: "https://facebook.com/Lyradig-101271166061357/",
    icon: AnnotationIcon,
  },
  { name: "Logout", href: "#", icon: LogoutIcon },
];
export const secondaryNavigationDataAdmin = [
  { name: "Settings", href: "/settings", icon: CogIcon },
  { name: "Logout", href: "#", icon: LogoutIcon },
];
export const cardsData = [
  {
    name: "Total Earned Points",
    href: "#",
    icon: StarIcon,
    amount: "...",
  },
  {
    name: "Total Earned Referral Points",
    href: "#",
    icon: StarIcon,
    amount: "...",
  },
  {
    name: "Total Earned Daily Points",
    href: "#",
    icon: StarIcon,
    amount: "...",
  },
  {
    name: "Total Available Points",
    href: "#",
    icon: StarIcon,
    amount: "...",
  },
  {
    name: "Total Withdrawn Points",
    href: "#",
    icon: StarIcon,
    amount: "...",
  },
  { name: "Total Investment", href: "#", icon: CashIcon, amount: "..." },
  // More items...
];
export const products = [
  {
    id: 1,
    name: "Earthen Bottle",
    href: "#",
    price: "₱48",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "#",
    price: "₱35",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    href: "#",
    price: "₱89",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 4,
    name: "Machined Mechanical Pencil",
    href: "#",
    price: "₱35",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 5,
    name: "Earthen Bottle",
    href: "#",
    price: "₱48",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 6,
    name: "Nomad Tumbler",
    href: "#",
    price: "₱35",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 7,
    name: "Focus Paper Refill",
    href: "#",
    price: "₱89",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 8,
    name: "Machined Mechanical Pencil",
    href: "#",
    price: "₱35",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  // More products...
];
export const POST = "POST";
export const GET = "GET";
export const PUT = "PUT";
export const PATCH = "PATCH";
export const DELETE = "DELETE";
export const STALE_TIME = 1000 * 60 * 1;
