import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#4a4a4a" }}>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Box sx={{ display: "flex", gap: 3 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ textTransform: "none", fontWeight: 500 }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/fiction"
            sx={{ textTransform: "none", fontWeight: 500 }}
          >
            Fiction Books
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/nonfiction"
            sx={{ textTransform: "none", fontWeight: 500 }}
          >
            Non-Fiction Books
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
