import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const nav = useNavigate();
  const [username, setUsername] = useState("Loading...");
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      nav("/login");
      return;
    }
    fetch("http://localhost:5000/verifyToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token })
    })
      .then(res => res.json())
      .then(data => {
        if (data.login) {
          setUsername(data.data.name);
        } else {
          localStorage.removeItem("token");
          nav("/login");
        }
      });
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    nav("/login");
  };
  const dummyQuests = [
    { id: 1, title: "Build Express Security Vault", status: "Completed", xp: 500 },
    { id: 2, title: "Setup React Routing", status: "Completed", xp: 300 },
    { id: 3, title: "Master MongoDB Integration", status: "In Progress", xp: 700 }
  ];
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Hidden on mobile, shown on laptop */}
      <aside className="hidden md:flex w-64 flex-col bg-black text-white p-6">

        <h2 className="font-bold text-xl mb-10">Skill-Bridge</h2>
        <nav className="space-y-4">
          <a href="#" className="block opacity-100">Dashboard</a>
          <a href="#" className="block opacity-50 hover:opacity-100">My Quests</a>
          <a href="#" className="block opacity-50 hover:opacity-100">Leaderboard</a>
          <button onClick={handleLogout} className="bg-black text-white p-2 px-4 rounded-xl">Logout</button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold">Welcome back, {username}</h1>
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">M</div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-500 text-sm">Total XP</p>
            <p className="text-3xl font-bold">1,500</p>
          </div>
          {/* Add 2 more cards here */}
        </div>

        {/* Quest List (The component we built in the sprint) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-bold mb-4">Active Quests</h3>
          <div className="space-y-4">
            {dummyQuests.map((quest) => (
              <div key={quest.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">

                <div>
                  <h4 className="font-bold text-gray-800">{quest.title}</h4>
                  {/* This line changes the text color to green if completed, and blue if in progress */}
                  <p className={`text-sm font-semibold ${quest.status === 'Completed' ? 'text-green-600' : 'text-blue-600'}`}>
                    {quest.status}
                  </p>
                </div>

                <div className="font-black text-gray-900 bg-gray-200 px-3 py-1 rounded-full">
                  +{quest.xp} XP
                </div>

              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );

}
export default Dashboard;