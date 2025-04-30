
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type NavigationItem = {
  name: string;
  href: string;
};

const navigation: NavigationItem[] = [
  { name: 'Accueil', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'À propos', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="w-full">
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-end space-x-8">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "font-medium relative group",
              location.pathname === item.href 
                ? "text-zafran-500" 
                : "text-clay-900 hover:text-zafran-500"
            )}
          >
            {item.name}
            <span className={cn(
              "absolute -bottom-1 left-0 w-0 h-0.5 bg-zafran-400 transition-all duration-300",
              location.pathname === item.href 
                ? "w-full" 
                : "group-hover:w-full"
            )}></span>
          </Link>
        ))}
        <Link 
          to="/contact" 
          className="btn-primary"
        >
          Réserver
        </Link>
      </nav>

      {/* Mobile Navigation Trigger */}
      <div className="md:hidden flex items-center">
        <button
          type="button"
          className="text-clay-900 hover:text-zafran-500 p-2"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Ouvrir le menu</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex justify-end p-4">
            <button
              type="button"
              className="text-clay-900 hover:text-zafran-500 p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Fermer le menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <nav className="mt-6 px-6 flex flex-col space-y-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "font-medium text-xl py-2",
                  location.pathname === item.href 
                    ? "text-zafran-500 border-b-2 border-zafran-400" 
                    : "text-clay-900"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link 
              to="/contact" 
              className="btn-primary w-full text-center mt-8"
              onClick={() => setMobileMenuOpen(false)}
            >
              Réserver
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
