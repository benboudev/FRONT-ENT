import { useState } from 'react';
import { 
  X, 
  DollarSign, 
  Package, 
  Ruler, 
  Box, 
  FolderOpen,
  Leaf 
} from 'lucide-react';
import type { Material, MaterialCreate, WoodType, Dimension } from '../../types/material';
import type { MaterialCategory } from '../../types/materialCategory';

interface Props {
  material?: Material | null;
  categories: MaterialCategory[];
  woodTypes: WoodType[];
  dimensions: Dimension[];
  onSubmit: (data: MaterialCreate) => Promise<void>;
  onCancel: () => void;
}

const MaterialForm = ({ material, categories, woodTypes, dimensions, onSubmit, onCancel }: Props) => {
  const [formData, setFormData] = useState<MaterialCreate>({
    name: material?.name || '',
    price: material?.price || 0,
    inventory: material?.inventory || 0,
    material_category_id: material?.material_category_id || categories[0]?.id || 0,
    wood_type_id: material?.wood_type_id || woodTypes[0]?.id || 0,
    dimension_id: material?.dimension_id || dimensions[0]?.id || 0,
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBlur = (field: keyof MaterialCreate) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await onSubmit(formData);
    } catch (err) {
      setError('Failed to save material');
    } finally {
      setLoading(false);
    }
  };

  const isFieldInvalid = (field: keyof MaterialCreate): boolean => {
    if (!touched[field]) return false;
    
    switch (field) {
      case 'name':
        return formData.name.trim().length < 2;
      case 'price':
        return formData.price <= 0;
      case 'inventory':
        return formData.inventory < 0;
      case 'material_category_id':
        return formData.material_category_id === 0;
      case 'wood_type_id':
        return formData.wood_type_id === 0;
      case 'dimension_id':
        return formData.dimension_id === 0;
      default:
        return false;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center px-10 py-8 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="h-6 w-6 text-blue-600" />
            {material ? 'Edit Material' : 'Add New Material'}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form Content */}
        <div className="px-10 py-8">
          {error && (
            <div className="mb-8 bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <X className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-8">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="block text-base font-medium text-gray-700 flex items-center gap-2">
                <Package className="h-5 w-5 text-gray-400" />
                Material Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onBlur={() => handleBlur('name')}
                className="block w-full px-6 py-4 text-lg rounded-lg border shadow-sm 
                  transition-colors min-h-[3.5rem] focus:ring-2 focus:ring-blue-500 
                  focus:border-blue-500"
                placeholder="Enter material name"
              />
              {isFieldInvalid('name') && (
                <p className="mt-2 text-sm text-red-600">Name must be at least 2 characters long</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Price Input */}
              <div className="space-y-2">
                <label className="block text-base font-medium text-gray-700 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                  Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-lg">$</span>
                  </div>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    onBlur={() => handleBlur('price')}
                    className="block w-full pl-12 pr-6 py-4 text-lg rounded-lg border shadow-sm 
                      transition-colors min-h-[3.5rem] focus:ring-2 focus:ring-blue-500 
                      focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
                {isFieldInvalid('price') && (
                  <p className="mt-2 text-sm text-red-600">Price must be greater than 0</p>
                )}
              </div>

              {/* Inventory Input */}
              <div className="space-y-2">
                <label className="block text-base font-medium text-gray-700 flex items-center gap-2">
                  <Box className="h-5 w-5 text-gray-400" />
                  Inventory
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.inventory}
                  onChange={(e) => setFormData({ ...formData, inventory: parseInt(e.target.value) })}
                  onBlur={() => handleBlur('inventory')}
                  className="block w-full px-6 py-4 text-lg rounded-lg border shadow-sm 
                    transition-colors min-h-[3.5rem] focus:ring-2 focus:ring-blue-500 
                    focus:border-blue-500"
                  placeholder="Enter quantity"
                />
                {isFieldInvalid('inventory') && (
                  <p className="mt-2 text-sm text-red-600">Inventory cannot be negative</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Category Select */}
              <div className="space-y-2">
                <label className="block text-base font-medium text-gray-700 flex items-center gap-2">
                  <FolderOpen className="h-5 w-5 text-gray-400" />
                  Category
                </label>
                <select
                  required
                  value={formData.material_category_id}
                  onChange={(e) => setFormData({ ...formData, material_category_id: parseInt(e.target.value) })}
                  onBlur={() => handleBlur('material_category_id')}
                  className="block w-full px-6 py-4 text-lg rounded-lg border shadow-sm 
                    transition-colors min-h-[3.5rem] focus:ring-2 focus:ring-blue-500 
                    focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {isFieldInvalid('material_category_id') && (
                  <p className="mt-2 text-sm text-red-600">Please select a category</p>
                )}
              </div>

              {/* Wood Type Select */}
              <div className="space-y-2">
                <label className="block text-base font-medium text-gray-700 flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-gray-400" />
                  Wood Type
                </label>
                <select
                  required
                  value={formData.wood_type_id}
                  onChange={(e) => setFormData({ ...formData, wood_type_id: parseInt(e.target.value) })}
                  onBlur={() => handleBlur('wood_type_id')}
                  className="block w-full px-6 py-4 text-lg rounded-lg border shadow-sm 
                    transition-colors min-h-[3.5rem] focus:ring-2 focus:ring-blue-500 
                    focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="">Select a wood type</option>
                  {woodTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
                {isFieldInvalid('wood_type_id') && (
                  <p className="mt-2 text-sm text-red-600">Please select a wood type</p>
                )}
              </div>

              {/* Dimensions Select */}
              <div className="space-y-2">
                <label className="block text-base font-medium text-gray-700 flex items-center gap-2">
                  <Ruler className="h-5 w-5 text-gray-400" />
                  Dimensions
                </label>
                <select
                  required
                  value={formData.dimension_id}
                  onChange={(e) => setFormData({ ...formData, dimension_id: parseInt(e.target.value) })}
                  onBlur={() => handleBlur('dimension_id')}
                  className="block w-full px-6 py-4 text-lg rounded-lg border shadow-sm 
                    transition-colors min-h-[3.5rem] focus:ring-2 focus:ring-blue-500 
                    focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="">Select dimensions</option>
                  {dimensions.map((dimension) => (
                    <option key={dimension.id} value={dimension.id}>
                      {dimension.amount_of_inches} inches
                    </option>
                  ))}
                </select>
                {isFieldInvalid('dimension_id') && (
                  <p className="mt-2 text-sm text-red-600">Please select dimensions</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-gray-50 border-t border-gray-200 rounded-b-xl">
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-8 py-4 text-base font-medium text-gray-700 bg-white border border-gray-300 
                rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 text-base font-medium text-white bg-blue-600 border border-transparent 
                rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                material ? 'Update Material' : 'Add Material'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MaterialForm;
