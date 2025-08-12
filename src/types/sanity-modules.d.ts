// src/types/sanity-modules.d.ts

declare module 'sanity/desk' {
  import deskTool from '@sanity/desk-tool'
  export { deskTool }
}

declare module 'sanity-plugin-media' {
  const media: any
  export default media
}

declare module '@sanity/orderable-document-list' {
  export const orderableDocumentListDeskItem: any
}

declare module 'sanity' {
  export { defineConfig } from 'sanity'
}