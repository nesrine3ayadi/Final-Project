import React, { useState, useEffect, Fragment } from "react";
import logo from "../../img/logo.png";
import { connect } from "react-redux";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Axios from "axios";
import { displayCurrentUser, signOut } from "../../Actions/action";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import './navbar.scss'
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function Navbar2(props) {
  const [username, setUserName] = useState("");
  const [imageUser, setUserImage] = useState("");
  const [idUser, setIdUser] = useState("");
  const [search, setSearch] = useState("");
  const [text, setText] = useState("a?z@!%");

  useEffect(() => {
    var token = localStorage.getItem("token");
    if (token !== null) {
      var decoded = jwt_decode(token);

      setIdUser(decoded.id);
      async function getUser() {
        const response = await Axios.get(
          `http://localhost:5000/profile/${decoded.id}`
        );
        setUserName(response.data.username);
        setUserImage(response.data.imageUser);
        props.displayCurrentUser(response.data);
      }
      getUser();
      (text === "") && setText("a?z@!%")
    }
  }, [username, text]);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <a href="/createStream">Create Stream</a>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <a href={`/editProfile/${idUser}`}>Edit profile</a>
      </MenuItem>
      <Link to={`/profile/${idUser}`}>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Link>
      <MenuItem>
        <a
          href="/home"
          onClick={() => {
            localStorage.removeItem("token");
            signOut();
          }}
        >
          Logout
        </a>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
       
       <a href="/login">Login</a>
      </MenuItem>
      <MenuItem>
        
       <a href="/register"> Register</a>
      </MenuItem>
     
    </Menu>
  );
  const filtredData = props.users.filter((e) =>
    e.username.toLowerCase().includes(text)

  );
  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <a href="/home">
              
              <img
                className="img-fluid logo"
                width="100"
                alt=""
                src={logo}
              />
            </a>
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
           
            The Gamer
          </Typography>
          <div className={classes.search}>
           
            <div className={classes.searchIcon}>
            
              <SearchIcon />{" "}
            </div>
            <InputBase
              onChange={(e) => setText(e.target.value)}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
            <div className="drop">
              <div className="container">
                {filtredData.slice(0, 5).map((e) => (
                  <div className="row">
                    <img width="100" src={e.imageUser}></img>
                    <a className="linkdrop" href={`/profile/${e._id}`}>
                    {e.username} 
                    </a>
                    {(e.live) &&  <a href="" className="livelink">   <label>live</label>  </a>}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={classes.grow} />{" "}
          {localStorage.getItem("token") !== null ? (
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <img alt="image" width="60px" src={imageUser} /> {username}{" "}
              </IconButton>
            </div>
          ) : (
            <div className="nav_btn">
              <a href="/login">
            <p><span className="bg"></span><span className="base"></span><span className="text">Login</span></p></a>
            <a class="white" href="/register">
            <p><span className="bg"></span><span className="base"></span><span className="text">Register</span></p></a>
           </div>
          
          )}
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}{" "}
    </Fragment>
  );
}
const mapStateToProps = (state) => ({
  connected: state.connectedUser,
  users: state.users.users,
});

export default connect(mapStateToProps, { displayCurrentUser, signOut })(
  Navbar2
);
