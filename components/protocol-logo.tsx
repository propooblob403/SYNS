type ProtocolLogoProps = {
  className?: string;
  showWordmark?: boolean;
};

export function ProtocolLogo({ className, showWordmark = true }: ProtocolLogoProps) {
  return (
    <span className={className ? `protocol-logo ${className}` : "protocol-logo"}>
      <svg viewBox="0 0 88 88" className="protocol-logo__mark" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 40L22 23L39 14L52 13L66 24L74 40L72 55L64 64L55 70L46 58L42 47L31 61L20 55L13 40Z" />
          <path d="M22 23L31 35L42 47L52 13" />
          <path d="M31 35L39 14" />
          <path d="M31 35L20 55" />
          <path d="M42 47L64 64" />
          <path d="M42 47L66 24" />
          <path d="M42 47L74 40" />
          <path d="M42 47L13 40" />
          <path d="M42 47L46 79" />
          <path d="M31 61L46 79L55 70" />
        </g>
        <g fill="currentColor">
          <circle cx="13" cy="40" r="3.4" />
          <circle cx="22" cy="23" r="3.4" />
          <circle cx="39" cy="14" r="2.8" />
          <circle cx="52" cy="13" r="3.4" />
          <circle cx="66" cy="24" r="2.8" />
          <circle cx="74" cy="40" r="3.4" />
          <circle cx="64" cy="64" r="2.8" />
          <circle cx="55" cy="70" r="3" />
          <circle cx="31" cy="61" r="2.8" />
          <circle cx="42" cy="47" r="5.8" />
        </g>
      </svg>
      {showWordmark ? (
        <span className="protocol-logo__wordmark">
          <strong>SYNS</strong>
          <small>Synaptic Swarm Protocol</small>
        </span>
      ) : null}
    </span>
  );
}
