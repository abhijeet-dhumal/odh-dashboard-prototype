// Basic component types
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

// Kueue-related types
export interface QueuedJob {
  name: string;
  type: string;
  queue: string;
  priority: number;
  status: string;
  created: string;
  resources: { cpu: string; memory: string; gpu: string };
  position: number;
  namespace: string;
}

export interface ClusterQueue {
  name: string;
  namespace: string;
  admissionChecks: string;
  pendingWorkloads: number;
  admittedWorkloads: number;
  quotaReserved: string;
  quotaUsed: string;
}

export interface LocalQueue {
  name: string;
  namespace: string;
  clusterQueue: string;
  pendingWorkloads: number;
  admittedWorkloads: number;
  created: string;
}

export interface ResourceFlavor {
  name: string;
  type: string;
  labels: { [key: string]: string };
  taints: string[];
  nodeSelector: string;
  associatedQueues: string[];
  totalCapacity: { [key: string]: number };
  availableCapacity: { [key: string]: number };
}

export interface Cohort {
  name: string;
  clusterQueues: string[];
  totalQuota: { [key: string]: number };
  usedQuota: { [key: string]: number };
  borrowedQuota: { [key: string]: number };
  lentQuota: { [key: string]: number };
  created: string;
}

export interface Accelerator {
  name: string;
  type: string;
  total: number;
  available: number;
  allocated: number;
  utilization: string;
  queues: string[];
}

export interface ClusterResource {
  used: number;
  total: number;
  percentage: number;
}

// Kubeflow Trainer v2 types
export interface TrainJob {
  name: string;
  runtime: string;
  nodes: number;
  status: string;
  framework: string;
  created: string;
  namespace?: string;
}

export interface TrainingRuntime {
  name: string;
  type: 'ClusterTrainingRuntime' | 'TrainingRuntime';
  framework: string;
  gangScheduling: boolean;
  activeJobs: number;
  status: string;
  namespace?: string; // Only for TrainingRuntime, ClusterTrainingRuntime is cluster-wide
}

export const PROJECTS: Project[] = [
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

export const TRAINING_JOBS: TrainingJob[] = [
  {
    name: 'pytorch-multi-node-job',
    project: 'ml-workload-queue',
    workerNodes: 1,
    clusterQueue: 'test-cq',
    created: '1 day ago',
    status: 'Created'
  }
];

export const WORKLOADS: Workload[] = [
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

export const MODELS: Model[] = [
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

export const DEPLOYMENTS: Deployment[] = [
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

export const PIPELINES: Pipeline[] = [
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

export const PIPELINE_RUNS: PipelineRun[] = [
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

export const EXPERIMENTS: Experiment[] = [
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

export const APPLICATIONS: Application[] = [
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

export const AVAILABLE_APPS: AvailableApp[] = [
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

// Kueue Constants
export const QUEUED_JOBS: QueuedJob[] = [
  {
    name: 'pytorch-training-job-001',
    type: 'PyTorchJob',
    queue: 'ml-workload-queue',
    priority: 100,
    status: 'Pending',
    created: '01/09/2025, 15:30:00',
    resources: { cpu: '4 cores', memory: '16 GB', gpu: '2x V100' },
    position: 1,
    namespace: 'textual-analysis'
  },
  {
    name: 'tensorflow-training-job-002',
    type: 'TFJob',
    queue: 'ml-workload-queue',
    priority: 80,
    status: 'Admitted',
    created: '01/09/2025, 15:25:00',
    resources: { cpu: '8 cores', memory: '32 GB', gpu: '4x A100' },
    position: 2,
    namespace: 'fraud-detection'
  },
  {
    name: 'data-processing-job-003',
    type: 'Job',
    queue: 'data-processing-queue',
    priority: 60,
    status: 'Pending',
    created: '01/09/2025, 15:20:00',
    resources: { cpu: '2 cores', memory: '8 GB', gpu: 'None' },
    position: 3,
    namespace: 'image-classification'
  },
  {
    name: 'hyperparameter-tuning-004',
    type: 'PyTorchJob',
    queue: 'ml-workload-queue',
    priority: 90,
    status: 'Inadmissible',
    created: '01/09/2025, 15:15:00',
    resources: { cpu: '16 cores', memory: '64 GB', gpu: '8x V100' },
    position: 4,
    namespace: 'textual-analysis'
  },
  {
    name: 'bert-fine-tuning-005',
    type: 'PyTorchJob',
    queue: 'ml-workload-queue',
    priority: 85,
    status: 'Pending',
    created: '01/09/2025, 15:10:00',
    resources: { cpu: '8 cores', memory: '32 GB', gpu: '4x A100' },
    position: 5,
    namespace: 'nlp-research'
  },
  {
    name: 'image-classification-006',
    type: 'TFJob',
    queue: 'inference-queue',
    priority: 70,
    status: 'Admitted',
    created: '01/09/2025, 15:05:00',
    resources: { cpu: '4 cores', memory: '16 GB', gpu: '2x T4' },
    position: 6,
    namespace: 'dedicated-admin'
  },
  {
    name: 'nlp-sentiment-007',
    type: 'PyTorchJob',
    queue: 'ml-workload-queue',
    priority: 75,
    status: 'Pending',
    created: '01/09/2025, 15:00:00',
    resources: { cpu: '6 cores', memory: '24 GB', gpu: '2x V100' },
    position: 7,
    namespace: 'ml-workload-queue'
  },
  {
    name: 'recommendation-system-008',
    type: 'TFJob',
    queue: 'batch-queue',
    priority: 50,
    status: 'Inadmissible',
    created: '01/09/2025, 14:55:00',
    resources: { cpu: '12 cores', memory: '48 GB', gpu: '4x T4' },
    position: 8,
    namespace: 'data-processing'
  },
  {
    name: 'object-detection-009',
    type: 'PyTorchJob',
    queue: 'ml-workload-queue',
    priority: 95,
    status: 'Admitted',
    created: '01/09/2025, 14:50:00',
    resources: { cpu: '10 cores', memory: '40 GB', gpu: '4x V100' },
    position: 9,
    namespace: 'dedicated-admin'
  },
  {
    name: 'speech-recognition-010',
    type: 'TFJob',
    queue: 'inference-queue',
    priority: 65,
    status: 'Pending',
    created: '01/09/2025, 14:45:00',
    resources: { cpu: '6 cores', memory: '24 GB', gpu: '2x T4' },
    position: 10,
    namespace: 'ml-workload-queue'
  },
  {
    name: 'time-series-forecast-011',
    type: 'PyTorchJob',
    queue: 'batch-queue',
    priority: 40,
    status: 'Inadmissible',
    created: '01/09/2025, 14:40:00',
    resources: { cpu: '4 cores', memory: '16 GB', gpu: 'None' },
    position: 11,
    namespace: 'data-processing'
  },
  {
    name: 'transformer-pretraining-012',
    type: 'PyTorchJob',
    queue: 'ml-workload-queue',
    priority: 100,
    status: 'Pending',
    created: '01/09/2025, 14:35:00',
    resources: { cpu: '32 cores', memory: '128 GB', gpu: '8x A100' },
    position: 12,
    namespace: 'istio-system'
  }
];

export const CLUSTER_QUEUES: ClusterQueue[] = [
  {
    name: 'ml-workload-queue',
    namespace: 'ml-workloads',
    admissionChecks: 'ResourceFlavor',
    pendingWorkloads: 11,
    admittedWorkloads: 5,
    quotaReserved: '75%',
    quotaUsed: '60%'
  },
  {
    name: 'inference-queue',
    namespace: 'inference',
    admissionChecks: 'ResourceFlavor',
    pendingWorkloads: 3,
    admittedWorkloads: 8,
    quotaReserved: '45%',
    quotaUsed: '30%'
  },
  {
    name: 'batch-queue',
    namespace: 'batch-processing',
    admissionChecks: 'None',
    pendingWorkloads: 7,
    admittedWorkloads: 2,
    quotaReserved: '90%',
    quotaUsed: '85%'
  }
];

export const LOCAL_QUEUES: LocalQueue[] = [
  {
    name: 'ml-team-queue',
    namespace: 'ml-workloads',
    clusterQueue: 'ml-workload-queue',
    pendingWorkloads: 3,
    admittedWorkloads: 7,
    created: '01/09/2025, 10:00:00'
  },
  {
    name: 'data-science-queue',
    namespace: 'data-science',
    clusterQueue: 'ml-workload-queue',
    pendingWorkloads: 5,
    admittedWorkloads: 2,
    created: '01/09/2025, 09:30:00'
  },
  {
    name: 'inference-team-queue',
    namespace: 'inference',
    clusterQueue: 'inference-queue',
    pendingWorkloads: 1,
    admittedWorkloads: 4,
    created: '01/09/2025, 11:15:00'
  },
  {
    name: 'batch-processing-queue',
    namespace: 'batch-processing',
    clusterQueue: 'batch-queue',
    pendingWorkloads: 8,
    admittedWorkloads: 1,
    created: '01/09/2025, 08:45:00'
  },
  {
    name: 'textual-analysis-queue',
    namespace: 'textual-analysis',
    clusterQueue: 'ml-workload-queue',
    pendingWorkloads: 2,
    admittedWorkloads: 3,
    created: '01/09/2025, 12:00:00'
  },
  {
    name: 'dedicated-admin-queue',
    namespace: 'dedicated-admin',
    clusterQueue: 'ml-workload-queue',
    pendingWorkloads: 1,
    admittedWorkloads: 2,
    created: '01/09/2025, 13:30:00'
  },
  {
    name: 'ml-workload-local-queue',
    namespace: 'ml-workload-queue',
    clusterQueue: 'ml-workload-queue',
    pendingWorkloads: 4,
    admittedWorkloads: 6,
    created: '01/09/2025, 14:15:00'
  },
  {
    name: 'data-processing-queue',
    namespace: 'data-processing',
    clusterQueue: 'batch-queue',
    pendingWorkloads: 3,
    admittedWorkloads: 1,
    created: '01/09/2025, 15:45:00'
  },
  {
    name: 'istio-system-queue',
    namespace: 'istio-system',
    clusterQueue: 'inference-queue',
    pendingWorkloads: 0,
    admittedWorkloads: 1,
    created: '01/09/2025, 16:20:00'
  }
];

export const RESOURCE_FLAVORS: ResourceFlavor[] = [
  {
    name: 'gpu-v100-spot',
    type: 'GPU',
    labels: { 'gpu-type': 'v100', 'pricing': 'spot', 'zone': 'us-west-1a' },
    taints: ['spot-instance=true:NoSchedule'],
    nodeSelector: 'gpu-node-pool=v100-spot',
    associatedQueues: ['ml-workload-queue'],
    totalCapacity: { gpu: 8, cpu: 64, memory: 256 },
    availableCapacity: { gpu: 2, cpu: 16, memory: 64 }
  },
  {
    name: 'gpu-a100-ondemand',
    type: 'GPU',
    labels: { 'gpu-type': 'a100', 'pricing': 'on-demand', 'zone': 'us-west-1b' },
    taints: [],
    nodeSelector: 'gpu-node-pool=a100-ondemand',
    associatedQueues: ['ml-workload-queue', 'inference-queue'],
    totalCapacity: { gpu: 4, cpu: 96, memory: 384 },
    availableCapacity: { gpu: 1, cpu: 24, memory: 96 }
  },
  {
    name: 'cpu-optimized',
    type: 'CPU',
    labels: { 'instance-type': 'cpu-optimized', 'pricing': 'on-demand', 'zone': 'us-west-1c' },
    taints: [],
    nodeSelector: 'node-type=cpu-optimized',
    associatedQueues: ['batch-queue'],
    totalCapacity: { cpu: 128, memory: 512, gpu: 0 },
    availableCapacity: { cpu: 64, memory: 256, gpu: 0 }
  },
  {
    name: 'gpu-t4-preemptible',
    type: 'GPU',
    labels: { 'gpu-type': 't4', 'pricing': 'preemptible', 'zone': 'us-west-1d' },
    taints: ['preemptible=true:NoSchedule'],
    nodeSelector: 'gpu-node-pool=t4-preemptible',
    associatedQueues: ['inference-queue'],
    totalCapacity: { gpu: 16, cpu: 64, memory: 128 },
    availableCapacity: { gpu: 8, cpu: 32, memory: 64 }
  }
];

export const COHORTS: Cohort[] = [
  {
    name: 'ml-cohort',
    clusterQueues: ['ml-workload-queue', 'inference-queue'],
    totalQuota: { cpu: 200, memory: 800, gpu: 12 },
    usedQuota: { cpu: 150, memory: 600, gpu: 8 },
    borrowedQuota: { cpu: 20, memory: 80, gpu: 2 },
    lentQuota: { cpu: 10, memory: 40, gpu: 1 },
    created: '01/09/2025, 08:00:00'
  },
  {
    name: 'batch-cohort',
    clusterQueues: ['batch-queue'],
    totalQuota: { cpu: 128, memory: 512, gpu: 0 },
    usedQuota: { cpu: 100, memory: 400, gpu: 0 },
    borrowedQuota: { cpu: 0, memory: 0, gpu: 0 },
    lentQuota: { cpu: 28, memory: 112, gpu: 0 },
    created: '01/09/2025, 07:30:00'
  }
];

export const ACCELERATORS: Accelerator[] = [
  {
    name: 'NVIDIA V100',
    type: 'GPU',
    total: 16,
    available: 4,
    allocated: 12,
    utilization: '75%',
    queues: ['ml-workload-queue']
  },
  {
    name: 'NVIDIA A100',
    type: 'GPU',
    total: 8,
    available: 2,
    allocated: 6,
    utilization: '75%',
    queues: ['ml-workload-queue', 'inference-queue']
  },
  {
    name: 'NVIDIA T4',
    type: 'GPU',
    total: 24,
    available: 8,
    allocated: 16,
    utilization: '67%',
    queues: ['inference-queue']
  },
  {
    name: 'Google TPU v4',
    type: 'TPU',
    total: 4,
    available: 1,
    allocated: 3,
    utilization: '75%',
    queues: ['ml-workload-queue']
  }
];

export const CLUSTER_RESOURCES: { [key: string]: ClusterResource } = {
  cpu: {
    used: 180,
    total: 256,
    percentage: 70
  },
  memory: {
    used: 720,
    total: 1024,
    percentage: 70
  },
  gpu: {
    used: 18,
    total: 24,
    percentage: 75
  }
};

// Kubeflow Trainer v2 mock data
export const TRAIN_JOBS: TrainJob[] = [
  {
    name: 'pytorch-distributed-training',
    runtime: 'torch-distributed',
    nodes: 4,
    status: 'Running',
    framework: 'PyTorch',
    created: '2025-01-15 10:30:00',
    namespace: 'textual-analysis'
  },
  {
    name: 'llm-fine-tuning-job',
    runtime: 'llm-runtime',
    nodes: 8,
    status: 'Initializing',
    framework: 'Transformers',
    created: '2025-01-15 11:15:00',
    namespace: 'nlp-research'
  },
  {
    name: 'tensorflow-multi-worker',
    runtime: 'tf-distributed',
    nodes: 2,
    status: 'Completed',
    framework: 'TensorFlow',
    created: '2025-01-15 09:45:00',
    namespace: 'fraud-detection'
  },
  {
    name: 'bert-pretraining-large',
    runtime: 'llm-runtime',
    nodes: 16,
    status: 'Running',
    framework: 'Transformers',
    created: '2025-01-15 08:20:00',
    namespace: 'nlp-research'
  },
  {
    name: 'resnet-distributed-training',
    runtime: 'torch-distributed',
    nodes: 6,
    status: 'Pending',
    framework: 'PyTorch',
    created: '2025-01-15 12:00:00',
    namespace: 'image-classification'
  },
  {
    name: 'gpt-fine-tuning-medical',
    runtime: 'llm-runtime',
    nodes: 12,
    status: 'Running',
    framework: 'Transformers',
    created: '2025-01-15 07:30:00',
    namespace: 'dedicated-admin'
  },
  {
    name: 'mpi-hpc-simulation',
    runtime: 'mpi-runtime',
    nodes: 32,
    status: 'Running',
    framework: 'MPI',
    created: '2025-01-15 06:15:00',
    namespace: 'ml-workload-queue'
  },
  {
    name: 'tensorflow-recommendation',
    runtime: 'tf-distributed',
    nodes: 4,
    status: 'Failed',
    framework: 'TensorFlow',
    created: '2025-01-15 13:45:00',
    namespace: 'data-processing'
  },
  {
    name: 'pytorch-vision-training',
    runtime: 'torch-distributed',
    nodes: 8,
    status: 'Completed',
    framework: 'PyTorch',
    created: '2025-01-14 16:20:00',
    namespace: 'dedicated-admin'
  },
  {
    name: 'llama-instruction-tuning',
    runtime: 'llm-runtime',
    nodes: 24,
    status: 'Running',
    framework: 'Transformers',
    created: '2025-01-15 05:10:00',
    namespace: 'istio-system'
  }
];

export const TRAINING_RUNTIMES: TrainingRuntime[] = [
  {
    name: 'torch-distributed',
    type: 'ClusterTrainingRuntime',
    framework: 'PyTorch',
    gangScheduling: true,
    activeJobs: 3,
    status: 'Active'
  },
  {
    name: 'llm-runtime',
    type: 'TrainingRuntime',
    framework: 'Transformers',
    gangScheduling: true,
    activeJobs: 4,
    status: 'Active',
    namespace: 'nlp-research'
  },
  {
    name: 'tf-distributed',
    type: 'ClusterTrainingRuntime',
    framework: 'TensorFlow',
    gangScheduling: true,
    activeJobs: 1,
    status: 'Active'
  },
  {
    name: 'mpi-runtime',
    type: 'ClusterTrainingRuntime',
    framework: 'MPI',
    gangScheduling: true,
    activeJobs: 1,
    status: 'Active'
  },
  {
    name: 'jax-distributed',
    type: 'ClusterTrainingRuntime',
    framework: 'JAX',
    gangScheduling: true,
    activeJobs: 0,
    status: 'Inactive'
  },
  {
    name: 'horovod-runtime',
    type: 'TrainingRuntime',
    framework: 'Horovod',
    gangScheduling: true,
    activeJobs: 0,
    status: 'Inactive',
    namespace: 'textual-analysis'
  },
  {
    name: 'ray-distributed',
    type: 'ClusterTrainingRuntime',
    framework: 'Ray',
    gangScheduling: false,
    activeJobs: 2,
    status: 'Active'
  },
  {
    name: 'xgboost-runtime',
    type: 'TrainingRuntime',
    framework: 'XGBoost',
    gangScheduling: false,
    activeJobs: 1,
    status: 'Active',
    namespace: 'fraud-detection'
  }
];
