export const mainNavConfig = [
  { name: 'PLANTS', href: '/plants' },
  { name: 'POTS', href: '/pots' },
  { name: 'LOOKBOOK', href: '/lookbook' },
] as const;

export const footerNavConfig = [
  {
    title: 'Shop',
    items: [
      { name: 'All Plants', href: '/plants' },
      { name: 'All Pots', href: '/pots' },
      { name: 'New Arrivals', href: '/new-arrivals' },
      { name: 'Sale', href: '/sale' },
    ],
  },
  {
    title: 'Company',
    items: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Support',
    items: [
      { name: 'Plant Care', href: '/care-guide' },
      { name: 'FAQs', href: '/faq' },
      { name: 'Shipping', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  },
] as const; 