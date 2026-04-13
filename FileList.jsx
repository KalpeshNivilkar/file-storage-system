import { Download, Trash2, Share2, Eye, FileImage, FileText } from 'lucide-react'
import { formatBytes } from '../utils/formatBytes'

const FileList = ({ files, onDelete, onShare }) => {
  if (files.length === 0) {
    return (
      <div className="text-center py-24">
        <FileImage className="mx-auto w-24 h-24 text-gray-300 mb-6" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No files yet</h3>
        <p className="text-gray-500">Upload your first file to get started</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {files.map((file) => (
        <div key={file._id} className="group bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 p-6 hover:-translate-y-1 transition-all duration-200 overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
            {file.contentType.startsWith('image/') ? (
              <img src={file.url} alt={file.name} className="w-full h-full object-cover rounded-xl" />
            ) : (
              <FileText className="w-16 h-16 text-gray-400" />
            )}
          </div>
          
          <h3 className="font-semibold text-gray-900 text-lg mb-2 truncate">{file.name}</h3>
          
          <div className="space-y-1 mb-4">
            <div className="flex items-center text-sm text-gray-500 space-x-2">
              <span>{formatBytes(file.size)}</span>
              <span>•</span>
              <span>{new Date(file.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={file.url}
              download
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-1 text-center"
              title="Download"
            >
              <Download className="w-5 h-5 mx-auto" />
            </a>
            
            {file.contentType.startsWith('image/') && (
              <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors flex-1 text-center">
                <Eye className="w-5 h-5 mx-auto" title="Preview" />
              </button>
            )}
            
            <button
              onClick={() => onShare(file._id)}
              className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors flex-1 text-center"
              title="Share"
            >
              <Share2 className="w-5 h-5 mx-auto" />
            </button>
            
            <button
              onClick={() => onDelete(file._id)}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-1 text-center"
              title="Delete"
            >
              <Trash2 className="w-5 h-5 mx-auto" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FileList

