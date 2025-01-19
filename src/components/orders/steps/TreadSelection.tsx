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
  quantity: number;
  onUpdate: (data: any) => void;
}

const TreadSelection = ({ data, quantity, onUpdate }: Props) => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMaterials = async () => {
      try {
        const response = await materialApi.getAll();
        const allMaterials = Array.isArray(response) ? response : response.data || [];
        // Filter for tread materials (category_id = 2)
        setMaterials(allMaterials.filter(m => m.material_category_id === 2));
      } catch (error) {
        console.error('Failed to load materials:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMaterials();
  }, []);

  useEffect(() => {
    // Update quantity based on number of risers
    onUpdate({ ...data, quantity });
  }, [quantity]);

  return (
    <div className="space-y-8">
      <div className="text-xl font-semibold text-gray-900">Tread Selection</div>
      
      {/* Quantity Display */}
      <div className="bg-blue-50 rounded-lg p-6">
        <div className="flex items-center gap-3">
          <StepForward className="h-6 w-6 text-blue-500" />
          <div>
            <p className="text-sm font-medium text-blue-900">Required Treads</p>
            <p className="text-2xl font-semibold text-blue-700">{quantity} pieces</p>
          </div>
        </div>
      </div>

      {/* Rest of the component remains the same */}
      {/* ... */}
    </div>
  );
};

export default TreadSelection;
