import fs from 'fs'
import path from 'path'

export const fetchMDXContent = (slug) => {
  const filePath = path.join(process.cwd(), 'content', `${slug}.mdx`)
  return fs.readFileSync(filePath, 'utf-8')
}
