export interface Project {
  name: string;
  created: string;
  owner: string;
}

export interface TrainingJob {
  name: string;
  project: string;
  workerNodes: number;
  clusterQueue: string;
  created: string;
  status: string;
}

export interface Workload {
  name: string;
  priority: number;
  status: string;
  created: string;
  message: string;
}

export interface Model {
  name: string;
  version: string;
  framework: string;
  created: string;
  author: string;
  status: string;
}

export interface Deployment {
  name: string;
  model: string;
  version: string;
  status: string;
  replicas: string;
  created: string;
  endpoint: string;
}

export interface Pipeline {
  name: string;
  description: string;
  created: string;
  lastRun: string;
  status: string;
  runs: number;
}

export interface PipelineRun {
  name: string;
  pipeline: string;
  started: string;
  duration: string;
  status: string;
  triggeredBy: string;
}

export interface Experiment {
  name: string;
  created: string;
  status: string;
  runs: number;
  bestAccuracy: string;
  author: string;
}

export interface Application {
  name: string;
  description: string;
  status: string;
  version: string;
  category: string;
}

export interface AvailableApp {
  name: string;
  description: string;
  category: string;
  provider: string;
  rating: number;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: any;
  hasSubmenu?: boolean;
  submenu?: SubMenuItem[];
  onClick?: () => void;
}

export interface SubMenuItem {
  id: string;
  label: string;
  onClick: () => void;
}

export type ViewType = 
  | 'projects'
  | 'model-registry'
  | 'model-deployments'
  | 'training'
  | 'pipelines'
  | 'runs'
  | 'experiments'
  | 'metrics'
  | 'parameters'
  | 'workloads'
  | 'applications-enabled'
  | 'applications-explore'
  | 'resources'
  | string; // for settings views
