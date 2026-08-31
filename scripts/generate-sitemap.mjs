#!/usr/bin/env node
/**
 * Sitemap generator.
 *
 * Run with:  npm run sitemap
 * Output:    public/sitemap.xml
 *
 * To add routes, append to ROUTES below. For dynamic routes (e.g. blog
 * posts), fetch them from your CMS or a JSON file and push entries.
 */
import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SITE_URL = process.env.SITE_URL ?? 'https://singleclik.example.com'
const OUTPUT = join(__dirname, '..', 'public', 'sitemap.xml')

/** @type {{ path: string; changefreq?: string; priority?: number }[]} */
const ROUTES = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/about', changefreq: 'monthly', priority: 0.7 },
]

const lastmod = new Date().toISOString().slice(0, 10)

const urlEntries = ROUTES.map(({ path, changefreq = 'monthly', priority = 0.5 }) => {
  const loc = `${SITE_URL}${path}`
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`
}).join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`

writeFileSync(OUTPUT, xml, 'utf8')
console.log(`✓ sitemap.xml written (${ROUTES.length} URLs) → ${OUTPUT}`)
