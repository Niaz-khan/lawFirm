import ScrollReveal from './ScrollReveal';

const avatarColors = {
  'brass-light': 'bg-brass-light',
  'moss': 'bg-moss',
};

export default function TeamCard({ member }) {
  return (
    <ScrollReveal>
      <div className="bg-[rgba(247,242,228,0.04)] border border-[rgba(247,242,228,0.12)] rounded-md p-7 flex items-stretch gap-5 h-full">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            loading="lazy"
            className="w-[140px] rounded-tl-xl rounded-br-xl object-cover shrink-0"
          />
        ) : (
          <div
            className={`w-[140px] rounded-tl-xl rounded-br-xl ${avatarColors[member.avatar_color] || 'bg-brass-light'} text-ink flex items-center justify-center font-hand font-bold text-[1.6rem] shrink-0`}
            style={{ transform: 'rotate(-3deg)' }}
          >
            {member.initials}
          </div>
        )}
        <div>
          <h3 className="text-paper-white text-[1.15rem]">{member.name}</h3>
          <span className="font-mono text-[0.72rem] tracking-[0.08em] uppercase text-brass-light mt-1.5 block">
            {member.role}
          </span>
          <p className="mt-3.5 text-[rgba(247,242,228,0.68)] text-[0.92rem] leading-[1.6]">
            {member.bio}
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
}
