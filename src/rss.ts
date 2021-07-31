import * as fs from 'fs'
import * as path from 'path'
import { Feed } from 'feed'
import { getAllItems } from './files'

const getDestinationFolder = (name: string) => path.join(process.cwd(), name)

type Config = {
  title: string
  description: string
  siteUrl: string
  siteLanguage?: string
  itemsFolder?: string
  destinationFolder?: string
  siteCopyright?: string
}

const defaultSettings: Partial<Config> = {
  siteLanguage: 'pt_BR',
  siteCopyright: '',
  itemsFolder: 'content/posts',
  destinationFolder: 'public'
}

export async function generateRSS(config: Config) {
  const {
    title,
    description,
    siteUrl,
    siteLanguage,
    siteCopyright,
    itemsFolder,
    destinationFolder,
  } = Object.assign(defaultSettings, config)

  const feed = new Feed({
    title,
    description,
    id: siteUrl,
    link: siteUrl,
    language: siteLanguage,
    copyright: siteCopyright as string,
    generator: 'RSS Feed for Node',
  })

  const items = getAllItems(itemsFolder as string)

  items.forEach(item => feed.addItem({
      title: item.frontmatter.title,
      id: `${siteUrl}/${item.slug}`,
      link: `${siteUrl}/${item.slug}`,
      description: item.frontmatter.description,
      date: item.frontmatter.date,
      content: item.content,
    })
  )

  const contents = feed.rss2()

  fs.writeFileSync(`${getDestinationFolder(destinationFolder as string)}/rss.xml`, contents, {
    encoding: 'utf-8',
  })
}
