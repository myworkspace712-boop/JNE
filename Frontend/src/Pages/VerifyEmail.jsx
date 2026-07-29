import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';


export default function VerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('Verifying your email, please wait...');

  const calledOnce = React.useRef(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/verify/${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage(data.message || 'Email verified successfully!');
        } else {
          setStatus('error');
          setMessage(data.error || 'Verification failed. The link might be expired.');
        }
      } catch (err) {
        setStatus('error');
        setMessage('Network error. Could not verify email at this time.');
      }
    };

    if (token && !calledOnce.current) {
      calledOnce.current = true;
      verifyToken();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-stone-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-stone-900 border border-amber-300/70 dark:border-stone-700 rounded-3xl shadow-sm p-8 text-center">
        <h2 className="text-3xl text-amber-950 dark:text-orange-300 font-extrabold mb-4">
          Email Verification
        </h2>
        
        <div className={`p-4 rounded-xl font-medium mb-6 ${
          status === 'verifying' ? 'bg-amber-100 text-amber-800 dark:bg-stone-800 dark:text-stone-300' :
          status === 'success' ? 'bg-green-50 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800' :
          'bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800'
        }`}>
          {message}
        </div>

        {status !== 'verifying' && (
          <Link
            to="/auth"
            className="inline-block w-full bg-amber-100 hover:bg-amber-600 dark:bg-stone-800 dark:hover:bg-orange-400 text-amber-900 hover:text-white dark:text-orange-300 dark:hover:text-stone-900 font-bold py-3 rounded-2xl transition-colors duration-300 text-sm border border-amber-300/50 dark:border-stone-600"
          >
            {status === 'success' ? 'Go to Login' : 'Try Again'}
          </Link>
        )}
      </div>
    </div>
  );
}
