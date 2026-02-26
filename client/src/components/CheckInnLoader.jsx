export function CheckInnLoader({
  fullscreen = false,
  text = "Checking Inn...",
}) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center
        ${fullscreen ? "fixed inset-0 z-50 bg-[#003580]" : "w-full min-h-[200px] bg-blue-50/50 rounded-xl"}
      `}
    >
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div
          className={`
            absolute animate-spin rounded-full h-16 w-16 border-t-4 border-b-4
            ${fullscreen ? "border-white" : "border-[#003580]"}
          `}
        ></div>

        {/* Inner House Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`w-8 h-8 animate-pulse ${
            fullscreen ? "text-white" : "text-[#003580]"
          }`}
        >
          <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
          <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
        </svg>
      </div>

      <p
        className={`mt-4 text-sm font-medium animate-pulse ${
          fullscreen ? "text-white" : "text-[#003580]"
        }`}
      >
        {text}
      </p>
    </div>
  );
}
