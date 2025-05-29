/**
 * Application Identity (Brand)
 *
 * Also note that the 'Brand' is used in the following places:
 *  - README.md               all over
 *  - package.json            app-slug and version
 *  - [public/manifest.json]  name, short_name, description, theme_color, background_color
 */
export const Brand = {
  Title: {
    Base: 'Flow_Hero',
    Common: (process.env.NODE_ENV === 'development' ? '[DEV] ' : '') + 'Flow_Hero',
  },
  Meta: {
    Description: 'Flow-Hero.de hilft deutschen Unternehmen, den KI-Wahnsinn durch einfache, wirkungsvolle AI-Agent Suits ganz nach deren Wünschen leicht zu meistern.',
    SiteName: 'FlowHero | Automatisiere deine KI-Taskforce',
    Keywords: 'KI, Automatisierung, Workflow, AI-Agent, deutsche Unternehmen, einfache Lösungen',
    ThemeColor: '#32383E',
    TwitterSite: '@flow_hero.de',
  },
  URIs: {
    Home: 'https://flow-hero.de',
    CardImage: 'https://big-agi.com/icons/card-dark-1200.png', // TODO update to new domain
    OpenRepo: 'https://github.com/markusfalkenhagen/flowhero-studio',
    OpenProject: 'https://github.com/markusfalkenhagen/flowhero-studio/projects/4',
    PrivacyPolicy: 'https://flow-hero.de/privacy',
    TermsOfService: 'https://flow-hero.de/terms',
  },
  Docs: {
    Public: (docPage: string) => `https://flow-hero.de/docs/${docPage}`,
  }
} as const;