const DetailThreadSkeleton = () => {
  return (
    <div className="space-y-6 sm:mb-20 animate-pulse">
      {/* Category + Title */}
      <div className="space-y-3">
        <div className="h-6 w-24 bg-gray-700 rounded-full" />
        <div className="h-8 w-3/4 bg-gray-700 rounded-lg" />
        <div className="h-8 w-1/2 bg-gray-700 rounded-lg" />
      </div>

      {/* Body */}
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-700 rounded" />
        <div className="h-4 w-full bg-gray-700 rounded" />
        <div className="h-4 w-5/6 bg-gray-700 rounded" />
        <div className="h-4 w-full bg-gray-700 rounded" />
        <div className="h-4 w-full bg-gray-700 rounded" />
        <div className="h-4 w-4/6 bg-gray-700 rounded" />
        <div className="h-4 w-full bg-gray-700 rounded" />
        <div className="h-4 w-5/6 bg-gray-700 rounded" />
        <div className="h-4 w-3/6 bg-gray-700 rounded" />
      </div>

      {/* Meta */}
      <div className="flex items-center space-x-6 border-t border-gray-700 pt-6">
        <div className="h-6 w-12 bg-gray-700 rounded" />
        <div className="h-6 w-12 bg-gray-700 rounded" />
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-700 rounded-full" />
          <div className="h-4 w-20 bg-gray-700 rounded" />
        </div>
        <div className="h-4 w-24 bg-gray-700 rounded" />
      </div>

      {/* Comment input */}
      <div className="h-12 w-full bg-gray-700 rounded-2xl" />

      {/* Comments */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2 border-b border-gray-700 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-700 rounded-full" />
              <div className="h-4 w-28 bg-gray-700 rounded" />
            </div>
            <div className="h-4 w-full bg-gray-700 rounded" />
            <div className="h-4 w-4/6 bg-gray-700 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailThreadSkeleton;
