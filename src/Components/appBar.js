import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

export default function DenseAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography
            sx={{ padding: "5px" }}
            variant="h6"
            color="inherit"
            component="div"
          >
            <Link to="/" style={{ textDecoration: "none", color: "#ffff" }}>
              {" "}
              Home{" "}
            </Link>
          </Typography>
          {/* <Typography
            sx={{ padding: "5px" }}
            variant="h6"
            color="inherit"
            component="div"
          >
            <Link
              to="/performancemeasures"
              style={{ textDecoration: "none", color: "#ffff" }}
            >
              PM{" "}
            </Link>
          </Typography> */}
          <Typography
            sx={{ padding: "5px" }}
            variant="h6"
            color="inherit"
            component="div"
          >
            <Link
              to="/prediction"
              style={{ textDecoration: "none", color: "#ffff" }}
            >
              RNG{" "}
            </Link>
          </Typography>
          <Typography
            sx={{ padding: "5px" }}
            variant="h6"
            color="inherit"
            component="div"
          >
            <Link to="/MM1" style={{ textDecoration: "none", color: "#ffff" }}>
              MM1{" "}
            </Link>
          </Typography>
          <Typography
            sx={{ padding: "5px" }}
            variant="h6"
            color="inherit"
            component="div"
          >
            <Link to="/data" style={{ textDecoration: "none", color: "#ffff" }}>
              Data{" "}
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
