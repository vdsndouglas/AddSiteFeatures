import { memo } from 'react';

const LoadingSpinner = memo(function LoadingSpinner() {
  return (
    <div className="h-96 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
});

export default LoadingSpinner;