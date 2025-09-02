# Open Data Hub Dashboard Prototype

A modern React-based prototype of the Open Data Hub dashboard interface, built with TypeScript, Vite, and Tailwind CSS.

![Open Data Hub Dashboard](./src/assets/ODH_dashboard.png)

## Features

### 🎯 Core Sections
- **Data Science Projects** - Project management and overview
- **Model Management** - Model registry, deployments, and training
- **Data Science Pipelines** - Pipeline creation and run management
- **Experimentation** - Experiment tracking, metrics, and parameters
- **Distributed Workloads** - Workload monitoring and resource management
- **Applications** - Enabled applications and app catalog
- **Resources** - Cluster resource monitoring and quotas
- **Settings** - Comprehensive system configuration

### 🚀 Key Features
- **Responsive Design** - Works seamlessly across desktop and mobile devices
- **Modern UI/UX** - Clean, intuitive interface following modern design principles
- **Interactive Components** - Dropdown menus, tabs, tables, and navigation
- **Status Indicators** - Visual status icons and progress indicators
- **Data Visualization** - Charts and metrics for resource monitoring
- **Type Safety** - Full TypeScript implementation for better development experience

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd open-data-hub-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── dashboard/          # Main dashboard component
│   └── ui/                 # Reusable UI components
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions and constants
├── assets/                 # Static assets (images, etc.)
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
└── index.css              # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Navigation Structure

### Main Sections
- **Home** - Dashboard overview
- **Data Science Projects** - Project management
- **Models** (expandable)
  - Model Registry
  - Model Deployments  
  - Model Training
- **Data Science Pipelines** (expandable)
  - Pipelines
  - Runs
- **Experimentation** (expandable)
  - Experiments
  - Metrics
  - Parameters
- **Distributed Workloads** - Resource monitoring
- **Applications** (expandable)
  - Enabled
  - Explore
- **Resources** - Cluster resources
- **Settings** (expandable)
  - Workbench Images
  - Cluster Settings
  - Accelerator Profiles
  - Serving Runtimes
  - Connection Types
  - Storage Classes
  - Model Registry Settings
  - User Management

## Development

### Adding New Components

1. Create components in the appropriate directory under `src/components/`
2. Add type definitions to `src/types/index.ts`
3. Update constants in `src/utils/constants.ts` if needed
4. Import and use in the main Dashboard component

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow the existing color scheme and spacing
- Maintain responsive design principles
- Use consistent component patterns

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the Open Data Hub project
- Built with modern React and TypeScript best practices
- Uses Tailwind CSS for styling
- Icons provided by Lucide React