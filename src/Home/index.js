import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TableCell from '../Components/tableCell.js'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Home = ({data, setMenuWiseData , menuWiseData}) => {
  const selectedMenu = (value) => {
    if (value === "Burger and Fast Food") {
      const res = data.filter((entry) => entry?.["Menu"] === 1);
      setMenuWiseData(res);
    } else {
      const res = data.filter((entry) => entry?.["Menu"] === 2);
      setMenuWiseData(res);
    }
  };
  return (
    <div>
        <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Select Menu</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="Burger and Fast Food"
            control={<Radio />}
            label="Burger and Fast Food"
            onChange={(e) => {
              selectedMenu(e.target.value);
            }}
          />
          <FormControlLabel
            value="Rice & Chicken"
            control={<Radio />}
            label="Rice & Chicken"
            onChange={(e) => {
              selectedMenu(e.target.value);
            }}
          />
        </RadioGroup>
      </FormControl>
      <TableCell data={menuWiseData} />
      {/* <h1>Simulation</h1>
      <Grid sx={{ width: "50%", margin: "0 auto" }} container spacing={2}>
        <Grid item xs={3}>
          <h1>Customer</h1>
        </Grid>
        <Grid item xs={3}>
          <h1>Arrival Time</h1>
        </Grid>
        <Grid item xs={3}>
          <h1>Service Time</h1>
        </Grid>
        <Grid item xs={3}>
          <h1>Menu</h1>
        </Grid>
      </Grid>

      {menuWiseData
        ? menuWiseData.map((entry) => {
            return (
              <Grid
                sx={{ width: "50%", margin: "0 auto" }}
                container
                spacing={2}
              >
                <Grid item xs={3}>
                  <Item>{entry?.["Customer ID"]}</Item>
                </Grid>
                <Grid item xs={3}>
                  <Item>{entry?.["Arrival Time(minute)"]}</Item>
                </Grid>
                <Grid item xs={3}>
                  <Item>{entry?.["Service Time(minute)"]}</Item>
                </Grid>
                <Grid item xs={3}>
                  <Item>{entry?.["Menu"]}</Item>
                </Grid>
              </Grid>
            );
          })
        : null} */}

    </div>
  )
}

export default Home