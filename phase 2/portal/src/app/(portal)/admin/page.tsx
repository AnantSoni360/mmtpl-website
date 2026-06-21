export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Active Projects</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Total Employees</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">148</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Pending Inquiries</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">5</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Unpaid Invoices</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">₹4.2 Cr</p>
        </div>
      </div>
    </div>
  );
}
