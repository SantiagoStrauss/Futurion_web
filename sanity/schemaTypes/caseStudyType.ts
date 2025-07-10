import {defineField, defineType} from 'sanity'


export const caseStudyType = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  // icon: LightBulbIcon, // Puedes agregar un icono válido de @sanity/icons si lo deseas
  fields: [
    defineField({
      name: 'category',
      type: 'string',
      title: 'Categoría',
      initialValue: 'Caso de estudio',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Título',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Imagen',
      options: {hotspot: true},
    }),
    defineField({
      name: 'link',
      type: 'url',
      title: 'Enlace',
    }),
    defineField({
      name: 'color',
      type: 'string',
      title: 'Color de fondo (Tailwind)',
      description: 'Ejemplo: from-blue-900 to-blue-500',
    }),
  ],
})
