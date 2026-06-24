import { Button } from '@/components/ui/Button';
import { rejectLeave } from '@/app/actions/leave';
import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function RejectLeavePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const leave = await prisma.leaveRequest.findUnique({ 
    where: { id },
    include: { employee: { include: { user: true } } }
  });

  if (!leave) return null;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1 text-red-600">Reject Leave Request</h1>
        <p className="text-[13px] text-[var(--color-slate)] font-switzer">Provide a mandatory remark for rejecting this leave.</p>
      </div>

      <div className="bg-[var(--color-paper)] p-8 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
        <div className="mb-6 bg-red-50 p-4 rounded-lg border border-red-200">
          <p className="text-[14px] text-red-800 font-medium font-switzer">
            Employee: {leave.employee.user.name} ({leave.employee.employeeCode})
          </p>
          <p className="text-[13px] text-red-700 font-switzer mt-1">
            Reason: {leave.reason}
          </p>
        </div>

        <form action={rejectLeave} className="space-y-6">
          <input type="hidden" name="id" value={id} />
          
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Admin Remark (Required)</label>
            <textarea name="remark" required rows={4} className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]" placeholder="Please explain why this leave is being rejected..." />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[var(--color-silver)]">
            <Link href={`/admin/leave`}>
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" variant="lilac" className="bg-red-600 hover:bg-red-700 text-white border-red-600">Confirm Rejection</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
