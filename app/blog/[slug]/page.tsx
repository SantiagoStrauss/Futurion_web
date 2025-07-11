"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { Calendar, User, ArrowLeft, Share2, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { PortableText } from "@portabletext/react"
import Link from "next/link"
import { useParams } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// --- Componentes de PortableText (Rich Text) ---
const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <figure className="my-10">
        <img
          src={urlFor(value).width(1200).url()}
          alt={value.alt || 'Imagen del blog'}
          className="w-full h-auto rounded-lg shadow-xl"
        />
        {value.alt && (
          <figcaption className="text-center text-sm text-gray-500 mt-3 italic">
            {value.alt}
          </figcaption>
        )}
      </figure>
    ),
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold mt-12 mb-6 text-gray-900">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-semibold mt-10 mb-5 text-gray-800">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl font-semibold mt-6 mb-3 text-gray-800">{children}</h4>,
    normal: ({ children }: any) => <p className="mb-6 text-gray-700 leading-relaxed">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 my-8 italic text-gray-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-700">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="mb-2">{children}</li>,
    number: ({ children }: any) => <li className="mb-2">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-gray-800">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        className="text-blue-600 hover:text-blue-800 underline transition-colors duration-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

// --- Tipos de Datos (Interfaces) ---
interface SanityImage {
  _type: string;
  asset: { _ref: string; _type: string; };
  alt?: string;
}

interface Post {
  _id: string;
  title: string;
  slug: { current: string; };
  excerpt?: string;
  mainImage?: SanityImage;
  publishedAt: string;
  author: { name: string; image?: SanityImage; bio?: any[]; };
  categories?: { title: string; slug: { current: string; }; }[];
  body?: any[];
}

// --- Consultas GROQ a Sanity ---
const postQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id, title, slug, excerpt, mainImage, publishedAt,
  author->{ name, image, bio },
  categories[]->{ title, slug },
  body
}`;

const relatedPostsQuery = `*[_type == "post" && slug.current != $slug && count(categories[@._ref in *[_type == "post" && slug.current == $slug][0].categories[]._ref]._ref) > 0] | order(publishedAt desc)[0...3] {
  _id, title, slug, mainImage, publishedAt
}`;

// --- Componente Principal de la Página del Blog ---
export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (!slug) return;

    const fetchPostData = async () => {
      setIsLoading(true);
      try {
        const postData = await client.fetch<Post>(postQuery, { slug });
        if (!postData) {
          throw new Error("Artículo no encontrado.");
        }
        setPost(postData);

        const relatedData = await client.fetch<Post[]>(relatedPostsQuery, { slug });
        setRelatedPosts(relatedData || []);

      } catch (err: any) {
        setError(err.message || "Ocurrió un error al cargar el artículo.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostData();
  }, [slug]);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const getImageUrl = (image: SanityImage | undefined, width = 800) => {
    if (!image?.asset?._ref) return "/placeholder.svg";
    try {
      return urlFor(image).width(width).auto('format').url();
    } catch (err) {
      console.error('Error generando URL de imagen:', err);
      return "/placeholder.svg";
    }
  };

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error al compartir:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error || !post) return <ErrorMessage error={error} />;

  return (
    <>
      <Navbar />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#A51C30] origin-[0%] z-50" style={{ scaleX }} />

      <div className="bg-[#FFFCF2] min-h-screen">
        {/* Dark Header Section */}
        <div className="bg-black pt-32 pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <BackButton />
            <PostHeader post={post} formatDate={formatDate} onShare={handleShare} isCopied={isCopied} />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-20">
          <PostBody post={post} getImageUrl={getImageUrl} />
          {post.author?.name && <AuthorBio author={post.author} getImageUrl={getImageUrl} />}
          {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} getImageUrl={getImageUrl} formatDate={formatDate} />}
        </div>
      </div>
      <Footer />
    </>
  );
}

// --- Sub-componentes para mejorar la legibilidad ---

const LoadingSpinner = () => (
  <>
    <Navbar />
    <div className="min-h-screen bg-[#FFFCF2]">
      <div className="bg-black pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center pt-16">
            <div className="w-16 h-16 border-4 border-white border-dashed rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </>
);

const ErrorMessage = ({ error }: { error: string | null }) => (
  <>
    <Navbar />
    <div className="min-h-screen bg-[#FFFCF2]">
      <div className="bg-black pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold mb-4 text-white">Oops! Algo salió mal.</h1>
          <p className="text-white/80 mb-8 max-w-md mx-auto">
            {error || 'El artículo que buscas no existe o ha sido movido.'}
          </p>
          <Link href="/blog">
            <Button className="bg-[#A51C30] text-white hover:bg-[#8A1727]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Blog
            </Button>
          </Link>
        </div>
      </div>
    </div>
    <Footer />
  </>
);

const BackButton = () => (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
      <Link href="/blog" className="inline-flex items-center text-white hover:text-white/80 transition-colors group mb-8">
        <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
        Volver al blog
      </Link>
    </motion.div>
);

const PostHeader = ({ post, formatDate, onShare, isCopied }: any) => (
  <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-10">
    {post.categories?.length > 0 && (
      <div className="flex flex-wrap gap-2 mb-4">
        {post.categories.map((category: any) => (
          <span key={category.slug.current} className="text-sm font-medium bg-[#A51C30] text-white py-1 px-3 rounded-full">
            {category.title}
          </span>
        ))}
      </div>
    )}
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-wider text-white mb-4 leading-tight">
      {post.title}
    </h1>
    {post.excerpt && <p className="text-lg md:text-xl text-white/80 mb-6">{post.excerpt}</p>}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-8 pt-6 border-t border-white/20">
      <div className="flex items-center space-x-6 mb-4 sm:mb-0">
        <div className="flex items-center text-sm text-white/70">
          <Calendar className="h-5 w-5 mr-2" />
          <span>{formatDate(post.publishedAt)}</span>
        </div>
        <div className="flex items-center text-sm text-white/70">
          <User className="h-5 w-5 mr-2" />
          <span>{post.author.name}</span>
        </div>
      </div>
      <Button onClick={onShare} variant="outline" size="sm" className={isCopied 
        ? "self-start sm:self-auto bg-[#A51C30] text-white border-[#A51C30]" 
        : "self-start sm:self-auto text-white hover:bg-[#A51C30] hover:text-white border-white/30 bg-transparent"
      }>
        {isCopied ? <><Copy className="h-4 w-4 mr-2" /> Copiado</> : <><Share2 className="h-4 w-4 mr-2" /> Compartir</>}
      </Button>
    </div>
  </motion.header>
);

const PostBody = ({ post, getImageUrl }: any) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-white rounded-lg p-8 shadow-lg">
    {post.mainImage && (
      <div className="mb-12">
        <img src={getImageUrl(post.mainImage, 1200)} alt={post.mainImage.alt || post.title} className="w-full rounded-lg shadow-lg" />
      </div>
    )}
    <div className="prose prose-lg max-w-none">
      {post.body?.length > 0 ? (
        <PortableText value={post.body} components={portableTextComponents} />
      ) : (
        <p className="text-gray-600">Este artículo todavía no tiene contenido.</p>
      )}
    </div>
  </motion.div>
);

const AuthorBio = ({ author, getImageUrl }: any) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-16 mb-16 bg-white rounded-lg p-8 shadow-md">
      <div className="flex items-start gap-6">
        {author.image && (
          <img src={getImageUrl(author.image, 96)} alt={author.name} className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover flex-shrink-0" />
        )}
        <div>
          <h3 className="text-xl font-bold mb-1 text-gray-900">Escrito por {author.name}</h3>
          {author.bio?.length > 0 ? (
            <div className="text-gray-600 prose">
              <PortableText value={author.bio} components={portableTextComponents} />
            </div>
          ) : (
             <p className="text-gray-600">El autor de este artículo.</p>
          )}
        </div>
      </div>
    </motion.div>
);

const RelatedPosts = ({ posts, getImageUrl, formatDate }: any) => (
  <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="border-t border-gray-200 pt-16">
    <h2 className="text-3xl font-bold mb-8 text-black">También te puede interesar</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((relatedPost: any) => (
        <Link key={relatedPost._id} href={`/blog/${relatedPost.slug.current}`} className="group block">
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
            {relatedPost.mainImage && (
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <img src={getImageUrl(relatedPost.mainImage, 400)} alt={relatedPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
            )}
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-[#A51C30] transition-colors">{relatedPost.title}</h3>
              <p className="text-sm text-gray-500 mt-auto">{formatDate(relatedPost.publishedAt)}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </motion.section>
);