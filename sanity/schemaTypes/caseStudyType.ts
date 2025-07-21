import {defineField, defineType} from 'sanity'
import {CaseIcon} from '@sanity/icons'

export const caseStudyType = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Título',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Categoría',
      options: {
        list: [
          {title: 'Transformación Digital', value: 'transformacion-digital'},
          {title: 'Automatización', value: 'automatizacion'},
          {title: 'Cloud Computing', value: 'cloud-computing'},
          {title: 'E-commerce', value: 'e-commerce'},
          {title: 'Mobile Apps', value: 'mobile-apps'},
          {title: 'Web Development', value: 'web-development'},
          {title: 'Consultoría', value: 'consultoria'},
          {title: 'Otros', value: 'otros'},
        ]
      },
      initialValue: 'transformacion-digital',
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'Resumen',
      description: 'Breve descripción del caso de estudio',
      validation: rule => rule.max(200),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Imagen principal',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo',
        })
      ]
    }),
    defineField({
      name: 'client',
      type: 'string',
      title: 'Cliente',
      description: 'Nombre del cliente (opcional si es confidencial)',
    }),
    defineField({
      name: 'industry',
      type: 'string',
      title: 'Industria',
      options: {
        list: [
          {title: 'Retail', value: 'retail'},
          {title: 'Salud', value: 'salud'},
          {title: 'Fintech', value: 'fintech'},
          {title: 'Educación', value: 'educacion'},
          {title: 'Manufactura', value: 'manufactura'},
          {title: 'Tecnología', value: 'tecnologia'},
          {title: 'Servicios', value: 'servicios'},
          {title: 'Logística', value: 'logistica'},
          {title: 'Otros', value: 'otros'},
        ]
      },
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      title: 'Body',
      description: 'Contenido principal del caso de estudio',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'technologies',
      type: 'array',
      title: 'Tecnologías utilizadas',
      of: [{type: 'string'}],
      description: 'Lista de tecnologías, frameworks o herramientas utilizadas',
    }),
    defineField({
      name: 'duration',
      type: 'string',
      title: 'Duración del proyecto',
      description: 'Ejemplo: 3 meses, 6 semanas, etc.',
    }),
    defineField({
      name: 'link',
      type: 'url',
      title: 'Enlace externo',
      description: 'Enlace al sitio web del proyecto o caso de estudio detallado',
    }),
    defineField({
      name: 'color',
      type: 'string',
      title: 'Color de fondo (Tailwind)',
      description: 'Ejemplo: from-blue-900 to-blue-500',
      options: {
        list: [
          {title: 'Azul', value: 'from-blue-600 to-blue-400'},
          {title: 'Verde', value: 'from-green-600 to-green-400'},
          {title: 'Púrpura', value: 'from-purple-600 to-purple-400'},
          {title: 'Naranja', value: 'from-orange-600 to-orange-400'},
          {title: 'Rosa', value: 'from-pink-600 to-pink-400'},
          {title: 'Índigo', value: 'from-indigo-600 to-indigo-400'},
          {title: 'Gris', value: 'from-gray-600 to-gray-400'},
        ]
      },
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: '¿Caso destacado?',
      description: '¿Es este un caso de estudio destacado?',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Fecha de publicación',
      validation: rule => rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
      media: 'image',
    },
    prepare(selection) {
      const {client} = selection
      return {...selection, subtitle: client && `Cliente: ${client}`}
    },
  },
})
