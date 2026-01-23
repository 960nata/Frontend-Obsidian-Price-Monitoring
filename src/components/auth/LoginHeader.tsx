import { Link } from 'react-router-dom';

export const LoginHeader = () => {
  return (
    <div className="w-full max-w-[1200px] px-6 lg:px-10 z-10">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/5 py-6">
        <Link to="/" className="flex items-center gap-3 text-white">
          <div className="size-6 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path
                clipRule="evenodd"
                d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
          <h2 className="text-white text-xl font-bold leading-tight tracking-[0.1em] uppercase">
            Price Monitor <span className="text-primary/80">[Obsidian]</span>
          </h2>
        </Link>
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/dashboard"
              className="text-white/60 hover:text-primary text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
            <a
              href="#features"
              className="text-white/60 hover:text-primary text-sm font-medium transition-colors"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-white/60 hover:text-primary text-sm font-medium transition-colors"
            >
              About
            </a>
          </nav>
        </div>
      </header>
    </div>
  );
};
