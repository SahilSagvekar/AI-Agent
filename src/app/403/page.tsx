export default function ForbiddenPage() {
  return (
    <div className="flex items-center justify-center h-screen flex-col text-center">
      <h1 className="text-4xl font-bold mb-4">🚫 Access Denied</h1>
      <p className="text-gray-600">You are not authorized to view this page.</p>
    </div>
  );
}
