'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewRestaurantPage() {
  const [form, setForm] = useState({
    name: '',
    neighbourhood: '',
    streetAddress: '',
    city: '',
    cuisine: '',
    priceRange: '',
    summary: '',
    description: '',
    website: '',
    phone: '',
    tags: [],
    Image_URL: '',
    openingHours: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: '',
    },
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: '',
    metaDescription: '',
    metaKeywords: [],
    lgbtqFriendly: false,
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (name === 'tags' || name === 'metaKeywords') {
      setForm({ ...form, [name]: value.split(',').map(t => t.trim()) });
    } else if (name === 'lgbtqFriendly') {
      setForm({ ...form, lgbtqFriendly: value === 'true' });
    } else if (
      [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ].includes(name)
    ) {
      setForm({
        ...form,
        openingHours: {
          ...form.openingHours,
          [name]: value,
        },
      });
    } else {
      setForm({
        ...form,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    // Only add valid fields
    const allowedFields = [
      'name',
      'neighbourhood',
      'streetAddress',
      'city',
      'cuisine',
      'priceRange',
      'summary',
      'description',
      'website',
      'phone',
      'metaDescription',
      'lgbtqFriendly',
    ];

    allowedFields.forEach(key => {
      const value = form[key];
      if (value !== undefined && value !== null && value !== '') {
        formData.append(key, value);
      }
    });

    // Arrays
    if (form.tags && Array.isArray(form.tags)) {
      formData.append('tags', form.tags.join(','));
    }
    if (form.metaKeywords && Array.isArray(form.metaKeywords)) {
      formData.append('metaKeywords', form.metaKeywords.join(','));
    }

    // Opening hours as JSON string
    formData.append('openingHours', JSON.stringify(form.openingHours));

    // Social media fields
    formData.append('facebook', form.facebook || '');
    formData.append('instagram', form.instagram || '');
    formData.append('twitter', form.twitter || '');
    formData.append('youtube', form.youtube || '');

    // Only send imageUrl (no file upload)
    if (form.Image_URL) {
      formData.append('imageUrl', form.Image_URL);
    }

    try {
      const res = await fetch('http://localhost:3001/api/restaurants', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Error creating restaurant');
      setShowModal(true);
    } catch (err) {
      alert('Error creating restaurant');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-card">
      <button
        type="button"
        className="btn-secondary btn-xs flex items-center gap-1 mb-4"
        onClick={() => router.push('/admin/')}
      >
        <span className="text-base">←</span>
        Back
      </button>
      <h2 className="text-xl font-bold mb-4">Add Restaurant</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Neighbourhood</label>
          <input
            name="neighbourhood"
            value={form.neighbourhood}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Street Address</label>
          <input
            name="streetAddress"
            value={form.streetAddress}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">City</label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Cuisine</label>
          <input
            name="cuisine"
            value={form.cuisine}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Price Range</label>
          <input
            name="priceRange"
            value={form.priceRange}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Summary</label>
          <input
            name="summary"
            value={form.summary}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            rows={3}
          />
        </div>
        <div>
          <label className="block mb-1">Website</label>
          <input
            name="website"
            value={form.website}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Tags (comma separated)</label>
          <input
            name="tags"
            value={Array.isArray(form.tags) ? form.tags.join(', ') : ''}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Main Image (URL)</label>
          <input
            name="Image_URL"
            value={form.Image_URL}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full mb-2"
            placeholder="Paste image URL here"
          />
          <small className="text-gray-500">
            Only paste an image URL. File upload is disabled.
          </small>
        </div>
        <div>
          <label className="block mb-1">Opening Hours</label>
          <div className="grid grid-cols-2 gap-2">
            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
              <div key={day}>
                <label className="block mb-1 capitalize">{day}</label>
                <input
                  name={day}
                  value={form.openingHours[day]}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded w-full"
                  placeholder="e.g. 9:00-18:00"
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="block mb-1">Facebook URL</label>
          <input
            name="facebook"
            value={form.facebook}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Instagram URL</label>
          <input
            name="instagram"
            value={form.instagram}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Twitter URL</label>
          <input
            name="twitter"
            value={form.twitter}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">YouTube URL</label>
          <input
            name="youtube"
            value={form.youtube}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Meta Description</label>
          <input
            name="metaDescription"
            value={form.metaDescription}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Meta Keywords (comma separated)</label>
          <input
            name="metaKeywords"
            value={Array.isArray(form.metaKeywords) ? form.metaKeywords.join(', ') : ''}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">LGBTQ+ Friendly</label>
          <select
            name="lgbtqFriendly"
            value={form.lgbtqFriendly ? 'true' : 'false'}
            onChange={handleChange}
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
          {loading ? 'Saving...' : 'Add Restaurant'}
        </button>
      </form>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold mb-4">Restaurant created</h3>
            <p className="mb-6">The restaurant has been successfully added.</p>
            <button
              className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition"
              onClick={() => router.push('/admin/')}
            >
              Go to restaurants
            </button>
          </div>
        </div>
      )}
    </div>
  );
}