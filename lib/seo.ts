import type { Metadata } from 'next';
export const ORIGIN = 'https://lucas.santillan.pro';
export function portfolioMetadata(locale: 'es' | 'en'): Metadata {
 const spanish=locale==='es';
 const title=spanish?'Lucas Santillan | Desarrollador Full Stack y software':'Lucas Santillan | Full Stack Developer & Software';
 const description=spanish?'Soy Lucas Santillan, desarrollador Full Stack. Conoce mis proyectos de software, aplicaciones web y móviles, productos digitales y mi canal de YouTube.':'I’m Lucas Santillan, a Full Stack developer. Explore my software projects, web and mobile applications, digital products and YouTube channel.';
 const url=ORIGIN+(spanish?'/':'/en');
 const image={url:`${ORIGIN}/lucas-santillan-social.png`,width:1200,height:630,alt:'Lucas Santillan — Full Stack Developer'};
 return {title,description,metadataBase:new URL(ORIGIN),applicationName:'Lucas Santillan',authors:[{name:'Lucas Santillan',url:ORIGIN}],creator:'Lucas Santillan',alternates:{canonical:url,languages:{es:ORIGIN+'/',en:ORIGIN+'/en','x-default':ORIGIN+'/'}},robots:{index:true,follow:true,googleBot:{index:true,follow:true,'max-image-preview':'large','max-snippet':-1,'max-video-preview':-1}},openGraph:{type:'website',siteName:'Lucas Santillan',title,description,url,locale:spanish?'es_PE':'en_US',alternateLocale:spanish?'en_US':'es_PE',images:[image]},twitter:{card:'summary_large_image',title,description,images:[image.url]}};
}
