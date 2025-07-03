// Datos de prueba para el blog
export const mockBlogData = {
  posts: [
    {
      _id: '1',
      title: 'Cómo la IA está transformando el desarrollo de software en 2025',
      slug: { current: 'ia-transformando-desarrollo-software-2025' },
      excerpt: 'Descubre las últimas tendencias en inteligencia artificial y cómo están revolucionando la forma en que desarrollamos software.',
      mainImage: {
        _type: 'image',
        asset: {
          _ref: 'image-placeholder',
          _type: 'reference'
        },
        alt: 'Inteligencia Artificial en el desarrollo'
      },
      publishedAt: '2025-01-15T10:00:00Z',
      author: {
        name: 'María González',
        image: {
          _type: 'image',
          asset: {
            _ref: 'author-placeholder',
            _type: 'reference'
          }
        }
      },
      categories: [
        {
          title: 'Inteligencia Artificial',
          slug: { current: 'inteligencia-artificial' }
        }
      ],
      body: []
    },
    {
      _id: '2',
      title: '5 estrategias de ciberseguridad que toda empresa debería implementar',
      slug: { current: 'estrategias-ciberseguridad-empresas' },
      excerpt: 'Protege tu negocio con estas estrategias esenciales de ciberseguridad que pueden marcar la diferencia ante un ataque.',
      mainImage: {
        _type: 'image',
        asset: {
          _ref: 'image-placeholder-2',
          _type: 'reference'
        },
        alt: 'Ciberseguridad empresarial'
      },
      publishedAt: '2025-01-10T14:30:00Z',
      author: {
        name: 'Carlos Mendoza',
        image: {
          _type: 'image',
          asset: {
            _ref: 'author-placeholder-2',
            _type: 'reference'
          }
        }
      },
      categories: [
        {
          title: 'Ciberseguridad',
          slug: { current: 'ciberseguridad' }
        }
      ],
      body: []
    },
    {
      _id: '3',
      title: 'El futuro del trabajo remoto: tecnologías que facilitan la colaboración',
      slug: { current: 'futuro-trabajo-remoto-tecnologias' },
      excerpt: 'Analizamos las herramientas y plataformas que están definiendo el futuro del trabajo distribuido y la colaboración a distancia.',
      mainImage: {
        _type: 'image',
        asset: {
          _ref: 'image-placeholder-3',
          _type: 'reference'
        },
        alt: 'Trabajo remoto y colaboración'
      },
      publishedAt: '2025-01-05T09:15:00Z',
      author: {
        name: 'Laura Sánchez',
        image: {
          _type: 'image',
          asset: {
            _ref: 'author-placeholder-3',
            _type: 'reference'
          }
        }
      },
      categories: [
        {
          title: 'Productividad',
          slug: { current: 'productividad' }
        }
      ],
      body: []
    }
  ],
  categories: [
    {
      _id: 'cat1',
      title: 'Inteligencia Artificial',
      slug: { current: 'inteligencia-artificial' }
    },
    {
      _id: 'cat2',
      title: 'Ciberseguridad',
      slug: { current: 'ciberseguridad' }
    },
    {
      _id: 'cat3',
      title: 'Productividad',
      slug: { current: 'productividad' }
    }
  ]
}
