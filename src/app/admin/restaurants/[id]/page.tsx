'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCoordinates, getRestaurantById, urlFor, deleteReviewAPI, addMenuSectionAPI, deleteMenuSectionAPI, deleteMenuItemAPI, editMenuSectionAPI, editMenuItemAPI, updateRestaurantMenu } from '@/lib/sanity';
import type { Restaurant } from '@/types/sanity';
import Select from 'react-select';
import Loading from '@/components/ui/Loading';
import MenuEditor from '@/components/features/MenuEditor';

const serviceOptionsList = [
  'Dine-in',
  'Takeaway',
  'Delivery',
  'Drive-thru',
  'Curbside Pickup',
  'Outdoor Seating',
  'Catering',
  'Reservation',
  'Walk-ins Welcome',
  'Counter Service',
  'Table Service'
];

const amenitiesList = [
  'Wi-Fi',
  'Parking',
  'Air Conditioning',
  'Restrooms',
  'Outdoor Seating',
  'Pet Friendly',
  'Live Music',
  'TV Screens',
  'Charging Stations',
  'Bar',
  'Play Area',
  'Smoking Area',
  'Private Dining',
  'Wheelchair Accessible'
];

const accessibilityList = [
  'Wheelchair',
  'Braille menu',
  'Accessible Restrooms',
  'Step-free Entrance',
  'Elevator',
  'Hearing Loop',
  'Service Animals Allowed',
  'Accessible Parking',
  'Low Tables',
  'Visual Aids'
];

const paymentMethodsList = [
  'Cash',
  'Card',
  'Mobile Payment',
  'Apple Pay',
  'Google Pay',
  'Contactless Payment',
  'Gift Card',
  'Bank Transfer',
  'PayPal'
];

// Opciones para react-select
const serviceOptions = serviceOptionsList.map(opt => ({ value: opt, label: opt }));
const amenitiesOptions = amenitiesList.map(opt => ({ value: opt, label: opt }));
const accessibilityOptions = accessibilityList.map(opt => ({ value: opt, label: opt }));
const paymentMethodsOptions = paymentMethodsList.map(opt => ({ value: opt, label: opt }));

export default function EditRestaurantPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState<Partial<Restaurant>>({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [newSectionName, setNewSectionName] = useState('');
  const [newSectionImage, setNewSectionImage] = useState<File | null>(null);
  const [newItemName, setNewItemName] = useState('');
const [newItemDescription, setNewItemDescription] = useState('');
const [newItemPrice, setNewItemPrice] = useState<number>(0);
const [activeSectionKey, setActiveSectionKey] = useState<string | null>(null);
const [newItems, setNewItems] = useState<{ name: string; description: string; price: number }[]>([]);
const [itemName, setItemName] = useState('');
const [itemDescription, setItemDescription] = useState('');
const [itemPrice, setItemPrice] = useState<number>(0);

  // Sync Google Maps URL in real time
  const gmbUrl = (() => {
    if (typeof form.latitude === 'number' && typeof form.longitude === 'number') {
      const query = form.name
        ? `${encodeURIComponent(form.name)}+${form.latitude},${form.longitude}`
        : `${form.latitude},${form.longitude}`;
      return `https://www.google.com/maps/search/?api=1&query=${query}`;
    }
    return '';
  })();

  useEffect(() => {
    if (id) {
      getRestaurantById(id as string).then(data => {
        setForm(data);
      });
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

  // TAGS CHIP INPUT
  const addTag = () => {
    if (tagInput.trim()) {
      setForm((prev: Partial<Restaurant>) => ({
        ...prev,
        tags: Array.isArray(prev.tags)
          ? [...prev.tags, tagInput.trim()]
          : [tagInput.trim()]
      }));
      setTagInput('');
    }
  };
  const removeTag = (idx: number) => {
    setForm((prev: Partial<Restaurant>) => ({
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

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  // --- FORZAR MENU COMO ARRAY SI NO EXISTE ---
  const menuValue = Array.isArray(form.menu) ? form.menu : [];
  
  const formData = new FormData();
  Object.entries(form).forEach(([key, value]) => {
    if (key === 'mainImage' || key === 'galleryImages') return;
    // --- ENVÍA EL MENÚ COMO JSON STRING ---
    if (key === 'menu') {
      formData.append('menu', JSON.stringify(menuValue));
    } else if (Array.isArray(value)) {
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
    alert(`Error updating restaurant: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
  setLoading(false);
};

  const handleDeleteReview = async (reviewKey: string) => {
    console.log('Delete review:', reviewKey); // <-- LOG
    if (!id || !reviewKey) return;
    try {
      await deleteReviewAPI(id as string, reviewKey);
      setForm((prev: Partial<Restaurant>) => ({
        ...prev,
        reviews: (prev.reviews || []).filter((r: any) => r._key !== reviewKey)
      }));
    } catch (err) {
      alert('Could not delete review');
    }
  };


  const handleDeleteMenuItem = async (itemKey: string) => {
    await deleteMenuItemAPI(id as string, itemKey);
    const updated = await getRestaurantById(id as string);
    setForm(updated);
  };



  if (!form || !form.name) {
    return <Loading />;
  }

  if (loading) {
    return <Loading />;
  }

  const tags = Array.isArray(form.tags) ? form.tags : [];

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-card">
      <button
        type="button"
        className="btn-secondary btn-xs flex items-center gap-1 mb-6"
        onClick={() => {
          router.push('/admin');
          router.refresh();
        }}
      >
        <span className="text-base">←</span>
        Back
      </button>
      <h2 className="text-2xl font-bold mb-6 text-primary-700">Edit Restaurant</h2>
    <form
  onSubmit={handleSubmit}
  className="space-y-6"
  onKeyDown={e => {
    // Previene submit por Enter en cualquier input excepto textarea
    if (
      e.key === 'Enter' &&
      (e.target as HTMLElement).tagName !== 'TEXTAREA'
    ) {
      e.preventDefault();
    }
  }}
>
        {/* Main Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Name *</label>
            <input name="name" value={form.name || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Neighbourhood</label>
            <input name="neighbourhood" value={form.neighbourhood || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Street Address</label>
            <input
              name="streetAddress"
              value={form.streetAddress || ''}
              onChange={handleChange}
              onBlur={() => {
                if (form.streetAddress && form.streetAddress.length > 5) {
                  getCoordinates(form.streetAddress)
                    .then(data => {
                      if (data && typeof data.latitude === 'number' && typeof data.longitude === 'number') {
                        setForm((prev: Partial<Restaurant>) => ({
                          ...prev,
                          latitude: data.latitude,
                          longitude: data.longitude,
                        }));
                      }
                    })
                    .catch(() => {});
                }
              }}
              className="border px-3 py-2 rounded w-full"
              placeholder="e.g. 123 George St, Sydney NSW 2000"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">District</label>
            <input name="district" value={form.district || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
          </div>
        </div>
        {/* Google Maps below Street and District */}
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
            <input name="cuisine" value={form.cuisine || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Price Range</label>
            <input name="priceRange" value={form.priceRange || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
          </div>
        </div>
        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Summary</label>
          <input name="summary" value={form.summary || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea name="description" value={form.description || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" rows={3} />
        </div>
        {/* Contact & Links */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Website</label>
            <input name="website" value={form.website || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input name="email" value={form.email || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input name="phone" value={form.phone || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Instagram</label>
            <input name="instagram" value={form.instagram || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" placeholder="@yourrestaurant" />
          </div>
          <div>
            <label className="block mb-1 font-medium">WhatsApp Link</label>
            <input name="whatsappLink" value={form.whatsappLink || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" placeholder="https://wa.me/..." />
          </div>
          <div>
            <label className="block mb-1 font-medium">Order Link</label>
            <input name="orderLink" value={form.orderLink || ''} onChange={handleChange} className="border px-3 py-2 rounded w-full" placeholder="https://order.com/..." />
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
              setForm((prev: Partial<Restaurant>) => ({
                ...prev,
                serviceOptions: (selected as { value: string }[]).map(item => item.value)
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
                  setForm((prev: Partial<Restaurant>) => ({
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
                    setForm((prev: Partial<Restaurant>) => ({
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
              setForm((prev: Partial<Restaurant>) => ({
                ...prev,
                amenities: (selected as { value: string }[]).map(item => item.value)
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
                  setForm((prev: Partial<Restaurant>) => ({
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
                    setForm((prev: Partial<Restaurant>) => ({
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
              setForm((prev: Partial<Restaurant>) => ({
                ...prev,
                accessibility: (selected as { value: string }[]).map(item => item.value)
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
                  setForm((prev: Partial<Restaurant>) => ({
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
                    setForm((prev: Partial<Restaurant>) => ({
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
              setForm((prev: Partial<Restaurant>) => ({
                ...prev,
                paymentMethods: (selected as { value: string }[]).map(item => item.value)
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
                  setForm((prev: Partial<Restaurant>) => ({
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
                    setForm((prev: Partial<Restaurant>) => ({
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
          {/* New images selected */}
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
          {/* Existing gallery from Sanity (only if no new images selected) */}
          {Array.isArray(form.galleryImages) && form.galleryImages.length > 0 && galleryFiles.length === 0 && (
            <div className="flex gap-2 mt-2 flex-wrap items-center">
              {form.galleryImages.map((img: any, idx: number) => (
                <div key={img._key || idx} className="relative group">
                  <img
                    src={img.asset?.url || urlFor(img).url()}
                    alt={`Gallery ${idx + 1}`}
                    className="w-24 h-24 object-cover rounded border"
                  />
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
          {/* New image selected */}
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
          {/* Existing main image from Sanity */}
          {!imageFile && form.mainImage && (
            <img
              src={form.mainImage.asset?.url || urlFor(form.mainImage).url()}
              alt="Main"
              className="w-24 h-24 object-cover rounded border mt-2"
            />
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
                  value={form.openingHours?.[day]?.from || ''}
                  onChange={e => setForm((prev: Partial<Restaurant>) => ({
                    ...prev,
                    openingHours: {
                      ...prev.openingHours,
                      [day]: {
                        ...prev.openingHours?.[day],
                        from: e.target.value
                      }
                    }
                  }))}
                  className="border px-2 py-1 rounded"
                  disabled={form.openingHours?.[day]?.closed}
                />
                <span>-</span>
                <input
                  type="time"
                  value={form.openingHours?.[day]?.to || ''}
                  onChange={e => setForm((prev: Partial<Restaurant>) => ({
                    ...prev,
                    openingHours: {
                      ...prev.openingHours,
                      [day]: {
                        ...prev.openingHours?.[day],
                        to: e.target.value
                      }
                    }
                  }))}
                  className="border px-2 py-1 rounded"
                  disabled={form.openingHours?.[day]?.closed}
                />
                <label className="flex items-center gap-1 ml-2">
                  <input
                    type="checkbox"
                    checked={form.openingHours?.[day]?.closed || false}
                    onChange={e => setForm((prev: Partial<Restaurant>) => ({
                      ...prev,
                      openingHours: {
                        ...prev.openingHours,
                        [day]: {
                          ...prev.openingHours?.[day],
                          closed: e.target.checked,
                          from: e.target.checked ? '' : prev.openingHours?.[day]?.from || '',
                          to: e.target.checked ? '' : prev.openingHours?.[day]?.to || ''
                        }
                      }
                    }))}
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
  restaurantId={id as string}
  menu={form.menu || []}
  refreshMenu={async () => {
    const updated = await getRestaurantById(id as string);
    setForm(updated);
  }}
  handleDeleteMenuItem={handleDeleteMenuItem}
/>
      {/* --- REVIEWS SECTION --- */}
      <div className="mt-10">
        <h3 className="text-lg font-bold mb-2 text-primary-700">Reviews</h3>
        {Array.isArray(form.reviews) && form.reviews.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {form.reviews.map((review: any, idx: number) => {
              console.log('Review:', review); // <-- Verifica si tiene _key
              return (
                <div key={review._key || idx} className="min-w-[260px] bg-primary-50 border border-primary-200 rounded-lg p-4 flex-shrink-0 relative">
                  <div className="flex items-center gap-2 mb-1">
                    {[1,2,3,4,5].map(val => (
                      <svg
                        key={val}
                        className={`w-5 h-5 ${val <= review.rating ? 'text-primary-500' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.174 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" />
                      </svg>
                    ))}
                    <span className="ml-2 font-semibold text-primary-700">{review.author}</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                  <div className="text-xs text-gray-400 mt-1">{review.date ? new Date(review.date).toLocaleDateString() : ''}</div>
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-xs text-red-600 bg-white rounded-full px-2 py-1 shadow hover:bg-red-100"
                    onClick={() => handleDeleteReview(review._key)}
                    title="Delete review"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn-primary btn-lg mt-6 w-full"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save changes'}
        </button>
      </form>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center relative">
            {/* X button */}
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              ×
            </button>
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