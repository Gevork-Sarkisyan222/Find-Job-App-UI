import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { isAuthenticated, logout } from '../redux/userSlice';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

interface IProps {
  search: string;
  setSearch: (search: string) => void;
}

export const PrimarySearchAppBar: React.FC<IProps> = ({ search, setSearch }) => {
  const isAuthenticatedUser = useSelector(isAuthenticated);
  // change any
  const { currentUser } = useSelector((state: any) => state.user);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    const message = window.confirm('Вы действительно хотите выйти с аккаунта?');
    if (message) {
      dispatch(logout());
      localStorage.removeItem('token');
    }
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      {isAuthenticatedUser && (
        <>
          <MenuItem onClick={handleMenuClose} onClickCapture={handleLogout}>
            <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
              Выйти с аккаунта
            </Link>
          </MenuItem>
        </>
      )}
      {!isAuthenticatedUser && (
        <>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/register" style={{ textDecoration: 'none', color: 'black' }}>
              Зарегистрироваться
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
              Войти в аккаунт
            </Link>
          </MenuItem>
        </>
      )}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit">
          {isAuthenticatedUser && (
            <Avatar
              sx={{ width: 50, height: 50, cursor: 'pointer' }}
              src={currentUser?.avatarUrl ? currentUser?.avatarUrl : '/broken-image.jpg'}
            />
          )}
        </IconButton>
        <p>{currentUser?.fullName}</p>
      </MenuItem>
      {isAuthenticatedUser ? (
        <MenuItem onClick={handleMenuClose} onClickCapture={handleLogout}>
          <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
            Выйти с аккаунта
          </Link>
        </MenuItem>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/register" style={{ textDecoration: 'none', color: 'black' }}>
              Зарегистрироваться
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
              Войти в аккаунт
            </Link>
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}>
            FindJob
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Найти..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <h4>{currentUser?.fullName && currentUser?.fullName}</h4>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit">
              <Avatar
                sx={{ width: 40, height: 40, cursor: 'pointer' }}
                src={currentUser?.avatarUrl ? currentUser?.avatarUrl : '/broken-image.jpg'}
              />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default PrimarySearchAppBar;
