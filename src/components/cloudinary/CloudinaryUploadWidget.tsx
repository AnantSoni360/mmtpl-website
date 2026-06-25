'use client'

import { CldUploadWidget } from 'next-cloudinary'
import { UploadCloud } from 'lucide-react'

interface CloudinaryUploadWidgetProps {
  onUploadSuccess: (url: string) => void
  onUploadError?: (error: any) => void
  resourceType?: 'image' | 'video' | 'raw' | 'auto'
  maxFiles?: number
  clientAllowedFormats?: string[]
}

export function CloudinaryUploadWidget({ 
  onUploadSuccess, 
  onUploadError,
  resourceType = 'auto',
  maxFiles = 1,
  clientAllowedFormats = ['pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg']
}: CloudinaryUploadWidgetProps) {
  
  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default"}
      options={{
        maxFiles,
        resourceType,
        clientAllowedFormats,
        maxFileSize: 5000000, // 5MB
      }}
      onSuccess={(result, { widget }) => {
        if (result.info && typeof result.info !== 'string' && result.info.secure_url) {
          onUploadSuccess(result.info.secure_url)
          if (widget && typeof widget.close === 'function') {
            widget.close();
          }
          // Force restore scroll in case the component unmounts before Cloudinary cleans up
          document.body.style.overflow = '';
        }
      }}
      onError={(error) => {
        if (onUploadError) onUploadError(error)
      }}
    >
      {({ open }) => {
        return (
          <div 
            onClick={() => open()}
            className="border border-dashed border-silver dark:border-white/30 bg-bone/50 dark:bg-obsidian/50 rounded-xl p-8 transition-colors hover:border-obsidian dark:hover:border-white/60 cursor-pointer flex flex-col items-center justify-center text-center w-full"
          >
            <UploadCloud size={40} className="text-obsidian dark:text-white/70 mb-4" />
            <span className="font-switzer text-obsidian dark:text-gray-200 text-sm font-medium">
              Click here to upload your file
            </span>
            <span className="font-switzer text-graphite dark:text-gray-400 text-xs mt-1">
              Supports PDF, DOCX (Max 5MB)
            </span>
            <button 
              type="button" 
              className="bg-obsidian dark:bg-lilac-bloom text-white !text-white font-switzer font-medium px-6 py-2.5 rounded-lg mt-4 transition-colors text-sm"
            >
              Select File
            </button>
          </div>
        )
      }}
    </CldUploadWidget>
  )
}
