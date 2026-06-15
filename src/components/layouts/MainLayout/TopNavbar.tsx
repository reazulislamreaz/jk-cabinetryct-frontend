
const TopNavbar = () => {
  return (
    <div className="bg-[#E7E7E7] text-[#4F4F4F]">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-1.5 sm:py-2">
        <div className="flex items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
          <a
            href="tel:678-421-9881"
            className="flex items-center gap-1.5 sm:gap-2 font-semibold hover:text-primary transition-colors"
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="hidden xs:inline">Contact Us:</span> 678-421-9881
          </a>
          <span className="hidden sm:inline text-gray-400">|</span>
          <a
            href="mailto:sales@jkcabinetryct.com"
            className="hidden sm:flex items-center gap-1.5 sm:gap-2 font-semibold hover:text-primary transition-colors"
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            sales@jkcabinetryct.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
