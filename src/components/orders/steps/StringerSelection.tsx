import { useState, useEffect } from 'react';
import { Package, Ruler } from 'lucide-react';
import { materialApi } from '../../../api/materialApi';
import type { Material } from '../../../types/material';

interface Props {
  data: {
    material_id: number;
    quantity: number;
    cut_size: number;
  };
  stringerLength: number;
  onUpdate: (data: any) => void;
}

const StringerSelection = ({ data, stringerLength, onUpdate }: Props) => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMaterials = async () => {
      try {
        const response = await materialApi.getAll();
        const allMaterials = Array.isArray(response) ? response : response.data || [];
        // Filter for stringer materials (category_id = 3)
        setMaterials(allMaterials.filter(m => m.material_category_id === 3));
      } catch (error) {
        console.error('Failed to load materials:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMaterials();
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-xl font-semibold text-gray-900">Stringer Selection</div>
      
      <div className="grid grid-cols-1 gap-8">
        {/* Stringer Material Selection */}
        <div className="space-y-2">
          <label className="block text-base font-medium text-gray-700 flex items-center gap-2">
            <Package className="h-5 w-5 text-gray-400" />
            Stringer Material
          </label>
          <select
            value={data.material_id || ''}
            onChange={(e) => onUpdate({ 
              ...data, 
              material_id: parseInt(e.target.value),
              cut_size: stringerLength
            })}
            className="block w-full px-6 py-4 text-lg rounded-lg border shadow-sm 
              transition-colors min-h-[3.5rem] focus:ring-2 focus:ring-blue-500 
              focus:border-blue-500 appearance-none bg-white"
            required
          >
            <option value="">Select stringer material</option>
            {materials.map((material) => (
              <option key={material.id} value={material.id}>
                {material.name} - ${material.price}
              </option>
            ))}
          </select>
        </div>

        {/* Length Display */}
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <Ruler className="h-6 w-6 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-blue-900">Required Length</p>
              <p className="text-2xl font-semibold text-blue-700">{stringerLength}" inches</p>
              <p className="text-sm text-blue-600 mt-1">({(stringerLength / 12).toFixed(1)} feet)</p>
            </div>
          </div>
        </div>

        {/* Material Preview */}
        {data.material_id && (
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <h3 className="font-medium text-gray-900">Selected Material Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Material</p>
                <p className="text-base font-medium">
                  {materials.find(m => m.id === data.material_id)?.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Length Needed</p>
                <p className="text-base font-medium">{stringerLength}" inches</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Price per Unit</p>
                <p className="text-base font-medium">
                  ${materials.find(m => m.id === data.material_id)?.price}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Estimated Cost</p>
                <p className="text-base font-medium">
                  ${((materials.find(m => m.id === data.material_id)?.price || 0) * (stringerLength / 12)).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StringerSelection;
