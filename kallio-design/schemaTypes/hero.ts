// kallio-design/studio/schemaTypes/hero.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'pretitle',
      title: 'Pre-title',
      type: 'string',
      description: 'The small text above the main title (e.g., "The Latest Products").',
    }),
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      description: 'The large headline text.',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Shop Now',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true, // Enables you to select a "hotspot" for better cropping
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'backgroundImage',
    },
  },
})
