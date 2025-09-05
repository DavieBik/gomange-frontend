import { useEffect, useState } from 'react';
import { getAllRestaurants, deleteRestaurantAPI } from '@/lib/sanity';
import type { Restaurant } from '@/types/sanity';
import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from '../ui/Pagination';
import Loading from '@/components/ui/Loading';

const PAGE_SIZE = 20;

export default function RestaurantsAdmin() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchRestaurants = async () => {
    setLoadingList(true);
    const data = await getAllRestaurants();
    setRestaurants(Array.isArray(data.restaurants) ? data.restaurants : []);
    setTotal(data.total || 0);
    setLoadingList(false);
    console.log('Listado actualizado:', data.restaurants);
  };

  useEffect(() => {
    fetchRestaurants();
    console.log('Refrescando listado de restaurantes');
  }, []);

  useEffect(() => {
    if (searchParams.get('refresh') === '1') {
      fetchRestaurants();
      console.log('Refrescando listado tras edición');
      router.replace('/admin');
    }
  }, [searchParams, router]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setLoadingDelete(true);
    try {
      await deleteRestaurantAPI(deleteId);
      setDeleteId(null);
      await fetchRestaurants();
    } catch (err) {
      alert('Error deleting restaurant');
    }
    setLoadingDelete(false);
  };

  const filtered = Array.isArray(restaurants)
    ? restaurants.filter(r => r && r.name)
        .filter(r => r.name.toLowerCase().includes(search.toLowerCase()))
    : [];

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        Restaurant Management
        <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-base font-normal">{filtered.length}</span>
      </h2>

      {/* Search + Add Restaurant */}
      <div className="mb-6 flex items-center gap-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search restaurant..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border px-4 py-2 rounded w-full pl-10 focus:ring-2 focus:ring-primary-200"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </div>
        <button
          className="btn-tertiary"
          onClick={() => router.push('/admin/restaurants/new')}
        >
          + Add Restaurant
        </button>
      </div>

      {/* Loader pequeño */}
      {loadingList ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin h-7 w-7 text-primary-600">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-20"/>
              <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      ) : (
        <ul className="divide-y rounded-lg shadow border bg-white">
          {paginated.length === 0 ? (
            <li className="text-gray-500 py-4 text-center">No restaurants to display.</li>
          ) : (
            paginated.map(r => (
              <li
                key={r._id}
                className="flex items-center justify-between py-3 px-4 hover:bg-primary-50 transition cursor-pointer group"
                onClick={() => router.push(`/admin/restaurants/${r._id}`)}
                tabIndex={0}
                role="button"
                aria-label={`Edit ${r.name}`}
              >
                <span className="font-medium group-hover:text-primary-700">{r.name}</span>
                <div className="flex gap-2">
                  <button
                    className="p-2 rounded-full hover:bg-primary-100 transition"
                    title="Edit"
                    onClick={e => { e.stopPropagation(); router.push(`/admin/restaurants/${r._id}`); }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M4 21h17M12.5 17.5l7-7a2.121 2.121 0 0 0-3-3l-7 7V17.5h3.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    className="p-2 rounded-full hover:bg-red-100 transition"
                    title="Delete"
                    onClick={e => { e.stopPropagation(); setDeleteId(r._id); }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 11v6m4-6v6" />
                    </svg>
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
      <div className="mt-6 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold mb-4">Delete Restaurant</h3>
            <p className="mb-6">Are you sure you want to delete this restaurant?</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
                onClick={() => setDeleteId(null)}
                disabled={loadingDelete}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                onClick={handleDelete}
                disabled={loadingDelete}
              >
                {loadingDelete ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
