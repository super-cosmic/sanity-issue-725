import { defineArrayMember, defineField, defineType } from 'sanity'
import { sectionTab } from './sectionTab'

export const sectionTabs = defineType({
  name: 'sectionTabs',
  title: 'Tabs',
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
      name: 'items',
      type: 'array',
      title: 'Tabs',
      of: [defineArrayMember({ type: sectionTab.name })],
      validation: (rule) => rule.required().unique(),
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
        subtitle: 'SECTION TABS',
      }
    },
  },
})
