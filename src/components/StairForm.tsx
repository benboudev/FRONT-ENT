import { useState } from 'react';
import { Ruler, ArrowUpSquare, DollarSign } from 'lucide-react';  // Changed icon names
import type { StairConfig } from '../types';

interface Props {
  onSubmit: (config: StairConfig) => void;
  isLoading: boolean;
}

export default function StairForm({ onSubmit, isLoading }: Props) {
  const [config, setConfig] = useState<StairConfig>({
    width: 36,
    height: 108,
    depth: 11,
    steps: 6,
    material: 'pine',
    finish: 'natural'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(config);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: name === 'steps' ? parseInt(value) : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Ruler size={16} />
            Width (inches)
          </label>
          <input
            type="number"
            name="width"
            value={config.width}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="24"
            max="48"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Ruler size={16} />
            Height (inches)
          </label>
          <input
            type="number"
            name="height"
            value={config.height}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="60"
            max="144"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Ruler size={16} />
            Depth (inches)
          </label>
          <input
            type="number"
            name="depth"
            value={config.depth}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="9"
            max="14"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <ArrowUpSquare size={16} />
            Number of Steps
          </label>
          <input
            type="number"
            name="steps"
            value={config.steps}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="3"
            max="16"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            Material
          </label>
          <select
            name="material"
            value={config.material}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="pine">Pine</option>
            <option value="oak">Oak</option>
            <option value="maple">Maple</option>
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            Finish
          </label>
          <select
            name="finish"
            value={config.finish}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="natural">Natural</option>
            <option value="stained">Stained</option>
            <option value="painted">Painted</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        <DollarSign size={16} />
        {isLoading ? 'Calculating...' : 'Get Quote'}
      </button>
    </form>
  );
}
