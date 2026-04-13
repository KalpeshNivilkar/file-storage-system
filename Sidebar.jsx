import { 
  LayoutDashboard, 
  FileText, 
  Share2, 
  UploadCloud, 
  Search 
} from 'lucide-react'

const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'my-files', icon: LayoutDashboard, label: 'My Files' },
    { id: 'shared', icon: Share2, label: 'Shared' },
    { id: 'recent', icon: FileText, label: 'Recent' },
  ]

  return (
    <div className="w-64 bg-white border-r shadow-sm h-screen p-6 space-y-6">
      <div className="space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700 border-2 border-blue-200 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      <div className="pt-6 border-t">
        <button className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
          <UploadCloud className="w-5 h-5" />
          <span>Upload Files</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar

