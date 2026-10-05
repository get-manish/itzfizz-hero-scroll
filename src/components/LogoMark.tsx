export default function LogoMark({ size = 36 }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
    <rect width="64" height="64" rx="18" fill="#FFC400" />
    <path d="M20 44 44 20M26 20h18v18" stroke="#111" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>)
}
