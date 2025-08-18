'use client';

import { Suspense } from 'react';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-lg font-semibold">Logging in...</div>}>
      <AdminDashboard />
    </Suspense>
  );
}
