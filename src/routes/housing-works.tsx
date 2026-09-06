import { createFileRoute } from '@tanstack/react-router'
import { useRef } from 'react'
import { Navbar } from '~/components/Navbar'
import { Footer } from '~/components/Footer'
import { MoreWork } from '~/components/case-study/MoreWork'
import { SectionLabel } from '~/components/SectionLabel'
import { useScrollReveal } from '~/hooks/useScrollReveal'
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
  component: HousingWorksPage,
})

// The scope of work, as agreed at the start of the project.
const SCOPE = [
  'Brand Study',
  'Market Research',
  'Environment Study',
  'Service Blueprint',
  'Brand Strategy',
  'Visual Identity',
  'Store Experience Design',
  'Customer Experience',
  'User Testing',
]

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
      'Operates 9 thrift stores across NYC, selling donated clothing, accessories, furniture, and home goods at affordable prices.',
      "100% of profits funding Housing Works' advocacy and services.",
      'Online thrift shop (eShop), auctions, and Bookshop.org partnerships extend reach beyond physical stores.',
      'Relies on community donations.',
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
      "Operates as a hybrid bookstore, thrift boutique, and café, with 100% of profits funding Housing Works' advocacy and services.",
      'Primarily relies on donated inventory (books, media, clothing, housewares) and volunteer staffing.',
      'The space is used to host weddings, corporate events, and cultural programming (e.g. readings, fundraisers).',
      'The café provides coffee, wine, and light fare, enhancing the overall experience and encouraging customers to linger, thereby increasing dwell time and social engagement.',
    ],
    observations: [
      'Multiple ventures operating inside the same space makes one heavily rely on signage and directions which are lacking, even though the store was organized.',
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
      'Website serves as both an e-commerce hub (thrift, books, auctions) and mission advocacy portal, with clear CTAs for donations/volunteering.',
      'Leverages influencer partnerships over social media (e.g. LGBTQ+ creators).',
      'Promotions through ad boosts and posts of events (bookstore readings, thrift sales) to drive foot traffic.',
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

// The three things the reimagining sets out to do.
const MOVES = [
  'Attract locals and tourists through storytelling',
  'Bring NYC and its history into the store experience',
  'Highlight their mission through the experience',
]

// The renders of the proposed store, in the order they were presented.
const RENDER_PAIR_ONE = [
  {
    src: '/images/hw-store-render-1.webp',
    alt: 'A render of the proposed store: a seating corner with a green sofa, a West Village transit map, staff picks signage and store-specific zones.',
  },
  {
    src: '/images/hw-store-render-2.webp',
    alt: 'A render of the proposed billing counter: branded joinery, a "Who are we?" mission poster, and merchandise on open shelves.',
  },
]
const RENDER_PAIR_TWO = [
  {
    src: '/images/hw-store-render-3.webp',
    alt: 'A render showing New York inspired wayfinding above the rails, records on the brick wall, and branded tote bags on the shelf.',
  },
  {
    src: '/images/hw-store-render-4.webp',
    alt: 'A wide render of the proposed store: jewellery counter, wayfinding signage, framed New York artwork and the seating corner beyond.',
  },
]

// What the team said it would watch once the reimagining was live.
const METRICS = [
  {
    title: 'Rebrand of Housing Works',
    items: [
      'Improved overall brand perception',
      'Higher social media engagement',
      'Rise in volunteer sign up under new brand',
      'Increased website feedback and traffic',
    ],
  },
  {
    title: 'In-Store Experience of Housing Works',
    items: [
      'Average time spent in store is higher',
      'Improved donation conversion rates',
      'Frequency of return visits',
      '% of customers who post about their visit',
    ],
  },
]

function HousingWorksPage() {
  const mainRef = useRef<HTMLElement>(null)
  // Each top-level <section> fades and rises in as it enters the viewport.
  useScrollReveal(mainRef)

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

          <div className={h.scopeWrap}>
            <p className={h.scopeLabel}>Scope of work</p>
            <ul className={h.scopeList}>
              {SCOPE.map((item) => (
                <li className={h.scopeItem} key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ BACKGROUND ============ */}
        <section className={`${h.section} ${h.sectionAlt}`}>
          <div className={h.sectionLabelWrap}>
            <SectionLabel title="BACKGROUND" number="01" />
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
          <p className={h.bodyText}>
            Housing Works sustains its mission through entrepreneurial
            businesses, which not only generate crucial funding for the
            organization's advocacy and services but also create employment
            opportunities within the community.
          </p>

          <div className={h.logoRow}>
            {SUB_BRANDS.map((brand) => (
              <div className={h.logoPanel} key={brand.src}>
                <img src={brand.src} alt={brand.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </section>

        {/* ============ CHALLENGE STATEMENT — the brief itself, set apart
             in a tinted box. The label sits inside the box, so it runs
             without its trailing line. ============ */}
        <section className={h.section}>
          <div className={h.askBox}>
            <SectionLabel title="CHALLENGE STATEMENT" noLine />
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
        <section className={`${h.section} ${h.sectionAlt}`}>
          <div className={h.sectionLabelWrap}>
            <SectionLabel title="PRIMARY RESEARCH" number="02" />
          </div>
          <h3 className={h.subHeading}>Current Strategy</h3>
          <p className={h.bodyText}>
            Housing Works funds its mission to end homelessness and HIV/AIDS
            through a network of entrepreneurial businesses and strategies such
            as:
          </p>

          {VENTURES.map((venture) => (
            <div className={h.venture} key={venture.title}>
              <div className={h.ventureGrid}>
                <div>
                  <h4 className={h.ventureTitle}>{venture.title}</h4>
                  <ul className={h.factList}>
                    {venture.facts.map((fact) => (
                      <li key={fact}>{fact}</li>
                    ))}
                  </ul>
                </div>
                <div className={h.observations}>
                  <p className={h.observationsLabel}>Observations</p>
                  <ul className={h.factList}>
                    {venture.observations.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div
                className={`${h.photoRow} ${
                  'screens' in venture ? h.photoRowScreens : ''
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
          ))}
        </section>

        {/* ============ SERVICE BLUEPRINT ============ */}
        <section className={h.section}>
          <div className={h.sectionLabelWrap}>
            <SectionLabel title="UNDERSTANDING THE EXPERIENCE" number="03" />
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
            The blueprint is wide. Scroll it sideways to read it in full.
          </p>
        </section>

        {/* ============ IDEATION ============ */}
        <section className={`${h.section} ${h.sectionAlt}`}>
          <div className={h.sectionLabelWrap}>
            <SectionLabel title="IDEATION" number="04" />
          </div>
          <h3 className={h.subHeading}>Opportunity Matrix</h3>
          <p className={h.bodyText}>
            To understand what directions are the most viable to least viable,
            we laid it out in a matrix, highlighting what our next steps would
            look like.
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
            <SectionLabel title="PROPOSED STRATEGY" number="05" />
          </div>
          <h3 className={h.subHeading}>Why "reimagine" Housing Works?</h3>
          <div className={h.moveGrid}>
            {MOVES.map((move, i) => (
              <div className={h.moveCard} key={move}>
                <span className={h.moveNumber}>{`0${i + 1}`}</span>
                <p className={h.moveText}>{move}</p>
              </div>
            ))}
          </div>

          <div className={h.statementGrid}>
            <div className={h.statement}>
              <p className={h.statementLabel}>Vision</p>
              <p className={h.statementText}>
                To be a representative of New York City by providing a safe
                platform for expression and education.
              </p>
            </div>
            <div className={h.statement}>
              <p className={h.statementLabel}>Mission</p>
              <p className={h.statementText}>
                By giving a second life to belongings and a second chance to
                people, Housing Works gets inspired and gives hope to the
                innumerable lives in the city of New York.
              </p>
            </div>
          </div>
        </section>

        {/* ============ ONLINE COMMUNICATIONS ============ */}
        <section className={`${h.section} ${h.sectionAlt}`}>
          <div className={h.sectionLabelWrap}>
            <SectionLabel title="ONLINE COMMUNICATIONS" number="06" />
          </div>
          <p className={`${h.bodyText} ${h.bodyLead}`}>
            We focused on creating a cohesive and impactful online
            communication strategy that highlights the brand's mission,
            storytelling, and aesthetic consistency.
          </p>

          <div className={h.splitGrid}>
            <div>
              <h4 className={h.ventureTitle}>Social Media</h4>
              <ul className={h.factList}>
                <li>
                  The mockup showcases Housing Works' signature pink color
                  throughout the feed, ensuring visual cohesion while allowing
                  flexibility for other brand colors.
                </li>
                <li>
                  The Instagram account would feature event promotions, curated
                  thrift collections, and storytelling content that connects
                  purchases to Housing Works' mission.
                </li>
              </ul>
            </div>
            <div className={h.splitMedia}>
              <img
                src="/images/hw-social-mockup.webp"
                alt="A mockup of the proposed Housing Works Thrift Instagram: a profile grid held together by the brand pink, beside a single post about reusing thrifted finds."
                loading="lazy"
              />
            </div>
          </div>

          <div className={`${h.splitGrid} ${h.splitReverse}`}>
            <div>
              <h4 className={h.ventureTitle}>Website</h4>
              <ul className={h.factList}>
                <li>
                  Designed a cohesive layout that integrates the thrift shop's
                  branding while emphasizing the organization's mission and
                  stories of individuals positively impacted by Housing Works.
                </li>
                <li>
                  Simplified navigation and visually engaging elements to
                  improve user experience.
                </li>
              </ul>
            </div>
            <div className={h.splitMedia}>
              <video
                src="/images/hw-website-walkthrough.mp4"
                poster="/images/hw-website-poster.webp"
                aria-label="A walkthrough of the proposed Housing Works website, opening on the headline 'Giving a second life to clothing and a second opportunity to people'."
                autoPlay
                loop
                muted
                playsInline
                preload="none"
              />
            </div>
          </div>
        </section>

        {/* ============ IN-STORE STRATEGY ============ */}
        <section className={h.section}>
          <div className={h.sectionLabelWrap}>
            <SectionLabel
              title="IN-STORE COMMUNICATIONS AND EXPERIENCE"
              number="07"
            />
          </div>
          <p className={`${h.bodyText} ${h.bodyLead}`}>
            Our reimagined in-store strategy focuses on creating an immersive,
            location-specific experience while maintaining core brand assets
            across all thrift shops. This transforms Housing Works thrift
            stores and the bookstore into experiential spaces that reflect
            their mission while engaging diverse audiences.
          </p>

          <div className={h.noteList}>
            <div className={h.note}>
              <h4 className={h.ventureTitle}>Branding &amp; Merchandising</h4>
              <p className={h.bodyText}>
                To strengthen brand visibility, we introduced branded aprons for
                employees, signage that reflect New York City, and dedicated
                display areas for storytelling and merchandise. These elements
                reinforce Housing Works' identity while creating a polished
                retail experience.
              </p>
            </div>
            <div className={h.note}>
              <h4 className={h.ventureTitle}>Neighborhood Storytelling Corner</h4>
              <p className={h.bodyText}>
                Each store features a dedicated area celebrating its location's
                history and culture. For example: a conversation corner with
                locally relevant décor; mannequins showcasing staff picks that
                reflect the neighborhood's fashion aesthetic; and wall art
                providing educational content about the neighborhood's history.
              </p>
            </div>
            <div className={h.note}>
              <h4 className={h.ventureTitle}>Mission-Focused Displays</h4>
              <p className={h.bodyText}>
                Drawing inspiration from the website redesign, we proposed using
                wall space to showcase stories of New Yorkers whose lives have
                been transformed by Housing Works. This reinforces the brand's
                "second chances" narrative and ensures customers understand how
                their purchases contribute to meaningful change.
              </p>
            </div>
          </div>
        </section>

        {/* ============ THE RENDERS — the proposed store as one board.
             The layout drawing leads, the four views sit two up, and the
             brand assets and merchandise close it. ============ */}
        <section
          className={`${h.section} ${h.sectionTight}`}
          aria-label="Renders of the proposed store"
        >
          <div className={h.board}>
            <div className={h.boardFull}>
              <img
                src="/images/hw-store-layout.webp"
                alt="The proposed layout for the West Village thrift shop: a plan view marked with the story wall, brand assets, specialized zones and the donation corner, beside a cutaway view of the same room."
                loading="lazy"
              />
            </div>
            <div className={h.boardPair}>
              {RENDER_PAIR_ONE.map((r) => (
                <img key={r.src} src={r.src} alt={r.alt} loading="lazy" />
              ))}
            </div>
            <div className={h.boardPair}>
              {RENDER_PAIR_TWO.map((r) => (
                <img key={r.src} src={r.src} alt={r.alt} loading="lazy" />
              ))}
            </div>
            <div className={h.boardFull}>
              <img
                src="/images/hw-brand-assets.webp"
                alt="Proposed brand assets: stickers and badges carrying the wordmark, two keyrings, a pink tote printed with a Statue of Liberty stamp reading 'Thrift like a New Yorker', and a canvas tote printed with a New York street sign."
                loading="lazy"
              />
            </div>
            <div className={h.boardFull}>
              <img
                src="/images/hw-merch.webp"
                alt="Proposed merchandise: pink and black bucket hats, a knitted beanie, and three sweatshirts carrying the Housing Works mark."
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ============ SUCCESS METRICS ============ */}
        <section className={`${h.section} ${h.sectionAlt}`}>
          <div className={h.sectionLabelWrap}>
            <SectionLabel title="SUCCESS METRICS" number="08" />
          </div>
          <div className={h.metricsGrid}>
            {METRICS.map((group) => (
              <div className={h.metricsCard} key={group.title}>
                <h4 className={h.metricsTitle}>{group.title}</h4>
                <ul className={h.factList}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ============ PROTOTYPE ============ */}
        <section className={h.section}>
          <div className={h.sectionLabelWrap}>
            <SectionLabel title="PROTOTYPE" number="09" />
          </div>
          <h3 className={h.subHeading}>
            Execution of the In-Store Experience
          </h3>
          <p className={`${h.bodyText} ${h.bodyLead}`}>
            To test our reimagined in-store experience, we transformed a
            classroom into a mock thrift shop by organizing a donation drive,
            and replicated the reimagination of the West Village branch of
            Housing Works Thrift shop.
          </p>
          <p className={h.bodyText}>
            The layout incorporated modular aspects inspired by the West Village
            thrift store, such as diagonal clothing racks reflecting the
            neighborhood's street grid. Core brand assets, including pink
            hangers, NYC-inspired signage, and ambient lighting, were
            prominently featured to ensure consistency.
          </p>
          <p className={h.bodyText}>
            We displayed wall art that narrated the history of West Village,
            creating an educational and engaging environment. A dedicated
            storytelling corner featured curated staff picks and
            neighborhood-inspired décor, enhancing the connection between
            visitors and the store's local identity. Visitors experienced a
            curated playlist, ambient lighting, and subtle scents designed to
            create a memorable shopping atmosphere.
          </p>
          <p className={h.bodyText}>
            Feedback was gathered through forms and conversations. Participants
            responded positively, noting the immersive sensory experience and
            expressing interest in learning about the neighborhood through
            visual storytelling.
          </p>

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
        </section>

        {/* ============ PROJECT LEARNINGS ============ */}
        <section className={`${h.section} ${h.sectionAlt}`}>
          <div className={h.sectionLabelWrap}>
            <SectionLabel title="PROJECT LEARNINGS" number="10" />
          </div>
          <div className={h.reflectionsContent}>
            <div className={h.reflectionItem}>
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
    </>
  )
}
