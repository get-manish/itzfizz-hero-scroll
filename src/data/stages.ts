/**
 * The five scroll stages.
 *
 * Every string below is a claim taken from https://itzfizz.com/ (home page),
 * and each stage names the section it comes from. Nothing here is a stat,
 * client, result or quote that the page does not make.
 */
export type StageId = 'introduction' | 'strategy' | 'growth' | 'momentum' | 'next'

/** Large uppercase text. `short` is the compact form used below 768px. */
export interface HeadlineText {
  readonly kind: 'headline'
  readonly text: string
  readonly short: string
}

/** The supporting paragraph. `short` is the one-liner used below 768px. */
export interface ParagraphText {
  readonly kind: 'paragraph'
  readonly text: string
  readonly short: string
}

/** One bullet. `detail` is the optional one-line description under the title. */
export interface BulletPoint {
  readonly kind: 'bullet'
  readonly title: string
  readonly detail?: string
}

export interface StageCta {
  readonly label: string
  /** In-page anchor. `#top` returns to the start of the page. */
  readonly href: string
}

export interface Stage {
  readonly id: StageId
  readonly number: '01' | '02' | '03' | '04' | '05'
  /** Tab-bar label. */
  readonly label: string
  readonly headline: HeadlineText
  readonly description: ParagraphText
  readonly points: readonly BulletPoint[]
  readonly cta?: StageCta
}

export const STAGES: readonly Stage[] = [
  {
    // Source: itzfizz.com hero line + the three service sections.
    id: 'introduction',
    number: '01',
    label: 'Introduction',
    headline: { kind: 'headline', text: 'WELCOME ITZFIZZ', short: 'WELCOME ITZFIZZ' },
    description: {
      kind: 'paragraph',
      text: 'SEO, web development and social media marketing to grow your business online.',
      short: 'SEO, web development and social media marketing to grow your business online.',
    },
    points: [], // the statistics are rendered by IntroStage
  },
  {
    // Source: itzfizz.com "How Does It Work" steps 2 and 3, SEO section.
    id: 'strategy',
    number: '02',
    label: 'Digital strategy',
    headline: { kind: 'headline', text: 'DIGITAL STRATEGY', short: 'STRATEGY' },
    description: {
      kind: 'paragraph',
      text: 'Every plan starts with your business: who you are, who you want to reach and who you are up against.',
      short: 'Understand your business, audience and competition.',
    },
    points: [
      // Step "Understanding Your Business".
      { kind: 'bullet', title: 'Understanding the business' },
      // SEO section: "identify your target audience, and analyze your competition".
      { kind: 'bullet', title: 'Researching audience and competitors' },
      // Step "Delivering the Strategy": "A personalized plan and strategy".
      { kind: 'bullet', title: 'Planning a personalised strategy' },
    ],
  },
  {
    // Source: itzfizz.com service sections (SEO, Website Development, SMM).
    id: 'growth',
    number: '03',
    label: 'Growth',
    headline: { kind: 'headline', text: 'GROWTH', short: 'GROWTH' },
    description: {
      kind: 'paragraph',
      text: 'Three services that help grow your business online.',
      short: 'Three services to grow your business.',
    },
    points: [
      {
        // SEO section: "Increase the organic visibility of your website on Google search".
        kind: 'bullet',
        title: 'SEO',
        detail: 'Increase organic visibility on Google and drive quality traffic.',
      },
      {
        // Website Development section: "take your business online with WordPress CMS".
        kind: 'bullet',
        title: 'Website Development',
        detail: 'Take your business online with WordPress, easy to edit and maintain.',
      },
      {
        // SMM section: "turn your social media channels into a marketing platform".
        kind: 'bullet',
        title: 'Social Media Marketing',
        detail: 'Turn your social channels into a marketing platform.',
      },
    ],
  },
  {
    // Source: itzfizz.com "How Does It Work" step 4: "execute, assess and track your performance".
    id: 'momentum',
    number: '04',
    label: 'Momentum',
    headline: { kind: 'headline', text: 'MOMENTUM', short: 'MOMENTUM' },
    description: {
      kind: 'paragraph',
      text: 'Once the strategy is set, we execute it, assess the work and track your performance.',
      short: 'We execute, assess and track your performance.',
    },
    points: [
      { kind: 'bullet', title: 'Execute the plan' }, // "execute"
      { kind: 'bullet', title: 'Assess the work' }, // "assess"
      { kind: 'bullet', title: 'Track performance' }, // "track your performance"
    ],
  },
  {
    // Source: itzfizz.com "How Does It Work" steps 1 and 2 + the "Get Started" button.
    id: 'next',
    number: '05',
    label: 'Next',
    headline: { kind: 'headline', text: 'NEXT', short: 'NEXT' },
    description: {
      kind: 'paragraph',
      text: 'Fill out your requirements and someone from our team will get back to you.',
      short: 'Fill out your requirements and our team gets back to you.',
    },
    points: [],
    cta: { label: 'GET STARTED', href: '#top' },
  },
]
