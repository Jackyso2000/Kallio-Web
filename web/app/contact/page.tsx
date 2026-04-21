'use client'

import Layout from '@/components/Layout'
import Link from 'next/link'
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      // IMPORTANT: Replace the URL below with your actual Formspree Endpoint URL
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID_HERE', {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2000&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <h1 className="text-5xl md:text-7xl font-light text-white uppercase tracking-widest drop-shadow-lg mb-4">
            Get In Touch
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl">
            Let's discuss your vision and how Kallio Design can bring it to life.
          </p>
        </div>
      </div>

      {/* Contact Content Section */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="flex flex-col justify-center">
              <span className="text-sm font-bold tracking-widest text-[#680c09] uppercase mb-4 block">Reach Out</span>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 leading-tight">
                We'd love to hear from you.
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Whether you have a specific project in mind, a question about our services, or just want to say hello, our team is ready to connect.
              </p>

              <div className="space-y-6 text-gray-700">
                <div className="flex items-center">
                  <Phone className="text-[#680c09] mr-4 flex-shrink-0" size={24} />
                  <p className="font-light">+6010 246 3160</p>
                </div>
                <div className="flex items-center">
                  <Mail className="text-[#680c09] mr-4 flex-shrink-0" size={24} />
                  <p className="font-light">kalliodesign.my@gmail.com</p>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-10 flex space-x-6">
                {/* <Link href="#" aria-label="Facebook" className="text-gray-500 hover:text-[#680c09] transition-colors duration-300">
                  <Facebook size={28} />
                </Link> */}
                <Link href="https://www.instagram.com/kalliodesign/" aria-label="Instagram" className="text-gray-500 hover:text-[#680c09] transition-colors duration-300">
                  <Instagram size={28} />
                </Link>
                {/* Add more social media links as needed */}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#f9f9f9] p-8 md:p-12 rounded-lg shadow-sm">
              <h3 className="text-2xl font-light text-gray-900 mb-6 uppercase tracking-widest">Send Us a Message</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#680c09] focus:border-[#680c09] transition-all duration-200 bg-white text-gray-800"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#680c09] focus:border-[#680c09] transition-all duration-200 bg-white text-gray-800"
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#680c09] focus:border-[#680c09] transition-all duration-200 bg-white text-gray-800"
                    placeholder="Tell us about your project or inquiry..."
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="w-full bg-[#680c09] text-white py-3 px-6 rounded-md font-semibold uppercase tracking-widest hover:bg-[#4a0907] transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
                {status === 'success' && (
                  <p className="text-green-600 text-sm mt-4 text-center font-medium">Thank you! Your message has been sent.</p>
                )}
                {status === 'error' && (
                  <p className="text-red-600 text-sm mt-4 text-center font-medium">Oops! Something went wrong. Please try again.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}