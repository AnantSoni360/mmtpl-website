import React from 'react';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone. Please confirm to proceed.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDestructive = true
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative z-50 w-full max-w-md bg-white rounded-[16px] shadow-2xl p-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200 mx-4">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex flex-col items-center text-center mt-2">
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center mb-4",
            isDestructive ? "bg-red-100 text-red-600" : "bg-blue-100 text-[#2563EB]"
          )}>
            <AlertTriangle className="w-6 h-6" />
          </div>
          
          <h3 className="text-[18px] font-semibold text-[var(--color-obsidian)] font-clash mb-2">
            {title}
          </h3>
          
          <p className="text-[14px] text-[var(--color-slate)] font-switzer mb-8 px-2">
            {description}
          </p>
          
          <div className="flex gap-3 w-full">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={onClose}
            >
              {cancelLabel}
            </Button>
            <Button 
              className={cn(
                "flex-1", 
                isDestructive 
                  ? "bg-red-600 hover:bg-red-700 text-white" 
                  : ""
              )}
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
