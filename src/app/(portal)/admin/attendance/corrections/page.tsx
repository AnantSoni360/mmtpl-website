import { Button } from '@/components/ui/Button';
import { correctAttendance } from '@/app/actions/attendance';
import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function AttendanceCorrectionsPage({ searchParams }: { searchParams: Promise<{ date?: string }> }) {
  const { date } = await searchParams;
  const targetDate = date || new Date().toISOString().split('T')[0];

  const employees = await prisma.employee.findMany({
    include: { user: true },
    orderBy: { employeeCode: 'asc' }
  });

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Mark Corrections</h1>
        <p className="text-[13px] text-[var(--color-slate)] font-switzer">Manually override attendance records for a specific date.</p>
      </div>

      <div className="bg-[var(--color-paper)] p-8 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
        <form action={async (formData) => {
          'use server';
          const { correctAttendance } = await import('@/app/actions/attendance');
          const { redirect } = await import('next/navigation');
          await correctAttendance(formData);
          redirect(`/admin/attendance?date=${targetDate}`);
        }} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Date</label>
              <input type="date" name="date" defaultValue={targetDate} required className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]" />
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Employee</label>
              <select name="employeeId" required className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]">
                <option value="">Select employee...</option>
                {employees.map(e => (
                  <option key={e.id} value={e.id}>{e.employeeCode} - {e.user.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Status</label>
              <select name="status" required className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]">
                <option value="PRESENT">Present</option>
                <option value="ABSENT">Absent</option>
                <option value="HALF_DAY">Half Day</option>
                <option value="LEAVE">Leave</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Check In Time</label>
                <input type="time" name="checkIn" className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]" />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Check Out Time</label>
                <input type="time" name="checkOut" className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]" />
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[var(--color-silver)]">
            <Link href={`/admin/attendance?date=${targetDate}`}>
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" variant="lilac">Save Correction</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
