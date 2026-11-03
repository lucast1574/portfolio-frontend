import { ArrowUpRight } from 'lucide-react';

const stores = {
  android: { name: 'Google Play', platform: 'Android' },
  ios: { name: 'App Store', platform: 'iOS' },
};

export default function StoreLink({ href, platform }: { href: string; platform: keyof typeof stores }) {
  const store = stores[platform];
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="project-link project-store-link" aria-label={`${store.name} · ${store.platform}`}>
      <svg className="project-store-icon" width="23" height="25" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        {platform === 'android' ? <>
          <path d="M3.3 2.3 13 12 3.3 21.7a2 2 0 0 1-.3-1.1V3.4c0-.4.1-.8.3-1.1Z" />
          <path d="m4.5 1.6 11.3 6.5-2.1 2.5L4.5 1.6Zm0 20.8 9.2-9 2.1 2.5-11.3 6.5ZM16.9 8.8l3.7 2.1c.9.5.9 1.7 0 2.2l-3.7 2.1-2.5-3.2 2.5-3.2Z" />
        </> : <path d="M17.1 12.3c0-2 1.6-3 1.7-3.1-1-1.5-2.6-1.7-3.2-1.7-1.4-.2-2.7.8-3.4.8-.7 0-1.8-.8-2.9-.8-1.5 0-2.9.9-3.7 2.2-1.6 2.7-.4 6.7 1.1 8.9.7 1.1 1.6 2.3 2.8 2.2 1.1 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.1 2.7-2.2c.9-1.2 1.2-2.4 1.2-2.5-.1 0-2.3-.9-2.3-3.8ZM14.8 6.1c.6-.8 1.1-1.9 1-3-.9 0-2 .6-2.7 1.4-.6.7-1.2 1.8-1 2.9 1 .1 2.1-.5 2.7-1.3Z" />}
      </svg>
      <span className="project-store-label"><span className="project-store-platform">{store.platform}</span><span>{store.name}</span></span>
      <ArrowUpRight size={15} aria-hidden="true" />
    </a>
  );
}
