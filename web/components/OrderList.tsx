'use client'

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import Image from 'next/image'

interface OrderItem {
  name: string
  quantity: number
  price: number
  image?: string
}

interface Order {
  _id: string
  _createdAt: string
  totalAmount: number
  stripePaymentId: string
  status: string
  items: OrderItem[]
  userName: string
  shippingAddress: string
}

interface OrderListProps {
  orders: Order[]
}

export default function OrderList({ orders }: OrderListProps) {
  const generateInvoice = (order: Order) => {
    const doc = new jsPDF()

    // Add header
    doc.setFontSize(20)
    doc.text('Invoice', 14, 22)
    doc.setFontSize(12)
    doc.text('KALLIO DESIGN', 14, 30)

    // Add order details
    doc.setFontSize(10)
    doc.text(`Order ID: ${order.stripePaymentId}`, 14, 45)
    doc.text(`Order Date: ${new Date(order._createdAt).toLocaleDateString()}`, 14, 50)
    doc.text(`Bill to: ${order.userName}`, 14, 55)
    doc.text('Shipping Address:', 14, 60)
    doc.text(order.shippingAddress, 14, 65)

    // Add table of items
    autoTable(doc, {
      startY: 80,
      head: [['Item', 'Quantity', 'Unit Price', 'Total']],
      body: order.items.map((item) => [
        item.name,
        item.quantity,
        `RM ${item.price.toFixed(2)}`,
        `RM ${(item.price * item.quantity).toFixed(2)}`,
      ]),
    })

    // Add total
    const finalY = (doc as any).lastAutoTable.finalY
    doc.setFontSize(12)
    doc.text(`Total: RM ${order.totalAmount.toFixed(2)}`, 14, finalY + 10)

    // Save the PDF
    doc.save(`invoice-${order.stripePaymentId}.pdf`)
  }

  return (
    <div className="space-y-8">
      {orders.map((order) => (
        <div key={order._id} className="bg-black/5 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold">Order Placed: {new Date(order._createdAt).toLocaleDateString()}</h2>
              <p className="text-sm text-brand-text/70">Order ID: {order.stripePaymentId}</p>
            </div>
            <div className="text-left md:text-right mt-4 md:mt-0">
              <p className="text-lg font-semibold">Total: RM{order.totalAmount.toFixed(2)}</p>
              <span
                className={`inline-block mt-1 px-2 py-1 text-xs font-semibold rounded-full ${
                  order.status === 'Delivered' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
          <div className="border-t border-brand-text/20 pt-4">
            <ul className="space-y-4">
              {order.items.map((item, index) => (
                <li key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    {item.image && (
                      <Image src={item.image} alt={item.name} width={64} height={64} className="w-16 h-16 rounded-md object-cover mr-4" />
                    )}
                    <div>
                      <div>{item.name}</div>
                      <div className="text-brand-text/70">Quantity: {item.quantity}</div>
                    </div>
                  </div>
                  <span>RM{(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-right mt-4">
            <button onClick={() => generateInvoice(order)} className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-black/80">
              Download Invoice
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}