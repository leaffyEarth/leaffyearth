import React from "react"
import { useDropzone } from "react-dropzone"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"

interface UploadImageProps extends React.HTMLAttributes<HTMLDivElement> {
  onUpload: (file: File) => Promise<void>
  isUploading?: boolean
}

export function UploadImage({ 
  onUpload, 
  isUploading = false,
  className,
  ...props 
}: UploadImageProps) {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
  const [preview, setPreview] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  const onDrop = React.useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }

    // Check file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB')
      return
    }

    setError(null)
    setSelectedFile(file)
    setPreview(URL.createObjectURL(file))
  }, [])

  const handleUpload = async () => {
    if (!selectedFile) return

    try {
      await onUpload(selectedFile)
      // Clear the selection after successful upload
      setSelectedFile(null)
      setPreview(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image')
    }
  }

  const handleCancel = () => {
    setSelectedFile(null)
    setPreview(null)
    setError(null)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxFiles: 1,
    disabled: !!selectedFile
  })

  React.useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  return (
    <div className={cn("space-y-4", className)} {...props}>
      {!selectedFile && (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 transition-colors",
            "hover:border-primary/50 hover:bg-muted/50",
            isDragActive && "border-primary/50 bg-muted/50",
            "flex flex-col items-center justify-center gap-2 cursor-pointer"
          )}
        >
          <input {...getInputProps()} />
          <Upload className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground text-center">
            {isDragActive ? (
              "Drop the image here"
            ) : (
              "Drag & drop an image here, or click to select"
            )}
          </p>
          <p className="text-xs text-muted-foreground">
            PNG, JPG, JPEG or WebP (max. 5MB)
          </p>
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {preview && (
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden bg-muted/30">
            <img
              src={preview}
              alt="Upload preview"
              className="w-full h-auto"
            />
          </div>
          
          <div className="flex items-center gap-2 justify-end">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload Image"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
} 