import React, { useState } from 'react';
import { Package, Layers, Cpu, ChevronDown, ChevronRight, HelpCircle, User, Play, Terminal, Server, FileText, Box, Clock, Info, HardDrive, MoreVertical, Pause, Square, Trash2 } from 'lucide-react';
import { getStatusIcon, filterByNamespace } from '../../../utils/helpers';
import { PYTORCH_JOBS, TRAIN_JOBS_HIERARCHICAL, PytorchJob, TrainJobHierarchical, Pod, PROJECTS } from '../../../utils/constants';

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

interface LogsModalProps {
  isOpen: boolean;
  onClose: () => void;
  podName: string;
  logs: string;
}

const LogsModal: React.FC<LogsModalProps> = ({ isOpen, onClose, podName, logs }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-4/5 h-4/5 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold flex items-center">
            <Terminal className="w-5 h-5 mr-2" />
            Pod Logs: {podName}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>
        <div className="flex-1 p-4 overflow-auto">
          <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm font-mono whitespace-pre-wrap">
            {logs}
          </pre>
        </div>
      </div>
    </div>
  );
};

// Action Dropdown Component
interface ActionDropdownProps {
  jobName: string;
  jobStatus: string;
  isOpen: boolean;
  onToggle: () => void;
  onAction: (action: 'suspend' | 'resume' | 'delete') => void;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({ jobName, jobStatus, isOpen, onToggle, onAction }) => {
  const canSuspend = jobStatus === 'Running' || jobStatus === 'Pending';
  const canResume = jobStatus === 'Suspended';

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="p-1 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700"
        title="Job Actions"
      >
        <MoreVertical className="w-4 h-4" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <div className="py-1">
            {canSuspend && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAction('suspend');
                }}
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
              >
                <Pause className="w-3 h-3 mr-2" />
                Suspend
              </button>
            )}
            {canResume && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAction('resume');
                }}
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
              >
                <Play className="w-3 h-3 mr-2" />
                Resume
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAction('delete');
              }}
              className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center"
            >
              <Trash2 className="w-3 h-3 mr-2" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

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

  
  // State for training tabs
  const [activeTrainingTab, setActiveTrainingTab] = useState<'pytorch' | 'trainjobs'>('pytorch');
  
  // State for hierarchical view expansion
  const [expandedPytorchJobs, setExpandedPytorchJobs] = useState<Set<string>>(new Set());
  const [expandedTrainJobs, setExpandedTrainJobs] = useState<Set<string>>(new Set());
  const [expandedJobSets, setExpandedJobSets] = useState<Set<string>>(new Set());
  const [expandedJobs, setExpandedJobs] = useState<Set<string>>(new Set());
  
  // State for metadata visibility
  const [showPytorchJobMetadata, setShowPytorchJobMetadata] = useState<Set<string>>(new Set());
  const [showTrainJobMetadata, setShowTrainJobMetadata] = useState<Set<string>>(new Set());
  const [showJobSetMetadata, setShowJobSetMetadata] = useState<Set<string>>(new Set());
  const [showJobMetadata, setShowJobMetadata] = useState<Set<string>>(new Set());
  const [showPodMetadata, setShowPodMetadata] = useState<Set<string>>(new Set());
  
  // State for logs modal
  const [logsModal, setLogsModal] = useState<{isOpen: boolean, podName: string, logs: string}>({
    isOpen: false,
    podName: '',
    logs: ''
  });

  // State for action dropdowns
  const [openActionDropdown, setOpenActionDropdown] = useState<string | null>(null);



  const showPodLogs = (podName: string, logs: string) => {
    setLogsModal({
      isOpen: true,
      podName,
      logs
    });
  };

  const closeLogs = () => {
    setLogsModal({
      isOpen: false,
      podName: '',
      logs: ''
    });
  };

  // Action handlers
  const handleJobAction = (jobName: string, action: 'suspend' | 'resume' | 'delete') => {
    console.log(`${action} job: ${jobName}`);
    // TODO: Implement actual API calls for job actions
    setOpenActionDropdown(null);
  };

  const toggleActionDropdown = (jobName: string) => {
    setOpenActionDropdown(openActionDropdown === jobName ? null : jobName);
  };

  // Toggle functions for hierarchical view
  const togglePytorchJobExpansion = (jobName: string) => {
    const newExpanded = new Set(expandedPytorchJobs);
    if (newExpanded.has(jobName)) {
      newExpanded.delete(jobName);
    } else {
      newExpanded.add(jobName);
    }
    setExpandedPytorchJobs(newExpanded);
  };

  const toggleTrainJobExpansion = (jobName: string) => {
    const newExpanded = new Set(expandedTrainJobs);
    if (newExpanded.has(jobName)) {
      newExpanded.delete(jobName);
    } else {
      newExpanded.add(jobName);
    }
    setExpandedTrainJobs(newExpanded);
  };

  const toggleJobSetExpansion = (jobSetName: string) => {
    const newExpanded = new Set(expandedJobSets);
    if (newExpanded.has(jobSetName)) {
      newExpanded.delete(jobSetName);
    } else {
      newExpanded.add(jobSetName);
    }
    setExpandedJobSets(newExpanded);
  };

  const toggleJobExpansion = (jobName: string) => {
    const newExpanded = new Set(expandedJobs);
    if (newExpanded.has(jobName)) {
      newExpanded.delete(jobName);
    } else {
      newExpanded.add(jobName);
    }
    setExpandedJobs(newExpanded);
  };

  // Toggle functions for metadata visibility
  const togglePytorchJobMetadata = (jobName: string) => {
    const newSet = new Set(showPytorchJobMetadata);
    if (newSet.has(jobName)) {
      newSet.delete(jobName);
    } else {
      newSet.add(jobName);
    }
    setShowPytorchJobMetadata(newSet);
  };

  const toggleTrainJobMetadata = (jobName: string) => {
    const newSet = new Set(showTrainJobMetadata);
    if (newSet.has(jobName)) {
      newSet.delete(jobName);
    } else {
      newSet.add(jobName);
    }
    setShowTrainJobMetadata(newSet);
  };

  const toggleJobSetMetadata = (jobSetName: string) => {
    const newSet = new Set(showJobSetMetadata);
    if (newSet.has(jobSetName)) {
      newSet.delete(jobSetName);
    } else {
      newSet.add(jobSetName);
    }
    setShowJobSetMetadata(newSet);
  };

  const toggleJobMetadata = (jobName: string) => {
    const newSet = new Set(showJobMetadata);
    if (newSet.has(jobName)) {
      newSet.delete(jobName);
    } else {
      newSet.add(jobName);
    }
    setShowJobMetadata(newSet);
  };

  const togglePodMetadata = (podName: string) => {
    const newSet = new Set(showPodMetadata);
    if (newSet.has(podName)) {
      newSet.delete(podName);
    } else {
      newSet.add(podName);
    }
    setShowPodMetadata(newSet);
  };

  // Reset expansion and metadata states when namespace or tab changes
  React.useEffect(() => {
    setExpandedPytorchJobs(new Set());
    setExpandedTrainJobs(new Set());
    setExpandedJobSets(new Set());
    setExpandedJobs(new Set());
    setShowPytorchJobMetadata(new Set());
    setShowTrainJobMetadata(new Set());
    setShowJobSetMetadata(new Set());
    setShowJobMetadata(new Set());
    setShowPodMetadata(new Set());
    setOpenActionDropdown(null);
  }, [selectedProject, activeTrainingTab]);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setOpenActionDropdown(null);
    };

    if (openActionDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openActionDropdown]);

  // Metadata card components
  const PytorchJobMetadata: React.FC<{job: PytorchJob}> = ({ job }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-6">
      {/* Header with Job Type */}
      <div className="flex items-center space-x-2 pb-3 border-b border-gray-100">
        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
          <HelpCircle className="w-4 h-4 text-orange-600" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">PyTorch Training Job</h4>
          <p className="text-xs text-gray-500">Distributed machine learning workload</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information Card */}
        <div className="bg-blue-50 rounded-lg p-4 space-y-3">
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-blue-600" />
            <h5 className="font-medium text-blue-900">Basic Information</h5>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-700">Namespace</span>
              <span className="text-sm font-medium text-blue-900 bg-blue-100 px-2 py-1 rounded">{job.namespace}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-700">Framework</span>
              <span className="text-sm font-medium text-blue-900">{job.framework}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-700">Created</span>
              <span className="text-sm font-medium text-blue-900">{new Date(job.created).toLocaleDateString()}</span>
            </div>
            {job.duration && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-700">Duration</span>
                <span className="text-sm font-medium text-blue-900 bg-blue-100 px-2 py-1 rounded">{job.duration}</span>
              </div>
            )}
          </div>
        </div>

        {/* Resources Card */}
        <div className="bg-green-50 rounded-lg p-4 space-y-3">
          <div className="flex items-center space-x-2">
            <HardDrive className="w-4 h-4 text-green-600" />
            <h5 className="font-medium text-green-900">Resource Allocation</h5>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-700">CPU</span>
              <span className="text-sm font-medium text-green-900">{job.resources.requests.cpu} → {job.resources.limits.cpu}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-700">Memory</span>
              <span className="text-sm font-medium text-green-900">{job.resources.requests.memory} → {job.resources.limits.memory}</span>
            </div>
            {job.resources.requests['nvidia.com/gpu'] && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-700">GPU</span>
                <span className="text-sm font-medium text-green-900 bg-green-100 px-2 py-1 rounded">{job.resources.requests['nvidia.com/gpu']}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-700">Replicas</span>
              <div className="flex space-x-1">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{job.replicaSpecs.Master.replicas} Master</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{job.replicaSpecs.Worker.replicas} Worker</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Conditions */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-purple-600" />
          <h5 className="font-medium text-gray-900">Recent Status Updates</h5>
        </div>
        <div className="space-y-2">
          {job.conditions.slice(0, 2).map((condition, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getStatusIcon(condition.status === 'True' ? condition.type : 'Unknown')}
                <div>
                  <span className="text-sm font-medium text-purple-900">{condition.type}</span>
                  <p className="text-xs text-purple-700 mt-1">{condition.message}</p>
                </div>
              </div>
              <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">
                {new Date(condition.lastTransitionTime).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const TrainJobMetadata: React.FC<{job: TrainJobHierarchical}> = ({ job }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-6">
      {/* Header with Job Type */}
      <div className="flex items-center space-x-2 pb-3 border-b border-gray-100">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
          <FileText className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">Kubeflow Trainer v2 Job</h4>
          <p className="text-xs text-gray-500">Unified ML training workload</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information Card */}
        <div className="bg-indigo-50 rounded-lg p-4 space-y-3">
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-indigo-600" />
            <h5 className="font-medium text-indigo-900">Basic Information</h5>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-indigo-700">Namespace</span>
              <span className="text-sm font-medium text-indigo-900 bg-indigo-100 px-2 py-1 rounded">{job.namespace}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-indigo-700">Framework</span>
              <span className="text-sm font-medium text-indigo-900">{job.framework}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-indigo-700">Nodes</span>
              <span className="text-sm font-medium text-indigo-900 bg-indigo-100 px-2 py-1 rounded">{job.nodes}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-indigo-700">Created</span>
              <span className="text-sm font-medium text-indigo-900">{new Date(job.created).toLocaleDateString()}</span>
            </div>
            {job.duration && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-indigo-700">Duration</span>
                <span className="text-sm font-medium text-indigo-900 bg-indigo-100 px-2 py-1 rounded">{job.duration}</span>
              </div>
            )}
          </div>
        </div>

        {/* Runtime & Resources Card */}
        <div className="bg-emerald-50 rounded-lg p-4 space-y-3">
          <div className="flex items-center space-x-2">
            <Server className="w-4 h-4 text-emerald-600" />
            <h5 className="font-medium text-emerald-900">Runtime & Resources</h5>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-emerald-700">Runtime</span>
              <span className="text-sm font-medium text-emerald-900 bg-emerald-100 px-2 py-1 rounded">{job.trainingRuntimeRef.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-emerald-700">Kind</span>
              <span className="text-sm font-medium text-emerald-900">{job.trainingRuntimeRef.kind}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-emerald-700">CPU</span>
              <span className="text-sm font-medium text-emerald-900">{job.resources.requests.cpu} → {job.resources.limits.cpu}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-emerald-700">Memory</span>
              <span className="text-sm font-medium text-emerald-900">{job.resources.requests.memory} → {job.resources.limits.memory}</span>
            </div>
            {job.resources.requests['nvidia.com/gpu'] && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-emerald-700">GPU</span>
                <span className="text-sm font-medium text-emerald-900 bg-emerald-100 px-2 py-1 rounded">{job.resources.requests['nvidia.com/gpu']}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Conditions */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-amber-600" />
          <h5 className="font-medium text-gray-900">Recent Status Updates</h5>
        </div>
        <div className="space-y-2">
          {job.conditions.slice(0, 2).map((condition, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getStatusIcon(condition.status === 'True' ? condition.type : 'Unknown')}
                <div>
                  <span className="text-sm font-medium text-amber-900">{condition.type}</span>
                  <p className="text-xs text-amber-700 mt-1">{condition.message}</p>
                </div>
              </div>
              <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded">
                {new Date(condition.lastTransitionTime).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PodMetadata: React.FC<{pod: Pod}> = ({ pod }) => (
    <div className="bg-slate-50 rounded-lg p-3 space-y-3">
      <div className="flex items-center space-x-2 pb-2 border-b border-slate-200">
        <div className="w-6 h-6 bg-slate-200 rounded flex items-center justify-center">
          <Box className="w-3 h-3 text-slate-600" />
        </div>
        <h6 className="font-medium text-slate-900 text-sm">Pod Details</h6>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-600">Node</span>
            <span className="text-xs font-medium text-slate-800 bg-slate-200 px-2 py-1 rounded">{pod.node}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-600">Restarts</span>
            <span className={`text-xs font-medium px-2 py-1 rounded ${
              pod.restarts === 0 
                ? 'text-green-800 bg-green-100' 
                : 'text-orange-800 bg-orange-100'
            }`}>
              {pod.restarts}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-600">Created</span>
            <span className="text-xs font-medium text-slate-800">{new Date(pod.created).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-600">Logs</span>
            <span className={`text-xs font-medium px-2 py-1 rounded ${
              pod.logs 
                ? 'text-blue-800 bg-blue-100' 
                : 'text-gray-800 bg-gray-100'
            }`}>
              {pod.logs ? 'Available' : 'None'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );


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
      <>
        <LogsModal 
          isOpen={logsModal.isOpen}
          onClose={closeLogs}
          podName={logsModal.podName}
          logs={logsModal.logs}
        />
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Cpu className="w-6 h-6 text-blue-600 mr-3" />
            <h1 className="text-2xl font-semibold text-gray-900">Model training</h1>
          </div>
          
          <p className="text-gray-600 mb-6">
            Select a project to view its PyTorch training jobs. Monitor training progress and manage distributed training workloads across your data science projects.
          </p>

          {/* Project Selector - ODH Style */}
          <div className="flex items-center mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">📁 Project</span>
              <select 
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm bg-white hover:border-gray-400 focus:border-blue-500 focus:outline-none"
              >
                <option value="All Projects">All Projects</option>
                {PROJECTS.map(project => (
                  <option key={project.name} value={project.name}>{project.name}</option>
                ))}
              </select>
              <span className="text-blue-600 cursor-pointer hover:underline text-sm flex items-center">
                Go to 🔗 {selectedProject === 'All Projects' ? 'All Projects' : selectedProject}
              </span>
            </div>
          </div>





          {/* Training Job Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTrainingTab('pytorch')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTrainingTab === 'pytorch'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  PyTorchJobs ({filterByNamespace(PYTORCH_JOBS, selectedProject).length})
                </button>
                <button
                  onClick={() => setActiveTrainingTab('trainjobs')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTrainingTab === 'trainjobs'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  TrainJobs ({filterByNamespace(TRAIN_JOBS_HIERARCHICAL, selectedProject).length})
                </button>
              </nav>
            </div>
          </div>

          {/* PyTorchJobs Tab Content */}
          {activeTrainingTab === 'pytorch' && (
            <div className="bg-white rounded-lg border border-gray-200">
              {filterByNamespace(PYTORCH_JOBS, selectedProject).length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Server className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No PyTorchJobs found in this namespace.</p>
                </div>
              ) : (
                filterByNamespace(PYTORCH_JOBS, selectedProject).map((job, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg mb-3 bg-white">
                    {/* Main Job Header */}
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1">
                          <HelpCircle className="w-5 h-5 text-gray-400 mr-3" />
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-semibold text-gray-900">{job.name}</h3>
                              <div className="flex items-center">
                                {getStatusIcon(job.status)}
                                <span className="ml-1 text-sm font-medium">{job.status}</span>
                              </div>
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              PyTorch training job • {job.project} • {job.workerNodes} nodes
                              {job.duration && ` • ${job.duration}`}
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2 ml-4">
                          <ActionDropdown
                            jobName={job.name}
                            jobStatus={job.status}
                            isOpen={openActionDropdown === job.name}
                            onToggle={() => toggleActionDropdown(job.name)}
                            onAction={(action) => handleJobAction(job.name, action)}
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              togglePytorchJobMetadata(job.name);
                            }}
                            className={`px-3 py-1 text-xs rounded-md border ${
                              showPytorchJobMetadata.has(job.name) 
                                ? 'bg-blue-50 text-blue-700 border-blue-200' 
                                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <Info className="w-3 h-3 mr-1 inline" />
                            Metadata
                          </button>
                          <button
                            onClick={() => togglePytorchJobExpansion(job.name)}
                            className="px-3 py-1 text-xs rounded-md border bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                          >
                            {expandedPytorchJobs.has(job.name) ? (
                              <>
                                <ChevronDown className="w-3 h-3 mr-1 inline" />
                                Hide Pods
                              </>
                            ) : (
                              <>
                                <ChevronRight className="w-3 h-3 mr-1 inline" />
                                Show Pods ({job.pods.length})
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Metadata Section */}
                    {showPytorchJobMetadata.has(job.name) && (
                      <div className="border-t border-gray-100 bg-gray-50 p-4">
                        <PytorchJobMetadata job={job} />
                      </div>
                    )}
                    
                    {/* Pods Section */}
                    {expandedPytorchJobs.has(job.name) && (
                      <div className="border-t border-gray-100 bg-gray-50">
                        <div className="p-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                            <Box className="w-4 h-4 mr-2" />
                            Pods ({job.pods.length})
                          </h4>
                          <div className="space-y-2">
                            {job.pods.map((pod, podIndex) => (
                              <div key={podIndex} className="bg-white border border-gray-200 rounded-lg">
                                <div className="p-3">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                      <div className="flex items-center">
                                        {getStatusIcon(pod.status)}
                                        <span className="ml-2 font-medium text-sm">{pod.name}</span>
                                      </div>
                                      <span className="text-xs text-gray-500">
                                        {pod.node} • {pod.restarts} restarts
                                      </span>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          togglePodMetadata(pod.name);
                                        }}
                                        className={`px-2 py-1 text-xs rounded border ${
                                          showPodMetadata.has(pod.name) 
                                            ? 'bg-blue-50 text-blue-700 border-blue-200' 
                                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                                        }`}
                                      >
                                        <Info className="w-3 h-3 mr-1 inline" />
                                        Details
                                      </button>
                                      {pod.logs && (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            showPodLogs(pod.name, pod.logs || '');
                                          }}
                                          className="px-2 py-1 text-xs rounded border bg-white text-blue-600 border-blue-300 hover:bg-blue-50"
                                        >
                                          <Terminal className="w-3 h-3 mr-1 inline" />
                                          Logs
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                
                                {showPodMetadata.has(pod.name) && (
                                  <div className="border-t border-gray-100 bg-gray-50 p-3">
                                    <PodMetadata pod={pod} />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* TrainJobs Tab Content */}
          {activeTrainingTab === 'trainjobs' && (
            <div className="bg-white rounded-lg border border-gray-200">
              {filterByNamespace(TRAIN_JOBS_HIERARCHICAL, selectedProject).length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Layers className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No TrainJobs found in this namespace.</p>
                </div>
              ) : (
                filterByNamespace(TRAIN_JOBS_HIERARCHICAL, selectedProject).map((trainJob, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg mb-3 bg-white">
                    {/* Main TrainJob Header */}
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1">
                          <FileText className="w-5 h-5 text-blue-500 mr-3" />
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-semibold text-gray-900">{trainJob.name}</h3>
                              <div className="flex items-center">
                                {getStatusIcon(trainJob.status)}
                                <span className="ml-1 text-sm font-medium">{trainJob.status}</span>
                              </div>
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              Kubeflow Trainer v2 • {trainJob.project} • {trainJob.nodes} nodes
                              {trainJob.duration && ` • ${trainJob.duration}`}
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2 ml-4">
                          <ActionDropdown
                            jobName={trainJob.name}
                            jobStatus={trainJob.status}
                            isOpen={openActionDropdown === trainJob.name}
                            onToggle={() => toggleActionDropdown(trainJob.name)}
                            onAction={(action) => handleJobAction(trainJob.name, action)}
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTrainJobMetadata(trainJob.name);
                            }}
                            className={`px-3 py-1 text-xs rounded-md border ${
                              showTrainJobMetadata.has(trainJob.name) 
                                ? 'bg-blue-50 text-blue-700 border-blue-200' 
                                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <Info className="w-3 h-3 mr-1 inline" />
                            Metadata
                          </button>
                          <button
                            onClick={() => toggleTrainJobExpansion(trainJob.name)}
                            className="px-3 py-1 text-xs rounded-md border bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                          >
                            {expandedTrainJobs.has(trainJob.name) ? (
                              <>
                                <ChevronDown className="w-3 h-3 mr-1 inline" />
                                Hide JobSets
                              </>
                            ) : (
                              <>
                                <ChevronRight className="w-3 h-3 mr-1 inline" />
                                Show JobSets ({trainJob.jobsets.length})
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Metadata Section */}
                    {showTrainJobMetadata.has(trainJob.name) && (
                      <div className="border-t border-gray-100 bg-gray-50 p-4">
                        <TrainJobMetadata job={trainJob} />
                      </div>
                    )}
                    
                    {/* JobSets Section */}
                    {expandedTrainJobs.has(trainJob.name) && (
                      <div className="pl-8 pb-4 bg-gray-50">
                        <div className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                          <Server className="w-4 h-4 mr-1" />
                          JobSets ({trainJob.jobsets.length})
                        </div>
                        {trainJob.jobsets.map((jobset, jobsetIndex) => (
                          <div key={jobsetIndex} className="ml-4 mb-4">
                            <div 
                              className="p-3 bg-white rounded cursor-pointer flex items-center justify-between border"
                              onClick={() => toggleJobSetExpansion(jobset.name)}
                            >
                              <div className="flex items-center">
                                {expandedJobSets.has(jobset.name) ? 
                                  <ChevronDown className="w-3 h-3 mr-2" /> : 
                                  <ChevronRight className="w-3 h-3 mr-2" />
                                }
                                <div>
                                  <div className="font-medium text-sm">{jobset.name}</div>
                                  <div className="text-xs text-gray-500">
                                    {jobset.jobs} jobs • Created: {new Date(jobset.created).toLocaleString()}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center">
                                {getStatusIcon(jobset.status)}
                                <span className="ml-1 text-xs">{jobset.status}</span>
                              </div>
                            </div>
                            
                            {expandedJobSets.has(jobset.name) && (
                              <div className="ml-6 mt-2">
                                <div className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                                  <Box className="w-3 h-3 mr-1" />
                                  Jobs ({jobset.jobs_list.length})
                                </div>
                                {jobset.jobs_list.map((job, jobIndex) => (
                                  <div key={jobIndex} className="ml-2 mb-2">
                                    <div 
                                      className="p-2 bg-gray-50 border rounded cursor-pointer flex items-center justify-between"
                                      onClick={() => toggleJobExpansion(job.name)}
                                    >
                                      <div className="flex items-center">
                                        {expandedJobs.has(job.name) ? 
                                          <ChevronDown className="w-3 h-3 mr-2" /> : 
                                          <ChevronRight className="w-3 h-3 mr-2" />
                                        }
                                        <div>
                                          <div className="font-medium text-xs">{job.name}</div>
                                          <div className="text-xs text-gray-500">
                                            {job.completions} • Duration: {job.duration}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex items-center">
                                        {getStatusIcon(job.status)}
                                        <span className="ml-1 text-xs">{job.status}</span>
                                      </div>
                                    </div>
                                    
                                    {expandedJobs.has(job.name) && (
                                      <div className="ml-6 mt-1">
                                        <div className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                                          <Box className="w-3 h-3 mr-1" />
                                          Pods ({job.pods.length})
                                        </div>
                                        {job.pods.map((pod, podIndex) => (
                                          <div key={podIndex} className="ml-2 p-2 bg-white rounded mb-1 flex items-center justify-between text-xs border">
                                            <div>
                                              <div className="font-medium">{pod.name}</div>
                                              <div className="text-gray-500">
                                                Node: {pod.node} • Restarts: {pod.restarts} • Created: {new Date(pod.created).toLocaleString()}
                                              </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  togglePodMetadata(pod.name);
                                                }}
                                                className={`text-xs px-1 py-1 rounded ${
                                                  showPodMetadata.has(pod.name) 
                                                    ? 'bg-blue-100 text-blue-700' 
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                              >
                                                <Info className="w-3 h-3 mr-1 inline" />
                                                Details
                                              </button>
                                              <div className="flex items-center">
                                                {getStatusIcon(pod.status)}
                                                <span className="ml-1">{pod.status}</span>
                                              </div>
                                              {pod.logs && (
                                                <button
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    showPodLogs(pod.name, pod.logs || '');
                                                  }}
                                                  className="text-blue-600 hover:underline flex items-center"
                                                >
                                                  <Terminal className="w-3 h-3 mr-1" />
                                                  Logs
                                                </button>
                                              )}
                                            </div>
                                            {showPodMetadata.has(pod.name) && (
                                              <PodMetadata pod={pod} />
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </>
    );
  }

  return null;
};

export default ModelsView;
