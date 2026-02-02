import { HeroBlock } from './HeroBlock'
import { RichTextBlock } from './RichTextBlock'
import { ValuesBlock } from './ValuesBlock'
import { CTABlock } from './CTABlock'
import { FormBlock } from './FormBlock'
import { NewsListBlock } from './NewsListBlock'
import { InstructorsBlock } from './InstructorsBlock'
import { StudentsListBlock } from './StudentsListBlock'
import { ContactBlock } from './ContactBlock'

export type Block =
  | {
      blockType: 'hero'
      id: string
      heading?: string
      subheading?: string
      ctaText?: string
      ctaLink?: string
      image?: { url?: string | null } | number | null
    }
  | { blockType: 'richText'; id: string; content?: unknown }
  | { blockType: 'values'; id: string; heading?: string; items?: { title?: string; description?: string }[] }
  | { blockType: 'cta'; id: string; heading?: string; description?: string; buttonText?: string; buttonLink?: string }
  | { blockType: 'formBlock'; id: string; form: { id: string; name?: string } | number }
  | { blockType: 'newsList'; id: string; heading?: string; description?: string; limit?: number }
  | { blockType: 'instructorsGrid'; id: string; heading?: string }
  | {
      blockType: 'studentsList'
      id: string
      heading?: string
      items?: { name?: string; university?: string; department?: string }[]
    }
  | {
      blockType: 'contactBlock'
      id: string
      heading?: string
      address?: string
      phone?: string
      email?: string
    }

type PostItem = {
  id: string | number
  title?: string | null
  slug?: string | null
  excerpt?: string | null
  category?: string | null
  publishedAt?: string | null
  featuredImage?: { url?: string | null } | number | null
}

type InstructorItem = {
  id: string | number
  name?: string | null
  title?: string | null
  category?: string | null
  image?: { url?: string | null } | number | null
  order?: number | null
}

type Props = {
  blocks: Block[] | null | undefined
  newsPosts?: PostItem[]
  instructors?: InstructorItem[]
}

export function Blocks({ blocks, newsPosts = [], instructors = [] }: Props) {
  if (!blocks?.length) return null
  return (
    <div className="space-y-16">
      {blocks.map((block) => {
        switch (block.blockType) {
          case 'hero':
            return <HeroBlock key={block.id} {...block} />
          case 'richText':
            return <RichTextBlock key={block.id} {...block} />
          case 'values':
            return <ValuesBlock key={block.id} {...block} />
          case 'cta':
            return <CTABlock key={block.id} {...block} />
          case 'formBlock':
            return <FormBlock key={block.id} {...block} />
          case 'newsList':
            return (
              <NewsListBlock
                key={block.id}
                heading={block.heading}
                description={block.description}
                limit={block.limit}
                posts={newsPosts}
              />
            )
          case 'instructorsGrid':
            return (
              <InstructorsBlock
                key={block.id}
                heading={block.heading}
                instructors={instructors}
              />
            )
          case 'studentsList':
            return <StudentsListBlock key={block.id} {...block} />
          case 'contactBlock':
            return <ContactBlock key={block.id} {...block} />
          default:
            return null
        }
      })}
    </div>
  )
}
