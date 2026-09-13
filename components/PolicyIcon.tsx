import type { SVGProps } from "react";

type IconName = "book" | "document" | "sparkles" | "calendar" | "home" | "health" | "shield" | "arrow" | "send" | "info" | "bot";

const paths: Record<IconName, React.ReactNode> = {
  book: <><path d="M12 5v15M3 4.5c3-1 6-.5 9 1.5 3-2 6-2.5 9-1.5v14c-3-1-6-.5-9 1.5-3-2-6-2.5-9-1.5z" /><path d="m6 8 3 1m6 0 3-1" /></>,
  document: <><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6M8 13h8M8 17h5" /></>,
  sparkles: <><path d="m12 3 2.6 6.4L21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6zM20 2v4M18 4h4" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M7 3v4m10-4v4M3 11h18m-13 4h2m4 0h2m-8 3h2" /></>,
  home: <><path d="m3 10 9-7 9 7M5 9v11h14V9M9 20v-7h6v7" /></>,
  health: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /><path d="M12 9v6m-3-3h6" /></>,
  shield: <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>,
  arrow: <path d="m9 5 7 7-7 7" />,
  send: <><path d="m22 2-7 20-4-9-9-4zM11 13 22 2" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6m0-10v.01" /></>,
  bot: <><rect x="4" y="7" width="16" height="14" rx="5" /><path d="M12 3v4M1 12v4m22-4v4M8 12v2m8-2v2m-7 3h6" /><circle cx="12" cy="2.5" r=".5" /></>,
};

export default function PolicyIcon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}
