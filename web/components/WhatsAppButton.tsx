import Link from 'next/link'

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-white"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.87-1.588-5.946C.157 5.344 5.423 0 12.058 0c6.633 0 11.9 5.345 11.9 11.914c0 6.569-5.267 11.914-11.9 11.914c-2.002 0-3.903-.52-5.584-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.591c5.448 0 9.886-4.434 9.886-9.884c0-5.448-4.438-9.884-9.886-9.884c-5.448 0-9.885 4.436-9.885 9.884c0 2.028.59 3.933 1.694 5.605l-1.025 3.748l3.82-1.004z" />
    <path d="M12.058 6.873c-2.895 0-5.25 2.355-5.25 5.25c0 1.521.652 2.882 1.694 3.857l-1.025 3.748l3.82-1.004c.975.652 2.13.995 3.76.995h.005c2.895 0 5.25-2.355 5.25-5.25c0-2.895-2.355-5.25-5.25-5.25z" />
  </svg>
)

export default function WhatsAppButton() {
  const phoneNumber = '+601110130331'
  const whatsappUrl = `https://wa.me/${phoneNumber}`

  return (
    <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-green-500 rounded-full p-3 shadow-lg hover:bg-green-600 transition-colors">
      <WhatsAppIcon />
    </Link>
  )
}