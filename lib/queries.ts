// GROQ queries for Sanity CMS

// ดึงข้อมูล services ทั้งหมดที่ isActive = true เรียงตาม order
export const servicesQuery = `
  *[_type == "service" && isActive == true] | order(order asc) {
    _id,
    title,
    subtitle,
    shortDescription,
    problem,
    solution,
    deliverables,
    pricing,
    order
  }
`;

// ดึงข้อมูล portfolio ที่ isActive = true เรียงตาม order
export const portfolioQuery = `
  *[_type == "portfolio" && isActive == true] | order(order asc) {
    _id,
    title,
    description,
    result,
    "category": service->title,
    "imageUrl": image.asset->url,
    order
  }
`;

// ดึงข้อมูล siteSettings สำหรับ Footer
export const siteSettingsQuery = `
  *[_id == "siteSettings"][0] {
    companyName,
    contact {
      email,
      phone,
      lineUrl,
      address
    },
    socialLinks[] {
      platform,
      url
    },
    footerTagline
  }
`;

// ดึงข้อมูล homePage
export const homePageQuery = `
  *[_id == "homePage"][0] {
    hero {
      badge,
      heading,
      highlight,
      description
    },
    valueProps[] {
      title,
      description
    },
    stats[] {
      value,
      label,
      subLabel
    },
    cta {
      heading,
      description
    }
  }
`;

// ดึงข้อมูล products ที่ isActive = true เรียงตาม order
export const productsQuery = `
  *[_type == "product" && isActive == true] | order(order asc) {
    _id,
    title,
    productType,
    subtitle,
    description,
    features,
    suitableFor,
    originalPrice,
    salePrice,
    badge,
    "imageUrl": image.asset->url,
    ctaLink,
    order
  }
`;

// ดึงข้อมูล productsPage
export const productsPageQuery = `
  *[_id == "productsPage"][0] {
    hero,
    solution,
    benefitsSection,
    productsSection,
    cta,
    seo
  }
`;

// ดึงข้อมูล servicesPage
export const servicesPageQuery = `
  *[_id == "servicesPage"][0] {
    hero,
    cta,
    seo
  }
`;

// ดึงข้อมูล aboutPage
export const aboutPageQuery = `
  *[_id == "aboutPage"][0] {
    story {
      badge,
      heading,
      description,
      visionTitle,
      visionDescription,
      "imageUrl": image.asset->url,
      stats
    },
    philosophy,
    contact,
    seo
  }
`;
