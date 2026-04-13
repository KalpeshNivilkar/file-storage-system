import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadCloud, X, CheckCircle } from 'lucide-react'
import api from '../services/api'
import { toast } from 'react-hot-toast'

const UploadZone = () => {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const onDrop = useCallback(async (acceptedFiles) => {
    setUploading(true)
    setUploadProgress(0)

    for (const file of acceptedFiles) {
      try {
        const formData = new FormData()
        formData.append('file', file)

        const res = await api.post('/files/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setUploadProgress(progress)
          }
        })

        if (res.data.success) {
          toast.success(`${file.name} uploaded!`)
        }
      } catch (error) {
        toast.error(`Failed to upload ${file.name}: ${error.response?.data?.message || error.message}`)
      }
    }

    setUploading(false)
    setUploadProgress(0)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxSize: 100 * 1024 * 1024, // 100MB
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  })

  return (
    <div 
      {...getRootProps()} 
      className={`border-3 border-dashed rounded-3xl p-12 text-center transition-all duration-300 hover:border-blue-400 hover:shadow-2xl cursor-pointer group ${
        isDragActive 
          ? 'border-blue-400 bg-blue-50 shadow-2xl scale-[1.02]' 
          : 'border-gray-300 bg-gradient-to-b from-gray-50 to-white shadow-lg'
      }`}
    >
      <input {...getInputProps()} />
      
      {uploading ? (
        <div className="space-y-4">
          <UploadCloud className="w-20 h-20 text-blue-500 mx-auto animate-pulse" />
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300 shadow-md" 
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-lg font-semibold text-gray-900">Uploading... {uploadProgress}%</p>
        </div>
      ) : (
        <>
          <UploadCloud className="w-20 h-20 text-gray-400 mx-auto mb-6 group-hover:text-blue-500 group-hover:scale-110 transition-all" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600">
            Drop files here
          </h2>
          <p className="text-lg text-gray-500 mb-8">
            or click to browse <span className="font-semibold">(PNG, JPG, PDF, up to 100MB)</span>
          </p>
        </>
      )}
    </div>
  )
}

export default UploadZone

