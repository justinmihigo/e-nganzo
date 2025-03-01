import React, { useEffect } from 'react';
import { FiCheck, FiX, FiAlertCircle, FiInfo } from 'react-icons/fi';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  type,
  message,
  onClose,
  duration = 5000
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: FiCheck,
    error: FiX,
    info: FiInfo,
    warning: FiAlertCircle
  };

  const colors = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200'
  };

  const Icon = icons[type];

  return (
    <div className={`
      fixed bottom-4 right-4 flex items-center p-4 rounded-lg border
      shadow-lg animate-slide-up ${colors[type]}
    `}>
      <Icon className="flex-shrink-0 mr-2" />
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 hover:opacity-75"
      >
        <FiX />
      </button>
    </div>
  );
};

export default Toast; 