import React from 'react';
import { Activity, TrendingUp, Sliders, BarChart3 } from 'lucide-react';
import { getStatusIcon } from '../../../utils/helpers';
import { Experiment } from '../../../utils/constants';

interface ExperimentationViewProps {
  view: 'experiments' | 'metrics' | 'parameters';
  experiments: Experiment[];
}

const ExperimentationView: React.FC<ExperimentationViewProps> = ({ view, experiments }) => {
  if (view === 'experiments') {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Activity className="w-6 h-6 text-blue-600 mr-3" />
            <h1 className="text-2xl font-semibold text-gray-900">Experiments</h1>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Create experiment
          </button>
        </div>
        
        <p className="text-gray-600 mb-6">
          Track and compare machine learning experiments. Monitor metrics, parameters, and model performance across runs.
        </p>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-medium text-gray-700">Name</th>
                  <th className="text-left p-3 font-medium text-gray-700">Created</th>
                  <th className="text-left p-3 font-medium text-gray-700">Status</th>
                  <th className="text-left p-3 font-medium text-gray-700">Runs</th>
                  <th className="text-left p-3 font-medium text-gray-700">Best accuracy</th>
                  <th className="text-left p-3 font-medium text-gray-700">Author</th>
                </tr>
              </thead>
              <tbody>
                {experiments.map((experiment, index) => (
                  <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="p-3">
                      <span className="text-blue-600 hover:underline cursor-pointer">{experiment.name}</span>
                    </td>
                    <td className="p-3 text-gray-700">{experiment.created}</td>
                    <td className="p-3">
                      <div className="flex items-center">
                        {getStatusIcon(experiment.status)}
                        <span className="ml-2">{experiment.status}</span>
                      </div>
                    </td>
                    <td className="p-3 text-gray-700">{experiment.runs}</td>
                    <td className="p-3 text-gray-700">{experiment.bestAccuracy}</td>
                    <td className="p-3 text-gray-700">{experiment.author}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'metrics') {
    return (
      <div className="p-6">
        <div className="flex items-center mb-6">
          <TrendingUp className="w-6 h-6 text-blue-600 mr-3" />
          <h1 className="text-2xl font-semibold text-gray-900">Metrics</h1>
        </div>
        
        <p className="text-gray-600 mb-6">
          Visualize and compare experiment metrics. Track model performance over time and across different configurations.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Accuracy Trends</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Accuracy chart visualization</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Loss Curves</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Loss curve visualization</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Metrics</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">94.2%</div>
                <div className="text-gray-600">Best Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">0.045</div>
                <div className="text-gray-600">Lowest Loss</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">25</div>
                <div className="text-gray-600">Total Runs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Parameters view
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Sliders className="w-6 h-6 text-blue-600 mr-3" />
          <h1 className="text-2xl font-semibold text-gray-900">Parameters</h1>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Create parameter set
        </button>
      </div>
      
      <p className="text-gray-600 mb-6">
        Manage hyperparameters and configuration sets. Track parameter combinations and their impact on model performance.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Parameter Importance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Learning Rate</span>
                <span>0.85</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Batch Size</span>
                <span>0.72</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '72%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Hidden Layers</span>
                <span>0.58</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '58%'}}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Best Parameters</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Learning Rate:</span>
              <span className="font-medium">0.001</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Batch Size:</span>
              <span className="font-medium">32</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Hidden Layers:</span>
              <span className="font-medium">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Dropout Rate:</span>
              <span className="font-medium">0.2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Optimizer:</span>
              <span className="font-medium">Adam</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperimentationView;
