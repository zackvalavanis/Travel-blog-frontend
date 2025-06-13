import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { Logout } from '../Logout/LogoutLink';




export function Header() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState('');
  const [selectedSetting, setSelectedSetting] = useState('');
  const { name, loading } = useContext(UserContext);
  const [scrolled, setScrolled] = useState(false)
  const [hideHeader, setHideHeader] = useState(false);

  const settings = [
    { label: 'Login', path: '/Login' },
    { label: 'Account', path: '/account' },
    { label: 'Dashboard', path: '/dashboard' },
    {
      label: 'Logout', action: () => {
        localStorage.removeItem('jwt')
        localStorage.removeItem('name')
        navigate('/Login')
      }
    }
  ];

  const firstLetter = name ? name.charAt(0).toUpperCase() : '?';

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getSelectedPage = () => {
    const path = decodeURIComponent(window.location.pathname);
    if (path.startsWith('/Destinations')) return 'Destinations';
    if (path.startsWith('/New Post')) return 'New Post';
    return '';
  };

  const handleNavigation = (page: string) => {
    navigate(`/${page}`);
    setSelectedPage(page);
  };

  const handleNavigationSettings = (path: string) => {
    navigate(path);
    setSelectedSetting(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      setHideHeader(window.scrollY > 100); // header hides after scrolling 100px
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="header-container">
      <AppBar position='fixed' sx={{
        backgroundColor: '#da9b68',
        width: '90%',
        left: '50%',
        transform: 'translateX(-50.4%)',
        borderRadius: '20px',
        transition: 'all 0.3s ease, opacity 0.3s ease',
        boxShadow: scrolled ? 4 : 0,
        py: scrolled ? 0.5 : 2,
        opacity: hideHeader ? 0 : 1,
        top: 0, // just in case
      }}>
        <Container disableGutters maxWidth={false} sx={{ px: 3 }}>
          <Toolbar disableGutters sx={{ position: 'relative' }}>
            {/* Left side - Logo and nav buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={() => {
                  navigate('/');
                  setSelectedPage('');
                }}
                sx={{ p: 0, display: { xs: 'none', md: 'flex' }, mr: 1 }}
              >
                <AdbIcon sx={{ color: 'white' }} />
              </IconButton>

              {/* Navigation buttons (always show Destinations, only show New Post if logged in) */}
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button
                  onClick={() => {
                    handleNavigation('Destinations');
                  }}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    textDecoration: getSelectedPage() === 'Destinations' ? 'underline' : 'none',
                  }}
                  className="destination-button"
                >
                  Destinations
                </Button>

                {localStorage.getItem('jwt') && (
                  <Button
                    onClick={() => {
                      handleNavigation('New Post');
                    }}
                    sx={{
                      my: 2,
                      color: 'white',
                      display: 'block',
                      textDecoration: getSelectedPage() === 'New Post' ? 'underline' : 'none',
                    }}
                    className="destination-button"
                  >
                    New Post
                  </Button>
                )}
              </Box>
            </Box>

            {/* Centered HOME */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
                setSelectedPage('');
              }}
              sx={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'white',
                textDecoration: 'none',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              HOME
            </Typography>

            {/* Right side user avatar + dropdown */}
            <Box sx={{ marginLeft: 'auto' }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar alt={name}>{firstLetter || ''}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                disableScrollLock
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map(({ label, path, action }) => (
                  <MenuItem
                    key={label}
                    onClick={() => {
                      handleCloseUserMenu();
                      if (action) {
                        action()
                      } else if (path) {
                        handleNavigationSettings(path);
                      }
                    }}
                  >
                    <Typography sx={{ textAlign: 'center' }}>{label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
