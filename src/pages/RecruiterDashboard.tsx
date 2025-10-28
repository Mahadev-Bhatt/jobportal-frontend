import { useAuth } from '../context/AuthContext';


export default function RecruiterDashboard() {
  const {user}=useAuth();
  if (user?.role !== 'recruiter') return <div>Access Denied</div>;
  return <div className="p-8 text-center text-2xl">Post Jobs Here</div>;
}