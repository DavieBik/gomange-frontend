'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getRestaurantById, updateRestaurantAPI, urlFor } from '@/lib/sanity';
import type { Restaurant } from '@/types/sanity';

export default function EditRestaurantPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState<Partial<Restaurant>>({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      console.log('[Edit] Fetching restaurant by id:', id);
      getRestaurantById(id as string).then(data => {
        console.log('[Edit] Fetched restaurant data:', data);
        setForm(data);
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('[Edit] Field changed:', e.target.name, e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log('[Edit] Image file selected:', e.target.files[0]);
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Si hay archivo, usa FormData
    if (imageFile) {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'tags' || key === 'metaKeywords') {
          formData.append(key, Array.isArray(value) ? value.join(',') : '');
        } else if (key === 'openingHours') {
          formData.append(key, JSON.stringify(value));
        } else if (key === 'Image_URL') {
          formData.append('imageUrl', value as string);
        } else if (typeof value === 'boolean') {
          formData.append(key, value ? 'true' : 'false');
        } else if (value !== undefined && value !== null) {
          formData.append(key, value as string);
        }
      });
      formData.append('mainImage', imageFile);

      try {
        const response = await fetch(`http://localhost:3001/api/restaurants/${id}`, {
          method: 'PUT',
          body: formData,
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        setShowModal(true);
      } catch (err) {
        alert(`Error updating restaurant: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
      setLoading(false);
      return;
    }

    // Si solo usas URL, envía JSON
    const dataToSend = {
      ...form,
      imageUrl: form.Image_URL || '',
      openingHours: typeof form.openingHours === 'object' ? form.openingHours : {},
      tags: Array.isArray(form.tags) ? form.tags : [],
      metaKeywords: Array.isArray(form.metaKeywords) ? form.metaKeywords : [],
      lgbtqFriendly: !!form.lgbtqFriendly,
    };

    try {
      const response = await fetch(`http://localhost:3001/api/restaurants/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      setShowModal(true);
    } catch (err) {
      alert(`Error updating restaurant: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
    setLoading(false);
  };

  if (!form || !form.name) {
    console.log('[Edit] Loading restaurant data...');
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-card">
      <button
        type="button"
        className="btn-secondary btn-xs flex items-center gap-1 mb-4"
        onClick={() => {
          console.log('[Edit] Navigating back to /admin');
          router.push('/admin');
          router.refresh();
        }}
      >
        <span className="text-base">←</span>
        Back
      </button>
      <h2 className="text-xl font-bold mb-4">Edit Restaurant</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block mb-1">Name</label>
          <input name="name" value={form.name || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" required />
        </div>
        <div>
          <label className="block mb-1">Neighbourhood</label>
          <input name="neighbourhood" value={form.neighbourhood || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block mb-1">Street Address</label>
          <input name="streetAddress" value={form.streetAddress || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block mb-1">City</label>
          <input name="city" value={form.city || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block mb-1">Cuisine</label>
          <input name="cuisine" value={form.cuisine || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block mb-1">Price Range</label>
          <input name="priceRange" value={form.priceRange || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block mb-1">Summary</label>
          <input name="summary" value={form.summary || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea name="description" value={form.description || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" rows={3} />
        </div>
        <div>
          <label className="block mb-1">Website</label>
          <input name="website" value={form.website || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block mb-1">Phone</label>
          <input name="phone" value={form.phone || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block mb-1">Tags (comma separated)</label>
          <input
            name="tags"
            value={Array.isArray(form.tags) ? form.tags.join(', ') : ''}
            onChange={e => setForm({ ...form, tags: e.target.value.split(',').map(t => t.trim()) })}
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        {/* Main Image Preview (actual) */}
        {form.mainImage && form.mainImage.asset && !imageFile && (
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Current Main Image</label>
            <img
              src={urlFor(form.mainImage).width(400).height(250).url()}
              alt={form.name || 'Main Image'}
              className="rounded-lg border w-full max-w-xs"
            />
          </div>
        )}

        {/* Preview of new image if selected */}
        {imageFile && (
          <div className="mb-4">
            <label className="block mb-1 font-semibold">New Main Image Preview</label>
            <img
              src={URL.createObjectURL(imageFile)}
              alt="New Main Image"
              className="rounded-lg border w-full max-w-xs"
            />
          </div>
        )}

        <div>
          <label className="block mb-1">Main Image (URL)</label>
          <input
            name="Image_URL"
            value={form.Image_URL || ''}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full mb-2"
            placeholder="Paste image URL here"
          />
          <label className="block mb-1 mt-2">Or upload image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border px-3 py-2 rounded w-full"
          />
          <small className="text-gray-500">
            You can paste an image URL or upload a file. If both are provided, the uploaded image will be used.
          </small>
        </div>
        <div>
          <label className="block mb-1">Opening Hours</label>
          <input name="openingHours" value={form.openingHours || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block mb-1">Facebook URL</label>
          <input name="facebook" value={form.facebook || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block mb-1">Instagram URL</label>
          <input name="instagram" value={form.instagram || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block mb-1">Twitter URL</label>
          <input name="twitter" value={form.twitter || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block mb-1">YouTube URL</label>
          <input name="youtube" value={form.youtube || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block mb-1">Meta Description</label>
          <input name="metaDescription" value={form.metaDescription || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block mb-1">Meta Keywords (comma separated)</label>
          <input
            name="metaKeywords"
            value={Array.isArray(form.metaKeywords) ? form.metaKeywords.join(', ') : ''}
            onChange={e => setForm({ ...form, metaKeywords: e.target.value.split(',').map(t => t.trim()) })}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">UUID</label>
          <input name="_id" value={form._id || ''} readOnly className="border px-3 py-2 rounded w-full bg-gray-100" />
        </div>
        <div>
          <label className="block mb-1">LGBTQ+ Friendly</label>
          <select
            name="lgbtqFriendly"
            value={form.lgbtqFriendly ? 'true' : 'false'}
            onChange={e => setForm({ ...form, lgbtqFriendly: e.target.value === 'true' })}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn-primary btn-sm mt-4 w-full"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save changes'}
        </button>
      </form>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold mb-4">Restaurant updated</h3>
            <p className="mb-6">The restaurant has been successfully updated.</p>
            <button
              className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition"
              onClick={() => {
                console.log('[Edit] Go to restaurants button clicked, navigating to /admin?refresh=1');
                router.push('/admin?refresh=1');
              }}
            >
              Go to restaurants
            </button>
          </div>
        </div>
      )}
    </div>
  );
}