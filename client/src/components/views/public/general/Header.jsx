import React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";

import evenLogo from '../../../../assets/images/evenLogo.png';

function Header() {
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
            href="#"
            sx={{ my: 1, mx: 1.5 }}
          >
            Features
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
          >
            Enterprise
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
          >
            Support
          </Link>
        </nav>
        <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
