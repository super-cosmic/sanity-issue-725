import { defineField, defineType } from 'sanity'
import { linkableDocumentTypes } from '../../utils/documents.util'
import { typeToSubtitle } from '../../utils/preview.util'
import { isValidUrl } from '../../utils/validation.util'
import { LinkIcon } from 'lucide-react'

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'internationalizedArrayString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Link Type',
      type: 'string',
      initialValue: 'internal',
      options: {
        layout: 'radio',
        list: [
          { title: 'Internal', value: 'internal' },
          { title: 'Manual', value: 'manual' },
          { title: 'Email', value: 'email' },
        ],
      },
    }),
    defineField({
      name: 'internalLink',
      title: 'Internal Link',
      type: 'reference',
      to: [{ type: 'post' }],
      hidden: ({ parent }) => parent?.type !== 'internal',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if ((context.parent as any)?.type === 'internal' && !value) {
            return 'Internal link is required when type is set to internal.'
          }

          return true
        }),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'internationalizedArrayUrl',
      hidden: ({ parent }) => parent?.type !== 'manual',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'internationalizedArrayString',
      hidden: ({ parent }) => parent?.type !== 'email',
      validation: (Rule) =>
        Rule.custom<{ value: string; _type: string; _key: string }[]>((value, context) => {
          if ((context.parent as any)?.type === 'email') {
            if (!value || value.length === 0) {
              return 'Email is required when type is set to email.'
            }

            for (const item of value) {
              if (!emailRegex.test(item.value)) {
                return 'One or more email addresses are invalid.'
              }
            }
          }

          return true
        }),
    }),
    defineField({
      name: 'newTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      label: 'label.0.value',
      type: 'type',
      internalLinkUrlSlug: 'internalLink.urlSlug.current',
      url: 'url.0.value',
      email: 'email.0.value',
    },
    prepare({ label, type, internalLinkUrlSlug, url, email }) {
      return {
        title: label || 'Untitled',
        subtitle: (() => {
          switch (type) {
            case 'internal':
              return `'${internalLinkUrlSlug}'`;
            case 'email':
              return `'${email}'`;
            default:
              return `'${url}'`;
          }
        })(),
      }
    },
  },
})
