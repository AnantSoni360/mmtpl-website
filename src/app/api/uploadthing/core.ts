import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

export const ourFileRouter = {
  resumeUploader: f({ pdf: { maxFileSize: '4MB' } })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for resume', file.url)
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
