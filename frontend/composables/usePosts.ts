import type { Post, Author } from '../types/post'
const postsData: Post[] = [
  {
    id: 1,
    slug: 'digital-minimalism',
    title: 'The Future of Digital Minimalism in a Hyper-Connected World',
    excerpt:
      'In an era defined by the constant ping of notifications and infinite scroll, reclaiming focus has become a radical act.',
    body:
      'In an era defined by the constant ping of notifications and the infinite scroll of social feeds, the concept of silence has become a luxury commodity. We are drowning in data but starving for wisdom...\n\nDigital minimalism is not about rejecting technology, but about using it intentionally. It is a philosophy that helps you question what digital tools add the most value to your life.',
    coverImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCoec4Mp3o7oSwSmz16JakTfXh3v3Qwc65HqwXmyR9JKYe1wwu-WxHBPYRbUsP7vuM8pA3DUqoPgUrxFLRJqmpfXrtumNIBbSt2awSgGAguTB5knY475k7MCitcsBDIdyqtg7mYTjKPulHRanPjZaoeS8YOj7kSUdXWLFRgsfKdHQfrufguol7J7F3S9nfFFYTRICWk4AaC4wOeqdtbr9rtUiE8iRZySMYTy8ijmm9Sne3fep9E-4GBcUxN1wxLTwRevxqjDMyLVGs',
    category: 'Technology',
    tags: ['Minimalism', 'Digital Wellbeing', 'Focus'],
    authorId: 1,
    publishedAt: '2024-10-24',
    readTimeMinutes: 8,
  },
  {
    id: 2,
    slug: 'why-i-switched-to-tailwind',
    title: 'Why I Switched to Tailwind CSS',
    excerpt:
      'Utility-first CSS frameworks have changed the way I approach frontend development. Here is my journey.',
    body:
      'Utility-first CSS frameworks like Tailwind have fundamentally changed the ergonomics of building interfaces. Instead of constantly switching context between HTML and CSS files, I can design directly in my markup...',
    coverImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAxpq4Uqu0e-PByVFUC6rEvvbOV83DV5xYl1XILlThtBl3TboiBd4g5G2lgjvmWFQsfO_rzWFJgXNAx1ZHBCYp6u9t4-zLpO3huWhDsNMB_v9WCTPUr4n2y2_qtnJ_EDx8_uxPys_US7WGBh1UsPgdJpyi8Ji5VYbEmYbcgN1NuSVvvaS4x4IZsPb7swHilhMh0jmZs1jvoaZ24jfHAkPSHTsUtgGgv5BwTXT0L3wG7FK4Yz27qemdMGhgFknFKgWiEObxDt8SvOW8',
    category: 'Coding',
    tags: ['Tailwind', 'CSS', 'Frontend'],
    authorId: 2,
    publishedAt: '2024-11-02',
    readTimeMinutes: 6,
  },
  {
    id: 3,
    slug: 'remote-first-culture',
    title: 'Building a Remote-First Culture',
    excerpt:
      'Remote work is here to stay. Discover the key pillars of building a successful distributed team.',
    body:
      'Remote-first is more than just allowing people to work from home. It is an operating system for your company that assumes asynchronous communication and deep trust as defaults...',
    coverImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCxzSKGf5dz1_YRYIXL4yn9bHAkzpfWRdoJ2G4Pbu4jhMEjtPD-yHdllc5g5gsxxnLNve0ZCEyfFoTJft54pHD7v5QSAk_jEaibB8GnBi5eLgH5A2TXrHfFDigljIuAhVaqdINup833F1VnPFjWjSyrLN0mHbs_IS87DcZX3PmEJqfPQ3m35P0uGGFKJNj4pxx7aZT12zPUiN9-KRdG_75WOeSXmscyF5ICTbcA5r0a6N3HCN1POreJPQxmUpc-RToMEoTSOs7S9YQ',
    category: 'Culture',
    tags: ['Remote Work', 'Teams'],
    authorId: 1,
    publishedAt: '2024-10-28',
    readTimeMinutes: 7,
  },
]

const authorsData: Author[] = [
  {
    id: 1,
    name: 'Alex Morgan',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBKGI5CL5gIdpoOvB3hYCNgFYu2DSNeVpl-f2vi8kJ3-USUyzma0D0qZiviVqzrA8Fna0BomdTWeUNRKrdYEBgeGrKgySaDD7WTr0QY5Qbuw01IMjsvBy0-7hWD9wzVdN-Hf-AXkBabGQ43ES4VYDMSaV68Dt6RMxLzAR8v8GYQI-pVE1XwQTrjsLe3gXQVbE5skcrDs-cxnmOb_uxjnCqql-9s6XCD0I6oWqCxBM976w6DvFM3_WL3YYeRMzc4W9hhJrc-aUIlpbk',
    bio: 'Digital humanist & writer exploring the intersection of technology, psychology, and mindfulness.',
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAP5tVpF5r1tw7ub-XJTmiHUdX-XWSB9hTNcraQG_I_qUL4sgL9eoR_JAQi33dCwevT6iSbLv94E0R35EH9cQd5O0Gb7AGAqX-JdwMpS_Ae3tnpQQbxo2BnAnZda9yDCqxLqe9YsSfh4EoMUAenXQb3ySnxjojSBqlyOwXc3OiKXZOS4dzBHr3susG2yHk1Ecd1LrIZ6aJ9LeZ078Brn4qoCX7V5GUeGO93xYxsxaIcVSdJDChBIpZUVS6orBmuIf7g8Eu012PEF2A',
    bio: 'Design systems lead and writer focused on atomic interfaces and design operations.',
  },
]

export const usePosts = () => {
  const posts = postsData
  const authors = authorsData

  const getPostBySlug = (slug: string) => postsData.find((p) => p.slug === slug)
  const getAuthorById = (id: number) => authorsData.find((a) => a.id === id)

  return {
    posts,
    authors,
    getPostBySlug,
    getAuthorById,
  }
}

