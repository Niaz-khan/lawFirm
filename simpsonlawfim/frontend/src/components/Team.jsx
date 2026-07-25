import { useTeamMembers } from '../lib/hooks';
import ScrollReveal from './ScrollReveal';
import TeamCard from './TeamCard';

export default function Team() {
  const { members, loading } = useTeamMembers();

  if (loading) return null;

  return (
    <section className="bg-ink text-paper py-24 max-md:py-20">
      <div className="max-w-[1160px] mx-auto px-7">
        <ScrollReveal>
          <span className="font-mono text-[0.76rem] tracking-[0.14em] uppercase text-brass-light">
            The attorneys
          </span>
          <h2 className="text-paper-white text-[clamp(1.7rem,3vw,2.3rem)] mt-3.5">
            Small enough to know your name
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-3 max-md:grid-cols-1 gap-7 mt-13 stagger-in">
          {members.map((member) => (
            <TeamCard key={member.slug} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
