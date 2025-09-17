"use client";

import useSWR from "swr";

async function fetcher(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export default function AdminClient() {
  const { data, error } = useSWR("/api/admin/users", fetcher);

  if (error) return <div className="p-4 text-red-500">Failed to load users</div>;
  if (!data) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="space-y-2">
        {data.map((user: any) => (
          <div key={user.id} className="p-3 border rounded-xl shadow-sm">
            <p className="font-semibold">{user.name ?? "Unnamed User"}</p>
            <p className="text-sm">{user.email}</p>
            <p className="text-sm">Locations: {user.laundromatLocations.length}</p>
            <p className="text-sm">Payments: {user.payments.length}</p>
            <p className="text-sm">Phone Numbers: {user.phoneNumbers.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
