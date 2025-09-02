import { Project, TrainingJob, Workload, Model, Deployment, Pipeline, PipelineRun, Experiment, Application, AvailableApp } from '../types';

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
