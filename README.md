# 🏡 Lisa Properties (Pty) Ltd Website

## Overview
Build a **modern, responsive real estate website** for **Lisa Properties (Pty) Ltd** using **Next.js (App Router)**, **React**, and **TailwindCSS**.

The website showcases property listings, company information, services, and contact details.  
It must be professional, elegant, mobile-friendly, and easy to expand with new listings or API integrations in the future.

---

## 🧱 Tech Stack
- **Next.js (App Router)**
- **React**
- **TailwindCSS**
- **Next/Image** for optimized images
- **Optional:** `swiper` or `react-slick` for the property gallery

---

## 📂 Project Structure
/app
/components
Navbar.jsx
Footer.jsx
PropertyCard.jsx
PropertyGallery.jsx
/listings
page.jsx
[id]/page.jsx
/about/page.jsx
/services/page.jsx
/contact/page.jsx
page.jsx → Home page
/data
listings.js
/public/images
logo.png
hero.jpg
favicon.ico

yaml
Copy code

---

## 🎨 Design & Branding
**Color Palette**
- Primary: `#c19a6b` (warm gold)
- Secondary: `#1a1a1a` (charcoal)
- Background: `#ffffff` (white)
- Accent: `#f5f5f5` (soft gray)

**Font:** `Inter` or `Poppins`  
**Style:** Minimalist, elegant, property-focused  

---

## 🖼️ Assets & Branding
Images to be uploaded manually after generation:

/public/images/logo.png → Company logo
/public/images/hero.jpg → Homepage hero background
/public/images/favicon.ico → Browser favicon

yaml
Copy code

> Include `<Image src="/images/logo.png" alt="Lisa Properties Logo" />` placeholders until files are uploaded.

---

## 🏠 Pages

### 1. Home (`/`)
- Hero section with tagline:  
  **"Redefining Real Estate with Purpose and Innovation."**
- Brief company introduction with “View Listings” button.
- Featured listings from `/data/listings.js` displayed in a responsive grid.
- Footer and social icons at bottom.

---

### 2. Listings (`/listings`)
- Display all property listings from `data/listings.js`.
- Show image, price, bedrooms, bathrooms, erf size, and summary.
- Filters and sorting for price, bedrooms, property type.
- Click opens **Property Details** page.

---

### 3. Property Details (`/listings/[id]`)
- Image carousel using `swiper` or `react-slick`.
- Show all listing details:  
  price, bedrooms, bathrooms, erf size, zoning, and description.
- “Contact Agent” button linking to `/contact`.

---

### 4. About (`/about`)
Use this text:

> Founded in 2020, Lisa Properties (Pty) Ltd is a forward-thinking real estate company based in Johannesburg South, South Africa, specializing in property sales, rental placements, rental management, and property development across both residential and commercial sectors.  
>
> At Lisa Properties, we are driven by a bold vision — to become the most renowned, profitable, and youth-driven global real estate brand. Our mission is built on innovation, diversity, and empowerment, reflecting our belief that young leaders are shaping the future of Africa’s property industry.  
>
> Our team of qualified Property Practitioners go beyond facilitating transactions — we create exceptional real estate experiences. Whether you are a buyer, seller, landlord, or tenant, we are dedicated to building long-term relationships rooted in honesty, transparency, professionalism, compliance, integrity, and loyalty.  
>
> As part of a broader ecosystem of innovation, Lisa Properties collaborates across industries and maintains a strategic partnership with its sister company, **TMTR20**, led by a dynamic young entrepreneur. Together, we are not just changing real estate — we are redefining what it means to lead with purpose in Africa’s property market.

---

### 5. Services (`/services`)
List these clearly, using cards or icons:
- Property Sales (Residential & Commercial)
- Rental Placements & Tenant Screening
- Property Management
- Property Development Projects
- Real Estate Consulting

---

### 6. Contact (`/contact`)
Include:
- 📍 Johannesburg South, South Africa  
- 📧 lisa_properties@outlook.com  
- 📱 +27 84 012 7473  
- 📸 Instagram: @mahlatselisa  
- 📘 Facebook: Lisa Properties  
- 🌐 www.lisaproperties.co.za  

Add a **contact form** (client-side only):
- Name  
- Email  
- Message  

---

## 🧠 Components

### Navbar
- Logo on left (link to Home)
- Links: Home / Listings / About / Services / Contact
- Sticky on scroll with subtle shadow

### Footer
- Display contact info & social icons
- © {new Date().getFullYear()} Lisa Properties (Pty) Ltd. All rights reserved.

### PropertyCard.jsx
- Thumbnail, price, bedrooms, bathrooms, short summary
- On click → open details page

### PropertyGallery.jsx
- Carousel or image grid for property images

---

## 🧾 Data (`/data/listings.js`)
Use:

```javascript
export const listings = [
  {
    price: 'R 1 000 000',
    abbreviated: "Don't miss the chance to invest in this gem located in the heart of Soweto...",
    parkingSpaces: '1',
    bathrooms: '2',
    bedrooms: '3',
    galleryImgs: [
      'https://images.prop24.com/363784237/Ensure1280x720',
      'https://images.prop24.com/363784238/Ensure1280x720',
      ...
    ],
    listingNumber: '116364280',
    propertyType: 'House',
    listingDate: '26 August 2025',
    erfSize: '382 m²',
    zoning: 'Single Residential'
  },
  {
    price: 'R 1 900 000',
    abbreviated: 'This stunning family home is now available for sale! Perfectly located in Oakdene...',
    parkingSpaces: '2',
    bathrooms: '2',
    bedrooms: '4',
    galleryImgs: [
      'https://images.prop24.com/359724521/Ensure1280x720',
      'https://images.prop24.com/359724520/Ensure1280x720',
      ...
    ],
    listingNumber: '115825689',
    propertyType: 'House',
    listingDate: '05 April 2025',
    erfSize: '992 m²',
    zoning: 'R 2 500'
  }
];
Repeat these objects a few times to simulate multiple listings.

📱 Responsiveness
Fully responsive (mobile → desktop)

Tailwind responsive classes

Mobile menu with hamburger toggle for Navbar

⚙️ SEO & Metadata
Global Settings (in /app/layout.jsx)
jsx
Copy code
export const metadata = {
  title: "Lisa Properties (Pty) Ltd | Real Estate Johannesburg South",
  description:
    "Lisa Properties (Pty) Ltd is a Johannesburg-based real estate company specializing in property sales, rentals, management, and development. Redefining real estate with purpose and innovation.",
  keywords: [
    "Lisa Properties",
    "Real Estate Johannesburg",
    "Property for Sale",
    "Property for Rent",
    "South Africa Real Estate",
    "TMTR20",
  ],
  openGraph: {
    title: "Lisa Properties (Pty) Ltd",
    description:
      "Redefining Real Estate with Purpose and Innovation in Johannesburg South.",
    url: "https://www.lisaproperties.co.za",
    siteName: "Lisa Properties",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 600,
        alt: "Lisa Properties Logo",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
  icons: {
    icon: "/images/favicon.ico",
  },
};
Each page can override metadata with custom titles and descriptions, for example:

jsx
Copy code
export const metadata = {
  title: "Property Listings | Lisa Properties",
  description: "Browse available properties for sale and rent in Johannesburg South.",
};