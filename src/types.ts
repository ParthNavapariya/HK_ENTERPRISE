export type Page = "home" | "about" | "story" | "products" | "contact" | "detail" | "ourstory";
export type Category =
  | "All"
  | "Bed Clamp"
  | "Bed Socket"
  | "Hinges"
  | "L Corner"
  | "Bed Fittings"
  | "Lockpatti"

export interface ProductItem {
  id: string
  code?: string
  name: string
  nameGu?: string
  category: Exclude<Category, "All">
  categoryName?: string
  note: string
  description?: string
  descriptionGu?: string
  material?: string
  finish?: string
  thickness?: string
  loadCapacity?: string
  dimensions?: string
  features?: string[]
  image: string
  images?: string[]
  badge?: string
}

export interface CompanyInfo {
  name: string
  tagline: string
  subTagline: string
  phone: string
  phoneDisplay: string
  whatsappUrl: string
  email?: string
  address: string
  hours: string
}
