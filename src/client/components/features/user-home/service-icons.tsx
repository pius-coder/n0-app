import type { ServiceIconKey } from "@/shared/types";

type ServiceIconProps = {
  iconKey: ServiceIconKey;
  size?: number;
};

const icons: Record<ServiceIconKey, (size: number) => React.ReactElement> = {
  whatsapp: (s) => (
    <svg width={s} height={s} viewBox="0 0 48 48" aria-hidden>
      <rect width="48" height="48" rx="14" fill="#25D366" />
      <path
        d="M24 10C16.3 10 10 16.3 10 24c0 2.6.7 5 2 7.1L10 38l7.2-1.9A14 14 0 0 0 24 38c7.7 0 14-6.3 14-14s-6.3-14-14-14zm7.1 19.3c-.3.8-1.6 1.5-2.2 1.6-.5.1-1.2.1-1.9-.2-.4-.1-1-.3-1.7-.6-3-1.3-5-4.3-5.1-4.5-.1-.2-1.1-1.4-1.1-2.7 0-1.3.7-1.9 1-2.2.3-.3.6-.4.8-.4l.6.1c.2 0 .4.1.6.5l.8 2c.1.2.1.4 0 .6l-.4.6c-.1.2-.3.4-.1.7.2.3.9 1.4 1.9 2.2.8.7 1.8 1.1 2 1.2.2.1.4.1.5-.1l.5-.6c.2-.3.5-.3.8-.2l2.3 1.1c.3.1.5.2.6.4.1.3.1 1-.2 1.8z"
        fill="white"
      />
    </svg>
  ),
  facebook: (s) => (
    <svg width={s} height={s} viewBox="0 0 48 48" aria-hidden>
      <rect width="48" height="48" rx="14" fill="#1877F2" />
      <path
        d="M27 38V26.5h4l.6-4.8H27v-3c0-1.4.4-2.2 2.4-2.2h2.1v-4.3c-.4 0-1.8-.2-3.4-.2-3.3 0-5.6 2-5.6 5.7v3.2h-4v4.8h4V38h4.5z"
        fill="white"
      />
    </svg>
  ),
  vk: (s) => (
    <svg width={s} height={s} viewBox="0 0 48 48" aria-hidden>
      <rect width="48" height="48" rx="14" fill="#0077FF" />
      <path
        d="M38.4 16.4c.2-.7 0-1.2-.9-1.2h-3c-.8 0-1.1.4-1.3 1-.7 2-2 3.8-3.4 5-.6.5-1.1.7-1.4.5-.2-.2-.3-.7-.3-1.3v-4.5c0-.8-.2-1.2-1-1.2h-4.7c-.6 0-.9.4-.9.8 0 .9 1.3 1 1.4 3.4v5.1c0 1-.2 1.2-.6 1.2-1.1 0-3.7-3.1-5.3-6.6-.3-.7-.6-1-.5-1h-3c-.9 0-1.1.4-1.1 1 0 .9 1 5.4 5 11.3 2.6 3.8 6.4 5.8 9.8 5.8 2 0 2.3-.4 2.3-1.2v-2.7c0-.9.2-1.1.8-1.1.5 0 1.3.2 3.2 2 2.1 2.1 2.5 3 3.7 3h3c.9 0 1.3-.4 1.1-1.3-.2-.9-1.3-2.3-2.7-3.9-.8-.9-1.9-1.9-2.2-2.4-.5-.6-.4-.8 0-1.4.1-.1 4-5.7 4.4-7.7z"
        fill="white"
      />
    </svg>
  ),
  telegram: (s) => (
    <svg width={s} height={s} viewBox="0 0 48 48" aria-hidden>
      <rect width="48" height="48" rx="14" fill="#229ED9" />
      <path
        d="M10.5 23.2l25.3-9.8c1.2-.4 2.2.3 1.8 1.9l-4.3 20.3c-.3 1.4-1.1 1.7-2.2 1.1l-6.1-4.5-2.9 2.8c-.3.3-.6.4-1.3.4l.5-6.3 12-10.9c.5-.5-.1-.7-.8-.2L15.3 27.4l-6-1.9c-1.3-.4-1.3-1.3.3-1.3z"
        fill="white"
      />
    </svg>
  ),
  instagram: (s) => (
    <svg width={s} height={s} viewBox="0 0 48 48" aria-hidden>
      <defs>
        <linearGradient id="igGrad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFDC80" />
          <stop offset="25%" stopColor="#FCAF45" />
          <stop offset="50%" stopColor="#F77737" />
          <stop offset="75%" stopColor="#C13584" />
          <stop offset="100%" stopColor="#833AB4" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="14" fill="url(#igGrad)" />
      <rect x="13" y="13" width="22" height="22" rx="6" fill="none" stroke="white" strokeWidth="2.5" />
      <circle cx="24" cy="24" r="6" fill="none" stroke="white" strokeWidth="2.5" />
      <circle cx="33" cy="15" r="1.5" fill="white" />
    </svg>
  ),
};

export function ServiceIcon({ iconKey, size = 48 }: ServiceIconProps) {
  const render = icons[iconKey];
  return render ? render(size) : null;
}
