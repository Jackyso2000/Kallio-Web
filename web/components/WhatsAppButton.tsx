import Link from 'next/link'

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-8 h-8 text-white transform -translate-x-[1px] translate-y-[1px]"
  >
    <path d="M12.012 2c5.506 0 9.987 4.478 9.987 9.982 0 5.505-4.48 9.983-9.987 9.983-1.744 0-3.414-.45-4.887-1.305l-5.4.14 1.44-5.265A9.94 9.94 0 0 1 2.025 11.982C2.025 6.478 6.505 2 12.012 2zm0 1.637c-4.606 0-8.35 3.743-8.35 8.345 0 1.488.396 2.91 1.15 4.18l-1.02 3.75 3.84-1.01c1.23.68 2.62 1.04 4.08 1.04 4.606 0 8.35-3.742 8.35-8.344 0-4.603-3.744-8.346-8.35-8.346zm4.61 11.23c-.25-.13-1.48-.73-1.71-.82-.23-.08-.4-.13-.57.13-.17.25-.65.82-.79 1-.15.17-.3.2-.55.07-.25-.13-1.06-.39-2.02-1.24-.74-.66-1.25-1.48-1.4-1.73-.14-.25-.01-.39.11-.51.11-.11.25-.3.38-.45.12-.14.17-.25.25-.41.08-.17.04-.32-.02-.45-.06-.13-.57-1.38-.78-1.89-.2-.5-.41-.43-.57-.44-.15 0-.32-.01-.49-.01-.17 0-.44.06-.67.32-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.48-.6 1.69-1.19.21-.58.21-1.08.15-1.19-.06-.1-.23-.15-.48-.28z" />
  </svg>
)

export default function WhatsAppButton() {
  const phoneNumber = '+601110130331'
  const whatsappUrl = `https://wa.me/${phoneNumber}`

  return (
    <Link 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:bg-[#20b858] hover:scale-110 transition-all duration-300"
    >
      <WhatsAppIcon />
    </Link>
  )
}