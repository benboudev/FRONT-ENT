import { useState, useEffect } from 'react';
import { StepForward, Package } from 'lucide-react'; // Replaced Steps with StepForward
import { materialApi } from '../../../api/materialApi';
import type { Material } from '../../../types/material';

interface Props {
  data: {
    material_id: number;
    quantity: number;
    cut_size: number;
  };
  riserQuantity: number;
  onUpdate: (data: any) => void;
}

const RiserSelection = ({ data, riserQuantity, onUpdate }: Props) => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMaterials = async () => {
      try {
        const response = await materialApi.getAll();
        const allMaterials = Array.isArray(response) ? response : response.data || [];
        // Filter for riser materials (category_id = 1)
        setMaterials(allMaterials.filter(m => m.material_category_id === 1));
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
      <div className="text-xl font-semibold text-gray-900">Riser Selection</div>
      
      <div className="grid grid-cols-1 gap-8">
        {/* Number of Risers */}
        <div className="space-y-2">
          <label className="block text-base font-medium text-gray-700 flex items-center gap-2">
            <StepForward className="h-5 w-5 text-gray-400" />
            Number of Risers
          </label>
          <input
            type="number"
            min="1"
            value={data.quantity || ''}
            onChange={(e) => onUpdate({ 
              ...data, 
              quantity: parseInt(e.target.value) 
            })}
            className="block w-full px-6 py-4 text-lg rounded-lg border shadow-sm 
              transition-colors min-h-[3.5rem] focus:ring-2 focus:ring-blue-500 
              focus:border-blue-500"
            required
          />
          <p className="text-sm text-gray-500 mt-2">
            This will determine the number of steps in your staircase
          </p>
        </div>

        {/* Rest of the component remains the same */}
        {/* ... */}
      </div>
    </div>
  );
};

export default RiserSelection;
