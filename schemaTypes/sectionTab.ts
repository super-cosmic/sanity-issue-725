import { defineField, defineType } from 'sanity'

export const sectionTab = defineType({
  name: 'sectionTab',
  title: 'Tab',
  type: 'object',
  fields: [
    defineField({
      name: 'internalTitle',
      title: 'Internal Title',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'internationalizedArrayString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'internationalizedArrayBlockContent',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      documentTitle: 'internalTitle',
      title: 'title.0.value',
    },
    prepare({ documentTitle, title }) {
      return {
        title: documentTitle || title || 'Untitled',
        subtitle: 'SECTION TAB'
      }
    },
  },
})
