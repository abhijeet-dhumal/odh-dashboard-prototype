import React from 'react';
import { Image, Server, Gauge, Play, Network, HardDrive, Package, Users } from 'lucide-react';

interface SettingsViewProps {
  section: string;
}

const SettingsView: React.FC<SettingsViewProps> = ({ section }) => {
  const settingsContent = {
    'workbench-images': {
      title: 'Workbench images',
      icon: Image,
      description: 'Manage notebook and workbench container images available to users.',
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Available Images</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Jupyter Minimal', 'Jupyter DataScience', 'Jupyter TensorFlow', 'Jupyter PyTorch'].map((image, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{image}</h4>
                      <span className="text-sm text-green-600">Enabled</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Python 3.9, Jupyter Lab 3.4</p>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Configure</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    'cluster-settings': {
      title: 'Cluster settings',
      icon: Server,
      description: 'Configure cluster-wide settings and resource limits.',
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">General Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cluster Name</label>
                <input type="text" value="open-data-hub-cluster" className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Default CPU Limit</label>
                <input type="text" value="2 cores" className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Default Memory Limit</label>
                <input type="text" value="8 GB" className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
            </div>
          </div>
        </div>
      )
    },
    'accelerator-profiles': {
      title: 'Accelerator profiles',
      icon: Gauge,
      description: 'Configure GPU and accelerator profiles for workloads.',
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">GPU Profiles</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {['NVIDIA Tesla V100', 'NVIDIA A100', 'NVIDIA RTX 3080'].map((gpu, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{gpu}</h4>
                      <p className="text-sm text-gray-600">Available: {Math.floor(Math.random() * 4) + 1} units</p>
                    </div>
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    'serving-runtimes': {
      title: 'Serving runtimes',
      icon: Play,
      description: 'Configure model serving runtime environments.',
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Available Runtimes</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {['TensorFlow Serving', 'TorchServe', 'MLflow', 'Triton Inference Server'].map((runtime, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{runtime}</h4>
                      <p className="text-sm text-gray-600">Version 2.{Math.floor(Math.random() * 5)}.0</p>
                    </div>
                    <span className="text-sm text-green-600">Enabled</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    'connection-types': {
      title: 'Connection types',
      icon: Network,
      description: 'Configure connection types for data sources and external services.',
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Available Connection Types</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {['PostgreSQL', 'MySQL', 'S3', 'Kafka', 'Redis'].map((connection, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{connection}</h4>
                      <p className="text-sm text-gray-600">Database/Storage connection</p>
                    </div>
                    <span className="text-sm text-green-600">Available</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    'storage-classes': {
      title: 'Storage classes',
      icon: HardDrive,
      description: 'Manage storage classes and persistent volume configurations.',
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Storage Classes</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {['gp2', 'gp3', 'io1', 'nfs'].map((storage, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{storage}</h4>
                      <p className="text-sm text-gray-600">
                        {storage === 'nfs' ? 'Network File System' : 'AWS EBS Volume'}
                      </p>
                    </div>
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    'model-registry': {
      title: 'Model registry settings',
      icon: Package,
      description: 'Configure model registry settings and integrations.',
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Registry Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Registry URL</label>
                <input type="text" value="https://model-registry.example.com" className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Default Storage Backend</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2">
                  <option>S3</option>
                  <option>MinIO</option>
                  <option>Local Storage</option>
                </select>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="auto-versioning" className="mr-2" />
                <label htmlFor="auto-versioning" className="text-sm text-gray-700">Enable automatic model versioning</label>
              </div>
            </div>
          </div>
        </div>
      )
    },
    'user-management': {
      title: 'User management',
      icon: Users,
      description: 'Manage users, groups, and access permissions.',
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Users</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {['admin@example.com', 'user-001@example.com', 'user-002@example.com'].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{user}</h4>
                      <p className="text-sm text-gray-600">
                        {index === 0 ? 'Administrator' : 'Data Scientist'}
                      </p>
                    </div>
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    }
  };

  const currentSection = settingsContent[section as keyof typeof settingsContent] || settingsContent['workbench-images'];
  const IconComponent = currentSection.icon;

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <IconComponent className="w-6 h-6 text-blue-600 mr-3" />
        <h1 className="text-2xl font-semibold text-gray-900">{currentSection.title}</h1>
      </div>
      
      <p className="text-gray-600 mb-6">{currentSection.description}</p>
      
      {currentSection.content}
    </div>
  );
};

export default SettingsView;
