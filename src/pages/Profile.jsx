import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
      } catch (err) {
        console.error(err);
        setError("Invalid token");
        setLoading(false);
      }
    } else {
      setError("No token found");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:8080/user/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"><span className="text-lg text-indigo-600 font-semibold">Loading...</span></div>;
  if (error) return <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"><span className="text-lg text-red-600 font-semibold">Error: {error}</span></div>;
  if (!user) return <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"><span className="text-lg text-gray-600 font-semibold">No user found.</span></div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-400 to-blue-400 flex items-center justify-center mb-4 shadow-md">
          <span className="text-4xl text-white font-bold uppercase">{user.name?.charAt(0)}</span>
        </div>
        <h1 className="text-2xl font-bold text-indigo-700 mb-1">{user.name}</h1>
        <div className="w-full space-y-3">
          <div className="flex items-center gap-2 text-gray-700"><svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 01-8 0 4 4 0 018 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7m0 0H7m5 0h5" /></svg><span className="font-semibold">Email:</span> {user.email}</div>
          <div className="flex items-center gap-2 text-gray-700"><svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16 3v4M8 3v4m-5 4h18" /></svg><span className="font-semibold">Phone:</span> {user.phone}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
