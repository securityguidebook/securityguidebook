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
  { value: "2400+", label: "Alerts Triaged"       },
  { value: "15+",   label: "KQL Detection Rules"  },
  { value: "5",     label: "Live GitHub Projects"  },
  { value: "2+",    label: "HTB CTF Writeups"      },
];

export const CERTS = [
  { label: "Google Cyber",          active: true  },
  { label: "Google IT Pro",         active: true  },
  { label: "Vuln Management",       active: true  },
  { label: "Security+ →",           active: false },
  { label: "CCNA →",                active: false },
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
    icon:    "☁️",
    tag:     "SOC · Cloud",
    tagType: "green",
    name:    "Azure Honey Net SOC",
    desc:    "Live SOC environment on Azure. Sentinel SIEM with real-world attack ingestion, KQL analytics rules, log analysis, and incident response workflow.",
    metrics: [
      { value: "Sentinel", label: "SIEM"      },
      { value: "KQL",      label: "Analytics" },
      { value: "Live",     label: "Env"       },
    ],
    href: "https://github.com/securityguidebook/Azure-Honey-Net-SOC",
  },
  {
    icon:    "🔎",
    tag:     "SOC Tooling",
    tagType: "green",
    name:    "KQL Detection Library",
    desc:    "15+ custom Microsoft Sentinel detection rules. Lateral movement, privilege escalation, data exfil. Fully MITRE ATT&CK mapped.",
    metrics: [
      { value: "15+",   label: "Rules"   },
      { value: "MITRE", label: "Mapped"  },
      { value: "KQL",   label: "Lang"    },
    ],
    href: "https://github.com/securityguidebook/KQL-Queries",
  },
  {
    icon:    "🖥️",
    tag:     "Cloud Security",
    tagType: "white",
    name:    "Azure VM Hardening",
    desc:    "Step-by-step Azure VM provisioning and security hardening. Network hardening, NSG rules, defender config, CIS benchmark alignment.",
    metrics: [
      { value: "Azure", label: "Cloud"    },
      { value: "CIS",   label: "Baseline" },
    ],
    href: "https://github.com/securityguidebook/Azure-VM-Prep-pt-1",
  },
  {
    icon:    "🏢",
    tag:     "Enterprise",
    tagType: "white",
    name:    "Active Directory Lab",
    desc:    "Full AD environment in VirtualBox. User provisioning, GPO hardening, privilege management, and attack simulation for detection tuning.",
    metrics: [
      { value: "AD",         label: "Platform"   },
      { value: "VirtualBox", label: "Hypervisor" },
    ],
    href: "https://github.com/securityguidebook/Active-Directory-Lab",
  },
  {
    icon:    "🗄️",
    tag:     "Blue Team",
    tagType: "warn",
    name:    "SQL Incident Analysis",
    desc:    "Security incident investigation using SQL queries against SIEM log tables. Filters, joins, and pattern matching to surface malicious activity.",
    metrics: [
      { value: "SQL",  label: "Tool"    },
      { value: "SIEM", label: "Context" },
    ],
    href: "https://github.com/securityguidebook/Security-Incident-Analysis-using-SQL",
  },
  {
    icon:    "📝",
    tag:     "CTF · OffSec",
    tagType: "red",
    name:    "HTB CTF Writeups",
    desc:    "Hack The Box walkthroughs — Cicada & TwoMillion. Attacker TTPs documented from a blue team lens with MITRE ATT&CK annotations.",
    metrics: [
      { value: "2+",    label: "Published"  },
      { value: "ATT&CK", label: "Annotated" },
    ],
    href: "https://github.com/securityguidebook",
  },
];
