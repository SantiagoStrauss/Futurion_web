"use client"

import { motion } from "framer-motion"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import Link from "next/link"

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
  };
  categories?: {
    title: string;
  }[];
}

// GROQ query to fetch posts
const postsQuery = `*[_type == "post"] | order(publishedAt desc)[0...3] {
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

export default function BlogSection() {
	const [posts, setPosts] = useState<Post[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				console.log('Fetching blog posts for home section...')
				const data = await client.fetch(postsQuery)
				console.log('Blog posts received:', data)
				setPosts(data || [])
			} catch (err) {
				console.error('Error fetching posts:', err)
				setError('Error al cargar los posts del blog')
				setPosts([])
			} finally {
				setIsLoading(false)
			}
		}

		fetchPosts()
	}, [])

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('es-ES', { 
			day: 'numeric', 
			month: 'short', 
			year: 'numeric' 
		})
	}

	const getImageUrl = (image: SanityImage | undefined) => {
		if (!image || !image.asset || !image.asset._ref) {
			return "/placeholder.svg?height=300&width=500"
		}
		
		try {
			return urlFor(image).width(500).height(300).url()
		} catch (err) {
			console.error('Error generating image URL:', err)
			return "/placeholder.svg?height=300&width=500"
		}
	}
	return (
		<section className="py-32 bg-[#FFFCF2] relative">
			<div className="max-w-6xl mx-auto px-4">
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<h2 className="text-3xl md:text-4xl font-serif font-light tracking-wider mb-4 text-black">
							Nuestro Blog
						</h2>
						<p className="text-lg text-black/80 max-w-2xl font-light">
							Compartimos nuestras ideas, investigaciones y perspectivas sobre
							tecnología, innovación y transformación digital.
						</p>
					</motion.div>
					<Button
						variant="outline"
						className="mt-6 md:mt-0 bg-white border-[#A51C30] text-[#A51C30] hover:bg-[#A51C30] hover:text-white"
					>
						Ver todos los artículos
					</Button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{isLoading ? (
						// Loading skeleton
						Array.from({ length: 3 }).map((_, index) => (
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
					) : error ? (
						<div className="col-span-3 text-center py-8">
							<p className="text-red-500">{error}</p>
						</div>
					) : posts.length === 0 ? (
						<div className="col-span-3 text-center py-8">
							<p className="text-gray-500">No hay posts disponibles</p>
						</div>
					) : (
						posts.map((post, index) => (
							<motion.article
								key={post._id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
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
		</section>
	)
}

