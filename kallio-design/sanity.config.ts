import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

export default defineConfig({
  name: 'default',
  title: 'Kallio Design',

  projectId: 'hqitilxi',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            // Add the orderable list item
            orderableDocumentListDeskItem({type: 'category', S, context}),
            // Separate out other document types
            S.divider(),
            ...S.documentTypeListItems().filter((item) => !['category'].includes(item.getId() || '')),
          ])
      },
    }),
    visionTool(),
  ],

  schema: {
    types: [...schemaTypes],
  },
})
