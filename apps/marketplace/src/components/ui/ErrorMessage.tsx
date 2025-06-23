interface IErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: IErrorMessageProps) {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center max-w-lg">
        <svg 
          className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        <div>
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <p className="mt-1 text-sm text-red-700">{message}</p>
        </div>
      </div>
    </div>
  );
} 