// src/pages/admin/JobsManager.tsx
import { useState } from "react";
import Swal from "sweetalert2";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
}

export default function JobsManager() {
  const [jobs, setJobs] = useState<Job[]>([
    { id: 1, title: "Frontend Developer", company: "TechCorp", location: "Remote" },
  ]);
  const [newJob, setNewJob] = useState({ title: "", company: "", location: "" });

  const handleAddJob = () => {
    if (!newJob.title || !newJob.company || !newJob.location) {
      Swal.fire("Missing fields", "Please fill all job fields", "warning");
      return;
    }
    const newEntry = { id: Date.now(), ...newJob };
    setJobs([...jobs, newEntry]);
    setNewJob({ title: "", company: "", location: "" });
    Swal.fire("Success", "Job added successfully!", "success");
  };

  const handleDeleteJob = (id: number) => {
    setJobs(jobs.filter((j) => j.id !== id));
    Swal.fire("Deleted", "Job removed", "info");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Jobs Management</h2>

      {/* Add Job Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          placeholder="Title"
          value={newJob.title}
          onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Company"
          value={newJob.company}
          onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Location"
          value={newJob.location}
          onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
          className="border p-2 rounded"
        />
      </div>
      <button
        onClick={handleAddJob}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Job
      </button>

      {/* Job List */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-700 mb-2">Existing Jobs</h3>
        <ul className="divide-y divide-gray-200">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="flex justify-between items-center py-2 px-2 hover:bg-gray-50 rounded"
            >
              <div>
                <p className="font-medium">{job.title}</p>
                <p className="text-sm text-gray-500">
                  {job.company} — {job.location}
                </p>
              </div>
              <button
                onClick={() => handleDeleteJob(job.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
