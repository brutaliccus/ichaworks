// Prints current public GitHub descriptions for the repos in src/data/projects.ts.
// Usage: node scripts/fetch-repos.mjs   (set GITHUB_TOKEN to avoid rate limits)
const names = ['IchaUI','IchaLaunch','IchasArmory','valheim-performance-fixes','FishingBuddy-EasyFish',
  'IchaMog','Freifeed','Library','CartPort','ClassicWoWClassIcons_Circle_HighRes'];
const headers = process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {};
for (const n of names) {
  const r = await fetch(`https://api.github.com/repos/brutaliccus/${n}`, { headers });
  const d = await r.json();
  console.log(r.ok ? `${n} [${d.private ? 'private' : 'public'}] (${d.language}) — ${d.description}` : `${n}: ${r.status} ${d.message}`);
}
