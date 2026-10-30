/**
 * IchaWorks project data — the single place to edit portfolio content.
 *
 * - `showcase`  → slides in the hero carousel (need a screenshot or a placeholder).
 * - `hostedSites` → the "Live on the web" section.
 * - `repos`     → the GitHub section cards.
 *
 * Screenshots live in /public/shots and are refreshed with:
 *   node scripts/capture-sites.mjs
 * Repo descriptions came from the public GitHub API (api.github.com/repos/brutaliccus/<name>);
 * refresh them with: node scripts/fetch-repos.mjs
 *
 * Do NOT add these (deleted/retired) repos: IchaTaunt, LibraForge, Fitness-Competition-App,
 * MediaFlowProxyFork, AwardsReviewApp, IchaDoT.
 */

const GH = 'https://github.com/brutaliccus';

/**
 * Accent colours sampled from the live sites:
 * gold = LootLock gold, brass = LootLock/IchaLaunch brass, green = Icha's Armory green,
 * ember = Freilifts oxblood, steel = Library blue, teal = Freilifts "finish" teal.
 */
export type Accent = 'gold' | 'brass' | 'green' | 'ember' | 'steel' | 'teal';

export interface ProjectLink {
  label: string;
  href: string;
  kind: 'live' | 'repo';
}

export interface Slide {
  id: string;
  title: string;
  blurb: string;
  /** Path under /public, or null to render a styled placeholder. */
  image: string | null;
  imageAlt: string;
  tags: string[];
  accent: Accent;
  links: ProjectLink[];
  /** Short note shown on placeholder art (e.g. why there's no screenshot). */
  placeholderNote?: string;
}

export interface HostedSite {
  id: string;
  name: string;
  url: string;
  blurb: string;
  image: string | null;
  accent: Accent;
  repo?: string;
}

export interface Repo {
  name: string;
  description: string;
  language: string | null;
  accent: Accent;
  /** Omit for private repos — the card renders without a link. */
  url?: string;
  /** Link-only card: no screenshot/GUI to show. */
  linkOnly?: boolean;
  badge?: string;
}

export const showcase: Slide[] = [
  {
    id: 'ichasarmory',
    title: "Icha's Armory",
    blurb:
      'Turtle WoW armory and tank sim: import a character, plan gear, and save builds with Discord login.',
    image: '/shots/ichasarmory.jpg',
    imageAlt: "Screenshot of the Icha's Armory home page with the character import form",
    tags: ['JavaScript', 'Game tools', 'Discord auth'],
    accent: 'green',
    links: [
      { label: 'Visit site', href: 'https://ichasarmory.quest', kind: 'live' },
      { label: 'GitHub repo', href: `${GH}/IchasArmory`, kind: 'repo' },
    ],
  },
  {
    id: 'gear-planner',
    title: "Icha's Armory Gear Planner",
    blurb:
      'A paperdoll gear planner on Icha\'s Armory: fill all 17 slots, see where to farm each piece, track modified stats from buffs and talents, and save or share plans.',
    image: '/shots/gear-planner.jpg',
    imageAlt: "Screenshot of the Icha's Armory Gear Planner with its equipment slots, Locations Needed and Modified Stats panels",
    tags: ['JavaScript', 'Gear planning', 'Turtle WoW'],
    accent: 'green',
    links: [
      { label: 'Open planner', href: 'https://ichasarmory.quest/gear-planner', kind: 'live' },
      { label: 'GitHub repo', href: `${GH}/IchasArmory`, kind: 'repo' },
    ],
  },
  {
    id: 'lootlock',
    title: 'LootLock',
    blurb:
      'Soft-reserve loot sheets for WoW Forever raids. Set up a sheet, share one link, and lock every reserve before the pull. Ships with a companion addon.',
    image: '/shots/lootlock.jpg',
    imageAlt: 'Screenshot of the LootLock landing page with its gold logo and feature cards',
    tags: ['Web app', 'Raid tools', 'Addon sync'],
    accent: 'gold',
    links: [{ label: 'Visit site', href: 'https://lootlock.win', kind: 'live' }],
  },
  {
    id: 'freilifts',
    title: 'Freilifts',
    blurb:
      'Classic strength, modern performance: a self-hosted exercise log with email and Google sign-in.',
    image: '/shots/health.jpg',
    imageAlt: 'Screenshot of the Freilifts exercise log sign-in screen',
    tags: ['Fitness', 'Self-hosted', 'Auth'],
    accent: 'ember',
    links: [{ label: 'Visit site', href: 'https://health.freiverse.com', kind: 'live' }],
  },
  {
    id: 'library',
    title: 'Library',
    blurb: 'A self-hosted audiobook and eBook app. Join a library with an invite link and listen anywhere.',
    image: '/shots/library.jpg',
    imageAlt: 'Screenshot of the Library app showing the choose-a-library screen',
    tags: ['Python', 'Audiobooks', 'Self-hosted'],
    accent: 'steel',
    links: [
      { label: 'Visit site', href: 'https://library.freiverse.com', kind: 'live' },
      { label: 'GitHub repo', href: `${GH}/Library`, kind: 'repo' },
    ],
  },
  {
    id: 'ichaui-forever',
    title: 'IchaUI Forever',
    blurb:
      'The IchaUI interface suite, rebuilt for WoW Forever: action bars, unit frames, and more. The source is private for now; screenshots are coming soon.',
    image: null,
    imageAlt: 'IchaUI Forever placeholder art',
    tags: ['Lua', 'WoW addon', 'Private'],
    accent: 'brass',
    links: [],
    placeholderNote: 'Private repo · preview soon',
  },
];

export const hostedSites: HostedSite[] = [
  {
    id: 'ichasarmory',
    name: 'ichasarmory.quest',
    url: 'https://ichasarmory.quest',
    blurb: 'Turtle WoW armory and tank sim.',
    image: '/shots/ichasarmory.jpg',
    accent: 'green',
    repo: `${GH}/IchasArmory`,
  },
  {
    id: 'gear-planner',
    name: "Icha's Armory Gear Planner",
    url: 'https://ichasarmory.quest/gear-planner',
    blurb: 'Plan every gear slot, see where to farm it, and share the build.',
    image: '/shots/gear-planner.jpg',
    accent: 'green',
    repo: `${GH}/IchasArmory`,
  },
  {
    id: 'lootlock',
    name: 'lootlock.win',
    url: 'https://lootlock.win',
    blurb: 'Soft-reserve raid loot, locked before the pull.',
    image: '/shots/lootlock.jpg',
    accent: 'gold',
  },
  {
    id: 'health',
    name: 'health.freiverse.com',
    url: 'https://health.freiverse.com',
    blurb: 'Freilifts: an exercise log for lifters.',
    image: '/shots/health.jpg',
    accent: 'ember',
  },
  {
    id: 'library',
    name: 'library.freiverse.com',
    url: 'https://library.freiverse.com',
    blurb: 'Self-hosted audiobooks and eBooks.',
    image: '/shots/library.jpg',
    accent: 'steel',
    repo: `${GH}/Library`,
  },
];

export const repos: Repo[] = [
  {
    name: 'IchaUI',
    description:
      'Complete UI suite for Vanilla WoW / 1.12: action bars, drawers, unit frames, Shaman totem bar, minimap, XP/rep, Smart Tab & Smart Mark',
    language: 'Lua',
    accent: 'brass',
    url: `${GH}/IchaUI`,
  },
  {
    name: 'IchaUI Forever',
    description: 'IchaUI for WoW Forever. The repo is private for now, so this card has no link.',
    language: 'Lua',
    accent: 'ember',
    badge: 'Private',
  },
  {
    name: 'IchaLaunch',
    description: 'Client launcher with addon and client mod management',
    language: 'Launcher',
    accent: 'steel',
    url: `${GH}/IchaLaunch`,
  },
  {
    name: 'IchasArmory',
    description: 'Turtle WoW Armory and Tank Sim',
    language: 'JavaScript',
    accent: 'green',
    url: `${GH}/IchasArmory`,
  },
  {
    name: 'valheim-performance-fixes',
    description:
      'Custom Valheim BepInEx performance and QoL plugin source (RenderTrim, SpawnBudget, caches, DualGooCompat, BalrondKilnTweaks)',
    language: 'C#',
    accent: 'teal',
    url: `${GH}/valheim-performance-fixes`,
    linkOnly: true,
    badge: 'Plugin · no GUI',
  },
  {
    name: 'FishingBuddy-EasyFish',
    description:
      'Fishing Buddy fork for Turtle/RavenCraft with EasyFish EasyCast (right-click cast + easyfish.dll bobber reel).',
    language: 'Lua',
    accent: 'steel',
    url: `${GH}/FishingBuddy-EasyFish`,
  },
  {
    name: 'IchaMog',
    description: 'Transmog Collection Tracker for HellscreamWoW',
    language: 'Lua',
    accent: 'brass',
    url: `${GH}/IchaMog`,
  },
  {
    name: 'Freifeed',
    description: 'Breast Feeding Tracker',
    language: 'TypeScript',
    accent: 'gold',
    url: `${GH}/Freifeed`,
  },
  {
    name: 'Library',
    description: 'A Self Hosted Audiobook and eBook application.',
    language: 'Python',
    accent: 'steel',
    url: `${GH}/Library`,
  },
  {
    name: 'CartPort',
    description: 'Teleport your cart to you.',
    language: 'C#',
    accent: 'teal',
    url: `${GH}/CartPort`,
  },
  {
    name: 'ClassicWoWClassIcons_Circle_HighRes',
    description:
      'A math based recreation of classic WoW Class Icons for use on fan projects like Discord and personal websites/products.',
    language: 'Art',
    accent: 'ember',
    url: `${GH}/ClassicWoWClassIcons_Circle_HighRes`,
  },
];
