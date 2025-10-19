import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'orderItem',
  title: 'Order Item',
  type: 'document',
  fields: [
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{type: 'product'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'price',
      title: 'Price at time of order',
      type: 'number',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hasBeenReviewed',
      title: 'Item Reviewed',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'product.name',
      subtitle: 'quantity',
    },
  },
})