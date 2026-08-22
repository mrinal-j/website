// One shared list of the featured projects, used by the home page grid and by
// the "more work" strip at the bottom of each project page.
//
// `id` — a short key used to list a project under a category below.
// `x` — horizontal crop: 0% = left edge, 50% = center, 100% = right edge
// `y` — vertical crop:   0% = top edge,  50% = center, 100% = bottom edge
// `hoverImage` — optional; the card photo cross-fades to this on hover.
// `cardHeight` — how tall this project's photo stands in the home page grid.
//   The heights deliberately differ so the two columns fall out of step with
//   each other instead of lining up in neat rows.
export type Project = {
  id: string
  slug: string
  title: string
  description: string
  tags: string[]
  image: string
  hoverImage?: string
  cardHeight: number
  x: string
  y: string
}

export const projects: Project[] = [
  {
    id: 'un80',
    slug: '/un80',
    title: 'UN80 Initiative',
    description: "A sub-identity for the UN80 Initiative, the United Nations' system-wide reform effort.",
    tags: ['Brand Identity', 'Design Systems', 'Content Strategy', 'Multi-channel Design', 'Figma', 'Adobe CC', 'Drupal'],
    image: '/images/un80-logo-on-blue.webp',
    hoverImage: '/images/un80_banner 5.webp',
    cardHeight: 480,
    x: '50%', y: '50%',
  },
  {
    id: 'unga80',
    slug: '/unga80',
    title: 'United Nations General Assembly Exhibit 2025',
    description: 'An immersive UN 2.0 exhibit at UN Headquarters, with a visual identity built on AI-generated photography.',
    tags: ['Exhibition Design', 'Visual Identity', 'AI Imagery', 'Art Direction', 'Brand Design', 'Print Design', 'Adobe CC', 'Figma'],
    image: '/images/unga80-unga-sign.webp',
    hoverImage: '/images/unga80-lounge-column.webp',
    cardHeight: 430,
    x: '50%', y: '50%',
  },
  {
    id: 'kaaro',
    slug: '/kaaro',
    title: 'Kaaro',
    description: 'Branding, strategy and product design for a handcrafted jewelry brand.',
    tags: ['Brand Identity', 'Brand Strategy', 'Market Research', 'Logo Design', 'Jewelry Design', 'Photography'],
    image: '/images/kaaro.webp',
    hoverImage: '/images/kaaro_banner.webp',
    cardHeight: 360,
    x: '50%', y: '50%',
  },
  {
    id: 'housing-works',
    slug: 'https://legacy.mrinaljadhav.com/housing-works',
    title: 'Reimagining Housing Works, New York',
    description: 'Transforming their thrift shop into a global retail destination that fuels its mission of community empowerment.',
    tags: ['Brand Strategy', 'Retail Experience Design', 'Customer Experience (CX)', 'Design for Social Impact', 'Design Strategy', 'Storytelling'],
    image: '/images/housing_works_cover.webp',
    hoverImage: '/images/housing_works_banner.webp',
    cardHeight: 380,
    x: '50%', y: '50%',
  },
  {
    id: 'in-the-loop',
    slug: '/in-the-loop',
    title: 'In the Loop',
    description: 'Redefining professional mobility as a tool for community building and intentional growth.',
    tags: ['UX Research', 'Service Design', 'Brand Strategy', 'Systems Thinking', 'Product Design', 'Adobe CC', 'Figma'],
    image: '/images/in-the-loop cover.webp',
    hoverImage: '/images/iHkx9gYek2TcjPXt4cRuVfh1s.webp',
    cardHeight: 410,
    x: '50%', y: '50%',
  },
  {
    id: 'know-your-vote',
    slug: 'https://legacy.mrinaljadhav.com/know-your-vote',
    title: 'Know your Vote',
    description: 'A design intervention that transforms how voters access, understand, and engage with electoral information.',
    tags: ['Design for Impact', 'Service Design', 'Service Blueprint', 'Design Strategy', 'Figma', 'Prototyping', 'Digital Design', 'Print Design'],
    image: '/images/PN2PjVKa1k8qTqovQptaN279mD4.webp',
    hoverImage: '/images/know_your_vote_banner.webp',
    cardHeight: 450,
    x: '50%', y: '68%',
  },
]

// The three tabs above the home page work grid. A project can sit under more
// than one tab. The order of the ids is the reading order: on a phone the
// cards appear in exactly this order, and on a wide screen they fill the two
// columns left, right, left, right.
export const workCategories: { label: string; ids: string[] }[] = [
  { label: 'Featured Works', ids: ['un80', 'unga80', 'kaaro', 'in-the-loop'] },
  { label: 'Brand Design', ids: ['un80', 'unga80', 'housing-works', 'know-your-vote'] },
  { label: 'Strategy', ids: ['in-the-loop', 'housing-works', 'know-your-vote', 'kaaro'] },
]

/** The projects under one tab, in the order listed in `workCategories`. */
export function projectsInCategory(label: string): Project[] {
  const category = workCategories.find((c) => c.label === label)
  if (!category) return projects
  return category.ids
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is Project => p != null)
}
