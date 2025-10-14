// kallio-design/web/app/page.tsx
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import { client } from '@/sanity/client'
import type { Image as SanityImage } from 'sanity'

// Define a query to get our hero data
const HERO_QUERY = `*[_type == "hero" && defined(backgroundImage.asset)][0]{
  pretitle,
  title,
  buttonText,
  backgroundImage
}`;

interface HeroData {
  pretitle: string;
  title:string;
  buttonText: string;
  backgroundImage: SanityImage;
}

export default async function Home() {
  const heroData = await client.fetch<HeroData>(HERO_QUERY);

  return (
    <main className="bg-[#F1ECE8]">
      <Header />
      {heroData && <Hero {...heroData} />}
    </main>
  )
}

// Revalidate the page every 60 seconds
export const revalidate = 60;
