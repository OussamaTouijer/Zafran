import { Link } from 'react-router-dom';
import { Navigation } from '@/components/layout/Navigation';
import zafranLogo from '../../assets/zafran-logo.png';
import './Header.css';



export function Header() {
  return (
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container-custom flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={zafranLogo} alt="Zafran" className="limg h-14 w-auto" />
            </Link>
          </div>

          <Navigation />
        </div>
      </header>
  );
}
