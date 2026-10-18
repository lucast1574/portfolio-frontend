import Portfolio from '@/components/Portfolio';
import { portfolioMetadata } from '@/lib/seo';
export const dynamic = 'force-dynamic';
export const revalidate = 60;
export const metadata = portfolioMetadata('en');
export default function EnglishPortfolio() { return <Portfolio locale="en" />; }
