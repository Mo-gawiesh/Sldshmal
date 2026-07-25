export const siteConfig = {
  name: 'مؤسسة صلد الشمال لشراء الخردة والمعادن',
  alternateName: 'Solid Scrap Of The North',
  description: 'مؤسسة صلد الشمال لشراء جميع أنواع الخردة والمعادن، الجمع، النقل، والفرز في المملكة العربية السعودية. حلول متكاملة للمخلفات الصناعية والورش والمصانع.',
  keywords: 'صلد الشمال, شراء خردة, سكراب تبوك, إعادة تدوير المعادن, شراء معادن السعودية, مخلفات صناعية, سكراب الحديد, سكراب النحاس',
  url: 'https://solid-scrap.com',
  ogImage: '/attached_assets/generated_images/hero.jpg',
  telephone: '+966543019329',
  email: 'Sldalshmal@gmail.com',
  address: {
    streetAddress: 'المنطقة الصناعية',
    addressLocality: 'تبوك',
    addressRegion: 'تبوك',
    addressCountry: 'SA',
    postalCode: '71491',
  },
  geo: {
    latitude: '28.5595749',
    longitude: '36.6860525',
  },
  mapUrl: 'https://maps.app.goo.gl/RwZqwLyBnBpYRP7S6',
  openingHours: {
    opens: '00:00',
    closes: '23:59',
    days: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
  },
  socials: {
    whatsapp: 'https://wa.me/966543019329',
  },
};

export type SiteConfig = typeof siteConfig;
