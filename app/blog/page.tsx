"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, User, ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect } from "react"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { mockBlogData } from "@/lib/mockData"
import Link from "next/link"

// Types (same as blog-section)
interface SanityImage {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
  alt?: string;
}

interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  mainImage?: SanityImage;
  publishedAt: string;
  author: {
    name: string;
  };
  categories?: {
    title: string;
  }[];
}

interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

// GROQ queries
const allPostsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  author->{
    name
  },
  categories[]->{
    title
  }
}`

const categoriesQuery = `*[_type == "category"] {
  _id,
  title,
  slug
}`

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, categoriesData] = await Promise.all([
          client.fetch(allPostsQuery),
          client.fetch(categoriesQuery)
        ])
        
        // Si no hay datos de Sanity, usar datos de prueba
        if (!postsData || postsData.length === 0) {
          setPosts(mockBlogData.posts)
          setFilteredPosts(mockBlogData.posts)
        } else {
          setPosts(postsData)
          setFilteredPosts(postsData)
        }
        
        if (!categoriesData || categoriesData.length === 0) {
          setCategories(mockBlogData.categories)
        } else {
          setCategories(categoriesData)
        }
      } catch (err) {
        console.error('Error fetching data:', err)
        // Si hay error, usar datos de prueba
        setPosts(mockBlogData.posts)
        setFilteredPosts(mockBlogData.posts)
        setCategories(mockBlogData.categories)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    let filtered = posts

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(post =>
        post.categories?.some(cat => cat.title === selectedCategory)
      )
    }

    setFilteredPosts(filtered)
  }, [posts, searchTerm, selectedCategory])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    })
  }

  const getImageUrl = (image: SanityImage | undefined) => {
    if (!image) return "/placeholder.svg?height=300&width=500"
    
    try {
      // Si es una imagen de Sanity real
      if (image.asset && image.asset._ref && !image.asset._ref.includes('placeholder')) {
        return urlFor(image).width(500).height(300).url()
      }
    } catch (err) {
      console.error('Error generating image URL:', err)
    }
    
    // Fallback para placeholders o errores
    return "/placeholder.svg?height=300&width=500"
  }

  return (
    <div className="min-h-screen bg-[#FFFCF2] pt-20">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-light tracking-wider mb-6 text-black">
            Nuestro Blog
          </h1>
          <p className="text-xl text-black/80 max-w-3xl mx-auto font-light">
            Compartimos nuestras ideas, investigaciones y perspectivas sobre
            tecnología, innovación y transformación digital.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className={selectedCategory === null ? "bg-[#A51C30] text-white" : ""}
            >
              Todos
            </Button>
            {categories.map((category) => (
              <Button
                key={category._id}
                variant={selectedCategory === category.title ? "default" : "outline"}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.title ? null : category.title
                )}
                className={selectedCategory === category.title ? "bg-[#A51C30] text-white" : ""}
              >
                {category.title}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md animate-pulse"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            ))
          ) : filteredPosts.length === 0 ? (
            <div className="col-span-3 text-center py-16">
              <p className="text-gray-500 text-lg">No se encontraron artículos</p>
            </div>
          ) : (
            filteredPosts.map((post, index) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getImageUrl(post.mainImage)}
                    alt={post.mainImage?.alt || post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {post.categories && post.categories[0] && (
                    <div className="absolute top-4 left-4 bg-[#A51C30] text-white text-xs font-medium py-1 px-2 rounded">
                      {post.categories[0].title}
                    </div>
                  )}
                </div>

                <div className="flex flex-col p-6 flex-grow">
                  <div className="flex items-center text-sm text-black/60 mb-3">
                    <div className="flex items-center mr-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author.name}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-serif font-medium mb-3 text-black">
                    {post.title}
                  </h3>

                  <p className="text-black/70 mb-6 line-clamp-3">
                    {post.excerpt || 'Sin descripción disponible'}
                  </p>

                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="inline-flex items-center text-[#A51C30] hover:text-[#8A1727] transition-colors duration-300 mt-auto group"
                  >
                    <span className="mr-2 font-medium">Leer más</span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.article>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
