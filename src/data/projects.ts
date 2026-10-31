/**
 * IchaWorks project data — the single place to edit portfolio content.
 *
 * - `showcase`  → slides in the hero carousel (need a screenshot or a placeholder).
 * - `hostedSites` → the "Live on the web" section.
 * - `repos`     → the GitHub section cards.
 *
 * Screenshots live in /public/shots and are refreshed with:
 *   node scripts/capture-sites.mjs
 * Gallery images (real captures only, never generated):
 *   ichaui-*      from the IchaUI repo, docs/screenshots (in-game captures + preview renders)
 *   ichalaunch-*  captured from the current launcher build (v1.6.18) running on Linux/Xvfb
 *                 with a fresh profile: no account, no game folder
 *   typewrite-*   captured with Playwright from TypeWrite running locally against
 *                 Firebase emulators, with a demo account and demo manuscript
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
export type Accent = 'gold' | 'brass' | 'green' | 'ember' | 'steel' | 'teal' | 'rose';

export interface ProjectLink {
  label: string;
  href: string;
  kind: 'live' | 'repo';
}

export interface GalleryImage {
  src: string;
  alt: string;
  /** Short label shown on the thumbnail strip / under the image. */
  caption: string;
  /** Gallery images letterbox by default ('contain'); 'cover' fills the 16:10 frame. */
  fit?: 'cover' | 'contain';
}

export interface Slide {
  id: string;
  title: string;
  /** Show the title in its own casing in uppercase titlebars. */
  keepCase?: boolean;
  blurb: string;
  /** Path under /public, or null to render a styled placeholder. */
  image: string | null;
  imageAlt: string;
  tags: string[];
  accent: Accent;
  links: ProjectLink[];
  /** Short note shown on placeholder art (e.g. why there's no screenshot). */
  placeholderNote?: string;
  /** Text for the pill shown when there are no links (default "Links coming soon"). */
  noLinksNote?: string;
  /** Extra screenshots; when set, the slide shows a thumbnail strip and `image` is ignored. */
  gallery?: GalleryImage[];
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
    image: '/shots/armory-full-result-details-1.webp',
    imageAlt: "Icha's Armory DPS sim result of 323 DPS with the damage breakdown bar chart",
    tags: ['JavaScript', 'Game tools', 'Discord auth'],
    accent: 'green',
    links: [
      { label: 'Visit site', href: 'https://ichasarmory.quest', kind: 'live' },
      { label: 'GitHub repo', href: `${GH}/IchasArmory`, kind: 'repo' },
    ],
    gallery: [
      { src: '/shots/armory-full-result-details-1.webp', caption: 'DPS sim: 323 DPS over 10,000 iterations', alt: "Icha's Armory DPS sim result of 323 DPS with the damage breakdown bars", fit: 'contain' },
      { src: '/shots/armory-full-gear.webp', caption: 'Enhancement Shaman gear', alt: "Icha's Armory character page with a full Enhancement Shaman gear set and stat breakdown", fit: 'contain' },
      { src: '/shots/armory-full-talents.webp', caption: 'Talents', alt: "Icha's Armory talents tab with Elemental, Enhancement and Restoration trees filled in", fit: 'contain' },
      { src: '/shots/armory-full-details-2-bars-timeline.webp', caption: 'Damage breakdown', alt: "Icha's Armory DPS sim damage breakdown bars per ability above the damage timeline", fit: 'contain' },
      { src: '/shots/armory-full-details-table-1-auto-attack.webp', caption: 'Auto attack breakdown', alt: "Icha's Armory auto attack breakdown table with crit, glancing, hit, miss and dodge counts", fit: 'contain' },
      { src: '/shots/armory-full-details-table-4-stormstrike.webp', caption: 'Stormstrike breakdown', alt: "Icha's Armory Stormstrike breakdown table with hit and crit counts and damage", fit: 'contain' },
      { src: '/shots/armory-full-details-3-timelines.webp', caption: 'Damage and uptime timelines', alt: "Icha's Armory DPS sim damage timeline chart and buff and proc uptime timeline", fit: 'contain' },
      { src: '/shots/armory-full-distribution.webp', caption: 'DPS distribution', alt: "Icha's Armory DPS sim distribution histogram of runs by DPS", fit: 'contain' },
      { src: '/shots/ichasarmory.jpg', caption: 'Home', alt: "Icha's Armory home page with the character import form", fit: 'contain' },
    ],
  },
  {
    id: 'gear-planner',
    title: "Icha's Armory Gear Planner",
    blurb:
      'A paperdoll gear planner on Icha\'s Armory: fill all 17 slots, see where to farm each piece, track modified stats from buffs and talents, and save or share plans.',
    image: '/shots/gear-planner-icha.webp',
    imageAlt: "Icha's Armory Gear Planner with the Ichabaddie's 2H Mace Pre-Raid BIS plan loaded",
    tags: ['JavaScript', 'Gear planning', 'Turtle WoW'],
    accent: 'green',
    links: [
      { label: 'Open planner', href: 'https://ichasarmory.quest/gear-planner', kind: 'live' },
      { label: 'GitHub repo', href: `${GH}/IchasArmory`, kind: 'repo' },
    ],
    gallery: [
      { src: '/shots/gear-planner-icha.webp', caption: "Ichabaddie's 2H Mace Pre-Raid BIS", alt: "Icha's Armory Gear Planner on desktop showing the Ichabaddie's 2H Mace Pre-Raid BIS plan with Locations Needed and Modified Stats" },
      { src: '/shots/gear-planner-icha-mobile.webp', caption: "Ichabaddie's 2H Mace Pre-Raid BIS", alt: "Icha's Armory Gear Planner on a phone showing the Ichabaddie's 2H Mace Pre-Raid BIS plan with its gear list" },
      { src: '/shots/gear-planner.jpg', caption: 'Gear Planner', alt: "Icha's Armory Gear Planner with its equipment slots, Locations Needed and Modified Stats panels" },
    ],
  },
  {
    id: 'lootlock',
    title: 'LootLock',
    blurb:
      'Soft-reserve loot sheets for WoW Forever raids. Set up a sheet, share one link, and lock every reserve before the pull. Ships with a companion addon.',
    image: '/shots/lootlock-raid-loot.webp',
    imageAlt: 'LootLock raid page for City of Dalaran with the loot table and per-item reserve buttons by boss',
    tags: ['Web app', 'Raid tools', 'Addon sync'],
    accent: 'gold',
    links: [{ label: 'Visit site', href: 'https://lootlock.win', kind: 'live' }],
    gallery: [
      { src: '/shots/lootlock-raid-loot.webp', caption: 'Raid loot', alt: 'LootLock raid page for City of Dalaran with the loot table and per-item reserve buttons by boss' },
      { src: '/shots/lootlock-dashboard.webp', caption: 'Dashboard', alt: 'LootLock dashboard with the events list, a Create Raid panel and the characters list' },
      { src: '/shots/lootlock-me-characters.webp', caption: 'Characters', alt: 'LootLock characters page with SR+ bonuses per character and a strip of recent raids' },
      { src: '/shots/lootlock-raid-roster.webp', caption: 'Raid roster', alt: 'LootLock raid roster listing each character, spec and their reserved items' },
    ],
  },
  {
    id: 'ichaui',
    title: 'IchaUI',
    blurb:
      'A complete UI suite for Vanilla WoW 1.12 and Turtle WoW: action bars and drawers, hero bars, unit and party frames, a Shaman totem bar, minimap shapes, XP/rep bars, and Smart Tab & Smart Mark.',
    image: '/shots/ichaui-overview.webp',
    imageAlt: 'IchaUI in game',
    tags: ['Lua', 'WoW addon', 'Turtle WoW'],
    accent: 'brass',
    links: [{ label: 'GitHub repo', href: `${GH}/IchaUI`, kind: 'repo' }],
    gallery: [
      { src: '/shots/ichaui-overview.webp', caption: 'In game', alt: 'IchaUI in game in the Barrens: player frame, action bars, chat and minimap' },
      { src: '/shots/ichaui-unit-frames.webp', caption: 'Unit frames', alt: 'IchaUI player, target and target-of-target frames with circular portraits' },
      { src: '/shots/ichaui-hero-setup.webp', caption: 'Hero setup', alt: 'IchaUI Hero setup window assigning several shock spells to one hero button' },
      { src: '/shots/ichaui-config-frames.webp', caption: 'Frame config', alt: 'IchaUI unit frame settings with live preview, portrait, cast bar and buff options' },
      { src: '/shots/ichaui-button-shapes.webp', caption: 'Button shapes', alt: 'Preview render of every IchaUI button and drawer shape' },
    ],
  },
  {
    id: 'ichalaunch',
    title: 'IchaLaunch',
    blurb:
      'A themed game launcher: a first-run setup wizard and guided client install, an addon catalog with one-click installs and updates, client mod and HD patch presets, in-launcher news and release notes, and PLAY with pre-launch checks.',
    image: '/shots/ichalaunch-home.webp',
    imageAlt: 'IchaLaunch home tab',
    tags: ['Launcher', 'Addon manager', 'Windows + Linux'],
    accent: 'steel',
    links: [{ label: 'GitHub repo', href: `${GH}/IchaLaunch`, kind: 'repo' }],
    gallery: [
      { src: '/shots/ichalaunch-home.webp', caption: 'Home', alt: 'IchaLaunch home tab with the What\'s New notes for 1.6.18 beside the rotating news art and the INSTALL button' },
      { src: '/shots/ichalaunch-addons.webp', caption: 'Addons', alt: 'IchaLaunch addons tab with the searchable catalog of 483 addons, download counts and install buttons' },
      { src: '/shots/ichalaunch-client.webp', caption: 'Client mods', alt: 'IchaLaunch client tab with client-mod presets from Basic to HD AIO and Enhanced, plus category tabs' },
      { src: '/shots/ichalaunch-settings.webp', caption: 'Settings', alt: 'IchaLaunch settings tab with game location, AddOns folder and update options' },
      { src: '/shots/ichalaunch-onboarding.webp', caption: 'Setup wizard', alt: 'IchaLaunch first-run setup wizard welcome screen with Install Now' },
    ],
  },
  {
    id: 'typewrite',
    title: 'TypeWrite',
    blurb:
      'A cloud writing studio for fiction authors: a Scrivener-style binder, rich manuscript editor, outline and corkboard views, character and world bibles, and export to Word, EPUB and PDF. Syncs with Firebase; desktop builds via Tauri.',
    image: '/shots/typewrite-editor.webp',
    imageAlt: 'TypeWrite manuscript editor',
    tags: ['TypeScript', 'Writing', 'Private'],
    accent: 'gold',
    links: [],
    noLinksNote: 'Private repo · no public link',
    gallery: [
      { src: '/shots/typewrite-editor.webp', caption: 'Editor', alt: 'TypeWrite manuscript editor with the binder, formatting toolbar and a demo chapter' },
      { src: '/shots/typewrite-corkboard.webp', caption: 'Corkboard', alt: 'TypeWrite corkboard of chapter and scene index cards with synopses' },
      { src: '/shots/typewrite-outline.webp', caption: 'Outline', alt: 'TypeWrite outline view with synopsis, POV and location for each chapter and scene' },
      { src: '/shots/typewrite-char.webp', caption: 'Characters', alt: 'TypeWrite character sheet for a primary character' },
    ],
  },
  {
    id: 'freilifts',
    title: 'Freilifts',
    blurb:
      'Classic strength, modern performance: a self-hosted exercise log with email and Google sign-in.',
    image: '/shots/freilifts-m-workouts.webp',
    imageAlt: 'Freilifts on a phone: the workout log calendar and an active workout',
    tags: ['Fitness', 'Self-hosted', 'Auth'],
    accent: 'ember',
    links: [{ label: 'Visit site', href: 'https://health.freiverse.com', kind: 'live' }],
    gallery: [
      { src: '/shots/freilifts-m-workouts.webp', caption: 'Workout log', alt: 'Freilifts on a phone: the workout log calendar with last workout summary, and an active workout with timer' },
      { src: '/shots/freilifts-m-food-programs.webp', caption: 'Food log · Programs', alt: 'Freilifts on a phone: the food log calendar, and built-in training programs such as StrongLifts 5x5' },
      { src: '/shots/freilifts-m-records-progress.webp', caption: 'Records · Progress', alt: 'Freilifts on a phone: personal records by muscle group, and my progress with weekly set volume and a calories chart' },
    ],
  },
  {
    id: 'library',
    title: 'Library',
    blurb: 'A self-hosted audiobook and eBook app. Join a library with an invite link and listen anywhere.',
    image: '/shots/library-v2-my-library-audiobooks.webp',
    imageAlt: 'Library My Library audiobooks tab with Continue Listening and a shelf of audiobooks',
    tags: ['Python', 'Audiobooks', 'Self-hosted'],
    accent: 'steel',
    links: [
      { label: 'Visit site', href: 'https://lastlibrary.app', kind: 'live' },
      { label: 'GitHub repo', href: `${GH}/Library`, kind: 'repo' },
    ],
    gallery: [
      { src: '/shots/library-v2-my-library-audiobooks.webp', caption: 'Audiobooks', alt: 'Library My Library audiobooks tab with Continue Listening and a shelf of audiobook covers' },
      { src: '/shots/library-v2-ebooks.webp', caption: 'eBooks', alt: 'Library My Library eBooks tab with a shelf of eBook covers' },
      { src: '/shots/library-v2-browse.webp', caption: 'Browse', alt: 'Library Browse page with genre sidebar, catalog search and cover badge legend' },
      { src: '/shots/library-v2-requests.webp', caption: 'Requests', alt: 'Library My Requests page with per-book download, metadata, M4B and chapter progress steps' },
      { src: '/shots/library-m-mylibrary.webp', caption: 'Mobile: My Library', alt: 'Library on a phone: My Library audiobooks and eBooks tabs' },
      { src: '/shots/library-m-browse-requests.webp', caption: 'Mobile: Browse', alt: 'Library on a phone: Browse, My Requests and Choose a library screens' },
      { src: '/shots/library-v2-libraries.webp', caption: 'Libraries', alt: 'Library Choose a library screen with The Last Library saved on the device' },
    ],
  },
  {
    id: 'buba',
    title: 'Buba',
    keepCase: true,
    blurb:
      'A web and Android app for tracking nursing and breast milk storage: feeds, pumped milk by bag in the fridge or freezer, diapers, medicine reminders and growth for the whole household. Built with React, Vite, Firebase and Capacitor.',
    image: '/shots/buba-card.webp',
    imageAlt: 'Buba on three phones: the home dashboard, the feeding timeline and milk storage',
    tags: ['React', 'Firebase', 'Capacitor'],
    accent: 'rose',
    links: [
      { label: 'Visit site', href: 'https://freifeed.freiverse.com/', kind: 'live' },
      { label: 'GitHub repo', href: `${GH}/Freifeed`, kind: 'repo' },
    ],
    gallery: [
      { src: '/shots/buba-card.webp', caption: 'Home · Timeline · Milk', alt: 'Buba on three phones: the home dashboard, the feeding timeline and milk storage' },
      { src: '/shots/buba-pair-nursing-timeline.webp', caption: 'Nursing · Timeline', alt: 'Buba on two phones: the nursing log with side and timer, and the daily feeding timeline per baby and pump (demo data)' },
      { src: '/shots/buba-pair-milk.webp', caption: 'Milk storage', alt: 'Buba on two phones: refrigerated and frozen milk bags with days left (demo data)' },
      { src: '/shots/buba-pair-diapers-medicine.webp', caption: 'Diapers · Medicine', alt: 'Buba on two phones: the diaper timeline and a daily medicine reminder (demo data)' },
      { src: '/shots/buba-pair-notes-measurements.webp', caption: 'Notes · Growth', alt: 'Buba on two phones: appointments, reminders and notes, and growth measurements per baby (demo data)' },
      { src: '/shots/buba-pair-signin-home.webp', caption: 'Sign-in · Home', alt: 'Buba on two phones: the Google sign-in screen and the home dashboard with each baby and milk on hand (demo data)' },
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
    name: "Icha's Armory",
    url: 'https://ichasarmory.quest',
    blurb: 'Turtle WoW armory and tank sim.',
    image: '/shots/armory-full-result-details-1.webp',
    accent: 'green',
    repo: `${GH}/IchasArmory`,
  },
  {
    id: 'gear-planner',
    name: "Icha's Armory Gear Planner",
    url: 'https://ichasarmory.quest/gear-planner',
    blurb: 'Plan every gear slot, see where to farm it, and share the build.',
    image: '/shots/gear-planner-icha.webp',
    accent: 'green',
    repo: `${GH}/IchasArmory`,
  },
  {
    id: 'lootlock',
    name: 'LootLock',
    url: 'https://lootlock.win',
    blurb: 'Soft-reserve raid loot, locked before the pull.',
    image: '/shots/lootlock-raid-loot.webp',
    accent: 'gold',
  },
  {
    id: 'health',
    name: 'Freilifts',
    url: 'https://health.freiverse.com',
    blurb: 'Freilifts: an exercise log for lifters.',
    image: '/shots/freilifts-m-workouts.webp',
    accent: 'ember',
  },
  {
    id: 'library',
    name: 'Last Library',
    url: 'https://lastlibrary.app',
    blurb: 'Self-hosted audiobooks and eBooks.',
    image: '/shots/library-v2-my-library-audiobooks.webp',
    accent: 'steel',
    repo: `${GH}/Library`,
  },
  {
    id: 'buba',
    name: 'Buba',
    url: 'https://freifeed.freiverse.com/',
    blurb: 'Nursing and breast milk storage tracker for the web and Android.',
    image: '/shots/buba-card.webp',
    accent: 'rose',
    repo: `${GH}/Freifeed`,
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
    name: 'TypeWrite',
    description:
      'Cloud writing studio for fiction authors: binder, rich manuscript editor and Firebase sync. The repo is private, so this card has no link.',
    language: 'TypeScript',
    accent: 'gold',
    badge: 'Private',
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
