import { Navigate } from 'react-router-dom';


export default function AdminRoute({ children }) {
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');
  let user = null;

  try {
    if (userString) {
      user = JSON.parse(userString);
    }
  } catch (error) {
    console.error('Error parsing user data:', error);
  }

  if (!token || !user || user.role !== 'admin') {
    return <Navigate to="/auth" replace />;
  }

  return children;
}