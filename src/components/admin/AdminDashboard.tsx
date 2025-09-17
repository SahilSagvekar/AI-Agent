"use client";

import useSWR from "swr";
import { LoaderIcon, AlertCircle } from "lucide-react";
import { UserCard } from "./UserCard";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};

export default function AdminDashboard() {
  const { data, error, isLoading } = useSWR("/api/admin/users", fetcher);

  if (error) {
    return (
      <div className="min-h-screen bg-muted/20 flex items-center justify-center p-6">
        <div className="bg-card border border-danger/20 rounded-lg p-8 max-w-md w-full shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-danger-light rounded-lg">
              <AlertCircle className="h-5 w-5 text-danger" />
            </div>
            <div>
              <h3 className="font-semibold text-danger">Error Loading Data</h3>
              <p className="text-sm text-muted-foreground">Failed to load users</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="min-h-screen bg-muted/20 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <LoaderIcon className="h-5 w-5 animate-spin text-primary" />
          <span className="text-muted-foreground font-medium">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <header className="bg-card border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground font-heading">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage users and laundromat locations
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{data.length}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Total Users</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-8">
        {data.length === 0 ? (
          <div className="bg-card rounded-lg border border-warning/20 p-12 text-center">
            <div className="p-4 bg-warning-light rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-warning" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Users Found</h3>
            <p className="text-muted-foreground">There are no users registered in the system yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {data.map((user: any) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}