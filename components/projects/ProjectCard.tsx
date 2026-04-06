import { Project } from '@/lib/data';

const TAG_STYLES: Record<Project['tagType'], { border: string; color: string }> = {
  green: { border: 'rgba(57,255,20,0.4)',  color: '#39ff14'  },
  red:   { border: 'rgba(244,63,94,0.3)',  color: '#f43f5e'  },
  white: { border: 'rgba(255,255,255,0.2)',color: '#888888'  },
  warn:  { border: 'rgba(245,158,11,0.3)', color: '#f59e0b'  },
};

export default function ProjectCard({ project }: { project: Project }) {
  const tag = TAG_STYLES[project.tagType];

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-base hover:bg-card transition-colors p-5 relative overflow-hidden block no-underline"
      style={{ textDecoration: 'none' }}
    >
      {/* Top accent bar — slides in on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 bg-neon origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
      />

      {/* Card header */}
      <div className="flex items-start justify-between mb-2.5">
        <span className="text-lg" role="img" aria-hidden>{project.icon}</span>
        <span
          className="font-mono text-[8px] font-bold tracking-[0.1em] uppercase px-1.5 py-0.5"
          style={{ border: `1px solid ${tag.border}`, color: tag.color }}
        >
          {project.tag}
        </span>
      </div>

      {/* Name */}
      <h3 className="font-mono text-[12px] font-bold text-smoke tracking-[0.02em] mb-1.5">
        {project.name}
      </h3>

      {/* Description */}
      <p className="font-mono text-[9px] text-dim leading-[1.8] tracking-[0.02em] uppercase mb-3.5">
        {project.desc}
      </p>

      {/* Metrics */}
      <div
        className="flex gap-3.5 pt-3"
        style={{ borderTop: '1px solid rgba(57,255,20,0.1)' }}
      >
        {project.metrics.map(({ value, label }) => (
          <div key={label} className="flex flex-col gap-0.5">
            <span className="font-bebas text-[20px] text-neon leading-none tracking-[0.04em]">
              {value}
            </span>
            <span className="font-mono text-[8px] font-bold tracking-[0.1em] uppercase text-dim">
              {label}
            </span>
          </div>
        ))}
      </div>
    </a>
  );
}
