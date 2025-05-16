
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center w-full p-8">
      <div className="neo-container p-6">
        <div className="text-2xl font-bold">LOADING...</div>
        <div className="mt-3 h-4 w-48 bg-neobrutalism-gray animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
