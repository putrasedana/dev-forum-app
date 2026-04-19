type SpinnerProps = {
  size?: number;
};

const Spinner = ({ size = 24 }: SpinnerProps) => (
  <div
    className="min-h-screen flex items-center flex-col justify-center
      bg-white dark:bg-gray-900 transition-colors"
  >
    <svg className="animate-spin text-indigo-500" width={size} height={size} viewBox="0 0 24 24">
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
      <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z" />
    </svg>

    <p className="text-2xl mt-5 text-gray-800 dark:text-gray-50">Now Loading...</p>
  </div>
);

export default Spinner;
