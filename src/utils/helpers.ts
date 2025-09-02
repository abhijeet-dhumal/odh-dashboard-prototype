import { CheckCircle, XCircle, Play, Clock, AlertCircle } from 'lucide-react';

/**
 * Get the appropriate status icon based on status string
 */
export const getStatusIcon = (status: string) => {
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

/**
 * Check if a view is currently active based on current view and menu item
 */
export const isViewActive = (currentView: string, itemId: string): boolean => {
  const activeConditions = {
    'projects': currentView === 'projects' && itemId === 'projects',
    'models': (currentView.includes('model') || currentView === 'training') && itemId === 'models',
    'pipelines': (currentView.includes('pipeline') || currentView === 'runs') && itemId === 'pipelines',
    'experimentation': (currentView.includes('experiment') || currentView === 'metrics' || currentView === 'parameters') && itemId === 'experimentation',
    'workloads': currentView === 'workloads' && itemId === 'workloads',
    'applications': currentView.includes('applications') && itemId === 'applications',
    'resources': currentView === 'resources' && itemId === 'resources',
    'settings': currentView.includes('settings') && itemId === 'settings'
  };

  return Object.values(activeConditions).some(condition => condition);
};

/**
 * Check if a submenu item is currently active
 */
export const isSubmenuActive = (currentView: string, subItemId: string): boolean => {
  const submenuConditions = {
    'training': currentView === 'training' && subItemId === 'training',
    'registry': currentView === 'model-registry' && subItemId === 'registry',
    'deployments': currentView === 'model-deployments' && subItemId === 'deployments',
    'pipelines': currentView === 'pipelines' && subItemId === 'pipelines',
    'runs': currentView === 'runs' && subItemId === 'runs',
    'experiments': currentView === 'experiments' && subItemId === 'experiments',
    'metrics': currentView === 'metrics' && subItemId === 'metrics',
    'parameters': currentView === 'parameters' && subItemId === 'parameters',
    'enabled': currentView === 'applications-enabled' && subItemId === 'enabled',
    'explore': currentView === 'applications-explore' && subItemId === 'explore',
    'settings': currentView.includes('settings-') && subItemId.includes(currentView.split('-')[1])
  };

  return Object.values(submenuConditions).some(condition => condition);
};
