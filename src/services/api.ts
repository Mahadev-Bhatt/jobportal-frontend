// src/services/api.ts
const API_BASE = '/api/jobs';
const APP_BASE = '/api/applications';
const USER_BASE = '/api/users';

export type Job = {
  id: number;
  title: string;
  description: string;
  location: string;
  company: string;
  postedByEmail: string;
};

export type Application = {
  id?: number;
  userId: number;
  jobId: number;
  appliedAt?: string;
  status?: string;
};

export type User = {
  id: number;
  email: string;
  name: string;
  role: 'job_seeker' | 'recruiter';
};

// GET /api/jobs/search?q=...&location=...
export const searchJobs = async (q: string, location: string): Promise<Job[]> => {
  const params = new URLSearchParams();
  if (q?.trim()) params.append('q', q.trim());
  if (location?.trim()) params.append('location', location.trim());

  const res = await fetch(`${API_BASE}/search?${params}`);
  if (!res.ok) throw new Error('Search failed');
  return res.json();
};

// GET /api/jobs/all
export const getAllJobs = async (): Promise<Job[]> => {
  const res = await fetch(`${API_BASE}/all`);
  if (!res.ok) throw new Error('Failed to load jobs');
  return res.json();
};

// GET /api/jobs/{id}
export const getJobById = async (id: number): Promise<Job> => {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error('Job not found');
  return res.json();
};

// POST /api/jobs/add
export const postJob = async (job: Omit<Job, 'id'>): Promise<Job> => {
  const res = await fetch(`${API_BASE}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job),
  });
  if (!res.ok) throw new Error('Failed to post job');
  return res.json();
};

// GET /api/jobs/recruiter/{email}
export const getRecruiterJobs = async (email: string): Promise<Job[]> => {
  const res = await fetch(`${API_BASE}/recruiter/${encodeURIComponent(email)}`);
  if (!res.ok) throw new Error('Failed to load your jobs');
  return res.json();
};

// POST /api/applications/apply
export const applyToJob = async (userId: number, jobId: number): Promise<Application> => {
  const res = await fetch(`${APP_BASE}/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, jobId }),
  });
  if (!res.ok) throw new Error('Failed to apply');
  return res.json();
};

// POST /api/users/login
export const loginUser = async (email: string, password: string): Promise<User> => {
  const res = await fetch(`${USER_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Invalid credentials');
  return res.json();
};

export const registerUser = async (userData: {
  email: string;
  password: string;
  name: string;
  role: 'job_seeker' | 'recruiter';
}): Promise<User> => {
  const res = await fetch(`${USER_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || 'Registration failed');
  }

  return await res.json();
};

