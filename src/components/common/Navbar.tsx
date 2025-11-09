import { useState, useRef, useEffect } from 'react';
import '../../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { AppBar, AppBarSection } from '@progress/kendo-react-layout';
import { createPortal } from 'react-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState<{top: number, left: number} | null>(null);

  const handleProfileClick = () => {
    if (profileRef.current) {
      const rect = profileRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.right - 180 + window.scrollX // 180px is menu width
      });
    }
    setMenuOpen((open) => !open);
  };

  const handleSignOut = () => {
    setMenuOpen(false);
    navigate('/');
  };

  // Close menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

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
              position: 'absolute',
              top: menuPosition.top,
              left: menuPosition.left,
              zIndex: 100002
            }}
          >
            <div className="profile-menu-item" onClick={() => { setMenuOpen(false); navigate('/profile'); }}>
              My Profile
            </div>
            <div className="profile-menu-item" onClick={() => { setMenuOpen(false); navigate('/settings'); }}>
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