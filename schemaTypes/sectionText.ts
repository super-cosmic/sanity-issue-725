import { defineField, defineType } from 'sanity'
import { previewBlockContent } from '../util/block'


export const sectionText = defineType({
  name: 'sectionText',
  title: 'Text',
  type: 'object',
  fields: [
    defineField({
      name: 'internalTitle',
      title: 'Internal Title',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'internationalizedArrayBlockContent',
    }),
  ],
  preview: {
    select: {
      documentTitle: 'internalTitle',
      text: 'text.0.value',
    },
    prepare({ documentTitle, text }) {
      return {
        title: documentTitle || 'Untitled',
        subtitle: previewBlockContent(text)
      }
    },
  },
})
