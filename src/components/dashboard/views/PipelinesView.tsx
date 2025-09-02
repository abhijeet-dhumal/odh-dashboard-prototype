import React from 'react';
import { GitBranch, Play, ChevronDown } from 'lucide-react';
import { getStatusIcon } from '../../../utils/helpers';
import { Pipeline, PipelineRun } from '../../../utils/constants';

interface PipelinesViewProps {
  view: 'pipelines' | 'runs';
  pipelines: Pipeline[];
  pipelineRuns: PipelineRun[];
}

const PipelinesView: React.FC<PipelinesViewProps> = ({ view, pipelines, pipelineRuns }) => {
  if (view === 'pipelines') {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <GitBranch className="w-6 h-6 text-blue-600 mr-3" />
            <h1 className="text-2xl font-semibold text-gray-900">Pipelines</h1>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Create pipeline
          </button>
        </div>
        
        <p className="text-gray-600 mb-6">
          Build and manage data science pipelines. Automate your ML workflows from data preprocessing to model deployment.
        </p>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-medium text-gray-700">Name</th>
                  <th className="text-left p-3 font-medium text-gray-700">Description</th>
                  <th className="text-left p-3 font-medium text-gray-700">Created</th>
                  <th className="text-left p-3 font-medium text-gray-700">Last run</th>
                  <th className="text-left p-3 font-medium text-gray-700">Status</th>
                  <th className="text-left p-3 font-medium text-gray-700">Runs</th>
                </tr>
              </thead>
              <tbody>
                {pipelines.map((pipeline, index) => (
                  <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="p-3">
                      <span className="text-blue-600 hover:underline cursor-pointer">{pipeline.name}</span>
                    </td>
                    <td className="p-3 text-gray-700">{pipeline.description}</td>
                    <td className="p-3 text-gray-700">{pipeline.created}</td>
                    <td className="p-3 text-gray-700">{pipeline.lastRun}</td>
                    <td className="p-3">
                      <div className="flex items-center">
                        {getStatusIcon(pipeline.status)}
                        <span className="ml-2">{pipeline.status}</span>
                      </div>
                    </td>
                    <td className="p-3 text-gray-700">{pipeline.runs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Runs view
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Play className="w-6 h-6 text-blue-600 mr-3" />
          <h1 className="text-2xl font-semibold text-gray-900">Runs</h1>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Create run
        </button>
      </div>
      
      <p className="text-gray-600 mb-6">
        Monitor pipeline execution history. View run details, logs, and performance metrics.
      </p>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-medium text-gray-700">Run name</th>
                <th className="text-left p-3 font-medium text-gray-700">Pipeline</th>
                <th className="text-left p-3 font-medium text-gray-700">Started</th>
                <th className="text-left p-3 font-medium text-gray-700">Duration</th>
                <th className="text-left p-3 font-medium text-gray-700">Status</th>
                <th className="text-left p-3 font-medium text-gray-700">Triggered by</th>
              </tr>
            </thead>
            <tbody>
              {pipelineRuns.map((run, index) => (
                <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="p-3">
                    <span className="text-blue-600 hover:underline cursor-pointer">{run.name}</span>
                  </td>
                  <td className="p-3 text-gray-700">{run.pipeline}</td>
                  <td className="p-3 text-gray-700">{run.started}</td>
                  <td className="p-3 text-gray-700">{run.duration}</td>
                  <td className="p-3">
                    <div className="flex items-center">
                      {getStatusIcon(run.status)}
                      <span className="ml-2">{run.status}</span>
                    </div>
                  </td>
                  <td className="p-3 text-gray-700">{run.triggeredBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PipelinesView;
