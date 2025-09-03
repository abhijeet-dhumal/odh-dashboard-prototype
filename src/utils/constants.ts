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

// Hierarchical training job interfaces
export interface Pod {
  name: string;
  status: string;
  node: string;
  created: string;
  restarts: number;
  logs?: string;
}

export interface Job {
  name: string;
  status: string;
  completions: string;
  duration: string;
  created: string;
  pods: Pod[];
}

export interface JobSet {
  name: string;
  status: string;
  jobs: number;
  created: string;
  jobs_list: Job[];
}

export interface PytorchJob {
  name: string;
  project: string;
  status: string;
  created: string;
  startTime?: string;
  completionTime?: string;
  duration?: string;
  framework: string;
  workerNodes: number;
  clusterQueue: string;
  namespace: string;
  image: string;
  command: string[];
  resources: {
    requests: { cpu: string; memory: string; 'nvidia.com/gpu'?: string };
    limits: { cpu: string; memory: string; 'nvidia.com/gpu'?: string };
  };
  replicaSpecs: {
    Master: { replicas: number; restartPolicy: string };
    Worker: { replicas: number; restartPolicy: string };
  };
  conditions: Array<{
    type: string;
    status: string;
    reason: string;
    message: string;
    lastTransitionTime: string;
  }>;
  pods: Pod[];
}

export interface TrainJobHierarchical {
  name: string;
  project: string;
  status: string;
  created: string;
  startTime?: string;
  completionTime?: string;
  duration?: string;
  framework: string;
  runtime: string;
  nodes: number;
  namespace: string;
  image: string;
  command: string[];
  resources: {
    requests: { cpu: string; memory: string; 'nvidia.com/gpu'?: string };
    limits: { cpu: string; memory: string; 'nvidia.com/gpu'?: string };
  };
  trainingRuntimeRef: {
    name: string;
    kind: 'TrainingRuntime' | 'ClusterTrainingRuntime';
  };
  conditions: Array<{
    type: string;
    status: string;
    reason: string;
    message: string;
    lastTransitionTime: string;
  }>;
  jobsets: JobSet[];
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
  },
  {
    name: 'computer-vision',
    created: '15/08/2025, 09:30:00',
    owner: 'user-003'
  },
  {
    name: 'nlp-research',
    created: '12/08/2025, 14:20:00',
    owner: 'user-004'
  },
  {
    name: 'sentiment-analysis',
    created: '18/08/2025, 11:45:00',
    owner: 'user-005'
  },
  {
    name: 'recommendation-engine',
    created: '20/08/2025, 16:10:00',
    owner: 'user-006'
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

// Hierarchical training job data
export const PYTORCH_JOBS: PytorchJob[] = [
  {
    name: 'pytorch-multi-node-job',
    project: 'ml-workload-queue',
    status: 'Running',
    created: '2025-01-09T14:30:00Z',
    startTime: '2025-01-09T14:30:45Z',
    duration: '45m12s',
    framework: 'PyTorch',
    workerNodes: 2,
    clusterQueue: 'test-cq',
    namespace: 'ml-workload-queue',
    image: 'pytorch/pytorch:2.1.0-cuda11.8-cudnn8-devel',
    command: ['python3', '/opt/pytorch-mnist/mnist.py', '--epochs=10', '--batch-size=64'],
    resources: {
      requests: { cpu: '2', memory: '4Gi', 'nvidia.com/gpu': '1' },
      limits: { cpu: '4', memory: '8Gi', 'nvidia.com/gpu': '1' }
    },
    replicaSpecs: {
      Master: { replicas: 1, restartPolicy: 'OnFailure' },
      Worker: { replicas: 1, restartPolicy: 'OnFailure' }
    },
    conditions: [
      {
        type: 'Created',
        status: 'True',
        reason: 'PyTorchJobCreated',
        message: 'PyTorchJob pytorch-multi-node-job is created.',
        lastTransitionTime: '2025-01-09T14:30:00Z'
      },
      {
        type: 'Running',
        status: 'True',
        reason: 'PyTorchJobRunning',
        message: 'PyTorchJob pytorch-multi-node-job is running.',
        lastTransitionTime: '2025-01-09T14:30:45Z'
      }
    ],
    pods: [
      {
        name: 'pytorch-multi-node-job-master-0',
        status: 'Running',
        node: 'worker-node-1',
        created: '2025-01-09T14:30:15Z',
        restarts: 0,
        logs: `[2025-01-09 14:30:15] INFO: Starting PyTorch training job
[2025-01-09 14:30:16] INFO: Initializing distributed training
[2025-01-09 14:30:17] INFO: Master node ready, waiting for workers
[2025-01-09 14:30:18] INFO: All workers connected
[2025-01-09 14:30:19] INFO: Training started - Epoch 1/10
[2025-01-09 14:31:00] INFO: Epoch 1 completed - Loss: 0.8542
[2025-01-09 14:31:30] INFO: Epoch 2 completed - Loss: 0.7234`
      },
      {
        name: 'pytorch-multi-node-job-worker-0',
        status: 'Running',
        node: 'worker-node-2',
        created: '2025-01-09T14:30:20Z',
        restarts: 0,
        logs: `[2025-01-09 14:30:20] INFO: Worker node starting
[2025-01-09 14:30:21] INFO: Connecting to master node
[2025-01-09 14:30:22] INFO: Connection established
[2025-01-09 14:30:23] INFO: Waiting for training to start
[2025-01-09 14:30:24] INFO: Training started on worker
[2025-01-09 14:31:00] INFO: Epoch 1 processing completed
[2025-01-09 14:31:30] INFO: Epoch 2 processing completed`
      }
    ]
  },
  {
    name: 'pytorch-image-classification',
    project: 'computer-vision',
    status: 'Completed',
    created: '2025-01-08T10:15:00Z',
    startTime: '2025-01-08T10:15:30Z',
    completionTime: '2025-01-08T12:30:16Z',
    duration: '2h14m46s',
    framework: 'PyTorch',
    workerNodes: 1,
    clusterQueue: 'gpu-cq',
    namespace: 'computer-vision',
    image: 'pytorch/pytorch:2.0.1-cuda11.7-cudnn8-runtime',
    command: ['python3', '/opt/image-classification/train.py', '--dataset=cifar10', '--model=resnet18'],
    resources: {
      requests: { cpu: '4', memory: '8Gi', 'nvidia.com/gpu': '1' },
      limits: { cpu: '8', memory: '16Gi', 'nvidia.com/gpu': '1' }
    },
    replicaSpecs: {
      Master: { replicas: 1, restartPolicy: 'Never' },
      Worker: { replicas: 0, restartPolicy: 'Never' }
    },
    conditions: [
      {
        type: 'Created',
        status: 'True',
        reason: 'PyTorchJobCreated',
        message: 'PyTorchJob pytorch-image-classification is created.',
        lastTransitionTime: '2025-01-08T10:15:00Z'
      },
      {
        type: 'Running',
        status: 'False',
        reason: 'PyTorchJobRunning',
        message: 'PyTorchJob pytorch-image-classification is running.',
        lastTransitionTime: '2025-01-08T10:15:30Z'
      },
      {
        type: 'Succeeded',
        status: 'True',
        reason: 'PyTorchJobSucceeded',
        message: 'PyTorchJob pytorch-image-classification is successfully completed.',
        lastTransitionTime: '2025-01-08T12:30:16Z'
      }
    ],
    pods: [
      {
        name: 'pytorch-image-classification-master-0',
        status: 'Completed',
        node: 'gpu-node-1',
        created: '2025-01-08T10:15:30Z',
        restarts: 0,
        logs: `[2025-01-08 10:15:30] INFO: Starting image classification training
[2025-01-08 10:15:31] INFO: Loading dataset: CIFAR-10
[2025-01-08 10:15:45] INFO: Dataset loaded - 50000 training samples
[2025-01-08 10:16:00] INFO: Model initialized: ResNet-18
[2025-01-08 10:16:01] INFO: Training started
[2025-01-08 12:30:15] INFO: Training completed successfully
[2025-01-08 12:30:16] INFO: Final accuracy: 94.2%`
      }
    ]
  },
  {
    name: 'pytorch-nlp-training',
    project: 'nlp-research',
    status: 'Pending',
    created: '2025-01-09T16:00:00Z',
    framework: 'PyTorch',
    workerNodes: 3,
    clusterQueue: 'nlp-cq',
    namespace: 'nlp-research',
    image: 'huggingface/transformers-pytorch-gpu:4.21.0',
    command: ['python3', '/opt/nlp-training/train_bert.py', '--model=bert-base-uncased'],
    resources: {
      requests: { cpu: '2', memory: '8Gi', 'nvidia.com/gpu': '2' },
      limits: { cpu: '4', memory: '16Gi', 'nvidia.com/gpu': '2' }
    },
    replicaSpecs: {
      Master: { replicas: 1, restartPolicy: 'OnFailure' },
      Worker: { replicas: 2, restartPolicy: 'OnFailure' }
    },
    conditions: [
      {
        type: 'Created',
        status: 'True',
        reason: 'PyTorchJobCreated',
        message: 'PyTorchJob pytorch-nlp-training is created.',
        lastTransitionTime: '2025-01-09T16:00:00Z'
      },
      {
        type: 'Pending',
        status: 'True',
        reason: 'PyTorchJobPending',
        message: 'PyTorchJob pytorch-nlp-training is waiting for resources.',
        lastTransitionTime: '2025-01-09T16:00:15Z'
      }
    ],
    pods: [
      {
        name: 'pytorch-nlp-training-master-0',
        status: 'Pending',
        node: 'gpu-node-7',
        created: '2025-01-09T16:00:15Z',
        restarts: 0,
        logs: `[2025-01-09 16:00:15] INFO: NLP training job initializing
[2025-01-09 16:00:16] INFO: Waiting for resources to be allocated
[2025-01-09 16:00:17] INFO: Queue position: 3`
      }
    ]
  },
  {
    name: 'pytorch-recommendation-system',
    project: 'recommendation-engine',
    status: 'Failed',
    created: '2025-01-08T08:00:00Z',
    startTime: '2025-01-08T08:00:30Z',
    completionTime: '2025-01-08T08:10:46Z',
    duration: '10m16s',
    framework: 'PyTorch',
    workerNodes: 2,
    clusterQueue: 'cpu-cq',
    namespace: 'recommendation-engine',
    image: 'pytorch/pytorch:1.13.1-cuda11.6-cudnn8-runtime',
    command: ['python3', '/opt/recommendation/train.py', '--model=collaborative-filtering'],
    resources: {
      requests: { cpu: '4', memory: '16Gi' },
      limits: { cpu: '8', memory: '32Gi' }
    },
    replicaSpecs: {
      Master: { replicas: 1, restartPolicy: 'Never' },
      Worker: { replicas: 1, restartPolicy: 'Never' }
    },
    conditions: [
      {
        type: 'Created',
        status: 'True',
        reason: 'PyTorchJobCreated',
        message: 'PyTorchJob pytorch-recommendation-system is created.',
        lastTransitionTime: '2025-01-08T08:00:00Z'
      },
      {
        type: 'Running',
        status: 'False',
        reason: 'PyTorchJobRunning',
        message: 'PyTorchJob pytorch-recommendation-system is running.',
        lastTransitionTime: '2025-01-08T08:00:30Z'
      },
      {
        type: 'Failed',
        status: 'True',
        reason: 'PyTorchJobFailed',
        message: 'PyTorchJob pytorch-recommendation-system failed due to OOM error.',
        lastTransitionTime: '2025-01-08T08:10:46Z'
      }
    ],
    pods: [
      {
        name: 'pytorch-recommendation-system-master-0',
        status: 'Failed',
        node: 'cpu-node-3',
        created: '2025-01-08T08:00:30Z',
        restarts: 2,
        logs: `[2025-01-08 08:00:30] INFO: Recommendation system training starting
[2025-01-08 08:05:15] ERROR: Out of memory error
[2025-01-08 08:05:16] INFO: Restarting with reduced batch size
[2025-01-08 08:10:45] ERROR: CUDA out of memory
[2025-01-08 08:10:46] ERROR: Training failed after 2 restarts`
      }
    ]
  },
  {
    name: 'pytorch-nlp-suspended',
    project: 'nlp-research',
    status: 'Suspended',
    created: '2025-01-10T09:20:00Z',
    startTime: '2025-01-10T09:20:30Z',
    duration: '1h25m12s',
    framework: 'PyTorch',
    workerNodes: 3,
    clusterQueue: 'nlp-cq',
    namespace: 'nlp-research',
    image: 'pytorch/pytorch:2.1.0-cuda11.8-cudnn8-devel',
    command: ['python3', '/opt/nlp-training/train_bert.py', '--model=bert-base', '--epochs=5'],
    resources: {
      requests: { cpu: '6', memory: '12Gi', 'nvidia.com/gpu': '2' },
      limits: { cpu: '12', memory: '24Gi', 'nvidia.com/gpu': '2' }
    },
    replicaSpecs: {
      Master: { replicas: 1, restartPolicy: 'OnFailure' },
      Worker: { replicas: 2, restartPolicy: 'OnFailure' }
    },
    conditions: [
      {
        type: 'Created',
        status: 'True',
        reason: 'PyTorchJobCreated',
        message: 'PyTorchJob pytorch-nlp-suspended is created.',
        lastTransitionTime: '2025-01-10T09:20:00Z'
      },
      {
        type: 'Running',
        status: 'False',
        reason: 'PyTorchJobSuspended',
        message: 'PyTorchJob pytorch-nlp-suspended has been suspended by user.',
        lastTransitionTime: '2025-01-10T10:45:42Z'
      },
      {
        type: 'Suspended',
        status: 'True',
        reason: 'PyTorchJobSuspended',
        message: 'PyTorchJob pytorch-nlp-suspended is currently suspended.',
        lastTransitionTime: '2025-01-10T10:45:42Z'
      }
    ],
    pods: [
      {
        name: 'pytorch-nlp-suspended-master-0',
        status: 'Terminated',
        node: 'worker-node-3',
        created: '2025-01-10T09:20:30Z',
        restarts: 0,
        logs: `[INFO] Starting BERT training...
[INFO] Loading dataset from /data/nlp/corpus
[INFO] Model: bert-base-uncased
[INFO] Epochs: 5, Batch size: 32
[INFO] Training suspended by user request
[INFO] Saving checkpoint to /checkpoints/bert_epoch_2.pt
[INFO] Training will resume from epoch 3 when restarted`
      },
      {
        name: 'pytorch-nlp-suspended-worker-0',
        status: 'Terminated',
        node: 'worker-node-4',
        created: '2025-01-10T09:20:35Z',
        restarts: 0,
        logs: `[INFO] Worker 0 initialized
[INFO] Connected to master node
[INFO] Processing training batches...
[INFO] Received suspend signal
[INFO] Gracefully shutting down worker 0`
      },
      {
        name: 'pytorch-nlp-suspended-worker-1',
        status: 'Terminated',
        node: 'worker-node-5',
        created: '2025-01-10T09:20:35Z',
        restarts: 0,
        logs: `[INFO] Worker 1 initialized
[INFO] Connected to master node
[INFO] Processing training batches...
[INFO] Received suspend signal
[INFO] Gracefully shutting down worker 1`
      }
    ]
  },
  {
    name: 'pytorch-cv-paused',
    project: 'computer-vision',
    status: 'Suspended',
    created: '2025-01-11T14:15:00Z',
    startTime: '2025-01-11T14:15:45Z',
    duration: '3h42m18s',
    framework: 'PyTorch',
    workerNodes: 4,
    clusterQueue: 'gpu-cq',
    namespace: 'computer-vision',
    image: 'pytorch/pytorch:2.0.1-cuda11.7-cudnn8-runtime',
    command: ['python3', '/opt/cv-training/train_yolo.py', '--dataset=coco', '--model=yolov8'],
    resources: {
      requests: { cpu: '8', memory: '16Gi', 'nvidia.com/gpu': '4' },
      limits: { cpu: '16', memory: '32Gi', 'nvidia.com/gpu': '4' }
    },
    replicaSpecs: {
      Master: { replicas: 1, restartPolicy: 'OnFailure' },
      Worker: { replicas: 3, restartPolicy: 'OnFailure' }
    },
    conditions: [
      {
        type: 'Created',
        status: 'True',
        reason: 'PyTorchJobCreated',
        message: 'PyTorchJob pytorch-cv-paused is created.',
        lastTransitionTime: '2025-01-11T14:15:00Z'
      },
      {
        type: 'Suspended',
        status: 'True',
        reason: 'ResourceConstraints',
        message: 'PyTorchJob pytorch-cv-paused suspended due to resource constraints.',
        lastTransitionTime: '2025-01-11T17:57:18Z'
      }
    ],
    pods: [
      {
        name: 'pytorch-cv-paused-master-0',
        status: 'Terminated',
        node: 'gpu-node-1',
        created: '2025-01-11T14:15:45Z',
        restarts: 0,
        logs: `[INFO] Starting YOLO training on COCO dataset
[INFO] Model: YOLOv8-large
[INFO] GPU devices: 4x A100
[INFO] Training progress: 65% complete
[INFO] Current mAP: 0.847
[INFO] Training suspended - checkpoint saved
[INFO] Resume from checkpoint: /checkpoints/yolo_epoch_15.pt`
      }
    ]
  }
];

export const TRAIN_JOBS_HIERARCHICAL: TrainJobHierarchical[] = [
  {
    name: 'llm-fine-tuning-job',
    project: 'nlp-research',
    status: 'Running',
    created: '2025-01-09T09:00:00Z',
    startTime: '2025-01-09T09:03:30Z',
    duration: '45m30s',
    framework: 'Transformers',
    runtime: 'pytorch-runtime',
    nodes: 4,
    namespace: 'nlp-research',
    image: 'huggingface/transformers-pytorch-gpu:4.25.0',
    command: ['python3', '/opt/llm-training/fine_tune.py', '--model=gpt-3.5-turbo', '--dataset=custom'],
    resources: {
      requests: { cpu: '8', memory: '32Gi', 'nvidia.com/gpu': '4' },
      limits: { cpu: '16', memory: '64Gi', 'nvidia.com/gpu': '4' }
    },
    trainingRuntimeRef: {
      name: 'pytorch-runtime',
      kind: 'TrainingRuntime'
    },
    conditions: [
      {
        type: 'Created',
        status: 'True',
        reason: 'TrainJobCreated',
        message: 'TrainJob llm-fine-tuning-job is created.',
        lastTransitionTime: '2025-01-09T09:00:00Z'
      },
      {
        type: 'Running',
        status: 'True',
        reason: 'TrainJobRunning',
        message: 'TrainJob llm-fine-tuning-job is running.',
        lastTransitionTime: '2025-01-09T09:03:30Z'
      }
    ],
    jobsets: [
      {
        name: 'llm-fine-tuning-job-jobset',
        status: 'Running',
        jobs: 2,
        created: '2025-01-09T09:00:30Z',
        jobs_list: [
          {
            name: 'data-initializer',
            status: 'Completed',
            completions: '1/1',
            duration: '2m30s',
            created: '2025-01-09T09:00:45Z',
            pods: [
              {
                name: 'data-initializer-pod-0',
                status: 'Completed',
                node: 'cpu-node-1',
                created: '2025-01-09T09:00:50Z',
                restarts: 0,
                logs: `[2025-01-09 09:00:50] INFO: Data initializer starting
[2025-01-09 09:00:51] INFO: Downloading training dataset
[2025-01-09 09:01:30] INFO: Dataset downloaded: 2.3GB
[2025-01-09 09:01:31] INFO: Preprocessing data
[2025-01-09 09:03:15] INFO: Data preprocessing completed
[2025-01-09 09:03:16] INFO: Data ready for training`
              }
            ]
          },
          {
            name: 'trainer-job',
            status: 'Running',
            completions: '0/4',
            duration: '45m12s',
            created: '2025-01-09T09:03:30Z',
            pods: [
              {
                name: 'trainer-job-master-0',
                status: 'Running',
                node: 'gpu-node-1',
                created: '2025-01-09T09:03:45Z',
                restarts: 0,
                logs: `[2025-01-09 09:03:45] INFO: Master trainer starting
[2025-01-09 09:03:46] INFO: Loading pre-trained model: GPT-3.5
[2025-01-09 09:05:00] INFO: Model loaded successfully
[2025-01-09 09:05:01] INFO: Initializing distributed training
[2025-01-09 09:05:15] INFO: All workers connected
[2025-01-09 09:05:16] INFO: Fine-tuning started
[2025-01-09 09:30:00] INFO: Checkpoint saved - Step 1000`
              },
              {
                name: 'trainer-job-worker-0',
                status: 'Running',
                node: 'gpu-node-2',
                created: '2025-01-09T09:03:50Z',
                restarts: 0,
                logs: `[2025-01-09 09:03:50] INFO: Worker 0 starting
[2025-01-09 09:03:51] INFO: Connecting to master
[2025-01-09 09:05:14] INFO: Connected to master
[2025-01-09 09:05:16] INFO: Training started on worker 0
[2025-01-09 09:30:00] INFO: Step 1000 completed`
              },
              {
                name: 'trainer-job-worker-1',
                status: 'Running',
                node: 'gpu-node-3',
                created: '2025-01-09T09:03:55Z',
                restarts: 0,
                logs: `[2025-01-09 09:03:55] INFO: Worker 1 starting
[2025-01-09 09:03:56] INFO: Connecting to master
[2025-01-09 09:05:14] INFO: Connected to master
[2025-01-09 09:05:16] INFO: Training started on worker 1
[2025-01-09 09:30:00] INFO: Step 1000 completed`
              },
              {
                name: 'trainer-job-worker-2',
                status: 'Running',
                node: 'gpu-node-4',
                created: '2025-01-09T09:04:00Z',
                restarts: 0,
                logs: `[2025-01-09 09:04:00] INFO: Worker 2 starting
[2025-01-09 09:04:01] INFO: Connecting to master
[2025-01-09 09:05:14] INFO: Connected to master
[2025-01-09 09:05:16] INFO: Training started on worker 2
[2025-01-09 09:30:00] INFO: Step 1000 completed`
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'bert-sentiment-analysis',
    project: 'sentiment-analysis',
    status: 'Completed',
    created: '2025-01-08T14:00:00Z',
    startTime: '2025-01-08T14:06:00Z',
    completionTime: '2025-01-08T15:30:00Z',
    duration: '1h24m00s',
    framework: 'Transformers',
    runtime: 'huggingface-runtime',
    nodes: 2,
    namespace: 'sentiment-analysis',
    image: 'huggingface/transformers-pytorch-gpu:4.24.0',
    command: ['python3', '/opt/sentiment-analysis/train.py', '--model=bert-base-uncased', '--task=sentiment'],
    resources: {
      requests: { cpu: '4', memory: '16Gi', 'nvidia.com/gpu': '2' },
      limits: { cpu: '8', memory: '32Gi', 'nvidia.com/gpu': '2' }
    },
    trainingRuntimeRef: {
      name: 'huggingface-runtime',
      kind: 'ClusterTrainingRuntime'
    },
    conditions: [
      {
        type: 'Created',
        status: 'True',
        reason: 'TrainJobCreated',
        message: 'TrainJob bert-sentiment-analysis is created.',
        lastTransitionTime: '2025-01-08T14:00:00Z'
      },
      {
        type: 'Running',
        status: 'False',
        reason: 'TrainJobRunning',
        message: 'TrainJob bert-sentiment-analysis is running.',
        lastTransitionTime: '2025-01-08T14:06:00Z'
      },
      {
        type: 'Succeeded',
        status: 'True',
        reason: 'TrainJobSucceeded',
        message: 'TrainJob bert-sentiment-analysis is successfully completed.',
        lastTransitionTime: '2025-01-08T15:30:00Z'
      }
    ],
    jobsets: [
      {
        name: 'bert-sentiment-analysis-jobset',
        status: 'Completed',
        jobs: 2,
        created: '2025-01-08T14:00:30Z',
        jobs_list: [
          {
            name: 'model-initializer',
            status: 'Completed',
            completions: '1/1',
            duration: '5m15s',
            created: '2025-01-08T14:00:45Z',
            pods: [
              {
                name: 'model-initializer-pod-0',
                status: 'Completed',
                node: 'cpu-node-2',
                created: '2025-01-08T14:00:50Z',
                restarts: 0,
                logs: `[2025-01-08 14:00:50] INFO: Model initializer starting
[2025-01-08 14:00:51] INFO: Downloading BERT base model
[2025-01-08 14:03:30] INFO: Model downloaded successfully
[2025-01-08 14:03:31] INFO: Preparing model for fine-tuning
[2025-01-08 14:05:45] INFO: Model initialization completed`
              }
            ]
          },
          {
            name: 'training-job',
            status: 'Completed',
            completions: '2/2',
            duration: '1h23m45s',
            created: '2025-01-08T14:06:00Z',
            pods: [
              {
                name: 'training-job-master-0',
                status: 'Completed',
                node: 'gpu-node-5',
                created: '2025-01-08T14:06:15Z',
                restarts: 0,
                logs: `[2025-01-08 14:06:15] INFO: Training master starting
[2025-01-08 14:06:16] INFO: Loading BERT model
[2025-01-08 14:06:45] INFO: Model loaded successfully
[2025-01-08 14:06:46] INFO: Loading sentiment dataset
[2025-01-08 14:07:00] INFO: Dataset loaded: 25000 samples
[2025-01-08 14:07:01] INFO: Training started
[2025-01-08 15:30:00] INFO: Training completed - Accuracy: 92.4%`
              },
              {
                name: 'training-job-worker-0',
                status: 'Completed',
                node: 'gpu-node-6',
                created: '2025-01-08T14:06:20Z',
                restarts: 0,
                logs: `[2025-01-08 14:06:20] INFO: Training worker starting
[2025-01-08 14:06:21] INFO: Connecting to master
[2025-01-08 14:07:00] INFO: Connected, training started
[2025-01-08 15:30:00] INFO: Training completed on worker`
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'vision-transformer-training',
    project: 'computer-vision',
    status: 'Running',
    created: '2025-01-09T12:00:00Z',
    startTime: '2025-01-09T12:01:00Z',
    duration: '2h15m30s',
    framework: 'Transformers',
    runtime: 'vision-runtime',
    nodes: 2,
    namespace: 'computer-vision',
    image: 'huggingface/transformers-pytorch-gpu:4.26.0',
    command: ['python3', '/opt/vision-training/train_vit.py', '--model=vit-base-patch16-224', '--dataset=imagenet'],
    resources: {
      requests: { cpu: '6', memory: '24Gi', 'nvidia.com/gpu': '2' },
      limits: { cpu: '12', memory: '48Gi', 'nvidia.com/gpu': '2' }
    },
    trainingRuntimeRef: {
      name: 'vision-runtime',
      kind: 'TrainingRuntime'
    },
    conditions: [
      {
        type: 'Created',
        status: 'True',
        reason: 'TrainJobCreated',
        message: 'TrainJob vision-transformer-training is created.',
        lastTransitionTime: '2025-01-09T12:00:00Z'
      },
      {
        type: 'Running',
        status: 'True',
        reason: 'TrainJobRunning',
        message: 'TrainJob vision-transformer-training is running.',
        lastTransitionTime: '2025-01-09T12:01:00Z'
      }
    ],
    jobsets: [
      {
        name: 'vision-transformer-training-jobset',
        status: 'Running',
        jobs: 1,
        created: '2025-01-09T12:00:30Z',
        jobs_list: [
          {
            name: 'vision-training-job',
            status: 'Running',
            completions: '0/2',
            duration: '2h15m30s',
            created: '2025-01-09T12:01:00Z',
            pods: [
              {
                name: 'vision-training-job-master-0',
                status: 'Running',
                node: 'gpu-node-8',
                created: '2025-01-09T12:01:15Z',
                restarts: 0,
                logs: `[2025-01-09 12:01:15] INFO: Vision Transformer training starting
[2025-01-09 12:01:16] INFO: Loading ImageNet dataset
[2025-01-09 12:02:30] INFO: Dataset loaded: 1.2M images
[2025-01-09 12:02:31] INFO: Initializing ViT-Base model
[2025-01-09 12:03:00] INFO: Training started - Epoch 1/100
[2025-01-09 14:15:00] INFO: Epoch 50 completed - Accuracy: 78.3%`
              },
              {
                name: 'vision-training-job-worker-0',
                status: 'Running',
                node: 'gpu-node-9',
                created: '2025-01-09T12:01:20Z',
                restarts: 0,
                logs: `[2025-01-09 12:01:20] INFO: Vision worker starting
[2025-01-09 12:01:21] INFO: Connecting to master
[2025-01-09 12:03:00] INFO: Connected, training started
[2025-01-09 14:15:00] INFO: Epoch 50 processing completed`
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'bert-pretraining-suspended',
    project: 'nlp-research',
    status: 'Suspended',
    created: '2025-01-12T08:30:00Z',
    startTime: '2025-01-12T08:33:15Z',
    duration: '2h15m30s',
    framework: 'Transformers',
    runtime: 'llm-runtime',
    nodes: 8,
    namespace: 'nlp-research',
    image: 'huggingface/transformers-pytorch-gpu:4.25.0',
    command: ['python3', '/opt/bert-training/pretrain.py', '--model=bert-large', '--dataset=wikipedia'],
    resources: {
      requests: { cpu: '16', memory: '64Gi', 'nvidia.com/gpu': '8' },
      limits: { cpu: '32', memory: '128Gi', 'nvidia.com/gpu': '8' }
    },
    trainingRuntimeRef: {
      name: 'llm-runtime',
      kind: 'ClusterTrainingRuntime'
    },
    conditions: [
      {
        type: 'Created',
        status: 'True',
        reason: 'TrainJobCreated',
        message: 'TrainJob bert-pretraining-suspended is created.',
        lastTransitionTime: '2025-01-12T08:30:00Z'
      },
      {
        type: 'Suspended',
        status: 'True',
        reason: 'UserRequested',
        message: 'TrainJob bert-pretraining-suspended suspended by user request.',
        lastTransitionTime: '2025-01-12T10:45:45Z'
      }
    ],
    jobsets: [
      {
        name: 'bert-pretraining-suspended-jobset',
        status: 'Suspended',
        jobs: 3,
        created: '2025-01-12T08:30:30Z',
        jobs_list: [
          {
            name: 'dataset-initializer',
            status: 'Completed',
            completions: '1/1',
            duration: '2m45s',
            created: '2025-01-12T08:30:30Z',
            pods: [
              {
                name: 'dataset-initializer-pod-0',
                status: 'Completed',
                node: 'data-node-1',
                created: '2025-01-12T08:30:35Z',
                restarts: 0,
                logs: `[INFO] Initializing Wikipedia dataset
[INFO] Downloaded 50GB of training data
[INFO] Preprocessing completed
[INFO] Dataset ready for training`
              }
            ]
          },
          {
            name: 'model-initializer',
            status: 'Completed',
            completions: '1/1',
            duration: '1m20s',
            created: '2025-01-12T08:32:15Z',
            pods: [
              {
                name: 'model-initializer-pod-0',
                status: 'Completed',
                node: 'gpu-node-1',
                created: '2025-01-12T08:32:20Z',
                restarts: 0,
                logs: `[INFO] Initializing BERT-Large model
[INFO] Model weights loaded
[INFO] Distributed training setup complete`
              }
            ]
          },
          {
            name: 'trainer-nodes',
            status: 'Suspended',
            completions: '0/8',
            duration: '2h15m30s',
            created: '2025-01-12T08:33:15Z',
            pods: [
              {
                name: 'trainer-nodes-0',
                status: 'Terminated',
                node: 'gpu-node-2',
                created: '2025-01-12T08:33:20Z',
                restarts: 0,
                logs: `[INFO] BERT pretraining started
[INFO] Training progress: 35% complete
[INFO] Current loss: 2.847
[INFO] Checkpoint saved: /checkpoints/bert_step_15000.pt
[INFO] Training suspended - graceful shutdown`
              },
              {
                name: 'trainer-nodes-1',
                status: 'Terminated',
                node: 'gpu-node-3',
                created: '2025-01-12T08:33:20Z',
                restarts: 0,
                logs: `[INFO] Worker node 1 initialized
[INFO] Synchronized with master
[INFO] Processing training batches
[INFO] Suspend signal received
[INFO] Worker node 1 shutdown complete`
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'vision-transformer-paused',
    project: 'computer-vision',
    status: 'Suspended',
    created: '2025-01-13T16:45:00Z',
    startTime: '2025-01-13T16:47:30Z',
    duration: '4h22m15s',
    framework: 'PyTorch',
    runtime: 'pytorch-runtime',
    nodes: 6,
    namespace: 'computer-vision',
    image: 'pytorch/pytorch:2.1.0-cuda11.8-cudnn8-devel',
    command: ['python3', '/opt/vit-training/train_vit.py', '--model=vit-large', '--dataset=imagenet'],
    resources: {
      requests: { cpu: '12', memory: '48Gi', 'nvidia.com/gpu': '6' },
      limits: { cpu: '24', memory: '96Gi', 'nvidia.com/gpu': '6' }
    },
    trainingRuntimeRef: {
      name: 'pytorch-runtime',
      kind: 'TrainingRuntime'
    },
    conditions: [
      {
        type: 'Created',
        status: 'True',
        reason: 'TrainJobCreated',
        message: 'TrainJob vision-transformer-paused is created.',
        lastTransitionTime: '2025-01-13T16:45:00Z'
      },
      {
        type: 'Suspended',
        status: 'True',
        reason: 'ResourceConstraints',
        message: 'TrainJob vision-transformer-paused suspended due to cluster resource constraints.',
        lastTransitionTime: '2025-01-13T21:09:45Z'
      }
    ],
    jobsets: [
      {
        name: 'vision-transformer-paused-jobset',
        status: 'Suspended',
        jobs: 2,
        created: '2025-01-13T16:45:30Z',
        jobs_list: [
          {
            name: 'data-loader',
            status: 'Completed',
            completions: '1/1',
            duration: '1h15m30s',
            created: '2025-01-13T16:45:30Z',
            pods: [
              {
                name: 'data-loader-pod-0',
                status: 'Completed',
                node: 'storage-node-1',
                created: '2025-01-13T16:45:35Z',
                restarts: 0,
                logs: `[INFO] Loading ImageNet dataset
[INFO] Data preprocessing pipeline initialized
[INFO] 1.2M training images loaded
[INFO] Data augmentation configured
[INFO] Dataset ready for distributed training`
              }
            ]
          },
          {
            name: 'vit-training-workers',
            status: 'Suspended',
            completions: '0/6',
            duration: '4h22m15s',
            created: '2025-01-13T16:47:30Z',
            pods: [
              {
                name: 'vit-training-workers-0',
                status: 'Terminated',
                node: 'gpu-node-4',
                created: '2025-01-13T16:47:35Z',
                restarts: 0,
                logs: `[INFO] Vision Transformer training initialized
[INFO] Model: ViT-Large/16
[INFO] Training progress: 78% complete
[INFO] Current accuracy: 84.2%
[INFO] Best checkpoint saved: /checkpoints/vit_best.pt
[INFO] Training suspended due to resource constraints`
              }
            ]
          }
        ]
      }
    ]
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
