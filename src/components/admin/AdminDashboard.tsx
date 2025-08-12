"use client";

import { useState } from 'react';
import RestaurantsAdmin from './RestaurantsAdmin';
import CollectionsAdmin from './CollectionsAdmin';
import ArticlesAdmin from './ArticlesAdmin';

const TABS = [
  { label: 'Restaurantes', value: 'restaurants' },
  { label: 'Colecciones', value: 'collections' },
  { label: 'Artículos', value: 'articles' },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState('restaurants');

  return (
    <div className="p-8 mt-16">
      <h1 className="text-2xl font-bold mb-6">Dashboard Administrador</h1>
      <div className="flex gap-4 mb-8">
        {TABS.map(t => (
          <button
            key={t.value}
            className={`px-4 py-2 rounded ${tab === t.value ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setTab(t.value)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tab === 'restaurants' && <RestaurantsAdmin />}
      {tab === 'collections' && <CollectionsAdmin />}
      {tab === 'articles' && <ArticlesAdmin />}
    </div>
  );
}
