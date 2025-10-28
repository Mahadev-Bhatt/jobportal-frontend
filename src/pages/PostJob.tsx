// src/pages/PostJob.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postJob } from '../services/api';
import { toast } from 'react-toastify';

export default function PostJob() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    company: '',
    postedByEmail: 'mahadevbhatt4404@gmail.com', // Replace with login
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postJob(form);
      toast.success('Job posted!');
      navigate('/my-jobs');
    } catch {
      toast.error('Failed to post job');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Post a Job</h1>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg space-y-6">
          {(['title', 'company', 'location'] as const).map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-2 capitalize">{field}</label>
              <input
                type="text"
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              rows={6}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
}