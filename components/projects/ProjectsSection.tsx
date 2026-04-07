import ProjectCard from './ProjectCard';
import { PROJECTS } from '@/lib/data';

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="px-10 py-14"
      style={{ borderTop: '1px solid var(--neon-border)' }}
    >
      {/* Section header */}
      <div className="flex items-baseline gap-4 mb-7">
        <h2 className="font-bebas text-[42px] text-smoke tracking-[0.04em] leading-none">
          PROJECTS
        </h2>
        <span className="font-mono text-[9px] font-bold tracking-[0.18em] uppercase text-neon">
          // portfolio
        </span>
        <div className="flex-1 h-px ml-2" style={{ background: 'var(--neon-border)' }} />
      </div>

      {/* Grid — 1px gutters on a neon background create the border-between-cards effect */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
        style={{
          background: 'rgba(57,255,20,0.1)',
          border:     '1px solid rgba(57,255,20,0.1)',
        }}
      >
        {PROJECTS.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>
    </section>
  );
}
