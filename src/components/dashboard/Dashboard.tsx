import { useState } from 'react';
import { ChevronDown, ChevronRight, Grid, Bell, HelpCircle, Sun, User, Home, Database, Cpu, GitBranch, Zap, BarChart3, Settings, RefreshCw, Play, CheckCircle, XCircle, AlertCircle, Clock, Package, Layers, Activity, TrendingUp, Sliders, Monitor, Server, HardDrive, Network, Users, Image, Gauge } from 'lucide-react';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('projects');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    models: false,
    pipelines: false,
    experimentation: false,
    applications: false,
    settings: false
  });
  const [selectedProject, setSelectedProject] = useState('ml-workload-queue');
  const [workloadsTab, setWorkloadsTab] = useState('status');
  const [showJobActions, setShowJobActions] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const projects = [
    {
      name: 'textual-analysis',
      created: '08/08/2025, 10:54:02',
      owner: 'user-001'
    },
    {
      name: 'dedicated-admin',
      created: '04/08/2025, 16:16:47',
      owner: 'Unknown'
    },
    {
      name: 'ml-workload-queue',
      created: '21/08/2025, 12:52:00',
      owner: 'Unknown'
    },
    {
      name: 'data-processing',
      created: '29/08/2025, 14:30:19',
      owner: 'user-002'
    },
    {
      name: 'istio-system',
      created: '04/08/2025, 18:10:45',
      owner: 'Unknown'
    }
  ];

  const trainingJobs = [
    {
      name: 'pytorch-multi-node-job',
      project: 'ml-workload-queue',
      workerNodes: 1,
      clusterQueue: 'test-cq',
      created: '1 day ago',
      status: 'Created'
    }
  ];

  const workloads = [
    {
      name: 'pytorchjob-pytorch-multi-node-job-45b59',
      priority: 0,
      status: 'Evicted',
      created: '01/09/2025, 14:50:34',
      message: 'Exceeded the PodsReady timeout ml-workload-queue/pytorchjob-pytorch-multi-node-job-45b59'
    },
    {
      name: 'trainjob-test-trainjob-29dd8',
      priority: 0,
      status: 'Succeeded',
      created: '01/09/2025, 14:42:10',
      message: 'jobset completed successfully'
    }
  ];

  const models = [
    {
      name: 'fraud-detection-model',
      version: '1.2.0',
      framework: 'TensorFlow',
      created: '29/08/2025, 10:30:00',
      author: 'user-001',
      status: 'Active'
    },
    {
      name: 'sentiment-analysis-bert',
      version: '2.1.0',
      framework: 'PyTorch',
      created: '25/08/2025, 14:15:30',
      author: 'user-002',
      status: 'Active'
    },
    {
      name: 'recommendation-engine',
      version: '1.0.3',
      framework: 'Scikit-learn',
      created: '20/08/2025, 09:45:12',
      author: 'user-001',
      status: 'Deprecated'
    }
  ];

  const deployments = [
    {
      name: 'fraud-detection-api',
      model: 'fraud-detection-model',
      version: '1.2.0',
      status: 'Running',
      replicas: '3/3',
      created: '30/08/2025, 11:20:00',
      endpoint: 'https://fraud-api.example.com'
    },
    {
      name: 'sentiment-service',
      model: 'sentiment-analysis-bert',
      version: '2.1.0',
      status: 'Pending',
      replicas: '0/2',
      created: '01/09/2025, 16:30:00',
      endpoint: 'Pending'
    }
  ];

  const pipelines = [
    {
      name: 'data-preprocessing-pipeline',
      description: 'ETL pipeline for customer data preprocessing',
      created: '28/08/2025, 13:45:00',
      lastRun: '01/09/2025, 08:30:00',
      status: 'Succeeded',
      runs: 47
    },
    {
      name: 'model-training-pipeline',
      description: 'Automated model training and validation pipeline',
      created: '25/08/2025, 10:15:00',
      lastRun: '01/09/2025, 06:00:00',
      status: 'Running',
      runs: 23
    },
    {
      name: 'batch-inference-pipeline',
      description: 'Daily batch inference for recommendation system',
      created: '22/08/2025, 16:20:00',
      lastRun: '31/08/2025, 23:45:00',
      status: 'Failed',
      runs: 15
    }
  ];

  const pipelineRuns = [
    {
      name: 'data-preprocessing-pipeline-run-1234',
      pipeline: 'data-preprocessing-pipeline',
      started: '01/09/2025, 08:30:00',
      duration: '12m 34s',
      status: 'Succeeded',
      triggeredBy: 'Schedule'
    },
    {
      name: 'model-training-pipeline-run-5678',
      pipeline: 'model-training-pipeline',
      started: '01/09/2025, 06:00:00',
      duration: '2h 15m',
      status: 'Running',
      triggeredBy: 'Manual'
    },
    {
      name: 'batch-inference-pipeline-run-9012',
      pipeline: 'batch-inference-pipeline',
      started: '31/08/2025, 23:45:00',
      duration: '5m 12s',
      status: 'Failed',
      triggeredBy: 'Schedule'
    }
  ];

  const experiments = [
    {
      name: 'hyperparameter-tuning-v1',
      created: '29/08/2025, 14:20:00',
      status: 'Completed',
      runs: 25,
      bestAccuracy: '94.2%',
      author: 'user-001'
    },
    {
      name: 'feature-selection-experiment',
      created: '27/08/2025, 09:30:00',
      status: 'Running',
      runs: 12,
      bestAccuracy: '91.8%',
      author: 'user-002'
    },
    {
      name: 'model-architecture-comparison',
      created: '24/08/2025, 16:45:00',
      status: 'Failed',
      runs: 8,
      bestAccuracy: '87.5%',
      author: 'user-001'
    }
  ];

  const applications = [
    {
      name: 'JupyterHub',
      description: 'Multi-user Jupyter notebook environment',
      status: 'Enabled',
      version: '3.0.0',
      category: 'Notebooks'
    },
    {
      name: 'MLflow',
      description: 'Machine learning lifecycle management',
      status: 'Enabled',
      version: '2.5.0',
      category: 'ML Ops'
    },
    {
      name: 'Apache Airflow',
      description: 'Workflow orchestration platform',
      status: 'Disabled',
      version: '2.7.0',
      category: 'Orchestration'
    },
    {
      name: 'Kubeflow Pipelines',
      description: 'Machine learning pipelines on Kubernetes',
      status: 'Enabled',
      version: '1.8.0',
      category: 'Pipelines'
    }
  ];

  const availableApps = [
    {
      name: 'TensorBoard',
      description: 'Visualization toolkit for TensorFlow',
      category: 'Visualization',
      provider: 'Google',
      rating: 4.8
    },
    {
      name: 'Grafana',
      description: 'Monitoring and observability platform',
      category: 'Monitoring',
      provider: 'Grafana Labs',
      rating: 4.7
    },
    {
      name: 'Apache Kafka',
      description: 'Distributed streaming platform',
      category: 'Streaming',
      provider: 'Apache',
      rating: 4.6
    },
    {
      name: 'Redis',
      description: 'In-memory data structure store',
      category: 'Database',
      provider: 'Redis Labs',
      rating: 4.9
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Created': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'Succeeded': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Evicted': return <XCircle className="w-4 h-4 text-gray-500" />;
      case 'Failed': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'Running': return <Play className="w-4 h-4 text-blue-500" />;
      case 'Pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'Active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Deprecated': return <XCircle className="w-4 h-4 text-gray-500" />;
      case 'Enabled': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Disabled': return <XCircle className="w-4 h-4 text-gray-500" />;
      default: return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const renderProjectCard = (project: any) => (
    <div key={project.name} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center mb-3">
        <div className="w-8 h-6 bg-orange-400 rounded-sm mr-3"></div>
        <h3 className="text-blue-600 font-medium hover:underline cursor-pointer">{project.name}</h3>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <div>
          <span className="font-medium">Created</span>
          <div>{project.created}</div>
        </div>
        <div>
          <span className="font-medium">Owner</span>
          <div>{project.owner}</div>
        </div>
      </div>
    </div>
  );

  const renderProjectsView = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-orange-400 rounded mr-3"></div>
          <h1 className="text-2xl font-semibold text-gray-900">Data Science Projects</h1>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Create project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {projects.map(renderProjectCard)}
      </div>

      <div className="text-sm text-gray-600 mb-8">
        5 of 11 projects · <span className="text-blue-600 underline cursor-pointer">Go to Data Science Projects</span>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Train, serve, monitor, and manage AI/ML models</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-8 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Database className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-medium text-gray-900">Organize your work with projects</h3>
          </div>
          <div className="text-center p-8 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Cpu className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900">Create and train models</h3>
          </div>
          <div className="text-center p-8 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-900">Manage models</h3>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <button className="flex items-center text-gray-700 hover:text-gray-900">
          <ChevronRight className="w-5 h-5 mr-2" />
          <span className="font-medium">Get oriented with learning resources</span>
        </button>
      </div>
    </div>
  );

  const renderModelTrainingView = () => (
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
              <Database className="w-4 h-4 text-gray-400 absolute left-2 top-1.5" />
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

  const renderDistributedWorkloadsView = () => (
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
      ) : (
        <>
          {/* Project Metrics View */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <HelpCircle className="w-5 h-5 text-gray-400 mr-2" />
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
                    <span>Requested by ml-workload-queue: 2</span>
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
                    <span>Requested by ml-workload-queue: 6</span>
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
      )}
    </div>
  );

  const renderModelRegistryView = () => (
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

  const renderModelDeploymentsView = () => (
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

  const renderPipelinesView = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <GitBranch className="w-6 h-6 text-blue-600 mr-3" />
          <h1 className="text-2xl font-semibold text-gray-900">Pipelines</h1>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Create pipeline
        </button>
      </div>
      
      <p className="text-gray-600 mb-6">
        Build and manage data science pipelines. Automate your ML workflows from data preprocessing to model deployment.
      </p>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-medium text-gray-700">Name</th>
                <th className="text-left p-3 font-medium text-gray-700">Description</th>
                <th className="text-left p-3 font-medium text-gray-700">Created</th>
                <th className="text-left p-3 font-medium text-gray-700">Last run</th>
                <th className="text-left p-3 font-medium text-gray-700">Status</th>
                <th className="text-left p-3 font-medium text-gray-700">Runs</th>
              </tr>
            </thead>
            <tbody>
              {pipelines.map((pipeline, index) => (
                <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="p-3">
                    <span className="text-blue-600 hover:underline cursor-pointer">{pipeline.name}</span>
                  </td>
                  <td className="p-3 text-gray-700">{pipeline.description}</td>
                  <td className="p-3 text-gray-700">{pipeline.created}</td>
                  <td className="p-3 text-gray-700">{pipeline.lastRun}</td>
                  <td className="p-3">
                    <div className="flex items-center">
                      {getStatusIcon(pipeline.status)}
                      <span className="ml-2">{pipeline.status}</span>
                    </div>
                  </td>
                  <td className="p-3 text-gray-700">{pipeline.runs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderRunsView = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Play className="w-6 h-6 text-blue-600 mr-3" />
          <h1 className="text-2xl font-semibold text-gray-900">Runs</h1>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Create run
        </button>
      </div>
      
      <p className="text-gray-600 mb-6">
        Monitor pipeline execution history. View run details, logs, and performance metrics.
      </p>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-medium text-gray-700">Run name</th>
                <th className="text-left p-3 font-medium text-gray-700">Pipeline</th>
                <th className="text-left p-3 font-medium text-gray-700">Started</th>
                <th className="text-left p-3 font-medium text-gray-700">Duration</th>
                <th className="text-left p-3 font-medium text-gray-700">Status</th>
                <th className="text-left p-3 font-medium text-gray-700">Triggered by</th>
              </tr>
            </thead>
            <tbody>
              {pipelineRuns.map((run, index) => (
                <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="p-3">
                    <span className="text-blue-600 hover:underline cursor-pointer">{run.name}</span>
                  </td>
                  <td className="p-3 text-gray-700">{run.pipeline}</td>
                  <td className="p-3 text-gray-700">{run.started}</td>
                  <td className="p-3 text-gray-700">{run.duration}</td>
                  <td className="p-3">
                    <div className="flex items-center">
                      {getStatusIcon(run.status)}
                      <span className="ml-2">{run.status}</span>
                    </div>
                  </td>
                  <td className="p-3 text-gray-700">{run.triggeredBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderExperimentsView = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Activity className="w-6 h-6 text-blue-600 mr-3" />
          <h1 className="text-2xl font-semibold text-gray-900">Experiments</h1>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Create experiment
        </button>
      </div>
      
      <p className="text-gray-600 mb-6">
        Track and compare machine learning experiments. Monitor metrics, parameters, and model performance across runs.
      </p>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-medium text-gray-700">Name</th>
                <th className="text-left p-3 font-medium text-gray-700">Created</th>
                <th className="text-left p-3 font-medium text-gray-700">Status</th>
                <th className="text-left p-3 font-medium text-gray-700">Runs</th>
                <th className="text-left p-3 font-medium text-gray-700">Best accuracy</th>
                <th className="text-left p-3 font-medium text-gray-700">Author</th>
              </tr>
            </thead>
            <tbody>
              {experiments.map((experiment, index) => (
                <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="p-3">
                    <span className="text-blue-600 hover:underline cursor-pointer">{experiment.name}</span>
                  </td>
                  <td className="p-3 text-gray-700">{experiment.created}</td>
                  <td className="p-3">
                    <div className="flex items-center">
                      {getStatusIcon(experiment.status)}
                      <span className="ml-2">{experiment.status}</span>
                    </div>
                  </td>
                  <td className="p-3 text-gray-700">{experiment.runs}</td>
                  <td className="p-3 text-gray-700">{experiment.bestAccuracy}</td>
                  <td className="p-3 text-gray-700">{experiment.author}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMetricsView = () => (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <TrendingUp className="w-6 h-6 text-blue-600 mr-3" />
        <h1 className="text-2xl font-semibold text-gray-900">Metrics</h1>
      </div>
      
      <p className="text-gray-600 mb-6">
        Visualize and compare experiment metrics. Track model performance over time and across different configurations.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Accuracy Trends</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Accuracy chart visualization</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Loss Curves</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Loss curve visualization</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Metrics</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">94.2%</div>
              <div className="text-gray-600">Best Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">0.045</div>
              <div className="text-gray-600">Lowest Loss</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">25</div>
              <div className="text-gray-600">Total Runs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderParametersView = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Sliders className="w-6 h-6 text-blue-600 mr-3" />
          <h1 className="text-2xl font-semibold text-gray-900">Parameters</h1>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Create parameter set
        </button>
      </div>
      
      <p className="text-gray-600 mb-6">
        Manage hyperparameters and configuration sets. Track parameter combinations and their impact on model performance.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Parameter Importance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Learning Rate</span>
                <span>0.85</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Batch Size</span>
                <span>0.72</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '72%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Hidden Layers</span>
                <span>0.58</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '58%'}}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Best Parameters</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Learning Rate:</span>
              <span className="font-medium">0.001</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Batch Size:</span>
              <span className="font-medium">32</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Hidden Layers:</span>
              <span className="font-medium">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Dropout Rate:</span>
              <span className="font-medium">0.2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Optimizer:</span>
              <span className="font-medium">Adam</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApplicationsEnabledView = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
          <h1 className="text-2xl font-semibold text-gray-900">Enabled</h1>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Enable application
        </button>
      </div>
      
      <p className="text-gray-600 mb-6">
        Manage enabled applications in your Open Data Hub cluster. Monitor status and configure application settings.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.filter(app => app.status === 'Enabled').map((app, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <Grid className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{app.name}</h3>
                  <p className="text-sm text-gray-600">{app.category}</p>
                </div>
              </div>
              <div className="flex items-center">
                {getStatusIcon(app.status)}
                <span className="ml-1 text-sm text-green-600">Enabled</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">{app.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">v{app.version}</span>
              <button className="text-blue-600 hover:text-blue-800 text-sm">Configure</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderApplicationsExploreView = () => (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Grid className="w-6 h-6 text-blue-600 mr-3" />
        <h1 className="text-2xl font-semibold text-gray-900">Explore</h1>
      </div>
      
      <p className="text-gray-600 mb-6">
        Discover and install new applications for your Open Data Hub cluster. Browse the application catalog and find tools for your data science workflows.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableApps.map((app, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                <Grid className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{app.name}</h3>
                <p className="text-sm text-gray-600">{app.category}</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">{app.description}</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">by {app.provider}</span>
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="text-sm text-gray-600 ml-1">{app.rating}</span>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Install
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderResourcesView = () => (
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

  const renderSettingsView = (section: string) => {
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

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, onClick: () => setCurrentView('projects') },
    { id: 'projects', label: 'Data science projects', icon: Database, onClick: () => setCurrentView('projects') },
    {
      id: 'models',
      label: 'Models',
      icon: Cpu,
      hasSubmenu: true,
      submenu: [
        { id: 'registry', label: 'Model registry', onClick: () => setCurrentView('model-registry') },
        { id: 'deployments', label: 'Model deployments', onClick: () => setCurrentView('model-deployments') },
        { id: 'training', label: 'Model training', onClick: () => setCurrentView('training') }
      ]
    },
    {
      id: 'pipelines',
      label: 'Data science pipelines',
      icon: GitBranch,
      hasSubmenu: true,
      submenu: [
        { id: 'pipelines', label: 'Pipelines', onClick: () => setCurrentView('pipelines') },
        { id: 'runs', label: 'Runs', onClick: () => setCurrentView('runs') }
      ]
    },
    {
      id: 'experimentation',
      label: 'Experimentation',
      icon: Zap,
      hasSubmenu: true,
      submenu: [
        { id: 'experiments', label: 'Experiments', onClick: () => setCurrentView('experiments') },
        { id: 'metrics', label: 'Metrics', onClick: () => setCurrentView('metrics') },
        { id: 'parameters', label: 'Parameters', onClick: () => setCurrentView('parameters') }
      ]
    },
    { id: 'workloads', label: 'Distributed workloads', icon: GitBranch, onClick: () => setCurrentView('workloads') },
    {
      id: 'applications',
      label: 'Applications',
      icon: Grid,
      hasSubmenu: true,
      submenu: [
        { id: 'enabled', label: 'Enabled', onClick: () => setCurrentView('applications-enabled') },
        { id: 'explore', label: 'Explore', onClick: () => setCurrentView('applications-explore') }
      ]
    },
    { id: 'resources', label: 'Resources', icon: Monitor, onClick: () => setCurrentView('resources') },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      hasSubmenu: true,
      submenu: [
        { id: 'workbench-images', label: 'Workbench images', onClick: () => setCurrentView('settings-workbench-images') },
        { id: 'cluster-settings', label: 'Cluster settings', onClick: () => setCurrentView('settings-cluster-settings') },
        { id: 'accelerator-profiles', label: 'Accelerator profiles', onClick: () => setCurrentView('settings-accelerator-profiles') },
        { id: 'serving-runtimes', label: 'Serving runtimes', onClick: () => setCurrentView('settings-serving-runtimes') },
        { id: 'connection-types', label: 'Connection types', onClick: () => setCurrentView('settings-connection-types') },
        { id: 'storage-classes', label: 'Storage classes', onClick: () => setCurrentView('settings-storage-classes') },
        { id: 'model-registry-settings', label: 'Model registry settings', onClick: () => setCurrentView('settings-model-registry') },
        { id: 'user-management', label: 'User management', onClick: () => setCurrentView('settings-user-management') }
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-600 rounded-full mr-3 flex items-center justify-center">
              <span className="text-white font-bold text-sm">ODH</span>
            </div>
            <span className="font-semibold text-gray-900">OPEN DATA HUB</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.hasSubmenu) {
                    toggleSection(item.id);
                  } else if (item.onClick) {
                    item.onClick();
                  }
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-lg hover:bg-gray-100 transition-colors ${
                  (currentView === 'projects' && item.id === 'projects') ||
                  (currentView.includes('model') && item.id === 'models') ||
                  (currentView === 'training' && item.id === 'models') ||
                  (currentView.includes('pipeline') && item.id === 'pipelines') ||
                  (currentView === 'runs' && item.id === 'pipelines') ||
                  (currentView.includes('experiment') && item.id === 'experimentation') ||
                  (currentView === 'metrics' && item.id === 'experimentation') ||
                  (currentView === 'parameters' && item.id === 'experimentation') ||
                  (currentView === 'workloads' && item.id === 'workloads') ||
                  (currentView.includes('applications') && item.id === 'applications') ||
                  (currentView === 'resources' && item.id === 'resources') ||
                  (currentView.includes('settings') && item.id === 'settings')
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.hasSubmenu && (
                  expandedSections[item.id as keyof typeof expandedSections] ? 
                    <ChevronDown className="w-4 h-4" /> : 
                    <ChevronRight className="w-4 h-4" />
                )}
              </button>
              
              {item.hasSubmenu && expandedSections[item.id as keyof typeof expandedSections] && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.submenu?.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={subItem.onClick}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-100 transition-colors ${
                        (currentView === 'training' && subItem.id === 'training') ||
                        (currentView === 'model-registry' && subItem.id === 'registry') ||
                        (currentView === 'model-deployments' && subItem.id === 'deployments') ||
                        (currentView === 'pipelines' && subItem.id === 'pipelines') ||
                        (currentView === 'runs' && subItem.id === 'runs') ||
                        (currentView === 'experiments' && subItem.id === 'experiments') ||
                        (currentView === 'metrics' && subItem.id === 'metrics') ||
                        (currentView === 'parameters' && subItem.id === 'parameters') ||
                        (currentView === 'applications-enabled' && subItem.id === 'enabled') ||
                        (currentView === 'applications-explore' && subItem.id === 'explore') ||
                        (currentView.includes('settings-') && subItem.id.includes(currentView.split('-')[1]))
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600'
                      }`}
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <div className="w-5 h-5 grid grid-cols-3 gap-px">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-gray-600 rounded-sm"></div>
                ))}
              </div>
            </button>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Grid className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <HelpCircle className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 bg-blue-600 text-white rounded-lg">
                <Sun className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">testuser</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-gray-50">
          {currentView === 'projects' && renderProjectsView()}
          {currentView === 'model-registry' && renderModelRegistryView()}
          {currentView === 'model-deployments' && renderModelDeploymentsView()}
          {currentView === 'training' && renderModelTrainingView()}
          {currentView === 'pipelines' && renderPipelinesView()}
          {currentView === 'runs' && renderRunsView()}
          {currentView === 'experiments' && renderExperimentsView()}
          {currentView === 'metrics' && renderMetricsView()}
          {currentView === 'parameters' && renderParametersView()}
          {currentView === 'workloads' && renderDistributedWorkloadsView()}
          {currentView === 'applications-enabled' && renderApplicationsEnabledView()}
          {currentView === 'applications-explore' && renderApplicationsExploreView()}
          {currentView === 'resources' && renderResourcesView()}
          {currentView.startsWith('settings-') && renderSettingsView(currentView.replace('settings-', ''))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
