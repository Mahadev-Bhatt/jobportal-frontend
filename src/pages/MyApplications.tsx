import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

interface Application {
  id: number;
  jobId: number;
  userId: number;
  status: string;
  appliedAt: string;
}

export default function MyApplications() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchApplications = async () => {
      try {
        console.log("Fetching applications for user:", user);

        const response = await axios.get<Application[]>(
          `http://localhost:8080/api/applications/user/${user.id}`
        );

        console.log("Applications fetched:", response.data);
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  if (!user)
    return <div className="text-center text-lg mt-8">Please login first.</div>;

  if (loading)
    return <div className="text-center text-lg mt-8">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Your Job Applications
      </h2>

      {applications.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven’t applied for any jobs yet.
        </p>
      ) : (
        <table className="table-auto w-full border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-blue-100">
            <tr>
              <th className="border px-4 py-2">Application ID</th>
              <th className="border px-4 py-2">Job ID</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Applied At</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2 text-center">{app.id}</td>
                <td className="border px-4 py-2 text-center">{app.jobId}</td>
                <td className="border px-4 py-2 text-center">{app.status}</td>
                <td className="border px-4 py-2 text-center">
                  {new Date(app.appliedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}




