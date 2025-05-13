import React from 'react';

interface LoadingComponentProps {
  isLoading: boolean;
}

export const LoadingComponent: React.FC<LoadingComponentProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden"></span>
      </div>
    </div>
  );
};