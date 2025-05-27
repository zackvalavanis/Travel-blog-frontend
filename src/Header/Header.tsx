import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Logout } from '../Logout/LogoutLink';

const pages: string[] = ['Destinations', 'New Post'];
const settings = ['Login', 'Account', 'Dashboard', <Logout />];

export function Header() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState('');
  const [selectedSetting, setSelectedSetting] = useState('')
  const { name, setName } = useContext(UserContext)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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

  const handleNavigationSettings = (settings: string) => {
    navigate(`/${settings}`)
    setSelectedSetting(settings)
  }

  return (
    <div className='header-container'>
      <AppBar position="static" sx={{ backgroundColor: '#Eae6da' }}>
        <Container maxWidth='xl'>
          <Toolbar disableGutters sx={{ position: 'relative' }}>
            {/* Left side - Icon + buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={() => {
                  navigate('/');
                  setSelectedPage('');
                }}
                sx={{ p: 0, display: { xs: 'none', md: 'flex' }, mr: 1 }}
              >
                <AdbIcon sx={{ color: '#cd3c2a' }} />
              </IconButton>

              {/* Navigation buttons on md+ screens */}
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => {
                      handleCloseNavMenu();
                      handleNavigation(page);
                    }}
                    sx={{
                      my: 2,
                      color: '#cd3c2a',
                      display: 'block',
                      textDecoration: getSelectedPage() === page ? 'underline' : 'none',
                    }}
                    className='destination-button'
                  >
                    {page}
                  </Button>
                ))}
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
                color: '#cd3c2a',
                textDecoration: 'none',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              HOME
            </Typography>

            {/* Right side user menu */}
            <Box sx={{ marginLeft: 'auto' }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={name} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => {
                    handleCloseUserMenu()
                    handleNavigationSettings(setting)
                  }}

                  >
                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Mobile menu icon */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-start', ml: 1 }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => {
                      handleCloseNavMenu();
                      handleNavigation(page);
                    }}
                  >
                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
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
