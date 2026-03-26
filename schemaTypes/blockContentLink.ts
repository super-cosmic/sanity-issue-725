import { defineField } from 'sanity'
import { link } from './link'

export const blockContentLink = defineField({
  ...link,
  name: 'blockContentLink',
  fields: link.fields.filter((f: any) => f.name !== 'label'),
})
