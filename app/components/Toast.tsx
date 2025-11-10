"use client";

import { useEffect } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

export function ToastComponent({ toast, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 5000); // Auto-close after 5 seconds

    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  const bgColor =
    toast.type === "success"
      ? "bg-green-50 border-green-200"
      : toast.type === "error"
      ? "bg-red-50 border-red-200"
      : "bg-blue-50 border-blue-200";

  const textColor =
    toast.type === "success"
      ? "text-green-800"
      : toast.type === "error"
      ? "text-red-800"
      : "text-blue-800";

  const iconColor =
    toast.type === "success"
      ? "text-green-600"
      : toast.type === "error"
      ? "text-red-600"
      : "text-blue-600";

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg ${bgColor} animate-fade-in min-w-[300px] max-w-md`}
    >
      {toast.type === "success" ? (
        <CheckCircle className={`h-5 w-5 ${iconColor} flex-shrink-0`} />
      ) : toast.type === "error" ? (
        <XCircle className={`h-5 w-5 ${iconColor} flex-shrink-0`} />
      ) : (
        <CheckCircle className={`h-5 w-5 ${iconColor} flex-shrink-0`} />
      )}
      <p className={`flex-1 text-sm font-medium ${textColor}`}>{toast.message}</p>
      <button
        onClick={() => onClose(toast.id)}
        className={`flex-shrink-0 ${textColor} hover:opacity-70 transition-opacity`}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
}

