import { useState, useEffect } from 'react';
import { urlFor, addMenuSectionAPI, addMenuItemAPI, deleteMenuSectionAPI, deleteMenuItemAPI, editMenuSectionAPI, editMenuItemAPI } from '@/lib/sanity';

export default function MenuEditor({ restaurantId, menu, refreshMenu }: { restaurantId: string, menu: any[], refreshMenu: () => void }) {
  const [newSectionName, setNewSectionName] = useState('');
  const [activeSectionKey, setActiveSectionKey] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemPrice, setNewItemPrice] = useState<number>(0);
  const [newItemImage, setNewItemImage] = useState<File | null>(null);

  // Log menu prop changes
  useEffect(() => {
    console.log('Menu prop updated:', menu);
  }, [menu]);

  // Crear sección (solo nombre)
  const handleCreateSection = async () => {
    if (!newSectionName) {
      console.log('No section name provided');
      return;
    }
    try {
      console.log('Creating section:', newSectionName, 'for restaurant:', restaurantId);
      const result = await addMenuSectionAPI(restaurantId, newSectionName);
      console.log('addMenuSectionAPI result:', result);
      setNewSectionName('');
      setActiveSectionKey(result.sectionKey);
     await refreshMenu();
console.log('Menu after refresh:', menu); // menu es la prop, se actualiza por el padre
    } catch (err: any) {
      console.error('Error creating section:', err);
      alert('Error creating section: ' + (err?.message || 'Unknown error'));
    }
  };

  // Eliminar sección
  const handleDeleteMenuSection = async (sectionKey: string) => {
    console.log('Deleting section:', sectionKey);
    await deleteMenuSectionAPI(restaurantId, sectionKey);
    await refreshMenu();
    console.log('Menu after delete:', menu);
  };

  // Editar nombre de sección
  const handleEditMenuSection = async (sectionKey: string, name: string) => {
    console.log('Editing section:', sectionKey, 'New name:', name);
    await editMenuSectionAPI(restaurantId, sectionKey, name);
    await refreshMenu();
    console.log('Menu after edit:', menu);
  };

  // Eliminar ítem
  const handleDeleteMenuItem = async (itemKey: string) => {
    console.log('Deleting item:', itemKey);
    await deleteMenuItemAPI(restaurantId, itemKey);
    await refreshMenu();
    console.log('Menu after item delete:', menu);
  };

  // Editar ítem
  const handleEditMenuItem = async (itemKey: string, name?: string, description?: string, price?: number) => {
    console.log('Editing item:', itemKey, { name, description, price });
    await editMenuItemAPI(restaurantId, itemKey, name, description, price);
    await refreshMenu();
    console.log('Menu after item edit:', menu);
  };

  // Agregar ítem a sección (con imagen)
  const handleAddMenuItem = async (sectionKey: string) => {
    if (!newItemName) {
      console.log('No item name provided');
      return;
    }
    try {
      console.log('Adding item to section:', sectionKey, { newItemName, newItemDescription, newItemPrice, newItemImage });
      const result = await addMenuItemAPI(
        restaurantId,
        sectionKey,
        newItemName,
        newItemDescription,
        newItemPrice,
        newItemImage || undefined
      );
      console.log('addMenuItemAPI result:', result);
      setNewItemName('');
      setNewItemDescription('');
      setNewItemPrice(0);
      setNewItemImage(null);
      setActiveSectionKey(null);
      await refreshMenu();
      console.log('Menu after item add:', menu);
    } catch (err: any) {
      console.error('Error adding item:', err);
      alert('Error adding item: ' + (err?.message || 'Unknown error'));
    }
  };

  return (
    <div className="mt-10">
      <h3 className="text-lg font-bold mb-2 text-primary-700">Menu Editor</h3>
      {/* Formulario para crear sección */}
      <div className="mb-6 border rounded p-4 bg-primary-50">
        <h4 className="font-bold mb-2">Add Menu Section</h4>
        <input
          type="text"
          value={newSectionName}
          onChange={e => setNewSectionName(e.target.value)}
          className="border px-2 py-1 rounded w-1/2 mb-2"
          placeholder="Section name (e.g. Starters)"
        />
        <button
          type="button"
          className="mt-4 px-3 py-1 bg-primary-600 text-white rounded text-sm"
          disabled={!newSectionName}
          onClick={handleCreateSection}
        >
          Create Section
        </button>
      </div>
      {/* Listado de secciones */}
      {Array.isArray(menu) && menu.length > 0 ? (
        menu.map((section: any) => (
          <div key={section._key} className="mb-6 border rounded p-4 bg-primary-50">
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={section.section || ''}
                onChange={e => handleEditMenuSection(section._key, e.target.value)}
                className="border px-2 py-1 rounded w-1/2"
                placeholder="Section name"
              />
              <button
                type="button"
                className="text-xs text-red-600 ml-2"
                onClick={() => handleDeleteMenuSection(section._key)}
                title="Remove section"
              >✕</button>
            </div>
            {/* Items */}
            <div className="space-y-2">
              {Array.isArray(section.items) && section.items.map((item: any, idx: number) => {
                console.log('Rendering item:', item);
                return (
                  <div key={item._key} className="flex gap-2 items-center">
                    {item.image && (
                      <img
                        src={item.image.asset?.url || urlFor(item.image).url()}
                        alt="Item"
                        className="w-12 h-12 object-cover rounded border"
                      />
                    )}
                    <input
                      type="text"
                      value={item.name || ''}
                      onChange={e => handleEditMenuItem(item._key, e.target.value, item.description, item.price)}
                      className="border px-2 py-1 rounded w-1/5"
                      placeholder="Item name"
                    />
                    <input
                      type="text"
                      value={item.description || ''}
                      onChange={e => handleEditMenuItem(item._key, item.name, e.target.value, item.price)}
                      className="border px-2 py-1 rounded w-2/5"
                      placeholder="Description"
                    />
                    <input
                      type="number"
                      value={item.price || ''}
                      onChange={e => handleEditMenuItem(item._key, item.name, item.description, Number(e.target.value))}
                      className="border px-2 py-1 rounded w-1/6"
                      placeholder="Price"
                      min={0}
                    />
                    <button
                      type="button"
                      className="text-xs text-red-600"
                      onClick={() => handleDeleteMenuItem(item._key)}
                      title="Remove item"
                    >✕</button>
                  </div>
                );
              })}
            </div>
            {/* Formulario para agregar ítem */}
            {activeSectionKey === section._key ? (
              <div className="mt-4 flex gap-2 items-center">
                <input
                  type="text"
                  value={newItemName}
                  onChange={e => setNewItemName(e.target.value)}
                  className="border px-2 py-1 rounded w-1/5"
                  placeholder="Item name"
                />
                <input
                  type="text"
                  value={newItemDescription}
                  onChange={e => setNewItemDescription(e.target.value)}
                  className="border px-2 py-1 rounded w-2/5"
                  placeholder="Description"
                />
                <input
                  type="number"
                  value={newItemPrice}
                  onChange={e => setNewItemPrice(Number(e.target.value))}
                  className="border px-2 py-1 rounded w-1/6"
                  placeholder="Price"
                  min={0}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setNewItemImage(e.target.files?.[0] || null)}
                  className="border px-2 py-1 rounded w-1/6"
                />
                {newItemImage && (
                  <img
                    src={URL.createObjectURL(newItemImage)}
                    alt="Preview"
                    className="w-12 h-12 object-cover rounded border"
                  />
                )}
                <button
                  type="button"
                  className="px-3 py-1 bg-primary-600 text-white rounded text-sm"
                  disabled={!newItemName}
                  onClick={() => handleAddMenuItem(section._key)}
                >
                  Add Item
                </button>
                <button
                  type="button"
                  className="px-2 py-1 text-xs text-gray-500"
                  onClick={() => setActiveSectionKey(null)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="mt-2 px-3 py-1 bg-primary-100 text-primary-700 rounded text-sm"
                onClick={() => setActiveSectionKey(section._key)}
              >
                + Add Item
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 mb-2">No menu sections yet.</p>
      )}
    </div>
  );
}