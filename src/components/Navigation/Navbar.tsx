
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LanguageSelector from "../Language/LanguageSelector";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-lg shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-semibold text-sm">IL</span>
            </div>
            <span className="font-semibold text-lg">Inclusivia</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" label="Home" />
            <NavLink to="/learn" label="Learn" />
            <NavLink to="/dashboard" label="Dashboard" />
            <NavLink to="/teacher" label="Teacher Portal" />
            <NavLink to="/about" label="About" />
          </nav>
          
          {/* Right Side Items */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <Link 
              to="/login" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Log in
            </Link>
            <Link 
              to="/signup" 
              className="text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-full transition-colors"
            >
              Sign up
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass animate-slide-down">
          <div className="px-4 pt-2 pb-4 space-y-1 border-b">
            <MobileNavLink to="/" label="Home" />
            <MobileNavLink to="/learn" label="Learn" />
            <MobileNavLink to="/dashboard" label="Dashboard" />
            <MobileNavLink to="/teacher" label="Teacher Portal" />
            <MobileNavLink to="/about" label="About" />
          </div>
          <div className="px-4 py-4 space-y-4">
            <LanguageSelector />
            <div className="flex flex-col space-y-2">
              <Link 
                to="/login" 
                className="w-full text-center text-sm font-medium text-foreground px-4 py-2 rounded-full border transition-colors"
              >
                Log in
              </Link>
              <Link 
                to="/signup" 
                className="w-full text-center text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-full transition-colors"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  hasDropdown?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, hasDropdown }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`flex items-center text-sm font-medium transition-colors ${
        isActive 
          ? "text-foreground" 
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
      {hasDropdown && <ChevronDown className="ml-1 h-4 w-4" />}
    </Link>
  );
};

const MobileNavLink: React.FC<{ to: string; label: string }> = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        isActive 
          ? "text-foreground bg-accent" 
          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
      }`}
    >
      {label}
    </Link>
  );
};

export default Navbar;
