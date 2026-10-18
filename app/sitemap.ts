import type { MetadataRoute } from 'next';
import { ORIGIN } from '@/lib/seo';
export default function sitemap():MetadataRoute.Sitemap {
 const languages={es:ORIGIN+'/',en:ORIGIN+'/en','x-default':ORIGIN+'/'};
 return [ORIGIN+'/',ORIGIN+'/en'].map(url=>({url,alternates:{languages}}));
}
