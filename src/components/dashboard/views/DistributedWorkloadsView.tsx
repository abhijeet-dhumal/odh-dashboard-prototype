import React, { useState } from 'react';
import { GitBranch, XCircle, CheckCircle, Clock, TrendingUp, Play, Package, Users, Server, Cpu, ChevronRight } from 'lucide-react';
import { getStatusIcon, paginateData, PaginationControls } from '../../../utils/helpers';
import { 
  QUEUED_JOBS, 
  CLUSTER_QUEUES, 
  LOCAL_QUEUES, 
  RESOURCE_FLAVORS, 
  COHORTS, 
  CLUSTER_RESOURCES,
  TRAIN_JOBS,
  TRAINING_RUNTIMES,
  type QueuedJob,
  type ClusterQueue,
  type LocalQueue,
  type ResourceFlavor,
  type Cohort,
  type ClusterResource,
  type TrainJob,
  type TrainingRuntime
} from '../../../utils/constants';

interface Project {
  name: string;
  created: string;
  owner: string;
}

interface Workload {
  name: string;
  priority: number;
  status: string;
  created: string;
  message: string;
}

interface DistributedWorkloadsViewProps {
  projects: Project[];
  workloads: Workload[];
  selectedProject: string;
  setSelectedProject: (project: string) => void;
}

const DistributedWorkloadsView: React.FC<DistributedWorkloadsViewProps> = ({
  projects,
  workloads,
  selectedProject,
  setSelectedProject
}) => {
  const [workloadsTab, setWorkloadsTab] = useState('status');
  
  // Pagination states
  const [workloadsPagination, setWorkloadsPagination] = useState({ page: 1, limit: 10 });
  const [localQueuesPagination, setLocalQueuesPagination] = useState({ page: 1, limit: 5 });
  const [clusterQueuesPagination, setClusterQueuesPagination] = useState({ page: 1, limit: 5 });
  const [resourceFlavorsPagination, setResourceFlavorsPagination] = useState({ page: 1, limit: 5 });
  const [cohortsPagination, setCohortsPagination] = useState({ page: 1, limit: 5 });
  // Trainer v2 pagination states
  const [trainJobsPagination, setTrainJobsPagination] = useState({ page: 1, limit: 5 });
  const [trainingRuntimesPagination, setTrainingRuntimesPagination] = useState({ page: 1, limit: 5 });
  const [clusterTrainingRuntimesPagination, setClusterTrainingRuntimesPagination] = useState({ page: 1, limit: 5 });

  // Helper functions for namespace filtering
  const filterByNamespace = <T extends { namespace?: string }>(items: T[], selectedProject: string | null): T[] => {
    if (!selectedProject || selectedProject === 'All Projects') {
      return items;
    }
    return items.filter(item => item.namespace === selectedProject);
  };

  // Filtered data based on selected project
  const filteredQueuedJobs = filterByNamespace(QUEUED_JOBS, selectedProject);
  const filteredTrainJobs = filterByNamespace(TRAIN_JOBS, selectedProject);
  // TrainingRuntimes: namespace-scoped (filtered), ClusterTrainingRuntimes: cluster-wide (always visible)
  const filteredTrainingRuntimes = selectedProject && selectedProject !== 'All Projects' 
    ? TRAINING_RUNTIMES.filter(runtime => 
        // Include namespace-scoped TrainingRuntimes for selected namespace
        (runtime.type === 'TrainingRuntime' && runtime.namespace === selectedProject) ||
        // Always include cluster-wide ClusterTrainingRuntimes
        runtime.type === 'ClusterTrainingRuntime'
      )
    : TRAINING_RUNTIMES;
  const filteredLocalQueues = filterByNamespace(LOCAL_QUEUES, selectedProject);
  // Cluster-wide resources are always visible regardless of namespace selection
  const filteredClusterQueues = CLUSTER_QUEUES;
  const filteredResourceFlavors = RESOURCE_FLAVORS;
  const filteredCohorts = COHORTS;

  return (
    <div className="p-6">
      <div className="flex items-center mb-4">
        <GitBranch className="w-6 h-6 text-blue-600 mr-3" />
        <h1 className="text-2xl font-semibold text-gray-900">Distributed workloads</h1>
      </div>
      
      <p className="text-gray-600 mb-6">
        Monitor the metrics of your active resources.
      </p>

      <div className="flex items-center mb-6">
        <span className="mr-3 text-gray-700">Project</span>
        <select 
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 mr-4"
        >
          <option value="All Projects">All Projects</option>
          {projects.map(project => (
            <option key={project.name} value={project.name}>{project.name}</option>
          ))}
        </select>
        <span className="text-blue-600 cursor-pointer hover:underline">
          Go to {selectedProject}
        </span>
      </div>

      <div className="flex space-x-6 mb-6">
        <button 
          onClick={() => setWorkloadsTab('status')}
          className={`pb-2 border-b-2 font-medium ${
            workloadsTab === 'status' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Distributed workload status
        </button>
        <button 
          onClick={() => setWorkloadsTab('metrics')}
          className={`pb-2 border-b-2 font-medium ${
            workloadsTab === 'metrics' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Project metrics
        </button>
        <button 
          onClick={() => setWorkloadsTab('kueue')}
          className={`pb-2 border-b-2 font-medium ${
            workloadsTab === 'kueue' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Kueue metrics
        </button>
        <button 
          onClick={() => setWorkloadsTab('trainer')}
          className={`pb-2 border-b-2 font-medium ${
            workloadsTab === 'trainer' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Trainer metrics
        </button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div></div>
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-3">Refresh interval</span>
          <select className="border border-gray-300 rounded px-3 py-1">
            <option>30 minutes</option>
            <option>15 minutes</option>
            <option>60 minutes</option>
          </select>
        </div>
      </div>

      {workloadsTab === 'status' ? (
        <>
          {/* Namespace Scope Indicator */}
          {selectedProject && selectedProject !== 'All Projects' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-700">
                <strong>Namespace Scope:</strong> Showing resources for "{selectedProject}" namespace. 
                Cluster-wide resources (ClusterQueues, ResourceFlavors, Cohorts) remain visible as they are cluster-scoped.
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Status overview</h3>
              <div className="relative w-64 h-64 mx-auto">
                {/* Donut Chart */}
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                  <circle 
                    cx="100" 
                    cy="100" 
                    r="80" 
                    fill="none" 
                    stroke="#22c55e" 
                    strokeWidth="20"
                    strokeDasharray="377"
                    strokeDashoffset="188.5"
                    transform="rotate(-90 100 100)"
                  />
                  <text x="100" y="90" textAnchor="middle" className="text-3xl font-bold fill-gray-900">2</text>
                  <text x="100" y="110" textAnchor="middle" className="text-sm fill-gray-600">Distributed Workloads</text>
                </svg>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full mr-2"></div>
                    <span>Pending: 0</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>
                    <span>Inadmissible: 0</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                    <span>Admitted: 0</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span>Running: 0</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                    <span>Evicted: 1</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>Succeeded: 1</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span>Failed: 0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Distributed Workloads</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-medium text-gray-700">Name</th>
                    <th className="text-left p-3 font-medium text-gray-700">Priority</th>
                    <th className="text-left p-3 font-medium text-gray-700">Status</th>
                    <th className="text-left p-3 font-medium text-gray-700">Created</th>
                    <th className="text-left p-3 font-medium text-gray-700">Latest Message</th>
                  </tr>
                </thead>
                <tbody>
                  {workloads.map((workload, index) => (
                    <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="p-3 text-blue-600 hover:underline cursor-pointer">{workload.name}</td>
                      <td className="p-3 text-gray-700">{workload.priority}</td>
                      <td className="p-3">
                        <div className="flex items-center">
                          {getStatusIcon(workload.status)}
                          <span className="ml-2">{workload.status}</span>
                        </div>
                      </td>
                      <td className="p-3 text-gray-700">{workload.created}</td>
                      <td className="p-3 text-gray-700">{workload.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between p-4 border-t border-gray-200">
              <span className="text-sm text-gray-600">1 - 2 of 2</span>
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
        </>
      ) : workloadsTab === 'metrics' ? (
        <>
          {/* Project Metrics View */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">Requested resources</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* CPU Chart */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">CPU</h4>
                <div className="relative h-32">
                  <svg viewBox="0 0 400 100" className="w-full h-full">
                    {/* Chart background */}
                    <rect width="400" height="100" fill="#f9fafb" />
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4, 5].map(i => (
                      <line key={i} x1={i * 80} y1="0" x2={i * 80} y2="100" stroke="#e5e7eb" strokeWidth="1" />
                    ))}
                    {/* Data bars */}
                    <rect x="0" y="60" width="240" height="40" fill="#3b82f6" />
                    <rect x="0" y="80" width="160" height="20" fill="#93c5fd" />
                  </svg>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>0</span>
                    <span>3</span>
                    <span>5</span>
                    <span>7</span>
                    <span>8.8</span>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                    <span>Requested by {selectedProject}: 2</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-300 rounded mr-2"></div>
                    <span>Requested by all projects: 2</span>
                  </div>
                  <div className="text-gray-600">Total shared quota: 8</div>
                </div>
              </div>

              {/* Memory Chart */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">Memory</h4>
                <div className="relative h-32">
                  <svg viewBox="0 0 400 100" className="w-full h-full">
                    {/* Chart background */}
                    <rect width="400" height="100" fill="#f9fafb" />
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4, 5].map(i => (
                      <line key={i} x1={i * 80} y1="0" x2={i * 80} y2="100" stroke="#e5e7eb" strokeWidth="1" />
                    ))}
                    {/* Data bars */}
                    <rect x="0" y="70" width="120" height="30" fill="#3b82f6" />
                    <rect x="0" y="85" width="80" height="15" fill="#93c5fd" />
                  </svg>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>0</span>
                    <span>18</span>
                    <span>28</span>
                    <span>42</span>
                    <span>50</span>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                    <span>Requested by {selectedProject}: 6</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-300 rounded mr-2"></div>
                    <span>Requested by all projects: 6</span>
                  </div>
                  <div className="text-gray-600">Total shared quota: 50</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Top 5 resource-consuming distributed workloads</h3>
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GitBranch className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">All distributed workloads have completed</h4>
              <p className="text-gray-600">No distributed workloads in the selected project are currently consuming resources.</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Distributed workload resource metrics</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-medium text-gray-700">Name</th>
                    <th className="text-left p-3 font-medium text-gray-700">CPU usage (cores)</th>
                    <th className="text-left p-3 font-medium text-gray-700">Memory usage (GiB)</th>
                    <th className="text-left p-3 font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="p-3 text-blue-600 hover:underline cursor-pointer">pytorchjob-pytorch-multi-node-job-45b59</td>
                    <td className="p-3 text-gray-700">-</td>
                    <td className="p-3 text-gray-700">-</td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <XCircle className="w-4 h-4 text-gray-500 mr-2" />
                        <span>Evicted</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="p-3 text-blue-600 hover:underline cursor-pointer">trainjob-test-trainjob-29dd8</td>
                    <td className="p-3 text-gray-700">-</td>
                    <td className="p-3 text-gray-700">-</td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Succeeded</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between p-4 border-t border-gray-200">
              <span className="text-sm text-gray-600">1 - 2 of 2</span>
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
        </>
      ) : workloadsTab === 'kueue' ? (
        <>
          {/* Kueue Metrics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Admissions Rate */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-2xl font-bold text-green-600">0.200</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Admissions /s</h3>
              <p className="text-sm text-gray-600">Current rate</p>
            </div>

            {/* Admission Latency */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-blue-600">49.3ms</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Admission latency</h3>
              <p className="text-sm text-gray-600">99th percentile</p>
            </div>

            {/* Pending Workloads */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <span className="text-2xl font-bold text-yellow-600">11</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Pending workloads</h3>
              <p className="text-sm text-gray-600">In queue</p>
            </div>

            {/* Active Workloads */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Play className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-2xl font-bold text-purple-600">20</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Active workloads</h3>
              <p className="text-sm text-gray-600">Currently running</p>
            </div>
          </div>

          {/* Admission Flow Visualization */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Kueue Admission Flow</h3>
            <div className="flex items-center justify-center space-x-4 overflow-x-auto">
              <div className="flex flex-col items-center min-w-0">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                  <Package className="w-8 h-8 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">Job</span>
                <span className="text-xs text-gray-500">Created</span>
              </div>
              
              <div className="flex items-center">
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </div>
              
              <div className="flex flex-col items-center min-w-0">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">LocalQueue</span>
                <span className="text-xs text-gray-500">Namespace</span>
              </div>
              
              <div className="flex items-center">
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </div>
              
              <div className="flex flex-col items-center min-w-0">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                  <Server className="w-8 h-8 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">ClusterQueue</span>
                <span className="text-xs text-gray-500">Cluster-wide</span>
              </div>
              
              <div className="flex items-center">
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </div>
              
              <div className="flex flex-col items-center min-w-0">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-2">
                  <Cpu className="w-8 h-8 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">ResourceFlavor</span>
                <span className="text-xs text-gray-500">Match</span>
              </div>
              
              <div className="flex items-center">
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </div>
              
              <div className="flex flex-col items-center min-w-0">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">Admitted</span>
                <span className="text-xs text-gray-500">Running</span>
              </div>
            </div>
          </div>

          {/* Cluster Resources Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {Object.entries(CLUSTER_RESOURCES).map(([key, resource]) => (
              <div key={key} className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 capitalize">{key} Usage</h3>
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="none" 
                      stroke="#e5e7eb" 
                      strokeWidth="8"
                    />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="none" 
                      stroke={resource.percentage > 80 ? "#ef4444" : resource.percentage > 60 ? "#f59e0b" : "#10b981"}
                      strokeWidth="8"
                      strokeDasharray={`${resource.percentage * 2.51} 251`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">{resource.percentage}%</span>
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-sm text-gray-600">
                    {resource.used} / {resource.total} {key === 'gpu' ? 'devices' : key === 'memory' ? 'GB' : 'cores'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {resource.total - resource.used} {key === 'gpu' ? 'devices' : key === 'memory' ? 'GB' : 'cores'} available
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Workloads Table - Compact */}
          <div className="bg-white rounded-lg border border-gray-200 mb-8">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Active Workloads</h3>
              <p className="text-sm text-gray-600">Jobs currently in the admission pipeline</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-medium text-gray-700">#</th>
                    <th className="text-left p-3 font-medium text-gray-700">Job Name</th>
                    <th className="text-left p-3 font-medium text-gray-700">Type</th>
                    <th className="text-left p-3 font-medium text-gray-700">LocalQueue → ClusterQueue</th>
                    <th className="text-left p-3 font-medium text-gray-700">Priority</th>
                    <th className="text-left p-3 font-medium text-gray-700">Status</th>
                    <th className="text-left p-3 font-medium text-gray-700">Resources</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const paginatedWorkloads = paginateData(filteredQueuedJobs, workloadsPagination);
                    return paginatedWorkloads.data.map((job: any, index: number) => (
                      <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="p-3">
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            {job.position}
                          </span>
                        </td>
                        <td className="p-3 text-blue-600 hover:underline cursor-pointer text-sm">{job.name}</td>
                        <td className="p-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            job.type === 'PyTorchJob' ? 'bg-orange-100 text-orange-800' :
                            job.type === 'TFJob' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {job.type}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center text-sm">
                            <span className="text-purple-600">ml-team-queue</span>
                            <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                            <span className="text-green-600">{job.queue}</span>
                          </div>
                        </td>
                        <td className="p-3 text-gray-700 text-sm">{job.priority}</td>
                        <td className="p-3">
                          <div className="flex items-center">
                            {getStatusIcon(job.status)}
                            <span className="ml-2 text-sm">{job.status}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="text-xs text-gray-600">
                            <div>{job.resources.cpu} • {job.resources.memory}</div>
                            <div>{job.resources.gpu}</div>
                          </div>
                        </td>
                      </tr>
                    ));
                  })()}
                </tbody>
              </table>
            </div>
            <PaginationControls 
              pagination={workloadsPagination}
              setPagination={setWorkloadsPagination}
              totalPages={paginateData(filteredQueuedJobs, workloadsPagination).totalPages}
              totalItems={filteredQueuedJobs.length}
            />
          </div>

          {/* Queues Section - 2 Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* LocalQueues */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">LocalQueues</h3>
                <p className="text-sm text-gray-600">Namespace-scoped job queues</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 font-medium text-gray-700">Name</th>
                      <th className="text-left p-3 font-medium text-gray-700">Namespace</th>
                      <th className="text-left p-3 font-medium text-gray-700">Pending</th>
                      <th className="text-left p-3 font-medium text-gray-700">Admitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const paginatedLocalQueues = paginateData(filteredLocalQueues, localQueuesPagination);
                      return paginatedLocalQueues.data.map((queue: any, index: number) => (
                        <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                          <td className="p-3 text-blue-600 hover:underline cursor-pointer text-sm">{queue.name}</td>
                          <td className="p-3">
                            <span className="inline-flex px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                              {queue.namespace}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              queue.pendingWorkloads > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {queue.pendingWorkloads}
                            </span>
                          </td>
                          <td className="p-3 text-gray-700 text-sm">{queue.admittedWorkloads}</td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
              <PaginationControls 
                pagination={localQueuesPagination}
                setPagination={setLocalQueuesPagination}
                totalPages={paginateData(filteredLocalQueues, localQueuesPagination).totalPages}
                totalItems={filteredLocalQueues.length}
              />
            </div>

            {/* Cluster Queues */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">ClusterQueues</h3>
                <p className="text-sm text-gray-600">Cluster-wide resource pools</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 font-medium text-gray-700">Name</th>
                      <th className="text-left p-3 font-medium text-gray-700">Pending</th>
                      <th className="text-left p-3 font-medium text-gray-700">Admitted</th>
                      <th className="text-left p-3 font-medium text-gray-700">Quota Used</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const paginatedClusterQueues = paginateData(filteredClusterQueues, clusterQueuesPagination);
                      return paginatedClusterQueues.data.map((queue: any, index: number) => (
                        <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                          <td className="p-3 text-blue-600 hover:underline cursor-pointer text-sm">{queue.name}</td>
                          <td className="p-3">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              queue.pendingWorkloads > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {queue.pendingWorkloads}
                            </span>
                          </td>
                          <td className="p-3 text-gray-700 text-sm">{queue.admittedWorkloads}</td>
                          <td className="p-3">
                            <div className="flex items-center">
                              <div className="w-12 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className="bg-green-600 h-2 rounded-full" 
                                  style={{width: queue.quotaUsed}}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-700">{queue.quotaUsed}</span>
                            </div>
                          </td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
              <PaginationControls 
                pagination={clusterQueuesPagination}
                setPagination={setClusterQueuesPagination}
                totalPages={paginateData(filteredClusterQueues, clusterQueuesPagination).totalPages}
                totalItems={filteredClusterQueues.length}
              />
            </div>
          </div>

          {/* Resources & Capacity Section - 2 Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* ResourceFlavors */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">ResourceFlavors</h3>
                <p className="text-sm text-gray-600">Resource variants (spot, on-demand, GPU types)</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 font-medium text-gray-700">Name</th>
                      <th className="text-left p-3 font-medium text-gray-700">Type</th>
                      <th className="text-left p-3 font-medium text-gray-700">Pricing</th>
                      <th className="text-left p-3 font-medium text-gray-700">Available</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const paginatedResourceFlavors = paginateData(filteredResourceFlavors, resourceFlavorsPagination);
                      return paginatedResourceFlavors.data.map((flavor: any, index: number) => (
                        <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                          <td className="p-3 text-blue-600 hover:underline cursor-pointer text-sm">{flavor.name}</td>
                          <td className="p-3">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              flavor.type === 'GPU' ? 'bg-green-100 text-green-800' :
                              flavor.type === 'TPU' ? 'bg-purple-100 text-purple-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {flavor.type}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className={`inline-flex px-2 py-1 text-xs rounded ${
                              flavor.labels.pricing === 'spot' ? 'bg-yellow-100 text-yellow-800' :
                              flavor.labels.pricing === 'preemptible' ? 'bg-orange-100 text-orange-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {flavor.labels.pricing}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="text-xs">
                              {Object.entries(flavor.availableCapacity).map(([resource, amount]) => (
                                <div key={resource} className={amount === 0 ? 'text-red-600' : 'text-green-600'}>
                                  {resource}: {String(amount)}
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
              <PaginationControls 
                pagination={resourceFlavorsPagination}
                setPagination={setResourceFlavorsPagination}
                totalPages={paginateData(filteredResourceFlavors, resourceFlavorsPagination).totalPages}
                totalItems={filteredResourceFlavors.length}
              />
            </div>

            {/* Cohorts */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Cohorts</h3>
                <p className="text-sm text-gray-600">Queue groups for quota sharing</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 font-medium text-gray-700">Name</th>
                      <th className="text-left p-3 font-medium text-gray-700">Queues</th>
                      <th className="text-left p-3 font-medium text-gray-700">Quota Usage</th>
                      <th className="text-left p-3 font-medium text-gray-700">Sharing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const paginatedCohorts = paginateData(filteredCohorts, cohortsPagination);
                      return paginatedCohorts.data.map((cohort: any, index: number) => (
                        <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                          <td className="p-3 text-blue-600 hover:underline cursor-pointer text-sm">{cohort.name}</td>
                          <td className="p-3">
                            <div className="flex flex-wrap gap-1">
                              {cohort.clusterQueues.map((queue: string, qIndex: number) => (
                                <span key={qIndex} className="inline-flex px-1 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
                                  {queue.split('-')[0]}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="text-xs">
                              <div className="flex items-center mb-1">
                                <div className="w-8 bg-gray-200 rounded-full h-1.5 mr-2">
                                  <div 
                                    className="bg-green-600 h-1.5 rounded-full" 
                                    style={{width: `${(cohort.usedQuota.cpu / cohort.totalQuota.cpu) * 100}%`}}
                                  ></div>
                                </div>
                                <span className="text-gray-600">CPU</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-8 bg-gray-200 rounded-full h-1.5 mr-2">
                                  <div 
                                    className="bg-blue-600 h-1.5 rounded-full" 
                                    style={{width: `${((cohort.usedQuota.gpu || 0) / (cohort.totalQuota.gpu || 1)) * 100}%`}}
                                  ></div>
                                </div>
                                <span className="text-gray-600">GPU</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="text-xs">
                              <div className="text-orange-600">↑{cohort.borrowedQuota.cpu}</div>
                              <div className="text-blue-600">↓{cohort.lentQuota.cpu}</div>
                            </div>
                          </td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
              <PaginationControls 
                pagination={cohortsPagination}
                setPagination={setCohortsPagination}
                totalPages={paginateData(filteredCohorts, cohortsPagination).totalPages}
                totalItems={filteredCohorts.length}
              />
            </div>
          </div>
        </>
      ) : workloadsTab === 'trainer' ? (
        <>
          {/* Namespace Scope Indicator */}
          {selectedProject && selectedProject !== 'All Projects' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-green-700">
                <strong>Namespace Scope:</strong> Showing TrainJobs and namespace-scoped TrainingRuntimes for "{selectedProject}" namespace. 
                ClusterTrainingRuntimes remain visible as they are cluster-wide resources.
              </p>
            </div>
          )}
          
          {/* Kubeflow Trainer v2 Metrics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Active TrainJobs */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-blue-600">{filteredTrainJobs.length}</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Active TrainJobs</h3>
              <p className="text-sm text-gray-600">Running training jobs</p>
            </div>

            {/* JobSets Created */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Server className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-2xl font-bold text-green-600">{filteredTrainJobs.length}</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">JobSets</h3>
              <p className="text-sm text-gray-600">Distributed job groups</p>
            </div>

            {/* Training Pods */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-2xl font-bold text-purple-600">48</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Training Pods</h3>
              <p className="text-sm text-gray-600">Worker + initializer pods</p>
            </div>

            {/* GPU Utilization */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-2xl font-bold text-orange-600">87%</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">GPU Utilization</h3>
              <p className="text-sm text-gray-600">Across training nodes</p>
            </div>
          </div>

          {/* Trainer v2 Architecture Flow */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Kubeflow Trainer v2 Resource Flow</h3>
            <div className="flex items-center justify-center space-x-4 overflow-x-auto">
              <div className="flex flex-col items-center min-w-0">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                  <Package className="w-8 h-8 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">TrainJob</span>
                <span className="text-xs text-gray-500">User Request</span>
              </div>
              
              <div className="flex items-center">
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </div>
              
              <div className="flex flex-col items-center min-w-0">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                  <Server className="w-8 h-8 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">TrainingRuntime</span>
                <span className="text-xs text-gray-500">Template/Blueprint</span>
              </div>
              
              <div className="flex items-center">
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </div>
              
              <div className="flex flex-col items-center min-w-0">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">JobSet</span>
                <span className="text-xs text-gray-500">Job Orchestrator</span>
              </div>
              
              <div className="flex items-center">
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </div>
              
              <div className="flex flex-col items-center min-w-0">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-2">
                  <Play className="w-8 h-8 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">Jobs</span>
                <span className="text-xs text-gray-500">Worker/Initializer</span>
              </div>
              
              <div className="flex items-center">
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </div>
              
              <div className="flex flex-col items-center min-w-0">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-2">
                  <Cpu className="w-8 h-8 text-red-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">Pods</span>
                <span className="text-xs text-gray-500">Execution Units</span>
              </div>
            </div>
          </div>

          {/* TrainJobs Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Active TrainJobs</h3>
                <p className="text-sm text-gray-600">Unified training job CRDs</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 font-medium text-gray-700">Name</th>
                      <th className="text-left p-3 font-medium text-gray-700">Runtime</th>
                      <th className="text-left p-3 font-medium text-gray-700">Nodes</th>
                      <th className="text-left p-3 font-medium text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const paginatedTrainJobs = paginateData(filteredTrainJobs, trainJobsPagination);
                      return paginatedTrainJobs.data.map((job, index) => (
                        <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                          <td className="p-3 text-blue-600 hover:underline cursor-pointer text-sm">{job.name}</td>
                          <td className="p-3">
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                              job.runtime.includes('torch') ? 'bg-orange-100 text-orange-800' :
                              job.runtime.includes('llm') ? 'bg-blue-100 text-blue-800' :
                              job.runtime.includes('tf') ? 'bg-purple-100 text-purple-800' :
                              job.runtime.includes('mpi') ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {job.runtime}
                            </span>
                          </td>
                          <td className="p-3 text-gray-700 text-sm">{job.nodes}</td>
                          <td className="p-3">
                            <div className="flex items-center">
                              {getStatusIcon(job.status)}
                              <span className="text-sm ml-2">{job.status}</span>
                            </div>
                          </td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
              <PaginationControls 
                pagination={trainJobsPagination}
                setPagination={setTrainJobsPagination}
                totalPages={paginateData(filteredTrainJobs, trainJobsPagination).totalPages}
                totalItems={filteredTrainJobs.length}
              />
            </div>

            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">JobSets & Resource Allocation</h3>
                <p className="text-sm text-gray-600">Kubernetes-native job orchestration</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-sm text-gray-700">Worker Jobs</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 mr-2">24</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: '80%'}}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-sm text-gray-700">Initializer Jobs</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 mr-2">8</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                      <span className="text-sm text-gray-700">MPI Jobs</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 mr-2">16</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{width: '75%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Training Runtimes & Cluster Training Runtimes - 2 Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* TrainingRuntimes (Namespace-scoped) */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">TrainingRuntimes</h3>
                <p className="text-sm text-gray-600">Namespace-scoped execution templates</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 font-medium text-gray-700">Name</th>
                      <th className="text-left p-3 font-medium text-gray-700">Namespace</th>
                      <th className="text-left p-3 font-medium text-gray-700">Framework</th>
                      <th className="text-left p-3 font-medium text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const namespacedRuntimes = filteredTrainingRuntimes.filter(runtime => runtime.type === 'TrainingRuntime');
                      const paginatedRuntimes = paginateData(namespacedRuntimes, trainingRuntimesPagination);
                      return paginatedRuntimes.data.map((runtime, index) => (
                        <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                          <td className="p-3 text-blue-600 hover:underline cursor-pointer text-sm">{runtime.name}</td>
                          <td className="p-3">
                            <span className="inline-flex px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                              {runtime.namespace || 'N/A'}
                            </span>
                          </td>
                          <td className="p-3 text-gray-700 text-sm">{runtime.framework}</td>
                          <td className="p-3">
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                              runtime.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {runtime.status}
                            </span>
                          </td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
              <PaginationControls 
                pagination={trainingRuntimesPagination}
                setPagination={setTrainingRuntimesPagination}
                totalPages={paginateData(filteredTrainingRuntimes.filter(runtime => runtime.type === 'TrainingRuntime'), trainingRuntimesPagination).totalPages}
                totalItems={filteredTrainingRuntimes.filter(runtime => runtime.type === 'TrainingRuntime').length}
              />
            </div>

            {/* ClusterTrainingRuntimes (Cluster-wide) */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">ClusterTrainingRuntimes</h3>
                <p className="text-sm text-gray-600">Cluster-wide execution templates</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 font-medium text-gray-700">Name</th>
                      <th className="text-left p-3 font-medium text-gray-700">Framework</th>
                      <th className="text-left p-3 font-medium text-gray-700">Gang Scheduling</th>
                      <th className="text-left p-3 font-medium text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const clusterRuntimes = TRAINING_RUNTIMES.filter(runtime => runtime.type === 'ClusterTrainingRuntime');
                      const paginatedClusterRuntimes = paginateData(clusterRuntimes, clusterTrainingRuntimesPagination);
                      return paginatedClusterRuntimes.data.map((runtime, index) => (
                        <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                          <td className="p-3 text-blue-600 hover:underline cursor-pointer text-sm">{runtime.name}</td>
                          <td className="p-3 text-gray-700 text-sm">{runtime.framework}</td>
                          <td className="p-3">
                            {runtime.gangScheduling ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <XCircle className="w-4 h-4 text-gray-400" />
                            )}
                          </td>
                          <td className="p-3">
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                              runtime.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {runtime.status}
                            </span>
                          </td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
              <PaginationControls 
                pagination={clusterTrainingRuntimesPagination}
                setPagination={setClusterTrainingRuntimesPagination}
                totalPages={paginateData(TRAINING_RUNTIMES.filter(runtime => runtime.type === 'ClusterTrainingRuntime'), clusterTrainingRuntimesPagination).totalPages}
                totalItems={TRAINING_RUNTIMES.filter(runtime => runtime.type === 'ClusterTrainingRuntime').length}
              />
            </div>
          </div>

          {/* Pod Status & Resource Utilization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Pod Status Distribution</h3>
                <p className="text-sm text-gray-600">Training and initializer pods</p>
              </div>
              <div className="p-6">
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                    <circle 
                      cx="100" 
                      cy="100" 
                      r="80" 
                      fill="none" 
                      stroke="#3b82f6" 
                      strokeWidth="20"
                      strokeDasharray="314"
                      strokeDashoffset="78.5"
                      transform="rotate(-90 100 100)"
                    />
                    <circle 
                      cx="100" 
                      cy="100" 
                      r="80" 
                      fill="none" 
                      stroke="#10b981" 
                      strokeWidth="20"
                      strokeDasharray="157"
                      strokeDashoffset="0"
                      transform="rotate(180 100 100)"
                    />
                    <text x="100" y="90" textAnchor="middle" className="text-2xl font-bold fill-gray-900">48</text>
                    <text x="100" y="110" textAnchor="middle" className="text-sm fill-gray-600">Total Pods</text>
                  </svg>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span>Running: 36</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span>Completed: 8</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      <span>Pending: 3</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span>Failed: 1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Resource Utilization</h3>
                <p className="text-sm text-gray-600">Training workload efficiency</p>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>GPU Utilization</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full" style={{width: '87%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>CPU Utilization</span>
                      <span className="font-medium">72%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full" style={{width: '72%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Memory Utilization</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" style={{width: '68%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Network I/O</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full" style={{width: '45%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fault Tolerance & Gang Scheduling */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Fault Tolerance & Retries</h3>
                <p className="text-sm text-gray-600">Job resilience and recovery</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Successful Restarts</span>
                    <span className="text-sm font-medium text-green-600">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Failed Restarts</span>
                    <span className="text-sm font-medium text-red-600">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Max Retry Limit Reached</span>
                    <span className="text-sm font-medium text-orange-600">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Node Failure Recovery</span>
                    <span className="text-sm font-medium text-blue-600">5</span>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Recovery Success Rate</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Gang Scheduling Metrics</h3>
                <p className="text-sm text-gray-600">Coordinated pod scheduling</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Gang-Scheduled Jobs</span>
                    <span className="text-sm font-medium text-blue-600">8/8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Avg. Scheduling Time</span>
                    <span className="text-sm font-medium text-green-600">2.3s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Scheduling Failures</span>
                    <span className="text-sm font-medium text-red-600">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Resource Conflicts</span>
                    <span className="text-sm font-medium text-orange-600">1</span>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Scheduling Efficiency</span>
                      <span className="font-medium">96%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '96%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default DistributedWorkloadsView;
