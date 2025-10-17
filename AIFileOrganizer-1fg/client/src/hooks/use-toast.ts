import { useState, useCallback } from 'react';

type Toast = {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
};

const toasts: Toast[] = [];
let toastListeners: Array<(toasts: Toast[]) => void> = [];

export function useToast() {
  const [, setToasts] = useState<Toast[]>([]);

  const subscribe = useCallback((listener: (toasts: Toast[]) => void) => {
    toastListeners.push(listener);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== listener);
    };
  }, []);

  const toast = useCallback(
    ({ title, description, variant = 'default' }: Omit<Toast, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: Toast = { id, title, description, variant };
      
      toasts.push(newToast);
      toastListeners.forEach((listener) => listener([...toasts]));

      setTimeout(() => {
        const index = toasts.findIndex((t) => t.id === id);
        if (index > -1) {
          toasts.splice(index, 1);
          toastListeners.forEach((listener) => listener([...toasts]));
        }
      }, 3000);

      return {
        id,
        dismiss: () => {
          const index = toasts.findIndex((t) => t.id === id);
          if (index > -1) {
            toasts.splice(index, 1);
            toastListeners.forEach((listener) => listener([...toasts]));
          }
        },
      };
    },
    []
  );

  return { toast };
}
