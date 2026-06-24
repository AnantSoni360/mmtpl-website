import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { StatusBadge } from '@/components/portal/shared/StatusBadge';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { EmployeeActions } from '@/components/portal/employees/EmployeeActions';

export default async function EmployeeProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const employee = await prisma.employee.findUnique({
    where: { id },
    include: {
      user: true,
      attendance: {
        orderBy: { date: 'desc' },
        take: 5
      },
      leaveRequests: {
        orderBy: { createdAt: 'desc' },
        take: 5
      },
      assignments: {
        include: { project: true }
      }
    }
  });

  if (!employee) {
    notFound();
  }

  // Calculate Attendance Rate
  const totalDays = employee.attendance.length || 1; // avoid division by zero
  const presentDays = employee.attendance.filter(a => a.status === 'PRESENT' || a.status === 'HALF_DAY').length;
  const attendanceRate = Math.round((presentDays / totalDays) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/employees" className="w-10 h-10 rounded-full border border-[var(--color-silver)] flex items-center justify-center hover:bg-[var(--color-bone)] transition-colors">
            <ArrowLeft size={16} className="text-[var(--color-obsidian)]" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1 flex items-center gap-3">
              {employee.user.name}
              <StatusBadge status={employee.user.isActive ? 'Active' : 'Inactive'} />
            </h1>
            <p className="text-[13px] text-[var(--color-slate)] font-switzer">
              {employee.designation} • {employee.department}
            </p>
          </div>
        </div>
        <EmployeeActions id={employee.id} isActive={employee.user.isActive} />
      </div>

      {/* Analytics Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider mb-1">Attendance Rate</p>
            <p className="text-3xl font-semibold text-[var(--color-obsidian)] font-switzer">{employee.attendance.length ? `${attendanceRate}%` : 'N/A'}</p>
          </div>
        </div>
        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider mb-1">Active Projects</p>
            <p className="text-3xl font-semibold text-[var(--color-obsidian)] font-switzer">
              {employee.assignments.filter(p => p.project.status === 'IN_PROGRESS').length}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-6">
          <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider">Information</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase">Employee Code</p>
              <p className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer">{employee.employeeCode}</p>
            </div>
            <div>
              <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase">Email</p>
              <p className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer">{employee.user.email}</p>
            </div>
            <div>
              <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase">Phone</p>
              <p className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer">{employee.phone || 'N/A'}</p>
            </div>
            <div>
              <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase">Location</p>
              <p className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer">{employee.location || 'N/A'}</p>
            </div>
            <div>
              <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase">Joined Date</p>
              <p className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer">{format(new Date(employee.joinDate), 'dd MMM yyyy')}</p>
            </div>
            <div>
              <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase">Employment Type</p>
              <p className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer capitalize">{employee.employmentType.replace('_', ' ')}</p>
            </div>
          </div>
        </div>

        {/* History & Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Attendance */}
          <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
            <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-4">Recent Attendance</h2>
            {employee.attendance.length > 0 ? (
              <div className="space-y-3">
                {employee.attendance.map((att) => (
                  <div key={att.id} className="flex items-center justify-between py-2 border-b border-[var(--color-silver)] last:border-0">
                    <div>
                      <p className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer">
                        {format(new Date(att.date), 'EEEE, dd MMM yyyy')}
                      </p>
                      <p className="text-[12px] text-[var(--color-slate)] font-switzer">
                        {att.checkIn ? format(new Date(att.checkIn), 'hh:mm a') : '--:--'} - {att.checkOut ? format(new Date(att.checkOut), 'hh:mm a') : '--:--'}
                      </p>
                    </div>
                    <StatusBadge status={att.status} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[13px] text-[var(--color-slate)] font-switzer">No recent attendance records found.</p>
            )}
          </div>

          {/* Recent Leave Requests */}
          <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
            <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-4">Leave History</h2>
            {employee.leaveRequests.length > 0 ? (
              <div className="space-y-3">
                {employee.leaveRequests.map((leave) => (
                  <div key={leave.id} className="flex items-center justify-between py-3 border-b border-[var(--color-silver)] last:border-0">
                    <div>
                      <p className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer capitalize">
                        {leave.leaveType.toLowerCase()} Leave
                      </p>
                      <p className="text-[12px] text-[var(--color-slate)] font-switzer mt-1 max-w-md truncate">
                        {format(new Date(leave.fromDate), 'dd MMM')} to {format(new Date(leave.toDate), 'dd MMM yyyy')} • {leave.reason}
                      </p>
                    </div>
                    <StatusBadge status={leave.status} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[13px] text-[var(--color-slate)] font-switzer">No leave requests found.</p>
            )}
          </div>

          {/* Project History */}
          <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
            <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-4">Project History</h2>
            {employee.assignments.length > 0 ? (
              <div className="space-y-3">
                {employee.assignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between py-3 border-b border-[var(--color-silver)] last:border-0">
                    <div>
                      <Link href={`/admin/projects/${assignment.project.id}`} className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer hover:underline">
                        {assignment.project.name}
                      </Link>
                      <p className="text-[12px] text-[var(--color-slate)] font-switzer mt-1">
                        Role: {assignment.roleOnProject}
                      </p>
                    </div>
                    <StatusBadge status={assignment.project.status} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[13px] text-[var(--color-slate)] font-switzer">No projects assigned.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
