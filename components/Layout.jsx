import React from "react";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-indigo-700 text-white flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6">Union UNO</h1>
        <nav className="space-y-3">
          <a href="#dashboard" className="block hover:bg-indigo-600 rounded px-3 py-2">Dashboard</a>
          <a href="#faucet" className="block hover:bg-indigo-600 rounded px-3 py-2">Faucet</a>
          <a href="#union" className="block hover:bg-indigo-600 rounded px-3 py-2">Union</a>
          <a href="#claim" className="block hover:bg-indigo-600 rounded px-3 py-2">Claim Reward</a>
          <a href="#history" className="block hover:bg-indigo-600 rounded px-3 py-2">History</a>
          <a href="#chart" className="block hover:bg-indigo-600 rounded px-3 py-2">Reward Chart</a>
        </nav>
      </aside>
      <main className="flex-grow p-6 overflow-auto">{children}</main>
    </div>
  );
}
