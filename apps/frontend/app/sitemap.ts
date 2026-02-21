import { MetadataRoute } from 'next';
const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
export default function sitemap(): MetadataRoute.Sitemap { const routes = ['', '/about', '/issues', '/endorsements', '/get-involved', '/donate', '/privacy', '/terms']; return ['en','es'].flatMap(l=>routes.map(r=>({url:`${base}/${l}${r}`,lastModified:new Date()}))); }
