import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Grid, Bell, HelpCircle, Sun, RefreshCw, Home, Database, Cpu, GitBranch, Zap, Monitor, Settings } from 'lucide-react';

// Import view components
import { 
  ProjectsView, 
  ModelsView, 
  DistributedWorkloadsView, 
  PipelinesView, 
  ExperimentationView, 
  ApplicationsView, 
  ResourcesView, 
  SettingsView 
} from './views';

// Import mock data from constants
import { 
  Project, 
  TrainingJob, 
  Workload, 
  Model, 
  Deployment, 
  Pipeline, 
  PipelineRun, 
  Experiment, 
  Application, 
  AvailableApp 
} from '../../utils/constants';

const DashboardMain = () => {
  const [currentView, setCurrentView] = useState('projects');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    models: false,
    pipelines: false,
    experimentation: false,
    applications: false,
    settings: false
  });
  const [selectedProject, setSelectedProject] = useState('All Projects');
  const [showJobActions, setShowJobActions] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Mock data - in real app this would come from props or API
  const projects: Project[] = [
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

  const trainingJobs: TrainingJob[] = [
    {
      name: 'pytorch-multi-node-job',
      project: 'ml-workload-queue',
      workerNodes: 1,
      clusterQueue: 'test-cq',
      created: '1 day ago',
      status: 'Created'
    }
  ];

  const workloads: Workload[] = [
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

  const models: Model[] = [
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

  const deployments: Deployment[] = [
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

  const pipelines: Pipeline[] = [
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

  const pipelineRuns: PipelineRun[] = [
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

  const experiments: Experiment[] = [
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

  const applications: Application[] = [
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

  const availableApps: AvailableApp[] = [
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

  const renderContent = () => {
    switch (currentView) {
      case 'projects':
        return <ProjectsView projects={projects} />;
      case 'model-registry':
        return (
          <ModelsView 
            view="registry" 
            models={models}
            deployments={deployments}
            trainingJobs={trainingJobs}
            projects={projects}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            showJobActions={showJobActions}
            setShowJobActions={setShowJobActions}
          />
        );
      case 'model-deployments':
        return (
          <ModelsView 
            view="deployments" 
            models={models}
            deployments={deployments}
            trainingJobs={trainingJobs}
            projects={projects}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            showJobActions={showJobActions}
            setShowJobActions={setShowJobActions}
          />
        );
      case 'training':
        return (
          <ModelsView 
            view="training" 
            models={models}
            deployments={deployments}
            trainingJobs={trainingJobs}
            projects={projects}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            showJobActions={showJobActions}
            setShowJobActions={setShowJobActions}
          />
        );
      case 'pipelines':
        return <PipelinesView view="pipelines" pipelines={pipelines} pipelineRuns={pipelineRuns} />;
      case 'runs':
        return <PipelinesView view="runs" pipelines={pipelines} pipelineRuns={pipelineRuns} />;
      case 'experiments':
        return <ExperimentationView view="experiments" experiments={experiments} />;
      case 'metrics':
        return <ExperimentationView view="metrics" experiments={experiments} />;
      case 'parameters':
        return <ExperimentationView view="parameters" experiments={experiments} />;
      case 'workloads':
        return (
          <DistributedWorkloadsView 
            projects={projects}
            workloads={workloads}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
          />
        );
      case 'applications-enabled':
        return <ApplicationsView view="enabled" applications={applications} availableApps={availableApps} />;
      case 'applications-explore':
        return <ApplicationsView view="explore" applications={applications} availableApps={availableApps} />;
      case 'resources':
        return <ResourcesView projects={projects} />;
      case 'settings-workbench-images':
        return <SettingsView section="workbench-images" />;
      case 'settings-cluster-settings':
        return <SettingsView section="cluster-settings" />;
      case 'settings-accelerator-profiles':
        return <SettingsView section="accelerator-profiles" />;
      case 'settings-serving-runtimes':
        return <SettingsView section="serving-runtimes" />;
      case 'settings-connection-types':
        return <SettingsView section="connection-types" />;
      case 'settings-storage-classes':
        return <SettingsView section="storage-classes" />;
      case 'settings-model-registry':
        return <SettingsView section="model-registry" />;
      case 'settings-user-management':
        return <SettingsView section="user-management" />;
      default:
        return <ProjectsView projects={projects} />;
    }
  };

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
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;