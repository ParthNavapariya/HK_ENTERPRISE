/**
 * Primary application routes supported by the client-side hash router
 */
export type Page = "home" | "about" | "story" | "products" | "contact" | "detail" | "ourstory"

/**
 * Hardware product categories
 */
export type Category = "All" | "Bed Clamp" | "Bed Socket" | "Hinges" | "L Corner" | "Bed Fittings" | "Lockpatti"

/**
 * Product Item data model representing individual hardware fittings
 */
export interface ProductItem {
  /** Unique URL-friendly slug / product identifier (e.g. "bc-01") */
  id: string
  /** Official SKU / catalog code (e.g. "HK-BC-101") */
  code?: string
  /** Primary product display name in English */
  name: string
  /** Product display name in Gujarati */
  nameGu?: string
  /** Specific category this item belongs to */
  category: Exclude<Category, "All">
  /** Display label for category section */
  categoryName?: string
  /** Short summary note */
  note: string
  /** Detailed technical description in English */
  description?: string
  /** Detailed technical description in Gujarati */
  descriptionGu?: string
  /** Surface finishing coating (e.g. "White Zinc Plated", "Powder Coated") */
  finish?: string
  /** Dimensional sizing (e.g. "4 Inch", "1 x 2") */
  size?: string
  /** Gauge or thickness rating (e.g. "Light, Medium, Heavy", "Regular") */
  thickness?: string
  /** Included or compatible bolt size (e.g. "5 Aani Bolt", "6 Aani Bolt") */
  boltSize?: string
  /** Availability status */
  available?: string
  /** Load capacity rating */
  loadCapacity?: string
  /** Form factor dimensions */
  dimensions?: string
  /** Bullet points of key technical specifications */
  features?: string[]
  /** Primary image asset path in /public */
  image: string
  /** Additional product views/angles for gallery */
  images?: string[]
  /** Highlight pill / chip shown on cards */
  badge?: string
}

/**
 * Company contact details, operational hours, and metadata
 */
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
