export default function EmployeeDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Employee Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Today's Tasks</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">3</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Pending Leaves</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">1</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Attendance This Month</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">94%</p>
        </div>
      </div>
    </div>
  );
}
