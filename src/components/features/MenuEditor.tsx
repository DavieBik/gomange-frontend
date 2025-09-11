import { useState, useEffect } from 'react';
import { urlFor, addMenuSectionAPI, addMenuItemAPI, deleteMenuSectionAPI, editMenuSectionAPI, editMenuItemAPI } from '@/lib/sanity';



export default function MenuEditor({
  restaurantId,
  menu,
  refreshMenu,
  handleDeleteMenuItem,
  setMenu 
}: {
  restaurantId: string | null;
  menu: any[];
  refreshMenu: () => void;
  handleDeleteMenuItem: (itemKey: string) => Promise<void>;
  setMenu?: (menu: any[]) => void;
}) {
  const [newSectionName, setNewSectionName] = useState('');
  const [activeSectionKey, setActiveSectionKey] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemPrice, setNewItemPrice] = useState<number>(0);
  const [newItemImage, setNewItemImage] = useState<File | null>(null);
  const [loadingSection, setLoadingSection] = useState(false);
  const [loadingItem, setLoadingItem] = useState(false);

  // Log menu prop changes
  useEffect(() => {
    console.log('Menu prop updated:', menu);
  }, [menu]);

  // Crear secciónxw
  const handleCreateSection = async () => {
    if (!newSectionName) return;
    setLoadingSection(true);
    if (!restaurantId) {
      setTimeout(() => {
        setMenu?.([
          ...menu,
          {
            _key: Math.random().toString(36).slice(2),
            section: newSectionName,
            items: []
          }
        ]);
        setNewSectionName('');
        setActiveSectionKey(null);
        setLoadingSection(false);
      }, 600); // Simula carga
    } else {
      try {
        await addMenuSectionAPI(restaurantId, newSectionName);
        setNewSectionName('');
        setActiveSectionKey(null);
        await refreshMenu();
      } catch (err: any) {
        alert('Error creating section: ' + (err?.message || 'Unknown error'));
      }
      setLoadingSection(false);
    }
  };

  // Eliminar sección
  const handleDeleteMenuSection = async (sectionKey: string) => {
    if (!restaurantId) {
      setMenu?.(menu.filter(section => section._key !== sectionKey));
    } else {
      await deleteMenuSectionAPI(restaurantId, sectionKey);
      await refreshMenu();
    }
  };

  // Editar sección
  const handleEditMenuSection = async (sectionKey: string, name: string) => {
    if (!restaurantId) {
      setMenu?.(menu.map(section =>
        section._key === sectionKey ? { ...section, section: name } : section
      ));
    } else {
      await editMenuSectionAPI(restaurantId, sectionKey, name);
      await refreshMenu();
    }
  };

  // Eliminar ítem
  const handleDeleteMenuItemLocal = async (itemKey: string) => {
    console.log('Deleting item:', itemKey);
    await handleDeleteMenuItem(itemKey); // Este ya refresca el menú en el padre
    // NO llames a refreshMenu() aquí
    console.log('Menu after item delete:', menu);
  };

  // Editar ítem
  const handleEditMenuItem = async (itemKey: string, name?: string, description?: string, price?: number) => {
    if (!restaurantId) {
      // Edición local
      setMenu?.(menu.map(section => {
        const itemIndex = section.items?.findIndex((item: any) => item._key === itemKey);
        if (itemIndex !== undefined && itemIndex !== -1) {
          const updatedItems = [...(section.items || [])];
          if (name !== undefined) updatedItems[itemIndex].name = name;
          if (description !== undefined) updatedItems[itemIndex].description = description;
          if (price !== undefined) updatedItems[itemIndex].price = price;
          return { ...section, items: updatedItems };
        }
        return section;
      }));
    } else {
      // Modo backend
      await editMenuItemAPI(restaurantId, itemKey, name, description, price);
      await refreshMenu();
    }
  };

 const handleAddMenuItem = async (sectionKey: string) => {
  if (!newItemName) return;
  setLoadingItem(true);
  if (setMenu) {
    setTimeout(() => {
      setMenu(menu.map(section =>
        section._key === sectionKey
          ? {
              ...section,
              items: [
                ...(section.items || []),
                {
                  _key: Math.random().toString(36).slice(2),
                  name: newItemName,
                  description: newItemDescription,
                  price: newItemPrice,
                  image: newItemImage ? { asset: { url: URL.createObjectURL(newItemImage) } } : undefined
                }
              ]
            }
          : section
      ));
      setNewItemName('');
      setNewItemDescription('');
      setNewItemPrice(0);
      setNewItemImage(null);
      setActiveSectionKey(null);
      setLoadingItem(false);
    }, 600); // Simula carga
  } else if (restaurantId) {
    try {
      await addMenuItemAPI(
        restaurantId,
        sectionKey,
        newItemName,
        newItemDescription,
        newItemPrice,
        newItemImage || undefined
      );
      setNewItemName('');
      setNewItemDescription('');
      setNewItemPrice(0);
      setNewItemImage(null);
      setActiveSectionKey(null);
      await refreshMenu();
    } catch (err: any) {
      alert('Error adding item: ' + (err?.message || 'Unknown error'));
    }
    setLoadingItem(false);
  }
};

  console.log('MenuEditor render, menu:', menu);

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
          disabled={loadingSection}
        />
        <button
          type="button"
          className="mt-4 px-3 py-1 bg-primary-600 text-white rounded text-sm"
          disabled={!newSectionName || loadingSection}
          onClick={handleCreateSection}
        >
          {loadingSection ? 'Adding section...' : 'Create Section'}
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
  step="0.01"
  min={0}
  value={item.price !== undefined && item.price !== null ? item.price : ''}
  onChange={e => {
    const value = e.target.value;
    handleEditMenuItem(
      item._key,
      item.name,
      item.description,
      value === '' ? undefined : Number(value)
    );
  }}
  className="border px-2 py-1 rounded w-1/6"
  placeholder="Price (AUD)"
/>
                    <span className="ml-1 text-gray-500">AUD</span>
                    <button
                      type="button"
                      className="text-xs text-red-600"
                      onClick={() => handleDeleteMenuItemLocal(item._key)}
                      title="Remove item"
                    >
                      ✕
                    </button>
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
  step="0.01"
  min={0}
  value={newItemPrice === 0 ? '' : newItemPrice}
  onChange={e => {
    const value = e.target.value;
    setNewItemPrice(value === '' ? 0 : Number(value));
  }}
  className="border px-2 py-1 rounded w-1/6"
  placeholder="Price (AUD)"
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
                  disabled={!newItemName || loadingItem}
                  onClick={() => handleAddMenuItem(section._key)}
                >
                  {loadingItem ? 'Adding item...' : 'Add Item'}
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