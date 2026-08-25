import React, { useEffect } from 'react';
import { Check, X, AlertCircle, Info } from 'lucide-react';

export interface ToastData {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  duration?: number;
}

interface ToastProps {
  toast: ToastData | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    if (!toast) return;
    const duration = toast.duration || 4000;
    const timer = setTimeout(() => {
      onDismiss();
    }, duration);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const iconMap = {
    success: <Check className="w-4 h-4 text-success" />,
    error: <AlertCircle className="w-4 h-4 text-error" />,
    info: <Info className="w-4 h-4 text-secondary" />,
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-sm w-[calc(100vw-3rem)] p-4 bg-primary text-on-primary border border-outline-variant shadow-2xl flex items-center justify-between gap-3 animate-fadeIn"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 bg-surface-container flex items-center justify-center shrink-0 border border-outline-variant">
          {iconMap[toast.type || 'success']}
        </div>
        <div className="min-w-0">
          <h4 className="font-serif italic text-sm text-on-primary font-medium truncate">
            {toast.title}
          </h4>
          {toast.subtitle && (
            <p className="font-body-md text-[11px] text-on-primary/80 truncate">
              {toast.subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {toast.actionLabel && toast.onAction && (
          <button
            type="button"
            onClick={toast.onAction}
            className="text-[10px] font-button uppercase tracking-widest text-secondary hover:underline cursor-pointer"
          >
            {toast.actionLabel}
          </button>
        )}
        <button
          type="button"
          onClick={onDismiss}
          className="p-1 text-on-primary/70 hover:text-on-primary transition-colors focus-visible:outline-none"
          aria-label="Dismiss message"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
