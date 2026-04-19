const LeaderBoardsSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex justify-between mb-3 sm:text-xl font-semibold">
        <div className="h-5 w-16 bg-gray-700 rounded" />
        <div className="h-5 w-16 bg-gray-700 rounded" />
      </div>

      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex justify-between items-center py-6 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-full" />
            <div className="h-5 w-36 bg-gray-700 rounded" />
          </div>
          <div className="h-5 w-10 bg-gray-700 rounded" />
        </div>
      ))}
    </div>
  );
};

export default LeaderBoardsSkeleton;
