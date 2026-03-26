import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'
import {assist} from '@sanity/assist'

const languages = [
  {id: 'en', title: 'English'},
  {id: 'nl', title: 'Dutch'},
]

export default defineConfig({
  name: 'default',
  title: 'Studio issue #725',
  projectId: 'ghpxztu2',
  dataset: 'production',
  plugins: [
    structureTool(),
    visionTool(),
    assist({
      translate: {
        field: {
          documentTypes: ['post'],
          languages,
        },
      },
    }),
    internationalizedArray({
      buttonAddAll: false,
      languageDisplay: 'titleOnly',
      defaultLanguages: ['en'],
      languageFilter: {
        documentTypes: ['post'],
      },
      fieldTypes: ['string', 'text', 'boolean', 'number', 'url', 'blockContent'],
      languages,
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
