import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    defineField({
      name: 'userId',
      title: 'User ID (from Clerk)',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'userName',
      title: 'User Name',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'stripePaymentId',
      title: 'Stripe Payment ID',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'totalAmount',
      title: 'Total Amount (in MYR)',
      type: 'number',
      readOnly: true,
    }),
    defineField({
      name: 'shippingAddress',
      title: 'Shipping Address',
      type: 'text',
      readOnly: true,
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Product Name' },
            { name: 'quantity', type: 'number', title: 'Quantity' },
            { name: 'price', type: 'number', title: 'Price' },
          ],
        },
      ],
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      },
      initialValue: 'Pending',
    }),
  ],
  preview: {
    select: {
      userName: 'userName',
      createdAt: '_createdAt',
      total: 'totalAmount',
    },
    prepare({ userName, createdAt, total }) {
      return {
        title: `Order by ${userName || 'Guest'} on ${new Date(createdAt).toLocaleDateString()}`,
        subtitle: `Total: RM${total}`,
      }
    },
  },
})