'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'


interface Category {
  _id: string
  title: string
  slug: { current: string }
}

interface SearchControlsProps {
  categories: Category[]
}

export default function SearchControls({ categories }: SearchControlsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams]
  )

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(pathname + '?' + createQueryString('sort', e.target.value))
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(pathname + '?' + createQueryString('category', e.target.value))
  }

  return (
    <div className="flex flex-col md:flex-row justify-end items-center mb-8 gap-4">
      <div className="flex items-center gap-x-4">
        {/* Category Filter */}
        <div className="relative">
          <label htmlFor="category" className="sr-only">
            Category
          </label>
          <select
            id="category"
            name="category"
            defaultValue={searchParams.get('category') || ''}
            onChange={handleCategoryChange}
            className="appearance-none w-full bg-transparent border border-brand-text/50 rounded-full py-2 pl-4 pr-10 text-sm text-brand-text placeholder-brand-text/70 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
          >
            <option value="" className="text-black bg-white">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category.slug.current} className="text-black bg-white">
                {category.title}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-brand-text">
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {/* Sort Dropdown */}
        <div className="relative">
          <label htmlFor="sort" className="sr-only">Sort by:</label>
          <select id="sort" name="sort" defaultValue={searchParams.get('sort') || 'relevance'} onChange={handleSortChange} className="appearance-none w-full bg-transparent border border-brand-text/50 rounded-full py-2 pl-4 pr-10 text-sm text-brand-text placeholder-brand-text/70 focus:border-white focus:outline-none focus:ring-1 focus:ring-white">
            <option value="relevance" className="text-black bg-white">Relevance</option>
            <option value="price-asc" className="text-black bg-white">Price: Low to High</option>
            <option value="price-desc" className="text-black bg-white">Price: High to Low</option>
            <option value="newest" className="text-black bg-white">Newest</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-brand-text">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75' 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}