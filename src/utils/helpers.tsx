import React from 'react';
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
    case 'Admitted': return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'Inadmissible': return <XCircle className="w-4 h-4 text-red-500" />;
    default: return <AlertCircle className="w-4 h-4 text-yellow-500" />;
  }
};

/**
 * Pagination helper function
 */
export interface PaginationResult<T> {
  data: T[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export const paginateData = <T,>(data: T[], pagination: { page: number; limit: number }): PaginationResult<T> => {
  const startIndex = (pagination.page - 1) * pagination.limit;
  const endIndex = startIndex + pagination.limit;
  return {
    data: data.slice(startIndex, endIndex),
    totalPages: Math.ceil(data.length / pagination.limit),
    totalItems: data.length,
    currentPage: pagination.page,
    hasNext: endIndex < data.length,
    hasPrev: pagination.page > 1
  };
};

/**
 * Pagination Controls Component
 */
export interface PaginationControlsProps {
  pagination: { page: number; limit: number };
  setPagination: (p: { page: number; limit: number }) => void;
  totalPages: number;
  totalItems: number;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({ 
  pagination, 
  setPagination, 
  totalPages, 
  totalItems 
}) => (
  <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200">
    <div className="flex items-center text-sm text-gray-700">
      <span>
        Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
        {Math.min(pagination.page * pagination.limit, totalItems)} of {totalItems} results
      </span>
    </div>
    <div className="flex items-center space-x-2">
      <select
        value={pagination.limit}
        onChange={(e) => setPagination({ page: 1, limit: parseInt(e.target.value) })}
        className="text-sm border border-gray-300 rounded px-2 py-1"
      >
        <option value={5}>5 per page</option>
        <option value={10}>10 per page</option>
        <option value={25}>25 per page</option>
        <option value={50}>50 per page</option>
      </select>
      <button
        onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
        disabled={pagination.page <= 1}
        className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        Previous
      </button>
      <span className="text-sm text-gray-700">
        Page {pagination.page} of {totalPages}
      </span>
      <button
        onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
        disabled={pagination.page >= totalPages}
        className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        Next
      </button>
    </div>
  </div>
);

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
