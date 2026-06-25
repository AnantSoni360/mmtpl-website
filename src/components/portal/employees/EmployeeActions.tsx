'use client';

import { Button } from '@/components/ui/Button';
import { Edit, UserMinus } from 'lucide-react';
import Link from 'next/link';
import { deactivateEmployee } from '@/app/actions/employeeDeactivate';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/portal/shared/ConfirmDialog';

export function EmployeeActions({ id, isActive }: { id: string, isActive: boolean }) {
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);

  function handleDeactivate() {
    return new Promise<void>((resolve, reject) => {
      startTransition(async () => {
        try {
          await deactivateEmployee(id);
          toast.success('Employee deactivated successfully');
          resolve();
        } catch (err) {
          toast.error('Failed to deactivate employee');
          reject(err);
        }
      });
    });
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <Link href={`/admin/employees/${id}/edit`}>
          <Button variant="outline">
            <Edit size={16} className="mr-2" />
            Edit Profile
          </Button>
        </Link>
        {isActive && (
          <Button 
            variant="ghost" 
            onClick={() => setShowConfirm(true)}
            disabled={isPending}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          >
            <UserMinus size={16} className="mr-2" />
            {isPending ? 'Deactivating...' : 'Deactivate'}
          </Button>
        )}
      </div>

      <ConfirmDialog 
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDeactivate}
        title="Deactivate Employee"
        description="Are you sure you want to deactivate this employee? They will no longer be able to log in to the portal."
        confirmText="Deactivate"
        isDestructive={true}
      />
    </>
  );
}
