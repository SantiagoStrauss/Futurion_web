"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { mockBlogData } from "@/lib/mockData"
import Link from "next/link"
import { useParams } from "next/navigation"

export const runtime = 'edge'

// Types
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
    image?: SanityImage;
    bio?: any[];
  };
  categories?: {
    title: string;
    slug: {
      current: string;
    };
  }[];
  body?: any[];
}

// GROQ query for single post
const postQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  author->{
    name,
    image,
    bio
  },
  categories[]->{
    title,
    slug
  },
  body
}`

// Related posts query
const relatedPostsQuery = `*[_type == "post" && slug.current != $slug && count(categories[@._ref in *[_type == "post" && slug.current == $slug][0].categories[]._ref]._ref) > 0] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  author->{
    name
  }
}`

export default function BlogPostPage() {
  const params = useParams()
  const slug = params?.slug as string
  
  const [post, setPost] = useState<Post | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    const fetchPost = async () => {
      try {
        const [postData, relatedData] = await Promise.all([
          client.fetch(postQuery, { slug }),
          client.fetch(relatedPostsQuery, { slug })
        ])
        
        // Si no hay datos de Sanity, buscar en datos de prueba
        if (!postData) {
          const mockPost = mockBlogData.posts.find(p => p.slug.current === slug)
          if (mockPost) {
            setPost(mockPost)
          }
        } else {
          setPost(postData)
        }
        
        if (!relatedData || relatedData.length === 0) {
          // Obtener posts relacionados de prueba (excluir el actual)
          const related = mockBlogData.posts.filter(p => p.slug.current !== slug).slice(0, 3)
          setRelatedPosts(related)
        } else {
          setRelatedPosts(relatedData)
        }
      } catch (err) {
        console.error('Error fetching post:', err)
        // Si hay error, buscar en datos de prueba
        const mockPost = mockBlogData.posts.find(p => p.slug.current === slug)
        if (mockPost) {
          setPost(mockPost)
          const related = mockBlogData.posts.filter(p => p.slug.current !== slug).slice(0, 3)
          setRelatedPosts(related)
        } else {
          setError('Error al cargar el artículo')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }

  const getImageUrl = (image: SanityImage | undefined, width = 800) => {
    if (!image) return "/placeholder.svg"
    
    try {
      // Si es una imagen de Sanity real
      if (image.asset && image.asset._ref && !image.asset._ref.includes('placeholder')) {
        return urlFor(image).width(width).url()
      }
    } catch (err) {
      console.error('Error generating image URL:', err)
    }
    
    // Fallback para placeholders o errores
    return "/placeholder.svg"
  }

  const sharePost = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFCF2] pt-20">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#FFFCF2] pt-20">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Artículo no encontrado</h1>
          <p className="text-gray-600 mb-8">
            {error || 'El artículo que buscas no existe o ha sido eliminado.'}
          </p>
          <Link href="/blog">
            <Button className="bg-[#A51C30] text-white hover:bg-[#8A1727]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFFCF2] pt-20">
      <article className="max-w-4xl mx-auto px-4 py-16">
        {/* Back to blog */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center text-[#A51C30] hover:text-[#8A1727] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al blog
          </Link>
        </motion.div>

        {/* Post Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category) => (
                <span
                  key={category.slug.current}
                  className="bg-[#A51C30] text-white text-sm font-medium py-1 px-3 rounded"
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light tracking-tight mb-6 text-black">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-black/80 mb-6 font-light">
              {post.excerpt}
            </p>
          )}

          {/* Meta info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between py-6 border-y border-gray-200">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                <span className="text-gray-600">{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2 text-gray-500" />
                <span className="text-gray-600">{post.author.name}</span>
              </div>
            </div>
            <Button
              onClick={sharePost}
              variant="outline"
              size="sm"
              className="self-start md:self-auto"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Compartir
            </Button>
          </div>
        </motion.header>

        {/* Featured Image */}
        {post.mainImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <img
              src={getImageUrl(post.mainImage, 1200)}
              alt={post.mainImage.alt || post.title}
              className="w-full rounded-lg shadow-lg"
            />
          </motion.div>
        )}

        {/* Post Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="prose prose-lg max-w-none mb-16"
        >
          {post.body ? (
            <div className="text-lg leading-relaxed text-gray-700">
              <p>Contenido del post se mostrará aquí una vez configurado completamente Sanity.</p>
              <p className="text-sm text-gray-500 mt-4">
                Nota: El contenido completo requiere configuración adicional de Sanity CMS.
              </p>
            </div>
          ) : (
            <div className="text-lg leading-relaxed text-gray-700">
              <p>Este artículo aún no tiene contenido disponible.</p>
            </div>
          )}
        </motion.div>

        {/* Author Bio */}
        {post.author.name && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg p-8 mb-16"
          >
            <div className="flex items-start space-x-4">
              {post.author.image && (
                <img
                  src={getImageUrl(post.author.image, 80)}
                  alt={post.author.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div>
                <h3 className="text-xl font-semibold mb-2">{post.author.name}</h3>
                <p className="text-gray-600">
                  Información del autor disponible una vez configurado Sanity.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="border-t border-gray-200 pt-16"
          >
            <h2 className="text-2xl font-serif font-light mb-8 text-black">
              Artículos relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost._id}
                  href={`/blog/${relatedPost.slug.current}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    {relatedPost.mainImage && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={getImageUrl(relatedPost.mainImage, 400)}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-semibold mb-2 group-hover:text-[#A51C30] transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {formatDate(relatedPost.publishedAt)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </article>
    </div>
  )
}
