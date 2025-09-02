import React from 'react';
import { ChevronRight, Database, Cpu, BarChart3 } from 'lucide-react';

interface Project {
  name: string;
  created: string;
  owner: string;
}

interface ProjectsViewProps {
  projects: Project[];
}

const ProjectsView: React.FC<ProjectsViewProps> = ({ projects }) => {
  const renderProjectCard = (project: Project) => (
    <div key={project.name} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center mb-3">
        <div className="w-8 h-6 bg-orange-400 rounded-sm mr-3"></div>
        <h3 className="text-blue-600 font-medium hover:underline cursor-pointer">{project.name}</h3>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <div>
          <span className="font-medium">Created</span>
          <div>{project.created}</div>
        </div>
        <div>
          <span className="font-medium">Owner</span>
          <div>{project.owner}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-orange-400 rounded mr-3"></div>
          <h1 className="text-2xl font-semibold text-gray-900">Data Science Projects</h1>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Create project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {projects.map(renderProjectCard)}
      </div>

      <div className="text-sm text-gray-600 mb-8">
        5 of 11 projects · <span className="text-blue-600 underline cursor-pointer">Go to Data Science Projects</span>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Train, serve, monitor, and manage AI/ML models</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-8 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Database className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-medium text-gray-900">Organize your work with projects</h3>
          </div>
          <div className="text-center p-8 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Cpu className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900">Create and train models</h3>
          </div>
          <div className="text-center p-8 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-900">Manage models</h3>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <button className="flex items-center text-gray-700 hover:text-gray-900">
          <ChevronRight className="w-5 h-5 mr-2" />
          <span className="font-medium">Get oriented with learning resources</span>
        </button>
      </div>
    </div>
  );
};

export default ProjectsView;
