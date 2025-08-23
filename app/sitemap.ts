import { MetadataRoute } from 'next'

const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://windoor.com.ar'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastMod = new Date().toISOString()
  const urls = [
    '',
    '/productos',
    '/productos/aberturas-pvc',
    '/productos/placares-vestidores-banos',
    '/productos/puertas-interior',
    '/proyectos'
  ]
  return urls.map(path => ({ url: base + path, lastModified: lastMod, changeFrequency: 'weekly', priority: path === '' ? 1 : 0.7 }))
}