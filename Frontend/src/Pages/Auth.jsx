import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { Link } from 'react-router-dom';


export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: 'Yatharth', email: 'my.workspace.712@gmail.com', password: 'pass$4321' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    setLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    // In production, you might want to use the absolute URL or Vite proxy
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const apiUrl = `${baseUrl}${endpoint}`;
    // const apiUrl = `http://192.168.1.11:5000${endpoint}`;

    try {
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };

      const response = await axios.post(apiUrl, payload);
      const data = response.data;

      if (!isLogin) {
        // Registration successful
        setStatus({ type: 'success', message: 'Success! Check your email for a verification link.' });
        setFormData({ name: '', email: '', password: '' });
      } else {
        // Login successful
        setStatus({ type: 'success', message: 'Logged in successfully!' });

        // Save to localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect based on role
        setTimeout(() => {
          if (data.user.role === 'admin') {
            navigate('/admin-dashboard');
          } else {
            navigate('/');
          }
        }, 1000);
      }

    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || 'Something went wrong';
      setStatus({ type: 'error', message: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-stone-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-stone-900 border border-amber-300/70 dark:border-stone-700 rounded-3xl shadow-sm p-8 transition-all">

        <div className="text-center mb-8">
          <h2 className="text-3xl text-amber-950 dark:text-orange-300 font-extrabold mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-sm text-amber-800 dark:text-stone-300">
            {isLogin ? 'Enter your credentials to access your account.' : 'Fill in the details below to get started.'}
          </p>
        </div>

        {status.message && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-semibold border ${status.type === 'error' ? 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800' : 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800'}`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-amber-800 dark:text-stone-300 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-amber-50/50 dark:bg-stone-800 border border-amber-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-orange-400 text-amber-950 dark:text-stone-100 transition-colors"
                placeholder="John Doe"
              />
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-amber-800 dark:text-stone-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-amber-50/50 dark:bg-stone-800 border border-amber-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-orange-400 text-amber-950 dark:text-stone-100 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-amber-800 dark:text-stone-300 mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-amber-50/50 dark:bg-stone-800 border border-amber-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-orange-400 text-amber-950 dark:text-stone-100 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-100 hover:bg-amber-600 dark:bg-stone-800 dark:hover:bg-orange-400 text-amber-900 hover:text-white dark:text-orange-300 dark:hover:text-stone-900 font-bold py-3 rounded-2xl transition-colors duration-300 text-sm border border-amber-300/50 dark:border-stone-600 mt-2 disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-amber-800 dark:text-stone-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setStatus({ type: '', message: '' });
              }}
              className="font-bold text-amber-600 hover:text-amber-700 dark:text-orange-400 dark:hover:text-orange-300 transition-colors"
            >
              {isLogin ? 'Sign up here' : 'Log in here'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}