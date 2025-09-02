import React from 'react';
import { Grid, CheckCircle } from 'lucide-react';
import { getStatusIcon } from '../../../utils/helpers';
import { Application, AvailableApp } from '../../../utils/constants';

interface ApplicationsViewProps {
  view: 'enabled' | 'explore';
  applications: Application[];
  availableApps: AvailableApp[];
}

const ApplicationsView: React.FC<ApplicationsViewProps> = ({ view, applications, availableApps }) => {
  if (view === 'enabled') {
    return (
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
  }

  // Explore view
  return (
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
};

export default ApplicationsView;
