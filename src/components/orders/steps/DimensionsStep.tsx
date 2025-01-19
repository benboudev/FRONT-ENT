import { useState } from 'react';
import { Ruler, ArrowLeftRight, Calculator } from 'lucide-react';

interface Props {
  onUpdate: (width: number) => void;
}

const DimensionsStep = ({ onUpdate }: Props) => {
  const [width, setWidth] = useState<number>(0);
  const [calculatedWidth, setCalculatedWidth] = useState<number>(0);

  const handleWidthChange = (value: number) => {
    setWidth(value);
    const calculated = value - 1.25;
    setCalculatedWidth(calculated);
    onUpdate(value);
  };

  return (
    <div className="space-y-8">
      <div className="text-xl font-semibold text-gray-900">Step Dimensions</div>

      <div className="grid grid-cols-1 gap-8">
        {/* Step Width Input */}
        <div className="space-y-2">
          <label className="block text-base font-medium text-gray-700 flex items-center gap-2">
            <ArrowLeftRight className="h-5 w-5 text-gray-400" />
            Step Width (inches)
          </label>
          <input
            type="number"
            min="0"
            step="0.125"
            value={width || ''}
            onChange={(e) => handleWidthChange(parseFloat(e.target.value))}
            className="block w-full px-6 py-4 text-lg rounded-lg border shadow-sm 
              transition-colors min-h-[3.5rem] focus:ring-2 focus:ring-blue-500 
              focus:border-blue-500"
            placeholder="Enter step width"
            required
          />
        </div>

        {/* Calculations Display */}
        {width > 0 && (
          <div className="bg-blue-50 rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-600" />
              <h3 className="font-medium text-blue-900">Calculated Dimensions</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-blue-700">Input Width</p>
                <p className="text-2xl font-semibold text-blue-900">{width}" inches</p>
              </div>
              <div>
                <p className="text-sm text-blue-700">Cut Size (Width - 1.25")</p>
                <p className="text-2xl font-semibold text-blue-900">{calculatedWidth.toFixed(3)}" inches</p>
              </div>
            </div>
          </div>
        )}

        {/* Information Box */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-3">
            <Ruler className="h-5 w-5 text-gray-600" />
            <h3 className="font-medium text-gray-900">Dimension Guidelines</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• The final cut size will be 1.25 inches less than the input width</li>
            <li>• Measurements should be precise to 1/8 inch (0.125)</li>
            <li>• Standard step widths typically range from 36" to 42"</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DimensionsStep;
