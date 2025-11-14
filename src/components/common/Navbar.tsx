import { useState, useRef, useEffect, useCallback } from 'react';
import '../../styles/Navbar.css';
import '../../styles/ProfileMenu.css';
import { useNavigate } from 'react-router-dom';
import { AppBar, AppBarSection } from '@progress/kendo-react-layout';
import { createPortal } from 'react-dom';

// Extract menu width calculation to avoid repetition
const getMenuWidth = (): number => {
  if (window.innerWidth <= 320) return 140;
  if (window.innerWidth <= 480) return 160;
  return 180;
};

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState<{top: number, left: number} | null>(null);

  const calculateMenuPosition = useCallback(() => {
    if (profileRef.current) {
      const rect = profileRef.current.getBoundingClientRect();
      const menuWidth = getMenuWidth();
      
      setMenuPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.right - menuWidth + window.scrollX
      });
    }
  }, []);

  const handleProfileClick = useCallback(() => {
    calculateMenuPosition();
    setMenuOpen((open) => !open);
  }, [calculateMenuPosition]);

  const handleSignOut = useCallback(() => {
    setMenuOpen(false);
    navigate('/');
  }, [navigate]);

  const handleNavigation = useCallback((path: string) => {
    setMenuOpen(false);
    navigate(path);
  }, [navigate]);

  // Close menu on click outside and handle window resize
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (menuOpen) {
        calculateMenuPosition();
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('resize', handleResize);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen, calculateMenuPosition]);

  return (
    <AppBar className="custom-navbar">
      <AppBarSection>
        <span
          className="navbar-brand"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          <img src="/assets/logos/film_reel.png" alt="Logo" className="navbar-logo" />
          <span className="navbar-title">Movie Booking System</span>
        </span>
      </AppBarSection>
      <AppBarSection style={{ flex: 1 }}>
        <div className="k-appbar-spacer" />
      </AppBarSection>
      <AppBarSection style={{ justifyContent: 'flex-end', display: 'flex' }}>
        <div className="navbar-profile" ref={profileRef}>
          <img
            src="/assets/logos/profile.png"
            alt="Profile"
            className="profile-icon"
            onClick={handleProfileClick}
            style={{ cursor: 'pointer' }}
          />
        </div>
        {menuOpen && menuPosition && createPortal(
          <div
            className="profile-menu"
            style={{
              position: 'fixed',
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
              zIndex: 100002
            }}
          >
            <div className="profile-menu-item" onClick={() => handleNavigation('/profile')}>
              My Profile
            </div>
            <div className="profile-menu-item" onClick={() => handleNavigation('/settings')}>
              Settings
            </div>
            <div className="profile-menu-divider" />
            <div className="profile-menu-item signout" onClick={handleSignOut}>
              Sign Out
            </div>
          </div>,
          document.body
        )}
      </AppBarSection>
    </AppBar>
  );
};

export default Navbar;