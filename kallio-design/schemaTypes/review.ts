import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'review',
  title: 'Product Review',
  type: 'document',
  fields: [
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{type: 'product'}],
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reviewerName',
      title: 'Reviewer Name',
      type: 'string',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clerkUserId',
      title: 'Clerk User ID',
      type: 'string',
      readOnly: true,
      hidden: true, // Hide from non-admin users in the studio
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      readOnly: true,
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'text',
      readOnly: true,
    }),
    defineField({
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: 'Reviews will not be shown on the site until they are approved.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      product: 'product.name',
      reviewer: 'reviewerName',
      rating: 'rating',
      approved: 'approved',
    },
    prepare({product, reviewer, rating, approved}) {
      return {
        title: `${product} by ${reviewer}`,
        subtitle: `Rating: ${rating} ★ ${approved ? ' (Approved)' : ' (Pending)'}`,
      }
    },
  },
})