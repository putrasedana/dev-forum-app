const ThreadsSkeleton = () => {
  return (
    <div className="space-y-10 animate-pulse">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="border-b border-gray-700 pb-4 space-y-5">
          {/* Category + Title */}
          <div className="space-y-4">
            <div className="h-5 w-20 bg-gray-700 rounded-md" />
            <div className="h-7 w-3/4 bg-gray-700 rounded" />
          </div>

          {/* Body */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-700 rounded" />
            <div className="h-4 w-full bg-gray-700 rounded" />
            <div className="h-4 w-2/3 bg-gray-700 rounded" />
          </div>

          {/* Meta */}
          <div className="flex items-center space-x-6">
            <div className="h-5 w-10 bg-gray-700 rounded" />
            <div className="h-5 w-10 bg-gray-700 rounded" />
            <div className="h-5 w-10 bg-gray-700 rounded" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-700 rounded-full" />
              <div className="h-4 w-24 bg-gray-700 rounded" />
            </div>
            <div className="h-4 w-20 bg-gray-700 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThreadsSkeleton;
