import React from 'react';
import { Monitor, Cpu, HardDrive, Network } from 'lucide-react';
import { Project } from '../../../utils/constants';

interface ResourcesViewProps {
  projects: Project[];
}

const ResourcesView: React.FC<ResourcesViewProps> = ({ projects }) => {
  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Monitor className="w-6 h-6 text-blue-600 mr-3" />
        <h1 className="text-2xl font-semibold text-gray-900">Resources</h1>
      </div>
      
      <p className="text-gray-600 mb-6">
        Monitor cluster resources and capacity. View resource utilization, quotas, and allocation across projects.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Cpu className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">75%</span>
          </div>
          <h3 className="font-medium text-gray-900 mb-1">CPU Usage</h3>
          <p className="text-sm text-gray-600">24 / 32 cores</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <HardDrive className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">68%</span>
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Memory Usage</h3>
          <p className="text-sm text-gray-600">68 / 100 GB</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <HardDrive className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">45%</span>
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Storage Usage</h3>
          <p className="text-sm text-gray-600">450 / 1000 GB</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Network className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">12</span>
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Active Pods</h3>
          <p className="text-sm text-gray-600">Running workloads</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Resource Quotas by Project</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-medium text-gray-700">Project</th>
                <th className="text-left p-3 font-medium text-gray-700">CPU Limit</th>
                <th className="text-left p-3 font-medium text-gray-700">Memory Limit</th>
                <th className="text-left p-3 font-medium text-gray-700">Storage Limit</th>
                <th className="text-left p-3 font-medium text-gray-700">Usage</th>
              </tr>
            </thead>
            <tbody>
              {projects.slice(0, 3).map((project, index) => (
                <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="p-3 text-blue-600 hover:underline cursor-pointer">{project.name}</td>
                  <td className="p-3 text-gray-700">8 cores</td>
                  <td className="p-3 text-gray-700">32 GB</td>
                  <td className="p-3 text-gray-700">200 GB</td>
                  <td className="p-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: `${Math.random() * 80 + 20}%`}}></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResourcesView;
