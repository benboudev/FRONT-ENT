import { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, Package } from 'lucide-react';
import { materialApi } from '../../api/materialApi';
import { materialCategoryApi } from '../../api/materialCategoryApi';
import type { Material, WoodType, Dimension } from '../../types/material';
import type { MaterialCategory } from '../../types/materialCategory';
import MaterialForm from './MaterialForm';

export default function MaterialList() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [categories, setCategories] = useState<MaterialCategory[]>([]);
  const [woodTypes, setWoodTypes] = useState<WoodType[]>([]);
  const [dimensions, setDimensions] = useState<Dimension[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);

  const loadData = async () => {
    try {
      const [materialsData, categoriesData, woodTypesData, dimensionsData] = await Promise.all([
        materialApi.getAll(),
        materialCategoryApi.getAll(),
        materialApi.getWoodTypes(),
        materialApi.getDimensions()
      ]);

      setMaterials(Array.isArray(materialsData) ? materialsData : materialsData.data || []);
      setCategories(Array.isArray(categoriesData) ? categoriesData : categoriesData.data || []);
      setWoodTypes(woodTypesData);
      setDimensions(dimensionsData);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this material?')) return;
    
    try {
      await materialApi.delete(id);
      setMaterials(materials.filter(m => m.id !== id));
    } catch (err) {
      setError('Failed to delete material');
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Package className="h-6 w-6" />
          Materials
        </h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Add Material
        </button>
      </div>

      {(showAddForm || editingMaterial) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <MaterialForm
              material={editingMaterial}
              categories={categories}
              woodTypes={woodTypes}
              dimensions={dimensions}
              onSubmit={async (data) => {
                try {
                  if (editingMaterial) {
                    await materialApi.update(editingMaterial.id, data);
                  } else {
                    await materialApi.create(data);
                  }
                  loadData();
                  setShowAddForm(false);
                  setEditingMaterial(null);
                } catch (err) {
                  setError('Failed to save material');
                }
              }}
              onCancel={() => {
                setShowAddForm(false);
                setEditingMaterial(null);
              }}
            />
          </div>
        </div>
      )}

      <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inventory</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wood Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dimensions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {materials.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No materials found
                </td>
              </tr>
            ) : (
              materials.map((material) => (
                <tr key={material.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{material.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${material.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{material.inventory}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {categories.find(c => c.id === material.material_category_id)?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {woodTypes.find(w => w.id === material.wood_type_id)?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {dimensions.find(d => d.id === material.dimension_id)?.amount_of_inches}" 
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingMaterial(material)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(material.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
