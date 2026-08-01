import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        
        const response = await axios.get(`${baseUrl}/api/auth/admin-dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setData(response.data.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  if (loading) {
    return <div className="min-h-screen bg-stone-50 dark:bg-stone-900 p-8 text-center text-stone-600 dark:text-stone-300">Loading dashboard...</div>;
  }
  
  if (error) {
    return <div className="min-h-screen bg-stone-50 dark:bg-stone-900 p-8 text-center text-red-500 font-bold">{error}</div>;
  }
  
  if (!data) return null;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 p-4 md:p-8 text-stone-900 dark:text-stone-100 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-amber-950 dark:text-orange-300">Admin Dashboard</h1>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">Manage users and monitor platform statistics.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white font-bold rounded-xl transition-colors shadow-sm"
          >
            Logout
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700">
            <h3 className="text-sm uppercase tracking-wider text-stone-500 dark:text-stone-400 font-bold mb-2">Total Users</h3>
            <p className="text-5xl font-black text-amber-600 dark:text-orange-400">{data.totalUsers}</p>
          </div>
          <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700">
            <h3 className="text-sm uppercase tracking-wider text-stone-500 dark:text-stone-400 font-bold mb-2">Verified Users</h3>
            <p className="text-5xl font-black text-green-600 dark:text-green-400">{data.verifiedUsers}</p>
          </div>
          <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700">
            <h3 className="text-sm uppercase tracking-wider text-stone-500 dark:text-stone-400 font-bold mb-2">Unverified Users</h3>
            <p className="text-5xl font-black text-red-600 dark:text-red-400">{data.unverifiedUsers}</p>
          </div>
        </div>

        {/* Recent Signups */}
        <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700 overflow-hidden">
          <div className="p-6 border-b border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/80">
            <h2 className="text-xl font-extrabold text-amber-950 dark:text-orange-300">Recent Signups</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-stone-100 dark:bg-stone-900/50">
                <tr>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">Name</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">Email</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">Role</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">Status</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-700">
                {data.recentSignups.map((user, idx) => (
                  <tr key={idx} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{user.name}</td>
                    <td className="px-6 py-4 text-stone-500 dark:text-stone-400">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold capitalize ${user.role === 'admin' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' : 'bg-stone-200 text-stone-800 dark:bg-stone-700 dark:text-stone-300'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold flex inline-flex items-center gap-1.5 ${user.isVerified ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'}`}>
                        {user.isVerified ? '✅ Verified' : '❌ Unverified'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-500 dark:text-stone-400">
                      {new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                  </tr>
                ))}
                {data.recentSignups.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-stone-500 dark:text-stone-400">No recent signups found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* All Users Data Table */}
        <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700 overflow-hidden">
          <div className="p-6 border-b border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/80">
            <h2 className="text-xl font-extrabold text-amber-950 dark:text-orange-300">All Platform Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-stone-100 dark:bg-stone-900/50">
                <tr>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">Name</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">Email</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">Role</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-700">
                {data.allUsers.map((user, idx) => (
                  <tr key={idx} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{user.name}</td>
                    <td className="px-6 py-4 text-stone-500 dark:text-stone-400">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold capitalize ${user.role === 'admin' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' : 'bg-stone-200 text-stone-800 dark:bg-stone-700 dark:text-stone-300'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user.isVerified ? '✅ Verified' : '❌ Unverified'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
