import * as fs from 'fs'
import * as path from 'path'
import matter from 'gray-matter'
import Showdown from 'showdown'

type Frontmatter = {
  [key: string]: any
  date: Date
}

function getMarkdownData(filename: string, foldername: string) {
  const slug = filename.replace(/\.md$/, '')
  const filepath = path.join(foldername, filename)
  const raw = fs.readFileSync(filepath, 'utf-8')

  const { data, excerpt, content } = matter(raw)

  const converter = new Showdown.Converter()

  const frontmatter: Frontmatter = {
    ...data,
    date: new Date(data.date)
  }

  return {
    frontmatter,
    excerpt,
    content: converter.makeHtml(content),
    slug: slug.slice(11),
  }
}

export function getAllItems(source: string) {
  const folder = path.join(process.cwd(), source)
  const allFiles = fs.readdirSync(folder)

  return allFiles.map(file => getMarkdownData(file, folder))
}
