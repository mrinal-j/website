import { createFileRoute } from '@tanstack/react-router'
import type { CSSProperties } from 'react'
import { useRef } from 'react'
import { Navbar } from '~/components/Navbar'
import { Footer } from '~/components/Footer'
import { MoreWork } from '~/components/case-study/MoreWork'
import { SectionLabel } from '~/components/SectionLabel'
import { useScrollReveal } from '~/hooks/useScrollReveal'
import {
  CAN_EDIT,
  MoveFramerPanel,
  MoveFramerProvider,
  useMoveFraming,
  useRegisterMoves,
} from '~/components/case-study/MoveFramer'
import s from '~/components/case-study/InTheLoop.module.css'
import h from '~/components/case-study/HousingWorks.module.css'

export const Route = createFileRoute('/housing-works')({
  head: () => ({
    meta: [
      { title: 'Reimagining Housing Works — Mrinal Jadhav' },
      {
        name: 'description',
        content:
          'Transforming Housing Works into a global retail destination that fuels its mission of community empowerment.',
      },
      // Keep this page out of search results while it is still being built.
      // Visitors can still reach it directly, and search engines may still
      // follow its links; they just won't list the page itself. Note that
      // /housing-works must stay crawlable in robots.txt, otherwise crawlers
      // never read this tag. A matching X-Robots-Tag header lives in
      // public/_headers, which also covers the images and the video.
      // Remove both when the page is ready to publish.
      { name: 'robots', content: 'noindex, follow' },
    ],
  }),
  component: HousingWorksRoute,
})

/** Wraps the page so the cards and the dev framing panel share state. */
function HousingWorksRoute() {
  return (
    <MoveFramerProvider>
      <HousingWorksPage />
    </MoveFramerProvider>
  )
}

// The three businesses Housing Works trades under, shown as their own marks.
const SUB_BRANDS = [
  {
    src: '/images/hw-logo-thrift.webp',
    alt: 'The Housing Works Thrift Shop logo: the slate wordmark above "THRIFT SHOP" in pink.',
  },
  {
    src: '/images/hw-logo-bookstore.webp',
    alt: 'The Housing Works Bookstore logo: the slate wordmark above "BOOKSTORE" in pink.',
  },
  {
    src: '/images/hw-logo-cannabis.webp',
    alt: 'The Housing Works Cannabis Co logo: the slate wordmark above "CANNABIS CO" in pink.',
  },
]

// The three ventures we studied, in the order we studied them: what each one
// is, what we noticed inside it, and the photographs the notes came from.
const VENTURES = [
  {
    title: 'Thrift Stores',
    facts: [
      '9 thrift stores across NYC.',
      'Online thrift shop (eShop), auctions, and Bookshop.org partnerships extend reach beyond physical stores.',
      'Relies on community donations of clothing, accessories, furniture, and home goods.',
    ],
    observations: [
      'Lack of visual cohesion across all touchpoints, such as clothing tags, packaging material or posters.',
      'Navigation is tough for a consumer for specific purchases.',
    ],
    caption: 'Housing Works Thrift Shop',
    photos: [
      {
        src: '/images/hw-thrift-1.webp',
        alt: 'Inside a Housing Works thrift store: a jewellery counter, racks of clothing and a customer at the till.',
      },
      {
        src: '/images/hw-thrift-2.webp',
        alt: 'A thrift store corner: hats on a stand, a mannequin, and a wall of hanging clothes above shelves of handbags.',
      },
      {
        src: '/images/hw-thrift-3.webp',
        alt: 'Shelves of donated crockery and homeware under a red "Donations" sign.',
      },
    ],
  },
  {
    title: 'Bookstore and Cafe',
    facts: [
      'Primarily relies on donated inventory and volunteer staffing.',
      'Space doubles as an event venue (e.g. readings, fundraisers, weddings etc.).',
      'The café serves coffee, wine and light fare, which keeps people in the space longer.',
    ],
    observations: [
      'Multiple ventures operating inside the same space makes one heavily rely on signage and directions which are lacking.',
      'Brand messaging could benefit from increased visual cohesion.',
      'Customers stay seated at the cafe without exploring merchandise (missed cross-selling opportunities).',
    ],
    caption: 'Housing Works Bookstore and Cafe',
    photos: [
      {
        src: '/images/hw-bookstore-1.webp',
        alt: 'The Housing Works Bookstore Cafe seen from the balcony: wall-height bookshelves, café tables and a neon bar sign.',
      },
      {
        src: '/images/hw-bookstore-2.webp',
        alt: 'The café counter under a red neon "Bar" sign, with bookshelves and a ladder alongside.',
      },
      {
        src: '/images/hw-bookstore-3.webp',
        alt: 'The children’s corner of the bookstore: a staff picks shelf, book bins and a hand-painted Housing Works chalkboard.',
      },
    ],
  },
  {
    title: 'Website and Social Media',
    facts: [
      'Website serves as both an e-commerce hub and mission advocacy portal, with clear CTAs for donations/volunteering.',
      'Leverages influencer partnerships over social media (e.g. LGBTQ+ creators).',
      'Promotions through ad boosts and posts of events to drive foot traffic.',
    ],
    observations: [
      'Social followers rarely translate to in-store.',
      'Inconsistency in branding and visual language.',
    ],
    caption: 'Housing Works Website and Instagram',
    // Screens, not photographs: shown whole rather than cropped.
    screens: true,
    photos: [
      {
        src: '/images/hw-eshop.webp',
        alt: 'The Housing Works eShop home page: a "Just In!" handbag banner above rows of new products and vintage staff picks.',
      },
      {
        src: '/images/hw-instagram.webp',
        alt: "The Housing Works Instagram profile and post grid, mixing shop photography, campaign graphics and advocacy posts.",
      },
    ],
  },
]

// The three things the reimagining sets out to do. Each picture sits in a
// narrow upright strip, so most of it is cropped away; x and y say which
// part shows, as percents, with 50/50 centred. In dev the framing panel
// can slide these about and copy the numbers back here.
const MOVES = [
  {
    text: 'Attract locals and tourists through storytelling',
    image: '/images/hw-move-1.webp',
    x: 100,
    y: 50,
  },
  {
    text: 'Bring NYC and its history into the store experience',
    image: '/images/hw-move-2.webp',
    x: 5,
    y: 50,
  },
  {
    text: 'Highlight their mission through the experience',
    image: '/images/hw-move-3.webp',
    x: 46,
    y: 50,
  },
]

// The brand, laid out as a bento in bands. Every tile carries its
// picture's true width-to-height ratio, and inside a band the tiles are
// given widths in proportion to those ratios. That makes every tile in a
// band land on exactly the same height while each picture keeps its own
// shape, so nothing has to be cropped to make the grid line up. The two
// written tiles are given a ratio too, which is simply how much of the
// band's width they take.
const BENTO_BANDS = [
  [
    {
      kind: 'statement' as const,
      ratio: 1.45,
      label: 'Vision',
      text: 'To be a representative of New York City by providing a safe platform for expression and education.',
    },
    {
      kind: 'image' as const,
      ratio: 1.7778,
      src: '/images/hw-logo-pink.webp',
      alt: 'The Housing Works wordmark reversed out of the brand crimson, with the house mark in black.',
    },
  ],
  [
    {
      kind: 'image' as const,
      ratio: 1.5295,
      src: '/images/hw-bento-browser-logo.webp',
      alt: 'The wordmark shown in a browser window on a yellow ground.',
    },
    {
      kind: 'image' as const,
      ratio: 0.7108,
      src: '/images/hw-bento-heart.webp',
      alt: 'A blue campaign card reading "Your Thrift with a Heart" above the wordmark.',
    },
    // These two sheets are drawn with the wordmark running into the very
    // edge of the artwork, so on a rounded tile the corners bite into it.
    // They sit inset instead, on a ground sampled from the artwork itself so
    // the inset reads as margin rather than as a second box.
    {
      kind: 'image' as const,
      ratio: 0.615,
      src: '/images/hw-bento-marks-light.webp',
      alt: 'The three sub-brand lockups on white: Thrift Store in pink, Cafe in blue, Bookstore in orange.',
      inset: true,
      ground: '#fff',
    },
    {
      kind: 'image' as const,
      ratio: 0.6516,
      src: '/images/hw-bento-marks-dark.webp',
      alt: 'The same three sub-brand lockups reversed out of black.',
      inset: true,
      ground: '#1c1a19',
    },
  ],
  [
    {
      kind: 'video' as const,
      ratio: 1.7778,
      src: '/images/hw-website-walkthrough.mp4',
      poster: '/images/hw-website-poster.webp',
      alt: 'A walkthrough of the proposed website, opening on the headline "Giving a second life to clothing and a second opportunity to people".',
    },
    {
      kind: 'statement' as const,
      ratio: 1.05,
      label: 'Mission',
      text: 'By giving a second life to belongings and a second chance to people, Housing Works gets inspired and gives hope to the innumerable lives in the city of New York.',
    },
  ],
  [
    {
      kind: 'image' as const,
      ratio: 1.5314,
      src: '/images/hw-bento-instagram.webp',
      alt: 'The Housing Works Instagram profile shown in a browser window on a yellow ground.',
    },
    {
      kind: 'image' as const,
      ratio: 1.0224,
      src: '/images/hw-bento-posters.webp',
      alt: 'Posters pasted on a concrete wall, a passer-by blurred in front of them.',
    },
    {
      // Four small proofs in one slot: the tags, keyrings and totes that
      // show the system reaching past the shopfront.
      kind: 'quad' as const,
      // Tuned so the four cells inside come out at the shape of the
      // pictures in them, once the gap between them is accounted for.
      ratio: 1.048,
      items: [
        {
          src: '/images/hw-asset-stickers.webp',
          alt: 'Stickers and badges carrying the wordmark.',
        },
        {
          src: '/images/hw-asset-keyrings.webp',
          alt: 'Two keyrings carrying the house mark.',
        },
        {
          src: '/images/hw-asset-tote-pink.webp',
          alt: 'A pink tote printed with a Statue of Liberty stamp reading "Thrift like a New Yorker".',
        },
        {
          src: '/images/hw-asset-tote-nyc.webp',
          alt: 'A canvas tote printed with a New York street sign.',
        },
      ],
    },
  ],
  [
    {
      kind: 'image' as const,
      ratio: 1.5634,
      src: '/images/hw-merch.webp',
      alt: 'Proposed merchandise on a grey ground: pink and black bucket hats, a knitted beanie, and three sweatshirts carrying the mark.',
    },
    {
      kind: 'image' as const,
      ratio: 1.1334,
      src: '/images/hw-social-mockup.webp',
      alt: 'A mockup of the proposed Housing Works Thrift Instagram: a profile grid held together by the brand pink, beside a single post.',
    },
    {
      // Two small tiles sharing one slot. The ratio is the pair's own: the
      // width at which both pictures, plus the gap between them, come to
      // exactly the height of the band they sit in.
      kind: 'stack' as const,
      ratio: 0.4486,
      items: [
        {
          src: '/images/hw-store-sign.webp',
          alt: 'The house mark on a black projecting sign above a shopfront.',
        },
        {
          src: '/images/hw-store-card.webp',
          alt: 'Two loyalty cards in the brand crimson, one carrying the wordmark and one offering five percent off for collecting a card.',
        },
      ],
    },
  ],
]

// The store, as its own bento: every render kept, with the three in-store
// moves set among them as written tiles, the way vision and mission sit
// among the brand pictures above.
const STORE_BANDS = [
  [
    {
      kind: 'image' as const,
      ratio: 1.9925,
      src: '/images/hw-store-layout.webp',
      alt: 'The proposed layout for the West Village thrift shop: a plan view marked with the story wall, brand assets, specialized zones and the donation corner, beside a cutaway of the same room.',
    },
    {
      kind: 'idea' as const,
      ratio: 1.05,
      title: 'A consistent retail layer',
      detail: 'Aprons, signage, displays.',
    },
  ],
  [
    {
      kind: 'image' as const,
      ratio: 1.7778,
      src: '/images/hw-store-render-2.webp',
      alt: 'A render of the proposed billing counter: branded joinery, a "Who are we?" mission poster, and merchandise on open shelves.',
    },
    {
      kind: 'image' as const,
      ratio: 1.7778,
      src: '/images/hw-store-render-3.webp',
      alt: 'A render showing New York inspired wayfinding above the rails, records on the brick wall, and branded tote bags on the shelf.',
    },
    {
      kind: 'idea' as const,
      ratio: 1.05,
      title: 'A corner for the neighborhood',
      detail: 'Local history, staff picks, wall art.',
    },
  ],
  [
    {
      kind: 'image' as const,
      ratio: 1.7778,
      src: '/images/hw-store-render-4.webp',
      alt: 'A render of the seating corner: a green sofa, a West Village transit map, staff picks signage and store-specific zones.',
    },
    {
      kind: 'image' as const,
      ratio: 1.7778,
      src: '/images/hw-store-render-1.webp',
      alt: 'A wide render of the proposed store: jewellery counter, wayfinding signage, framed New York artwork and the seating corner beyond.',
    },
  ],
  [
    {
      kind: 'idea' as const,
      ratio: 1.05,
      title: 'Walls that carry the mission',
      detail: 'Second-chance stories.',
    },
    {
      kind: 'image' as const,
      ratio: 1.7778,
      src: '/images/hw-store-render-5.webp',
      alt: 'A render of the NYC Stories wall: a grid of portraits filling the brick wall beside the fitting room, with two shoppers looking at it.',
    },
  ],
]

// What the mock room was built out of, each said in a single sentence.
// No headings: naming each one twice added a label without adding a
// meaning, so the sentence carries it on its own.
const PROTOTYPE_BUILD = [
  'Store layout echoing the West Village street grid.',
  "Housing Works' identity reinforced through the colours, signage, ambient lighting and music.",
  'Storytelling built in through a West Village history wall and a curated staff-pick corner.',
]

// What came back, strongest first.
const FINDINGS = [
  {
    stat: '70%+',
    text: "of visitors said they'd want to learn about the history of their own neighborhood.",
  },
  {
    text: 'Visitors consciously noticed the atmosphere: the scent, the lighting, the curated playlist. Several said the space taught them something they did not expect.',
  },
  {
    text: 'The neighborhood corner drew the most appreciation. People valued learning West Village history in a place they would never expect to find.',
  },
]

// What the team said it would watch once the reimagining was live. No
// grouping: they read as one set of things to keep an eye on.
const METRICS = [
  'Higher social media engagement',
  'Rise in volunteer sign-ups',
  'Increased website feedback and traffic',
  'Higher average time spent in stores',
  'Improved donation conversion rates',
  'Frequency of return visits',
  '% of customers who post about their visit',
]


/** One strategy card. The picture's framing comes from the move itself,
 *  unless the dev panel is overriding it. */
function MoveCard({
  move,
  index,
}: {
  move: (typeof MOVES)[number]
  index: number
}) {
  const framing = useMoveFraming(index, { x: move.x, y: move.y })
  return (
    <div className={h.moveCard}>
      <div className={h.moveBody}>
        <span className={h.moveNumber}>{`0${index + 1}`}</span>
        <p className={h.moveText}>{move.text}</p>
      </div>
      <div className={h.moveMedia}>
        <img
          src={move.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          style={{ objectPosition: `${framing.x}% ${framing.y}%` }}
        />
      </div>
    </div>
  )
}

function HousingWorksPage() {
  const mainRef = useRef<HTMLElement>(null)
  // Each top-level <section> fades and rises in as it enters the viewport.
  useScrollReveal(mainRef)
  // Names the three pictures for the dev framing panel.
  useRegisterMoves(MOVES.map((m) => m.text))

  return (
    <>
      <Navbar alwaysVisible />
      <main ref={mainRef} className={`${s.page} ${h.housingWorks} reveal-root`}>
        {/* ============ HERO ============ */}
        <section className={s.hero}>
          <div className={s.heroHeader}>
            <div className={s.heroTitle}>
              <h1>Reimagining Housing Works</h1>
            </div>
            <div className={s.heroDesc}>
              <p>
                Transforming Housing Works into a global retail destination
                that fuels its mission of community empowerment.
              </p>
            </div>
          </div>
        </section>

        {/* ============ HERO BANNER — the proposed store, before any of
             the argument starts. ============ */}
        <section className={h.bannerBand}>
          <img
            className={h.bannerImg}
            src="/images/housing_works_banner.webp"
            alt="A render of the reimagined Housing Works thrift store: a branded billing counter, exposed brick, New York inspired signage and pink merchandise on open shelves."
          />
        </section>

        {/* ============ AT A GLANCE ============ */}
        <section className={s.metaGrid}>
          <div className={s.metaCell}>
            <span className={s.metaLabel}>Role</span>
            <span className={s.metaValue}>
              Brand and Market Research, Service Blueprint, Ideation, Visual
              Design, Retail and Customer Experience, Prototype Execution
            </span>
          </div>
          <div className={s.metaCell}>
            <span className={s.metaLabel}>Timeline</span>
            <span className={s.metaValue}>3 months</span>
          </div>
          <div className={s.metaCell}>
            <span className={s.metaLabel}>Team</span>
            <span className={s.metaValue}>
              Team project, a four member group
            </span>
          </div>
          <div className={`${s.metaCell} ${s.metaCellLast}`}>
            <span className={s.metaLabel}>Tools</span>
            <span className={s.metaValue}>
              Miro, Adobe Photoshop, Adobe Illustrator, Figma
            </span>
          </div>
        </section>

        {/* ============ OVERVIEW ============ */}
        <section className={h.section}>
          <div className={h.sectionLabelWrap}>
            <SectionLabel title="OVERVIEW" />
          </div>
          <p className={h.overviewText}>
            Partnering with Housing Works, a New York City-based non-profit
            organization and thrift store, this project aimed to reimagine
            their thrift shop experience and operations. The goal was to
            position Housing Works as a{' '}
            <span>global experiential destination</span> for both tourists and
            locals, while amplifying its mission of community empowerment and
            social inclusion.
          </p>
        </section>

        {/* ============ BACKGROUND ============ */}
        <section className={h.section}>
          <div className={h.sectionLabelWrap}>
            <SectionLabel title="BACKGROUND" />
          </div>
          <p className={`${h.bodyText} ${h.bodyLead}`}>
            Housing Works is a New York City-based non-profit organization
            dedicated to ending the dual crises of homelessness and HIV/AIDS.
          </p>
          <p className={h.bodyText}>
            Founded in 1990 by members of the AIDS activist group ACT UP,
            Housing Works operates under the belief that stable housing is a
            critical foundation for health and well-being. The organization
            provides lifesaving services, including housing, healthcare, job
            training, and legal assistance, to tens of thousands of low-income
            New Yorkers each year.
          </p>
        </section>

        {/* ============ CHALLENGE STATEMENT — the brief itself, with a
             question mark standing the full height of it alongside. The
             label sits inside the block, so it runs without its trailing
             line. ============ */}
        <section className={h.section}>
          <div className={h.sectionLabelWrap}>
            <SectionLabel title="CHALLENGE STATEMENT" />
          </div>
          <div className={h.askRow}>
            {/* Drawn rather than typed, so it can stretch to whatever
                height the text beside it turns out to be. The viewBox is
                the glyph's own ink box, measured in General Sans Bold, so
                the mark fills the box exactly with nothing to trim. */}
            <span className={h.askMark} aria-hidden="true">
              <svg
                viewBox="3.6 -145.6 103.8 146.6"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
              >
                <text
                  x="0"
                  y="0"
                  fontFamily="General Sans, sans-serif"
                  fontWeight="700"
                  fontSize="200"
                  fill="currentColor"
                >
                  ?
                </text>
              </svg>
            </span>
            <p className={h.askText}>
              How might we transform Housing Works into a global experiential
              space, bridging its mission of advocacy, and community through
              its thrift store, to attract tourists and locals while expanding
              its donor and customer base among individuals 35 and younger,
              both domestically and internationally?
            </p>
          </div>
        </section>

        {/* ============ PRIMARY RESEARCH ============ */}
        <section className={h.section}>
          <div className={h.sectionLabelWrap}>
            <SectionLabel title="CURRENT STRATEGY" />
          </div>
          {/* The statement, and beside it the three businesses it is
              talking about, standing on the page without panels. */}
          <div className={h.strategyRow}>
            <p className={h.pinkStatement}>
              Housing Works sustains its mission through entrepreneurial
              businesses, which not only generate crucial funding for the
              organization's advocacy and services but also create employment
              opportunities within the community.
            </p>
            <div className={h.logoColumn}>
              {SUB_BRANDS.map((brand) => (
                <img
                  key={brand.src}
                  src={brand.src}
                  alt={brand.alt}
                  loading="lazy"
                />
              ))}
            </div>
          </div>

          {/* One row per business, the copy and the pictures swapping sides
              each time so the eye is handed across the page rather than
              running down one column. */}
          {VENTURES.map((venture, i) => (
            <div
              className={`${h.ventureRow} ${i % 2 === 1 ? h.ventureRowFlip : ''}`}
              key={venture.title}
            >
              <div className={h.ventureText}>
                <h4 className={h.ventureTitle}>{venture.title}</h4>
                <ul className={h.factList}>
                  {venture.facts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>

                <div className={h.observations}>
                  <p className={h.observationsLabel}>Observations</p>
                  <ul className={h.factList}>
                    {venture.observations.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={h.ventureMedia}>
                <div
                  className={`${h.mediaGrid} ${
                    'screens' in venture ? h.mediaGridScreens : ''
                  }`}
                >
                  {venture.photos.map((photo) => (
                    <img
                      key={photo.src}
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                    />
                  ))}
                </div>
                <p className={h.caption}>{venture.caption}</p>
              </div>
            </div>
          ))}
        </section>

        {/* ============ SERVICE BLUEPRINT ============ */}
        <section className={h.section}>
          <div className={h.sectionLabelWrap}>
            <SectionLabel title="MAPPING USER EXPERIENCE" />
          </div>
          <p className={h.bodyText}>
            To understand the customer experience better, we created a service
            blueprint to highlight the actions and emotions of both the
            customers and employees during the service.
          </p>
          <p className={h.bodyText}>
            These insights were gathered directly from customers through
            in-store interviews conducted as part of our primary research.
          </p>
          <figure className={h.wideFigure}>
            <img
              src="/images/hw-service-blueprint.webp"
              alt="The service blueprint: a customer and scenario row, the physical evidence she meets, her actions from an Instagram post through to leaving the store, her emotions at each step, and the backstage actions employees take underneath."
              loading="lazy"
            />
          </figure>
          <p className={h.figureHint}>
            <span>Scroll to explore</span>
            <span className={h.figureHintArrow} aria-hidden="true">
              &rarr;
            </span>
          </p>
        </section>

        {/* ============ IDEATION ============ */}
        <section className={h.section}>
          <div className={h.sectionLabelWrap}>
            <SectionLabel title="IDEATION" />
          </div>
          <p className={h.bodyText}>
            To understand what directions are the{' '}
            <span className={h.inlineHighlight}>
              most viable to least viable, we laid it out in a matrix,
            </span>{' '}
            highlighting what our next steps would look like.
          </p>
          <figure className={h.plainFigure}>
            <img
              src="/images/hw-opportunity-matrix.webp"
              alt="The opportunity matrix, plotting ideas from least to most viable against lower and higher customer acquisition. Four ideas are picked out: themed displays by neighbourhood, a consistent visual language, an element unique to Housing Works such as coloured hangers and tags, and a social media and website strategy."
              loading="lazy"
            />
          </figure>
        </section>

        {/* ============ PROPOSED STRATEGY ============ */}
        <section className={h.section}>
          <div className={h.sectionLabelWrap}>
            <SectionLabel title="PROPOSED STRATEGY" />
          </div>
          <h3 className={h.subHeading}>Why "reimagine" Housing Works?</h3>
          <div className={h.moveList}>
            {MOVES.map((move, i) => (
              <MoveCard move={move} index={i} key={move.text} />
            ))}
          </div>
        </section>

        {/* ============ ONLINE COMMUNICATIONS ============ */}
        <section className={h.section}>
          <div className={h.sectionLabelWrap}>
            <SectionLabel title="BRAND IN PRACTICE" />
          </div>
          <p className={`${h.bodyText} ${h.bodyLead}`}>
            The goal was to create one coherent brand across every touchpoint,
            from a scrolling feed to a shop floor, each carrying the same
            mission, story, and look.
          </p>

          <ul className={h.channelList}>
            <li>
              <span className={h.channelName}>Social:</span> A pink-led feed
              that ties every post, including events, collections and stories,
              back to the mission.
            </li>
            <li>
              <span className={h.channelName}>Web:</span> A redesign that puts
              impact stories beside the shop, so browsing and giving live on
              the same page.
            </li>
          </ul>

          {/* The brand itself, laid out as a bento: the identity, the two
              statements behind it, and the places it shows up. */}
          <div className={h.bento}>
            {BENTO_BANDS.map((band, bandIndex) => (
              <div className={h.bentoBand} key={bandIndex}>
                {band.map((tile) => {
                  // Width in proportion to the picture's own shape, which is
                  // what levels the heights across the band.
                  const style = {
                    '--tile-ratio': tile.ratio,
                    ...('ground' in tile
                      ? { '--tile-ground': tile.ground }
                      : {}),
                  } as CSSProperties
                  // Landscape tiles take the full width on a phone. Halved,
                  // a wide tile comes out only a finger tall, which is no use
                  // for reading a logo or a rail of merchandise.
                  const wide = tile.ratio >= 1.2 ? h.bentoWide : ''
                  // Held clear of the rounding, for artwork drawn with no
                  // margin of its own.
                  const inset = 'inset' in tile ? h.bentoInset : ''
                  if (tile.kind === 'statement') {
                    return (
                      <div
                        className={`${h.bentoTile} ${h.bentoStatement}`}
                        key={tile.label}
                        style={style}
                      >
                        <p className={h.bentoStatementLabel}>{tile.label}</p>
                        <p className={h.bentoStatementText}>{tile.text}</p>
                      </div>
                    )
                  }
                  if (tile.kind === 'quad') {
                    return (
                      <div
                        className={`${h.bentoTile} ${h.bentoQuad}`}
                        key={tile.items[0].src}
                        style={style}
                      >
                        {tile.items.map((item) => (
                          <img
                            key={item.src}
                            src={item.src}
                            alt={item.alt}
                            loading="lazy"
                          />
                        ))}
                      </div>
                    )
                  }
                  if (tile.kind === 'stack') {
                    return (
                      <div
                        className={`${h.bentoTile} ${h.bentoStack}`}
                        key={tile.items[0].src}
                        style={style}
                      >
                        {tile.items.map((item) => (
                          <img
                            key={item.src}
                            src={item.src}
                            alt={item.alt}
                            loading="lazy"
                          />
                        ))}
                      </div>
                    )
                  }
                  if (tile.kind === 'video') {
                    return (
                      <div
                        className={`${h.bentoTile} ${wide}`}
                        key={tile.src}
                        style={style}
                      >
                        <video
                          src={tile.src}
                          poster={tile.poster}
                          aria-label={tile.alt}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="none"
                        />
                      </div>
                    )
                  }
                  return (
                    <div
                      className={`${h.bentoTile} ${wide} ${inset}`}
                      key={tile.src}
                      style={style}
                    >
                      <img src={tile.src} alt={tile.alt} loading="lazy" />
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </section>

        {/* The same system on the shop floor, in its own bento, introduced
            by the line that used to sit with social and web. */}
        <section className={`${h.section} ${h.sectionTight}`}>
          <p className={h.channelLead}>
            <span className={h.channelName}>In-store:</span> An immersive,
            location-specific experience while maintaining core brand assets
            across all thrift shops.
          </p>
          <div className={h.bento}>
            {STORE_BANDS.map((band, bandIndex) => (
              <div className={h.bentoBand} key={bandIndex}>
                {band.map((tile) => {
                  const style = { '--tile-ratio': tile.ratio } as CSSProperties
                  const wide = tile.ratio >= 1.2 ? h.bentoWide : ''
                  if (tile.kind === 'idea') {
                    return (
                      <div
                        className={`${h.bentoTile} ${h.bentoStatement}`}
                        key={tile.title}
                        style={style}
                      >
                        <p className={h.bentoIdeaTitle}>{tile.title}</p>
                        <p className={h.bentoIdeaDetail}>{tile.detail}</p>
                      </div>
                    )
                  }
                  return (
                    <div
                      className={`${h.bentoTile} ${wide}`}
                      key={tile.src}
                      style={style}
                    >
                      <img src={tile.src} alt={tile.alt} loading="lazy" />
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </section>

        {/* ============ SUCCESS METRICS — one set of pills, nothing
             else. They are things to keep an eye on, and a heading over
             each half only split a list that reads better whole.
             ============ */}
        <section className={h.section}>
          <div className={h.sectionLabelWrap}>
            <SectionLabel title="SUCCESS METRICS" />
          </div>
          <ul className={h.metricPills}>
            {METRICS.map((item) => (
              <li className={h.metricPill} key={item}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* ============ PROTOTYPE ============ */}
        <section className={h.section}>
          <div className={h.sectionLabelWrap}>
            <SectionLabel title="PROTOTYPE" />
          </div>
          <p className={h.prototypeLead}>
            Translating the renders into a real room was to replicate and test
            the overall experience and strategy we were proposing, and getting
            real feedback on it.
          </p>
          <p className={h.bodyText}>
            We turned a classroom into a working mock of the West Village
            location of the Housing Works thrift store, stocked through a
            donation drive we ran ourselves.
          </p>

          <div className={h.pointerGrid}>
            {PROTOTYPE_BUILD.map((item, i) => (
              <div key={item}>
                <span className={h.pointerNumber}>{`0${i + 1}`}</span>
                <p className={h.pointerText}>{item}</p>
              </div>
            ))}
          </div>

          <div className={h.protoGrid}>
            <img
              className={h.protoWide}
              src="/images/hw-prototype-5.webp"
              alt="The classroom set up as a mock thrift shop: clothing hung from ceiling rails, tables of folded stock, and the storytelling corner at the far wall."
              loading="lazy"
            />
            <img
              className={h.protoTall}
              src="/images/hw-prototype-2.webp"
              alt="The storytelling corner: a white brick fireplace with a Christopher Street sign on the mantel, framed West Village prints, and a New Yorker tote on a stand."
              loading="lazy"
            />
            <img
              className={h.protoThird}
              src="/images/hw-prototype-1.webp"
              alt="Visitors browsing the mock shop, looking over a table of donated clothing, hats and homeware."
              loading="lazy"
            />
            <img
              className={h.protoThird}
              src="/images/hw-prototype-3.webp"
              alt="A display table of donated stock, each piece carrying a pink Housing Works swing tag."
              loading="lazy"
            />
            <img
              className={h.protoThird}
              src="/images/hw-prototype-4.webp"
              alt="A close-up of the prototype's signage and tags: a green 'Bottoms' label on the table and a pink price tag reading 'Thrift like a New Yorker'."
              loading="lazy"
            />
          </div>

          <p className={`${h.bodyText} ${h.findingsIntro}`}>
            Feedback was gathered through forms and in-person conversations
            with visitors as they moved through the space.
          </p>
          <ol className={h.findingList}>
            {FINDINGS.map((f) => (
              <li key={f.text}>
                {'stat' in f && (
                  <span className={h.findingStat}>{f.stat}</span>
                )}{' '}
                {f.text}
              </li>
            ))}
          </ol>
        </section>

        {/* ============ REFLECTIONS — the honest close, carried in a
             panel of the Housing Works pink rather than set off by a
             rule down its edge. ============ */}
        <section className={h.section}>
          <div className={h.sectionLabelWrap}>
            <SectionLabel title="REFLECTIONS" />
          </div>
          <div className={h.reflectionsContent}>
            <div className={h.reflectionItem}>
              <h3 className={h.reflectionSubheading}>What I took from it</h3>
              <p className={h.reflectionBody}>
                Through this project, I gained valuable insights into
                transforming a well-established brand like Housing Works into a
                vibrant, mission-driven destination. I learned that cohesive
                branding and storytelling are crucial in connecting customers to
                the brand's mission. By integrating local relevance and sensory
                design, we can create inclusive experiences that drive
                engagement and loyalty. Additionally, I saw firsthand how
                digital-physical synergy can amplify reach and advocacy,
                highlighting the importance of aligning metrics with both
                mission and margin. This experience reinforced my approach to
                "design for impact", emphasizing empathy-driven systems that
                drive social change.
              </p>
            </div>
          </div>
        </section>

        <MoreWork currentSlug="https://legacy.mrinaljadhav.com/housing-works" />
      </main>
      <Footer />
      {CAN_EDIT && <MoveFramerPanel />}
    </>
  )
}
