// One shared list of the featured projects, used by the home page grid and by
// the "more work" strip at the bottom of each project page.
//
// `x` — horizontal crop: 0% = left edge, 50% = center, 100% = right edge
// `y` — vertical crop:   0% = top edge,  50% = center, 100% = bottom edge
// `hoverImage` — optional; the card photo cross-fades to this on hover.
export type Project = {
  slug: string
  title: string
  description: string
  tags: string[]
  image: string
  hoverImage?: string
  x: string
  y: string
}

export const projects: Project[] = [
  {
    slug: '/un80',
    title: 'UN80 Initiative',
    description: "A sub-identity for the United Nations' system-wide reform effort, built inside the UN master brand and carried across the web, the feed and the inbox.",
    tags: ['Brand Identity', 'Design Systems', 'Content Strategy', 'Multi-channel Design', 'Figma', 'Adobe CC', 'Drupal'],
    image: '/images/un80-logo-on-blue.webp',
    hoverImage: '/images/un80_banner 5.webp',
    x: '50%', y: '50%',
  },
  {
    slug: '/in-the-loop',
    title: 'In the Loop',
    description: 'Redefining professional mobility as a tool for community building and intentional growth.',
    tags: ['UX Research', 'Service Design', 'Brand Strategy', 'Systems Thinking', 'Product Design', 'Adobe CC', 'Figma'],
    image: '/images/in-the-loop cover.webp',
    hoverImage: '/images/iHkx9gYek2TcjPXt4cRuVfh1s.webp',
    x: '50%', y: '50%',
  },
  {
    slug: 'https://legacy.mrinaljadhav.com/know-your-vote',
    title: 'Know your Vote',
    description: 'A design intervention that transforms how voters access, understand, and engage with electoral information.',
    tags: ['Design for Impact', 'Service Design', 'Service Blueprint', 'Design Strategy', 'Figma', 'Prototyping', 'Digital Design', 'Print Design'],
    image: '/images/PN2PjVKa1k8qTqovQptaN279mD4.webp',
    hoverImage: '/images/know_your_vote_banner.webp',
    x: '50%', y: '68%',
  },
  {
    slug: 'https://legacy.mrinaljadhav.com/housing-works',
    title: 'Reimaging Housing Works, New York',
    description: 'Transforming their thrift shop into a global retail destination that fuels its mission of community empowerment.',
    tags: ['Brand Strategy', 'Retail Experience Design', 'Customer Experience (CX)', 'Design for Social Impact', 'Design Strategy', 'Storytelling'],
    image: '/images/housing_works_cover.webp',
    hoverImage: '/images/housing_works_banner.webp',
    x: '50%', y: '50%',
  },
  {
    slug: '/kaaro',
    title: 'Kaaro',
    description: 'Branding, strategy and product design for a handcrafted jewelry brand.',
    tags: ['Brand Identity', 'Brand Strategy', 'Market Research', 'Logo Design', 'Jewelry Design', 'Photography'],
    image: '/images/kaaro.webp',
    hoverImage: '/images/kaaro_banner.webp',
    x: '50%', y: '50%',
  },
]
