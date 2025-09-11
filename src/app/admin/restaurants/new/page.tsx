'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/ui/Loading';
import Select from 'react-select';
import MenuEditor from '@/components/features/MenuEditor';
import type { Sanity } from '@/types/sanity';

const serviceOptionsList = [
  'Dine-in', 'Takeaway', 'Delivery', 'Drive-thru', 'Curbside Pickup',
  'Outdoor Seating', 'Catering', 'Reservation', 'Walk-ins Welcome',
  'Counter Service', 'Table Service'
];
const amenitiesList = [
  'Wi-Fi', 'Parking', 'Air Conditioning', 'Restrooms', 'Outdoor Seating',
  'Pet Friendly', 'Live Music', 'TV Screens', 'Charging Stations', 'Bar',
  'Play Area', 'Smoking Area', 'Private Dining', 'Wheelchair Accessible'
];
const accessibilityList = [
  'Wheelchair', 'Braille menu', 'Accessible Restrooms', 'Step-free Entrance',
  'Elevator', 'Hearing Loop', 'Service Animals Allowed', 'Accessible Parking',
  'Low Tables', 'Visual Aids'
];
const paymentMethodsList = [
  'Cash', 'Card', 'Mobile Payment', 'Apple Pay', 'Google Pay',
  'Contactless Payment', 'Gift Card', 'Bank Transfer', 'PayPal'
];

const serviceOptions = serviceOptionsList.map(opt => ({ value: opt, label: opt }));
const amenitiesOptions = amenitiesList.map(opt => ({ value: opt, label: opt }));
const accessibilityOptions = accessibilityList.map(opt => ({ value: opt, label: opt }));
const paymentMethodsOptions = paymentMethodsList.map(opt => ({ value: opt, label: opt }));

export default function NewRestaurantPage() {
  const router = useRouter();
  const [form, setForm] = useState<{
    name: string;
    neighbourhood: string;
    streetAddress: string;
    district: string;
    cuisine: string;
    priceRange: string;
    summary: string;
    description: string;
    website: string;
    email: string;
    phone: string;
    instagram: string;
    serviceOptions: string[];
    amenities: string[];
    accessibility: string[];
    paymentMethods: string[];
    tags: string[];
    galleryImages: string[];
    mainImage: string;
    menu: any[];
    openingHours: {
      [key: string]: { from: string; to: string; closed: boolean };
    };
    latitude: number | null;
    longitude: number | null;
    menuLink: string; 
  }>({
    name: '',
    neighbourhood: '',
    streetAddress: '',
    district: '',
    cuisine: '',
    priceRange: '',
    summary: '',
    description: '',
    website: '',
    email: '',
    phone: '',
    instagram: '',
    serviceOptions: [],
    amenities: [],
    accessibility: [],
    paymentMethods: [],
    tags: [],
    galleryImages: [],
    mainImage: '',
    menu: [],
    openingHours: {
      monday: { from: '', to: '', closed: false },
      tuesday: { from: '', to: '', closed: false },
      wednesday: { from: '', to: '', closed: false },
      thursday: { from: '', to: '', closed: false },
      friday: { from: '', to: '', closed: false },
      saturday: { from: '', to: '', closed: false },
      sunday: { from: '', to: '', closed: false },
    },
    latitude: null,
    longitude: null,
    menuLink: '', 
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Google Maps URL
  const gmbUrl = (() => {
    if (typeof form.latitude === 'number' && typeof form.longitude === 'number') {
      const query = form.name
        ? `${encodeURIComponent(form.name)}+${form.latitude},${form.longitude}`
        : `${form.latitude},${form.longitude}`;
      return `https://www.google.com/maps/search/?api=1&query=${query}`;
    }
    return '';
  })();

  // Get coordinates from address (simulate API)
  const getCoordinates = async (address: string) => {
    // Replace with your real API
    return { latitude: -33.8688, longitude: 151.2093 };
  };

  // Handlers
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

  // TAGS CHIP INPUT
  const addTag = () => {
    if (tagInput.trim()) {
      setForm(prev => ({
        ...prev,
        tags: Array.isArray(prev.tags)
          ? [...prev.tags, tagInput.trim()]
          : [tagInput.trim()]
      }));
      setTagInput('');
    }
  };
  const removeTag = (idx: number) => {
    setForm(prev => ({
      ...prev,
      tags: Array.isArray(prev.tags)
        ? prev.tags.filter((_: string, i: number) => i !== idx)
        : []
    }));
  };

  const removeGalleryImage = (idx: number) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const clearMainImage = () => setImageFile(null);

  // Opening hours handler
  const handleOpeningHoursChange = (day: string, field: string, value: string | boolean) => {
    setForm(prev => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day],
          [field]: value
        }
      }
    }));
  };

  // Address blur: get coordinates
  const handleAddressBlur = async () => {
    if (form.streetAddress && form.streetAddress.length > 5) {
      const data = await getCoordinates(form.streetAddress);
      if (data && typeof data.latitude === 'number' && typeof data.longitude === 'number') {
        setForm(prev => ({
          ...prev,
          latitude: data.latitude,
          longitude: data.longitude,
        }));
      }
    }
  };

  // VALIDACIÓN EXTRA DEL MENÚ
  function validateMenu(menu: any): string | null {
  if (menu === undefined || menu === null) return null; // Permite menú ausente
  if (!Array.isArray(menu)) return 'Menu must be an array.';
  if (menu.length === 0) return null; // Permite menú vacío
  for (const section of menu) {
    if (!section.section || typeof section.section !== 'string') {
      return 'Each section must have a name.';
    }
    if (!Array.isArray(section.items) || section.items.length === 0) {
      return `Section "${section.section}" must have at least one item.`;
    }
    for (const item of section.items) {
      if (!item.name || typeof item.name !== 'string') {
        return `Each item in "${section.section}" must have a name.`;
      }
      if (item.price === undefined || item.price === null || isNaN(item.price)) {
        return `Each item in "${section.section}" must have a valid price.`;
      }
    }
  }
  return null;
}

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // --- VALIDACIÓN EXTRA DEL MENÚ ---
    const error = validateMenu(form.menu || []);
    if (error) {
      alert(error);
      setLoading(false);
      return;
    }

    const allowedFields = [
      'name', 'neighbourhood', 'streetAddress', 'district', 'cuisine', 'priceRange',
      'summary', 'description', 'website', 'phone', 'email', 'gmbUrl',
      'latitude', 'longitude', 'menuLink', 'phoneStandard', 'crowd',
      'serviceOptions', 'amenities', 'accessibility', 'paymentMethods', 'offerings',
      'ownerNote', 'openingHours', 'hoursSummary', 'tags',
      'mainImage', 'galleryImages', 'whatsappNumber', 'orderLink', 'bookingLink'
    ];

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (!allowedFields.includes(key)) return;
      if (key === 'mainImage' || key === 'galleryImages') return;
      if (key === 'openingHours') {
        formData.append(key, JSON.stringify(value));
      } else if (key === 'menu' && Array.isArray(value)) {
        formData.append('menu', JSON.stringify(value)); // <-- ENVÍA COMO JSON
      } else if (Array.isArray(value) && value.length > 0) {
        formData.append(key, value.join(','));
      } else if (typeof value === 'object' && value !== null) {
        // No serialices otros objetos, solo openingHours y menu
      } else if (value !== undefined && value !== null && value !== '') {
        formData.append(key, value as string);
      }
    });
    if (imageFile) formData.append('mainImage', imageFile);
    if (galleryFiles && galleryFiles.length > 0) {
      galleryFiles.forEach(file => formData.append('galleryImages', file));
    }

    for (let pair of formData.entries()) {
      console.log(pair[0]+ ': ' + pair[1]);
    }

    try {
      const response = await fetch('http://localhost:3001/api/restaurants', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.log('Error response:', errorData);
        setErrorMsg(errorData?.error || errorData?.details || 'Error creating restaurant');
        setShowModal(true);
        setLoading(false);
        return;
      }
      const result = await response.json();
      console.log('Success response:', result);
      setShowModal(true);
      setErrorMsg(null);
    } catch (err) {
      console.log('Fetch error:', err);
      setErrorMsg(err instanceof Error ? err.message : 'Error creating restaurant');
      setShowModal(true);
    }
    setLoading(false);
  };

  if (loading) return <Loading />;

  const tags = Array.isArray(form.tags) ? form.tags : [];

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-card">
      <button
        type="button"
        className="btn-secondary btn-xs flex items-center gap-1 mb-6"
        onClick={() => router.push('/admin')}
      >
        <span className="text-base">←</span>
        Back
      </button>
      <h2 className="text-2xl font-bold mb-6 text-primary-700">Add Restaurant</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Name *</label>
            <input name="name" value={form.name} onChange={handleChange} className="border px-3 py-2 rounded w-full" required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Neighbourhood</label>
            <input name="neighbourhood" value={form.neighbourhood} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Street Address</label>
            <input
              name="streetAddress"
              value={form.streetAddress}
              onChange={handleChange}
              onBlur={handleAddressBlur}
              className="border px-3 py-2 rounded w-full"
              placeholder="e.g. 123 George St, Sydney NSW 2000"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">District</label>
            <input name="district" value={form.district} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
          </div>
        </div>
        {/* Google Maps */}
        <div className="mt-4 h-64 rounded overflow-hidden">
          {typeof form.latitude === 'number' && typeof form.longitude === 'number' ? (
            <iframe
              title="Google Maps"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps?q=${form.latitude},${form.longitude}&z=15&output=embed`}
              allowFullScreen
            />
          ) : (
            <iframe
              title="Google Maps"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps?q=-33.8688,151.2093&z=15&output=embed`}
              allowFullScreen
            />
          )}
        </div>
        {/* Google Maps URL */}
        <div>
          <label className="block mb-1 font-medium">Google Maps URL</label>
          <input
            name="gmbUrl"
            value={gmbUrl}
            readOnly
            className="border px-3 py-2 rounded w-full bg-gray-100 truncate"
            placeholder="Automatically generated"
          />
          {gmbUrl && (
            <a
              href={gmbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm underline mt-1 block"
            >
              Open in Google Maps →
            </a>
          )}
        </div>
        {/* Cuisine & Price */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Cuisine</label>
            <input name="cuisine" value={form.cuisine} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Price Range</label>
            <input name="priceRange" value={form.priceRange} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
          </div>
        </div>
        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Summary</label>
          <input name="summary" value={form.summary} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="border px-3 py-2 rounded w-full" rows={3} />
        </div>
        {/* Contact & Links */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Website</label>
            <input name="website" value={form.website} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input name="email" value={form.email} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Instagram</label>
            <input name="instagram" value={form.instagram} onChange={handleChange} className="border px-3 py-2 rounded w-full" placeholder="@yourrestaurant" />
          </div>
        </div>
        {/* Service Options */}
        <div>
          <label className="block mb-1 font-medium">Service Options</label>
          <Select
            isMulti
            options={serviceOptions}
            value={(form.serviceOptions || []).map((opt: string) => ({ value: opt, label: opt }))}
            onChange={selected => {
              setForm(prev => ({
                ...prev,
                serviceOptions: Array.from(selected).map(item => (item as { value: string }).value)
              }));
            }}
            className="w-full mt-1"
            classNamePrefix="react-select"
          />
          <input
            type="text"
            placeholder="Add custom service option"
            className="border px-3 py-2 rounded w-full mt-2"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                const input = e.target as HTMLInputElement;
                if (input && input.value.trim()) {
                  setForm(prev => ({
                    ...prev,
                    serviceOptions: [
                      ...(prev.serviceOptions || []),
                      input.value.trim()
                    ]
                  }));
                  input.value = '';
                }
              }
            }}
          />
          <div className="flex gap-2 flex-wrap mt-2">
            {Array.isArray(form.serviceOptions) && form.serviceOptions.map((option: string, idx: number) => (
              <span key={idx} className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full flex items-center gap-1">
                {option}
                <button
                  type="button"
                  className="ml-1 text-xs text-red-600"
                  onClick={e => {
                    e.preventDefault();
                    setForm(prev => ({
                      ...prev,
                      serviceOptions: (prev.serviceOptions || []).filter((_: string, i: number) => i !== idx)
                    }));
                  }}
                  title="Remove"
                >✕</button>
              </span>
            ))}
          </div>
        </div>
        {/* Amenities */}
        <div>
          <label className="block mb-1 font-medium">Amenities</label>
          <Select
            isMulti
            options={amenitiesOptions}
            value={(form.amenities || []).map((opt: string) => ({ value: opt, label: opt }))}
            onChange={selected => {
              setForm(prev => ({
                ...prev,
                amenities: Array.from(selected).map(item => (item as { value: string }).value)
              }));
            }}
            className="w-full mt-1"
            classNamePrefix="react-select"
          />
          <input
            type="text"
            placeholder="Add custom amenity"
            className="border px-3 py-2 rounded w-full mt-2"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                const input = e.target as HTMLInputElement;
                if (input && input.value.trim()) {
                  setForm(prev => ({
                    ...prev,
                    amenities: [
                      ...(prev.amenities || []),
                      input.value.trim()
                    ]
                  }));
                  input.value = '';
                }
              }
            }}
          />
          <div className="flex gap-2 flex-wrap mt-2">
            {Array.isArray(form.amenities) && form.amenities.map((amenity: string, idx: number) => (
              <span key={idx} className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full flex items-center gap-1">
                {amenity}
                <button
                  type="button"
                  className="ml-1 text-xs text-red-600"
                  onClick={e => {
                    e.preventDefault();
                    setForm(prev => ({
                      ...prev,
                      amenities: (prev.amenities || []).filter((_: string, i: number) => i !== idx)
                    }));
                  }}
                  title="Remove"
                >✕</button>
              </span>
            ))}
          </div>
        </div>
        {/* Accessibility */}
        <div>
          <label className="block mb-1 font-medium">Accessibility</label>
          <Select
            isMulti
            options={accessibilityOptions}
            value={(form.accessibility || []).map((opt: string) => ({ value: opt, label: opt }))}
            onChange={selected => {
              setForm(prev => ({
                ...prev,
                accessibility: Array.from(selected).map(item => (item as { value: string }).value)
              }));
            }}
            className="w-full mt-1"
            classNamePrefix="react-select"
          />
          <input
            type="text"
            placeholder="Add custom accessibility"
            className="border px-3 py-2 rounded w-full mt-2"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                const input = e.target as HTMLInputElement;
                if (input && input.value.trim()) {
                  setForm(prev => ({
                    ...prev,
                    accessibility: [
                      ...(prev.accessibility || []),
                      input.value.trim()
                    ]
                  }));
                  input.value = '';
                }
              }
            }}
          />
          <div className="flex gap-2 flex-wrap mt-2">
            {Array.isArray(form.accessibility) && form.accessibility.map((access: string, idx: number) => (
              <span key={idx} className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full flex items-center gap-1">
                {access}
                <button
                  type="button"
                  className="ml-1 text-xs text-red-600"
                  onClick={e => {
                    e.preventDefault();
                    setForm(prev => ({
                      ...prev,
                      accessibility: (prev.accessibility || []).filter((_: string, i: number) => i !== idx)
                    }));
                  }}
                  title="Remove"
                >✕</button>
              </span>
            ))}
          </div>
        </div>
        {/* Payment Methods */}
        <div>
          <label className="block mb-1 font-medium">Payment Methods</label>
          <Select
            isMulti
            options={paymentMethodsOptions}
            value={(form.paymentMethods || []).map((opt: string) => ({ value: opt, label: opt }))}
            onChange={selected => {
              setForm(prev => ({
                ...prev,
                paymentMethods: Array.from(selected).map(item => (item as { value: string }).value)
              }));
            }}
            className="w-full mt-1"
            classNamePrefix="react-select"
          />
          <input
            type="text"
            placeholder="Add custom payment method"
            className="border px-3 py-2 rounded w-full mt-2"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                const input = e.target as HTMLInputElement;
                if (input && input.value.trim()) {
                  setForm(prev => ({
                    ...prev,
                    paymentMethods: [
                      ...(prev.paymentMethods || []),
                      input.value.trim()
                    ]
                  }));
                  input.value = '';
                }
              }
            }}
          />
          <div className="flex gap-2 flex-wrap mt-2">
            {Array.isArray(form.paymentMethods) && form.paymentMethods.map((method: string, idx: number) => (
              <span key={idx} className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full flex items-center gap-1">
                {method}
                <button
                  type="button"
                  className="ml-1 text-xs text-red-600"
                  onClick={e => {
                    e.preventDefault();
                    setForm(prev => ({
                      ...prev,
                      paymentMethods: (prev.paymentMethods || []).filter((_: string, i: number) => i !== idx)
                    }));
                  }}
                  title="Remove"
                >✕</button>
              </span>
            ))}
          </div>
        </div>
        {/* Tags */}
        <div>
          <label className="block mb-1 font-medium">Tags</label>
          <div className="flex gap-2 flex-wrap mb-2">
            {tags.map((tag: string, idx: number) => (
              <span key={idx} className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full flex items-center gap-1">
                {tag}
                <button
                  type="button"
                  className="ml-1 text-xs text-red-600"
                  onClick={() => removeTag(idx)}
                  title="Remove tag"
                >✕</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              className="border px-3 py-2 rounded w-full"
              placeholder="Add tag and press Enter"
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
            />
            <button type="button" className="btn-secondary" onClick={addTag}>Add</button>
          </div>
        </div>
        {/* Gallery Images */}
        <div>
          <label className="block mb-1 font-medium">Gallery Images</label>
          <input
            type="file"
            name="galleryImages"
            accept="image/*"
            multiple
            onChange={handleGalleryChange}
            className="border px-3 py-2 rounded w-full"
          />
          <small className="text-gray-500">
            Select one or more images. You can remove individual images below.
          </small>
          {galleryFiles.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap items-center">
              {galleryFiles.map((img, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`Gallery ${idx + 1}`}
                    className="w-24 h-24 object-cover rounded border"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 text-xs text-red-600 shadow group-hover:scale-110 transition"
                    onClick={() => removeGalleryImage(idx)}
                    title="Remove image"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Main Image */}
        <div>
          <label className="block mb-1 font-medium">Main Image</label>
          <input
            type="file"
            name="mainImage"
            accept="image/*"
            onChange={handleFileChange}
            className="border px-3 py-2 rounded w-full"
          />
          {imageFile && (
            <div className="relative inline-block mt-2">
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Main"
                className="w-24 h-24 object-cover rounded border"
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 text-xs text-red-600 shadow hover:scale-110 transition"
                onClick={clearMainImage}
                title="Remove main image"
              >
                ✕
              </button>
            </div>
          )}
        </div>
        {/* Opening Hours per day */}
        <div>
          <label className="block mb-1 font-medium">Opening Hours</label>
          <div className="space-y-2">
            {['monday','tuesday','wednesday','thursday','friday','saturday','sunday'].map(day => (
              <div key={day} className="flex items-center gap-2">
                <span className="w-24 capitalize">{day}</span>
                <input
                  type="time"
                  value={form.openingHours[day].from}
                  onChange={e => handleOpeningHoursChange(day, 'from', e.target.value)}
                  className="border px-2 py-1 rounded"
                  disabled={form.openingHours[day].closed}
                />
                <span>-</span>
                <input
                  type="time"
                  value={form.openingHours[day].to}
                  onChange={e => handleOpeningHoursChange(day, 'to', e.target.value)}
                  className="border px-2 py-1 rounded"
                  disabled={form.openingHours[day].closed}
                />
                <label className="flex items-center gap-1 ml-2">
                  <input
                    type="checkbox"
                    checked={form.openingHours[day].closed}
                    onChange={e => handleOpeningHoursChange(day, 'closed', e.target.checked)}
                  />
                  Closed
                </label>
              </div>
            ))}
          </div>
        </div>

     {/* --- MENU SECTION --- */}
<div className="mt-10">
  <h3 className="text-lg font-bold mb-2 text-primary-700">Menu</h3>
  <label className="block mb-1 font-medium">Menu Link</label>
  <input
    name="menuLink"
    value={form.menuLink || ''}
    onChange={handleChange}
    className="border px-3 py-2 rounded w-full"
    placeholder="https://yourmenu.com"
  />
  {form.menuLink && (
    <a
      href={form.menuLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block px-4 py-2 rounded bg-primary-600 text-white font-semibold shadow hover:bg-primary-700 transition mt-2"
    >
      View Menu
    </a>
  )}
</div>

{/* --- ADVANCED MENU SECTION --- */}
<MenuEditor
  restaurantId={null}
  menu={form.menu || []}
  refreshMenu={() => {}}
  handleDeleteMenuItem={async (itemKey: string) => {
    setForm(prev => ({
      ...prev,
      menu: prev.menu.map(section => ({
        ...section,
        items: Array.isArray(section.items)
          ? section.items.filter((item: Sanity.MenuItem) => item._key !== itemKey)
          : []
      }))
    }));
  }}
  setMenu={menu => setForm(prev => ({ ...prev, menu }))}
 
/>
        {/* Submit */}
        <button
          type="submit"
          className="btn-primary btn-lg mt-6 w-full"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Add Restaurant'}
        </button>
      </form>
      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center relative">
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold"
              onClick={() => { setShowModal(false); setErrorMsg(null); }}
              aria-label="Close"
            >
              ×
            </button>
            {errorMsg ? (
              <>
                <h3 className="text-lg font-semibold mb-4 text-red-600">Error</h3>
                <p className="mb-6 text-gray-700">{errorMsg}</p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-4">Restaurant created</h3>
                <p className="mb-6">The restaurant has been successfully added.</p>
                <button
                  className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition"
                  onClick={() => router.push('/admin')}
                >
                  Go to restaurants
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}