import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios.js';
import { FiEye, FiEyeOff, FiMail } from 'react-icons/fi';


export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // States for password toggle and email suggestions
  const [showPassword, setShowPassword] = useState(false);
  const [savedEmails, setSavedEmails] = useState([]);
  const [showEmailSuggestions, setShowEmailSuggestions] = useState(false);
  const emailContainerRef = useRef(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Load saved emails from local storage on mount
    const storedEmails = JSON.parse(localStorage.getItem('savedLoginEmails') || '[]');
    setSavedEmails(storedEmails);

    // Click outside handler for closing the email suggestions dropdown
    const handleClickOutside = (event) => {
      if (emailContainerRef.current && !emailContainerRef.current.contains(event.target)) {
        setShowEmailSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on user edit
  };

  const clearSavedEmails = () => {
    localStorage.removeItem('savedLoginEmails');
    setSavedEmails([]);
    setShowEmailSuggestions(false);
  };

  const handleSubmit = async (e) => {
    // 1. MUST be the very first line to prevent silent page refresh
    e.preventDefault();

    // 2. Aggressive Frontend Logging
    console.log("Form submitted with data:", {
      mode: isLogin ? 'Login' : 'Register/SignUp',
      name: formData.name,
      email: formData.email,
      password: formData.password ? '****** (captured)' : '(empty)'
    });

    setStatus({ type: '', message: '' });
    setError('');
    setLoading(true);

    // Save the email to local storage on login attempt
    const currentEmail = formData.email.trim();
    if (currentEmail) {
      let emails = JSON.parse(localStorage.getItem('savedLoginEmails') || '[]');
      emails = emails.filter(email => email !== currentEmail);
      emails.unshift(currentEmail);
      if (emails.length > 5) emails = emails.slice(0, 5);
      localStorage.setItem('savedLoginEmails', JSON.stringify(emails));
      setSavedEmails(emails);
    }

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };

      // Centralized Axios API request
      const response = await api.post(endpoint, payload);
      const data = response.data;

      if (!isLogin) {
        // Registration successful
        console.log("Signup Successful. Response Data:", data);
        setStatus({ type: 'success', message: data.message || 'Success! Check your email for a verification link.' });
        setFormData({ name: '', email: '', password: '' });
      } else {
        // Login successful
        console.log("Login Successful. Response Data:", data);
        setStatus({ type: 'success', message: 'Logged in successfully!' });

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        setTimeout(() => {
          if (data.user?.role === 'admin') {
            navigate('/admin-dashboard');
          } else {
            navigate('/');
          }
        }, 1000);
      }

    } catch (err) {
      // Explicit backend error logging
      console.error("Signup Error:", err.response?.data || err.message);

      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        (err.code === 'ERR_NETWORK'
          ? 'Network error: Backend server is unreachable. Please verify server is running.'
          : err.message) ||
        'Registration failed. Please try again.';

      setError(errorMsg);
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

          <div className="relative" ref={emailContainerRef}>
            <label htmlFor="email" className="block text-xs uppercase tracking-wider font-bold text-amber-800 dark:text-stone-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="username"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setShowEmailSuggestions(true)}
              onClick={() => setShowEmailSuggestions(true)}
              required
              className="w-full px-4 py-3 bg-amber-50/50 dark:bg-stone-800 border border-amber-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-orange-400 text-amber-950 dark:text-stone-100 transition-colors relative z-10"
              placeholder="you@example.com"
            />
            
            {showEmailSuggestions && savedEmails.length > 0 && (
              <div className="absolute left-0 right-0 mt-3 bg-stone-900 border border-stone-700 rounded-xl shadow-2xl z-50 text-stone-200 text-sm p-1.5">
                {/* Arrow Caret */}
                <div className="absolute -top-1.5 left-6 w-3 h-3 bg-stone-900 border-l border-t border-stone-700 transform rotate-45 z-0"></div>
                
                <div className="relative z-10">
                  {savedEmails.map((email, idx) => (
                    <div 
                      key={idx}
                      onClick={() => {
                        setFormData({ ...formData, email });
                        setShowEmailSuggestions(false);
                      }}
                      className="flex items-center px-3 py-2.5 hover:bg-stone-800 rounded-lg cursor-pointer transition-colors"
                    >
                      <FiMail className="mr-3 text-stone-500" size={16} />
                      <span className="flex-1 truncate">{email}</span>
                    </div>
                  ))}
                  
                  <div className="h-px bg-stone-800 my-1 mx-2"></div>
                  
                  <button
                    type="button"
                    onClick={clearSavedEmails}
                    className="w-full text-left px-3 py-2 text-xs text-stone-500 hover:text-stone-400 rounded-lg hover:bg-stone-800/50 transition-colors"
                  >
                    Manage addresses... (Clear)
                  </button>
                </div>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-xs uppercase tracking-wider font-bold text-amber-800 dark:text-stone-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-amber-50/50 dark:bg-stone-800 border border-amber-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-orange-400 text-amber-950 dark:text-stone-100 transition-colors pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-500 hover:text-amber-600 dark:hover:text-orange-400 transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          {/* Non-destructive red error text above submit button */}
          {error && (
            <p className="text-red-500 text-xs font-semibold text-center mt-2 animate-fade-in">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-100 hover:bg-amber-600 dark:bg-stone-800 dark:hover:bg-orange-400 text-amber-900 hover:text-white dark:text-orange-300 dark:hover:text-stone-900 font-bold py-3 rounded-2xl transition-colors duration-300 text-sm border border-amber-300/50 dark:border-stone-600 mt-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (isLogin ? 'Signing In...' : 'Registering...') : (isLogin ? 'Sign In' : 'Sign Up')}
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