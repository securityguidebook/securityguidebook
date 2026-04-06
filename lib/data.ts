// ── Site-wide content data ──
// Edit this file to update all page content without touching components.

export const SITE = {
  name:   "SecurityGuidebook",
  domain: "securityguidebook.dev",
  owner:  "Pawarid Tupmongkol",
  since:  new Date("2019-05-09T00:00:00"), // elapsed clock start
  status: "Open to AUS opportunities",
  location: "Bangkok → Australia",
  github:   "https://github.com/securityguidebook",
  linkedin: "https://linkedin.com/in/pawarid",   // update to real URL
  youtube:  "https://youtube.com/@securityguidebook", // update to real URL
  blog:     "#",
};

export const TYPEWRITER_LINES = [
  "Safer Internet Since 2019.",
  "Every day I show up — threats go down.",
  "SOC · AppSec · Cloud Security · AUS ready.",
];

export const KPIS = [
  { value: "2400+", label: "Alerts Triaged" },
  { value: "15+",   label: "KQL Detection Rules" },
  { value: "6",     label: "IR Playbooks Authored" },
  { value: "2+",    label: "HTB CTF Writeups" },
];

export const CERTS = [
  { label: "Terraform Assoc.", active: true },
  { label: "Google Cyber",     active: true },
  { label: "Security+ →",      active: false },
];

export type Project = {
  icon:    string;
  tag:     string;
  tagType: "green" | "red" | "white" | "warn";
  name:    string;
  desc:    string;
  metrics: { value: string; label: string }[];
  href:    string;
};

export const PROJECTS: Project[] = [
  {
    icon:    "🛡️",
    tag:     "SOC Tooling",
    tagType: "green",
    name:    "KQL Detection Library",
    desc:    "15+ Sentinel rules. Lateral movement, privilege escalation, data exfil. MITRE ATT&CK mapped.",
    metrics: [
      { value: "15+",   label: "Rules" },
      { value: "MITRE", label: "Mapped" },
      { value: "v1.3",  label: "Version" },
    ],
    href: "https://github.com/securityguidebook",
  },
  {
    icon:    "🔍",
    tag:     "AppSec",
    tagType: "red",
    name:    "WebGuard Scanner",
    desc:    "Python vuln scanner — SQLi, XSS, header analysis, SSL checks. Blue team defensive framing.",
    metrics: [
      { value: "Python", label: "Lang" },
      { value: "8",      label: "Check Types" },
    ],
    href: "https://github.com/securityguidebook",
  },
  {
    icon:    "📁",
    tag:     "Full-Stack",
    tagType: "white",
    name:    "Folio PM",
    desc:    "React 18 + Supabase project tracker. Multi-user auth. Cloudflare Pages. Active dev.",
    metrics: [
      { value: "v2.2", label: "Version" },
      { value: "CF",   label: "Deployed" },
    ],
    href: "https://github.com/securityguidebook",
  },
  {
    icon:    "📝",
    tag:     "Writeups",
    tagType: "warn",
    name:    "HTB CTF Writeups",
    desc:    "Cicada & TwoMillion — attacker TTPs documented from a blue team lens.",
    metrics: [
      { value: "2+",    label: "Published" },
      { value: "ATT&CK", label: "Annotated" },
    ],
    href: "https://github.com/securityguidebook",
  },
  {
    icon:    "🍏",
    tag:     "Health Tech",
    tagType: "white",
    name:    "NourishFit",
    desc:    "AI macro scanner, supplement logs, Claude API coach. React + Supabase + Cloudflare.",
    metrics: [
      { value: "Claude", label: "AI Coach" },
      { value: "Live",   label: "Status" },
    ],
    href: "https://github.com/securityguidebook",
  },
  {
    icon:    "✈️",
    tag:     "Full-Stack",
    tagType: "white",
    name:    "FlightLog",
    desc:    "Personal logbook with AeroAPI, AI Copilot, Priority Pass lounge integration.",
    metrics: [
      { value: "AeroAPI", label: "Data" },
      { value: "AI",      label: "Copilot" },
    ],
    href: "https://github.com/securityguidebook",
  },
];
