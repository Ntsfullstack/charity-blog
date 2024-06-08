import React, { FC } from 'react';

interface ToastProps {
  type: "success" | "error";
  message: string;
}

const Toast: FC<ToastProps> = ({ type, message }) => {
  return (
    <div className={`toast toast-${type}`}>
      {message}
    </div>
  );
};
