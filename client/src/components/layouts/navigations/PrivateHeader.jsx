import React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import { blue } from "@mui/material/colors";
import AMAccountMenu from "./AMAccountMenu";
import AMNotificationMenu from "./AMNotificationMenu";
import config from "../../../constants/config";
import { getLocalStorage } from "../../../utils/Storage";

import evenLogo from "../../../assets/images/evenLogo.png";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 1px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const PrivateHeader = (props) => {
  const [open, setOpen] = React.useState(false);
  const userData = getLocalStorage("user");
  let profile = userData ? userData : "";
  const [openNotification, setOpenNotification] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNotification, setAnchorElNotification] = React.useState(null);
  const [notifiCount, setNotifiCount] = React.useState(2);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNotification = (event) => {
    setAnchorElNotification(event.currentTarget);
  };

  const handleCloseNotification = () => {
    setAnchorElNotification(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openList = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationCount = (count) => {
    setNotifiCount(count);
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Link variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          <img src={evenLogo} alt="Even Logo" width={98} />
        </Link>
        <nav>
          <Link
            variant="button"
            color="text.primary"
            href="/user"
            sx={{ my: 1, mx: 1.5 }}
          >
            Dashboard
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="/user/order"
            sx={{ my: 1, mx: 1.5 }}
          >
            Orders
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="/user/feedback"
            sx={{ my: 1, mx: 1.5 }}
          >
            Feedback
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="/user/contact"
            sx={{ my: 1, mx: 1.5 }}
          >
            Contact
          </Link>
        </nav>
        <Box sx={{ flexGrow: 2 }} />
        <Box sx={{ display: "flex" }}>
          <IconButton
            size="large"
            aria-label="show notifications"
            color="inherit"
            onClick={handleOpenNotification}
            aria-controls={openNotification ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openNotification ? "true" : undefined}
          >
            <Badge badgeContent={notifiCount} color="error">
              <NotificationsIcon sx={{ fontSize: 23 }} />
            </Badge>
          </IconButton>
          <AMNotificationMenu
            openNotification={openNotification}
            handleClose={handleCloseNotification}
            anchorEl={anchorElNotification}
            handleCount={handleNotificationCount}
          />
          <Tooltip title="Account Setting" className={``}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: 1 }}>
              <Stack direction="row" spacing={2}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar
                    alt={
                      profile &&
                      profile.firstName &&
                      profile.firstName.charAt(0)
                    }
                    src={
                      profile && profile.profileObj && profile.profileObj.photo
                        ? profile.profileObj.photo.includes(
                            "https://lh3.googleusercontent.com/",
                          )
                          ? profile && profile.profileObj.photo
                          : `${config.WS_URL}images/profile/${
                              profile.profileObj &&
                              profile.profileObj.photo &&
                              profile.profileObj.photo
                            }`
                        : profile && profile.firstName.charAt(0)
                    }
                    sx={{ width: 30, height: 30, bgcolor: blue[300] }}
                  />
                </StyledBadge>
              </Stack>
            </IconButton>
          </Tooltip>
          <AMAccountMenu
            handleCloseUserMenu={handleCloseUserMenu}
            anchorElUser={anchorElUser}
            profile={profile && profile}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default PrivateHeader;
