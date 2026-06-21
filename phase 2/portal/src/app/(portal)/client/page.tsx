export default function ClientDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Client Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Active Projects</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">2</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Outstanding Invoices</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">₹1.2 Cr</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Unread Messages</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
        </div>
      </div>
    </div>
  );
}
