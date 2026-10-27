import type { Project, SiteConfig } from '@/lib/types';
import { ORIGIN, PROFILE_IMAGE_URL } from '@/lib/seo';
import { LINKEDIN_URL, YOUTUBE_URL } from '@/lib/social';
export default function ProfileSchema({locale,site,projects}:{locale:'es'|'en';site:SiteConfig;projects:Project[]}) {
 const url=ORIGIN+(locale==='es'?'/':'/en');
 const personId=ORIGIN+'/#lucas-santillan';
 const portraitId=ORIGIN+'/#portrait';
 const portrait={'@type':'ImageObject','@id':portraitId,url:PROFILE_IMAGE_URL,contentUrl:PROFILE_IMAGE_URL,width:960,height:960,encodingFormat:'image/jpeg',caption:'Lucas Santillan — Full Stack Developer & AI Engineer',about:{'@id':personId},representativeOfPage:true};
 const sameAs=[site.social.github||'https://github.com/lucast1574',site.social.linkedin||LINKEDIN_URL,YOUTUBE_URL];
 const person={'@type':'Person','@id':personId,name:'Lucas Santillan',image:{'@id':portraitId},alternateName:'lucast1574',url:ORIGIN,jobTitle:locale==='es'?'Desarrollador Full Stack y AI Engineer':'Full Stack Developer & AI Engineer',description:site.profile.bio||(locale==='es'?'Desarrollador de software, aplicaciones web y móviles.':'Software, web and mobile application developer.'),sameAs,knowsAbout:[...new Set(projects.flatMap(project=>project.tech||[]))].slice(0,20)};
 const graph={'@context':'https://schema.org','@graph':[person,portrait,{'@type':'WebSite','@id':ORIGIN+'/#website',name:'Lucas Santillan',alternateName:'Portfolio de Lucas Santillan',url:ORIGIN,inLanguage:['es','en'],publisher:{'@id':personId}},{'@type':'ProfilePage','@id':url+'#profile',url,name:'Lucas Santillan — '+(locale==='es'?'Desarrollador Full Stack':'Full Stack Developer'),mainEntity:{'@id':personId},primaryImageOfPage:{'@id':portraitId},isPartOf:{'@id':ORIGIN+'/#website'},inLanguage:locale},{'@type':'ItemList','@id':url+'#projects',name:locale==='es'?'Proyectos de Lucas Santillan':'Projects by Lucas Santillan',itemListElement:projects.map((project,index)=>({'@type':'ListItem',position:index+1,item:{'@type':'CreativeWork',name:project.i18n.name,description:project.i18n.description,url:project.links.web||url+'#work',creator:{'@id':personId}}}))}]};
 return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(graph).replace(/</g,'\u003c')}}/>;
}
