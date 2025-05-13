import React from 'react'
import { LoadingProps } from '@/core/domain/InterfacesProps/LoadingProps';
import useLoading from './useLoading';

export const Loading: React.FC<LoadingProps> = ({ isLoading = null }) => {
  if (isLoading == null) isLoading = useLoading()
  if (!isLoading) return null;

  return (
    <div className="d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden"></span>
      </div>
    </div>
  );
};
