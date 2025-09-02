import React, { useState } from 'react';
import { Package, Layers, Cpu, ChevronDown, HelpCircle, User, Play } from 'lucide-react';
import { getStatusIcon } from '../../../utils/helpers';

interface Model {
  name: string;
  version: string;
  framework: string;
  created: string;
  author: string;
  status: string;
}

interface Deployment {
  name: string;
  model: string;
  version: string;
  status: string;
  replicas: string;
  created: string;
  endpoint: string;
}

interface TrainingJob {
  name: string;
  project: string;
  workerNodes: number;
  clusterQueue: string;
  created: string;
  status: string;
}

interface Project {
  name: string;
  created: string;
  owner: string;
}

interface ModelsViewProps {
  view: 'registry' | 'deployments' | 'training';
  models: Model[];
  deployments: Deployment[];
  trainingJobs: TrainingJob[];
  projects: Project[];
  selectedProject: string;
  setSelectedProject: (project: string) => void;
  showJobActions: boolean;
  setShowJobActions: (show: boolean) => void;
}

const ModelsView: React.FC<ModelsViewProps> = ({
  view,
  models,
  deployments,
  trainingJobs,
  projects,
  selectedProject,
  setSelectedProject,
  showJobActions,
  setShowJobActions
}) => {
  if (view === 'registry') {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Package className="w-6 h-6 text-blue-600 mr-3" />
            <h1 className="text-2xl font-semibold text-gray-900">Model registry</h1>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Register model
          </button>
        </div>
        
        <p className="text-gray-600 mb-6">
          Manage and version your machine learning models. Track model lineage, compare versions, and organize models by project.
        </p>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center">
              <button className="flex items-center text-gray-600 mr-4">
                Name <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Filter by name"
                  className="border border-gray-300 rounded px-3 py-1 pl-8"
                />
                <Package className="w-4 h-4 text-gray-400 absolute left-2 top-1.5" />
              </div>
            </div>
            <div className="text-sm text-gray-600">1 - {models.length} of {models.length}</div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-medium text-gray-700">Name</th>
                  <th className="text-left p-3 font-medium text-gray-700">Version</th>
                  <th className="text-left p-3 font-medium text-gray-700">Framework</th>
                  <th className="text-left p-3 font-medium text-gray-700">Created</th>
                  <th className="text-left p-3 font-medium text-gray-700">Author</th>
                  <th className="text-left p-3 font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model, index) => (
                  <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center">
                        <Package className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-blue-600 hover:underline cursor-pointer">{model.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-gray-700">{model.version}</td>
                    <td className="p-3 text-gray-700">{model.framework}</td>
                    <td className="p-3 text-gray-700">{model.created}</td>
                    <td className="p-3 text-gray-700">{model.author}</td>
                    <td className="p-3">
                      <div className="flex items-center">
                        {getStatusIcon(model.status)}
                        <span className="ml-2">{model.status}</span>
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
  }

  if (view === 'deployments') {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Layers className="w-6 h-6 text-blue-600 mr-3" />
            <h1 className="text-2xl font-semibold text-gray-900">Model deployments</h1>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Deploy model
          </button>
        </div>
        
        <p className="text-gray-600 mb-6">
          Monitor and manage your deployed models. View deployment status, scaling information, and endpoint details.
        </p>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-medium text-gray-700">Name</th>
                  <th className="text-left p-3 font-medium text-gray-700">Model</th>
                  <th className="text-left p-3 font-medium text-gray-700">Version</th>
                  <th className="text-left p-3 font-medium text-gray-700">Status</th>
                  <th className="text-left p-3 font-medium text-gray-700">Replicas</th>
                  <th className="text-left p-3 font-medium text-gray-700">Endpoint</th>
                  <th className="text-left p-3 font-medium text-gray-700">Created</th>
                </tr>
              </thead>
              <tbody>
                {deployments.map((deployment, index) => (
                  <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="p-3">
                      <span className="text-blue-600 hover:underline cursor-pointer">{deployment.name}</span>
                    </td>
                    <td className="p-3 text-gray-700">{deployment.model}</td>
                    <td className="p-3 text-gray-700">{deployment.version}</td>
                    <td className="p-3">
                      <div className="flex items-center">
                        {getStatusIcon(deployment.status)}
                        <span className="ml-2">{deployment.status}</span>
                      </div>
                    </td>
                    <td className="p-3 text-gray-700">{deployment.replicas}</td>
                    <td className="p-3">
                      {deployment.endpoint !== 'Pending' ? (
                        <span className="text-blue-600 hover:underline cursor-pointer">{deployment.endpoint}</span>
                      ) : (
                        <span className="text-gray-500">{deployment.endpoint}</span>
                      )}
                    </td>
                    <td className="p-3 text-gray-700">{deployment.created}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'training') {
    return (
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Cpu className="w-6 h-6 text-blue-600 mr-3" />
          <h1 className="text-2xl font-semibold text-gray-900">Model training</h1>
        </div>
        
        <p className="text-gray-600 mb-6">
          Select a project to view its PyTorch training jobs. Monitor training progress and manage distributed training workloads across your data science projects.
        </p>

        <div className="flex items-center mb-6">
          <span className="mr-3 text-gray-700">Project</span>
          <select 
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 mr-4"
          >
            {projects.map(project => (
              <option key={project.name} value={project.name}>{project.name}</option>
            ))}
          </select>
          <span className="text-blue-600 cursor-pointer hover:underline">
            Go to {selectedProject}
          </span>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center">
              <button className="flex items-center text-gray-600 mr-4">
                Name <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Filter by name"
                  className="border border-gray-300 rounded px-3 py-1 pl-8"
                />
                <Package className="w-4 h-4 text-gray-400 absolute left-2 top-1.5" />
              </div>
            </div>
            <div className="text-sm text-gray-600">1 - 1 of 1</div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-medium text-gray-700">Name</th>
                  <th className="text-left p-3 font-medium text-gray-700">Project</th>
                  <th className="text-left p-3 font-medium text-gray-700">Worker nodes</th>
                  <th className="text-left p-3 font-medium text-gray-700">Cluster queue</th>
                  <th className="text-left p-3 font-medium text-gray-700">Created</th>
                  <th className="text-left p-3 font-medium text-gray-700">Status</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {trainingJobs.map((job, index) => (
                  <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center">
                        <HelpCircle className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-blue-600 hover:underline cursor-pointer">{job.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-gray-700">{job.project}</td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {job.workerNodes}
                      </div>
                    </td>
                    <td className="p-3 text-gray-700">{job.clusterQueue}</td>
                    <td className="p-3 text-gray-700">{job.created}</td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <Play className="w-4 h-4 text-gray-600 mr-2" />
                        {job.status}
                      </div>
                    </td>
                    <td className="p-3 relative">
                      <button 
                        onClick={() => setShowJobActions(!showJobActions)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ⋮
                      </button>
                      {showJobActions && (
                        <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-32">
                          <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 text-green-600">
                            Resume
                          </button>
                          <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 text-orange-600">
                            Suspend
                          </button>
                          <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 text-red-600">
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between p-4 border-t border-gray-200">
            <span className="text-sm text-gray-600">1 - 1 of 1</span>
            <div className="flex items-center space-x-2">
              <button className="px-2 py-1 text-gray-400">‹‹</button>
              <button className="px-2 py-1 text-gray-400">‹</button>
              <span className="px-3 py-1 bg-gray-200 rounded">1</span>
              <span className="text-sm text-gray-600">of 1</span>
              <button className="px-2 py-1 text-gray-400">›</button>
              <button className="px-2 py-1 text-gray-400">››</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ModelsView;
