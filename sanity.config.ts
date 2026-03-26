import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { internationalizedArray } from 'sanity-plugin-internationalized-array'

export default defineConfig({
  name: 'default',
  title: 'Studio issue #725',
  projectId: 'ghpxztu2',
  dataset: 'production',
  plugins: [structureTool(), visionTool(), internationalizedArray({
      buttonAddAll: false,
      languageDisplay: 'titleOnly',
      defaultLanguages: ['en'],
      fieldTypes: ['string', 'text', 'boolean', 'number', 'url'],
      languages: [{id: 'en', title: 'English'}, {id: 'nl', title: 'Dutch'}]
    }),],
  schema: {
    types: schemaTypes,
  },
})
