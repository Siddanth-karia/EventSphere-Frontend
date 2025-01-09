import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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

const pages = [{ name: 'Home', path: "/" }, { name: 'Products', path: "/event" }, { name: 'Exhibitors', path: "/exhibitorsearch" }, { name: 'Scheduled Events', path: "/scheduledevents" }];
const settings = [{ name:'Profile', path: "/profile" },{ name:'Logout' ,path: "/logout" }];

function NavbarComponent() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user = JSON.parse(localStorage.getItem('user'))

 
  const location = useLocation();
  const navigate = useNavigate()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (path) => {
    setAnchorElNav(null);
    navigate(path)
  };

  const handleCloseUserMenu = (path) => {
    setAnchorElUser(null);
    if(path === '/logout'){
      localStorage.removeItem('user')
      navigate('/')
    }
    else{
      navigate(path)
    }
  };

 
  const appBarBgColor = location.pathname === '/' ? 'transparent' : 'black';

  return (
    <AppBar position={location.pathname === '/' ? "relative" : "fixed"} sx={{ backgroundColor: appBarBgColor }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
  variant="h6"
  noWrap
  component="a"
  href="#app-bar-with-responsive-menu"
  sx={{
    mr: 2,
    display: { xs: 'none', md: 'flex' },
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none',
    alignItems: 'center', 
  }}
>
  {/* Add your logo here */}
  <img
    src="/logo.jpg" 
    alt="Event Logo"
    style={{ width: 180, height: 50, marginRight: 8 }} 
  />

</Typography>


          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                <MenuItem key={page.name} onClick={() => handleCloseNavMenu(page.path)}>
                  <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            EventSphere
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleCloseNavMenu(page.path)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          {user?.role == "organizer" && <Box>
            <Button sx={{marginRight:2}} variant="outlined" color="white" onClick={() => navigate('/organizer')}>
              Dashboard
            </Button>
          </Box>}
          {user?.role == "exhibitor" && <Box>
            <Button sx={{marginRight:2}} variant="outlined" color="white" onClick={() => navigate('/exhibitor')}>
              Dashboard
            </Button>
          </Box>}
          {user?.role =="attendee" && <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                <MenuItem  key={setting.name} onClick={()=>handleCloseUserMenu(setting.path)}>
                  <Typography sx={{ textAlign: 'center' }}>{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>}
          {!user && <Box>
            <Button sx={{marginRight:2}} variant="outlined" color="white" onClick={() => navigate('/login')}>
              Login
            </Button>
          </Box>}
          {!user && <Box>
            <Button  variant="outlined" color="white" onClick={() => navigate('/signup')}>
              Signup
            </Button>
          </Box>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavbarComponent;
