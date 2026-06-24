'use client';

import { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = false
}: ConfirmDialogProps) {
  const [isPending, setIsPending] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsPending(true);
    try {
      await onConfirm();
    } finally {
      setIsPending(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={!isPending ? onClose : undefined}
      />
      <div className="relative bg-[var(--color-paper)] p-6 rounded-[16px] shadow-[var(--shadow-card)] border-[0.5px] border-[var(--color-silver)] max-w-md w-full mx-4 z-10 animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          disabled={isPending}
          className="absolute right-4 top-4 text-[var(--color-slate)] hover:text-[var(--color-obsidian)] transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="flex gap-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isDestructive ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
            <AlertTriangle size={20} />
          </div>
          <div className="pt-1">
            <h3 className="font-switzer font-semibold text-[16px] text-[var(--color-obsidian)] mb-1">
              {title}
            </h3>
            <p className="font-switzer text-[13px] text-[var(--color-slate)] leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isPending}
          >
            {cancelText}
          </Button>
          <Button 
            variant={isDestructive ? 'outline' : 'lilac'} 
            onClick={handleConfirm}
            disabled={isPending}
            className={isDestructive ? 'bg-red-600 text-white hover:bg-red-700 hover:text-white border-transparent' : ''}
          >
            {isPending ? 'Processing...' : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
