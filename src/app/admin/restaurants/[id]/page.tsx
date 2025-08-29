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
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  useEffect(() => {
    if (id) {
      getRestaurantById(id as string).then(data => setForm(data));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setGalleryFiles(prev => [...prev, ...Array.from(files)]);
    }
  };

  const handleArrayChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value.split(',').map(t => t.trim()).filter(Boolean) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        formData.append(key, value.join(','));
      } else if (typeof value === 'object' && value !== null) {
        formData.append(key, JSON.stringify(value));
      } else if (value !== undefined && value !== null) {
        formData.append(key, value as string);
      }
    });
    if (imageFile) formData.append('mainImage', imageFile);
    if (galleryFiles && galleryFiles.length > 0) {
      galleryFiles.forEach(file => formData.append('galleryImages', file));
    }

    try {
      const response = await fetch(`http://localhost:3001/api/restaurants/${id}`, {
        method: 'PUT',
        body: formData,
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      await response.json();
      setShowModal(true);
    } catch (err) {
      console.error('Error updating restaurant:', err);
      if (err instanceof Error) {
        alert(`Error updating restaurant: ${err.message}`);
      } else {
        alert('Error updating restaurant: Unknown error');
      }
    }
    setLoading(false);
  };

  if (!form || !form.name) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-card">
      <button
        type="button"
        className="btn-secondary btn-xs flex items-center gap-1 mb-4"
        onClick={() => {
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
          <label className="block mb-1">District</label>
          <input name="district" value={form.district || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
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
          <label className="block mb-1">Email Address</label>
          <input name="email" value={form.email || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block mb-1">Phone</label>
          <input name="phone" value={form.phone || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block mb-1">Phone (Standard Format)</label>
          <input name="phoneStandard" value={form.phoneStandard || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block mb-1">Google Maps URL</label>
          <input name="gmbUrl" value={form.gmbUrl || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block mb-1">Latitude</label>
            <input name="latitude" type="number" value={form.latitude || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
          </div>
          <div className="flex-1">
            <label className="block mb-1">Longitude</label>
            <input name="longitude" type="number" value={form.longitude || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
          </div>
        </div>
        <div>
          <label className="block mb-1">Menu Link</label>
          <input name="menuLink" value={form.menuLink || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block mb-1">Crowd</label>
          <input name="crowd" value={form.crowd || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" placeholder="Local, expat, turista, etc." />
        </div>
        <div>
          <label className="block mb-1">Service Options (comma separated)</label>
          <input
            name="serviceOptions"
            value={Array.isArray(form.serviceOptions) ? form.serviceOptions.join(', ') : ''}
            onChange={e => handleArrayChange('serviceOptions', e.target.value)}
            className="border px-3 py-2 rounded w-full"
            placeholder="Dine-in, Takeout, etc."
          />
        </div>
        <div>
          <label className="block mb-1">Amenities (comma separated)</label>
          <input
            name="amenities"
            value={Array.isArray(form.amenities) ? form.amenities.join(', ') : ''}
            onChange={e => handleArrayChange('amenities', e.target.value)}
            className="border px-3 py-2 rounded w-full"
            placeholder="Wi-Fi, Parking, AC, etc."
          />
        </div>
        <div>
          <label className="block mb-1">Accessibility (comma separated)</label>
          <input
            name="accessibility"
            value={Array.isArray(form.accessibility) ? form.accessibility.join(', ') : ''}
            onChange={e => handleArrayChange('accessibility', e.target.value)}
            className="border px-3 py-2 rounded w-full"
            placeholder="Wheelchair, Braille menu, etc."
          />
        </div>
        <div>
          <label className="block mb-1">Payment Methods (comma separated)</label>
          <input
            name="paymentMethods"
            value={Array.isArray(form.paymentMethods) ? form.paymentMethods.join(', ') : ''}
            onChange={e => handleArrayChange('paymentMethods', e.target.value)}
            className="border px-3 py-2 rounded w-full"
            placeholder="Cash, Card, Mobile Money, etc."
          />
        </div>
        <div>
          <label className="block mb-1">Offerings (comma separated)</label>
          <input
            name="offerings"
            value={Array.isArray(form.offerings) ? form.offerings.join(', ') : ''}
            onChange={e => handleArrayChange('offerings', e.target.value)}
            className="border px-3 py-2 rounded w-full"
            placeholder="Desayuno, almuerzo, vegano, etc."
          />
        </div>
        <div>
          <label className="block mb-1">Owner / Chef's Note</label>
          <textarea name="ownerNote" value={form.ownerNote || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" rows={2} />
        </div>
        <div>
          <label className="block mb-1">Opening Hours (JSON)</label>
          <input name="openingHours" value={typeof form.openingHours === 'string' ? form.openingHours : ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" placeholder='{"monday":"8-18",...}' />
        </div>
        <div>
          <label className="block mb-1">Hours Summary</label>
          <input name="hoursSummary" value={form.hoursSummary || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block mb-1">Tags (comma separated)</label>
          <input
            name="tags"
            value={Array.isArray(form.tags) ? form.tags.join(', ') : ''}
            onChange={e => handleArrayChange('tags', e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
       
        {/* Gallery Images (multiple, first image is cover) */}
        <div>
          <label className="block mb-1">Gallery Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryChange}
            className="border px-3 py-2 rounded w-full"
          />
          <small className="text-gray-500">
            You can select one or more images for the gallery. The first will be the cover.
          </small>
          {galleryFiles.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap items-center">
              {galleryFiles.map((img, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(img)}
                  alt={`Gallery ${idx + 1}`}
                  className="w-24 h-24 object-cover rounded border"
                />
              ))}
              <button
                type="button"
                className="ml-2 text-xs text-gray-500 hover:text-primary-600 underline transition"
                onClick={() => setGalleryFiles([])}
              >
                Clear gallery
              </button>
            </div>
          )}
        </div>
        <div>
          <label className="block mb-1">Main Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border px-3 py-2 rounded w-full"
          />
          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Main"
              className="w-24 h-24 object-cover rounded border mt-2"
            />
          )}
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