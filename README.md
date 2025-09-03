# Open Data Hub Dashboard Prototype

A React-based dashboard for Open Data Hub featuring comprehensive Kueue and Kubeflow Trainer v2 metrics visualization.

![Open Data Hub Dashboard](./src/assets/ODH_dashboard.png)

## Features

### Kueue Metrics Dashboard
Comprehensive visualization of Kueue workload management with namespace-scoped filtering:

![Kueue Metrics - Status Overview](./src/assets/kueue_metrics_1.png)
*Kueue workload status overview with admission flow visualization*

![Kueue Metrics - Resource Management](./src/assets/kueue_metrics_2.png)
*Resource flavors, cohorts, and cluster queue management*

![Kueue Metrics - Queue Details](./src/assets/kueue_metrics_3.png)
*Local and cluster queue details with pagination*

### Kubeflow Trainer v2 Metrics Dashboard
Advanced metrics for Kubeflow Trainer v2 with TrainJob and runtime management:

![Trainer Metrics - Overview](./src/assets/Trainer_metrics_1.png)
*Trainer v2 overview with TrainJob status and resource flow*

![Trainer Metrics - Runtime Management](./src/assets/trainer_metrics_2.png)
*Separate TrainingRuntimes and ClusterTrainingRuntimes management*

### Model Training Dashboard
Hierarchical view of PyTorchJobs and TrainJobs with detailed metadata and pod inspection:

![Model Training - PyTorchJob View](./src/assets/model_training_pytorchjob_view.png)
*PyTorchJob hierarchical view with expandable pods and structured metadata*

![Model Training - TrainJob View](./src/assets/model_training_trainjob_view.png)
*TrainJob hierarchical view with JobSets, Jobs, and Pod drill-down capabilities*

## Getting Started

### Install dependencies
```bash
npm install
```

### Start development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```