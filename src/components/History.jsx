import React, { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchEvents();
  }, [page]);

  async function fetchEvents() {
    const res = await axios.get(`/api/history?page=${page}`);
    setEvents(res.data);
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="font-semibold mb-2">Claim / Union History</h3>
      <table className="table-auto w-full text-sm">
        <thead>
          <tr>
            <th>Time</th>
            <th>Action</th>
            <th>Amount</th>
            <th>From</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e, i) => (
            <tr key={i}>
              <td>{new Date(e.time * 1000).toLocaleString()}</td>
              <td>{e.type}</td>
              <td>{e.amount}</td>
              <td>{e.user}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-2 space-x-2">
        <button onClick={() => setPage(page - 1)} disabled={page <= 1}>← Prev</button>
        <button onClick={() => setPage(page + 1)}>Next →</button>
      </div>
    </div>
  );
}
