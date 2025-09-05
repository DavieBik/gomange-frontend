"use client";

import { useState, useEffect, Suspense } from 'react';
import RestaurantsAdmin from './RestaurantsAdmin';
import CollectionsAdmin from './CollectionsAdmin';
import ArticlesAdmin from './ArticlesAdmin';
import Loading from '@/components/ui/Loading';

const TABS = [
  { label: 'Restaurants', value: 'restaurants' },
  { label: 'Collections', value: 'collections' },
  { label: 'Articles', value: 'articles' },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState('restaurants');
  const [loading, setLoading] = useState(true);

  // Loader al cargar la página
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600); // Simula carga inicial
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (value: string) => {
    setLoading(true);
    setTimeout(() => {
      setTab(value);
      setLoading(false);
    }, 250); // Simula transición de carga
  };

  return (
    <div className="p-8 mt-16 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-primary-700">Admin Dashboard</h1>
      <div className="flex gap-3 mb-10">
        {TABS.map(t => (
          <button
            key={t.value}
            className={`px-5 py-2 rounded-full border transition-all duration-150 text-lg
              ${tab === t.value
                ? 'bg-primary-600 text-white border-primary-600 shadow'
                : 'bg-gray-100 text-primary-700 border-gray-300 hover:bg-primary-100'}
            `}
            onClick={() => handleTabChange(t.value)}
            aria-selected={tab === t.value}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="min-h-[500px] relative">
        {loading && <Loading />}
        {!loading && (
          <Suspense fallback={<Loading />}>
            {tab === 'restaurants' && <RestaurantsAdmin />}
            {tab === 'collections' && <CollectionsAdmin />}
            {tab === 'articles' && <ArticlesAdmin />}
          </Suspense>
        )}
      </div>
    </div>
  );
}