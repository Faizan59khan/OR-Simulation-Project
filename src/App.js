import logo from "./logo.svg";
import "./App.css";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import PerformanceMeasures from "./PerformanceMeasures/index";
import { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RandomCustomerGeneration from "./PredictNewCustomers/RandomCustomerGeneration.js";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function App() {
  const [data, setData] = useState();
  const [menuWiseData, setMenuWiseData] = useState();
  const res = [
    {
      id: 1,
      customer: "C1",
      arrivalTime: 0,
      serviceTime: 1,
    },
    {
      id: 2,
      customer: "C2",
      arrivalTime: 1,
      serviceTime: 2,
    },
    {
      id: 3,
      customer: "C3",
      arrivalTime: 2,
      serviceTime: 1,
    },
    {
      id: 4,
      customer: "C4",
      arrivalTime: 3,
      serviceTime: 1,
    },
  ];

  const selectedMenu = (value) => {
    if (value === "Burger and Fast Food") {
      const res = data.filter((entry) => entry?.["Menu"] === 1);
      setMenuWiseData(res);
    } else {
      const res = data.filter((entry) => entry?.["Menu"] === 2);
      setMenuWiseData(res);
    }
  };
  const getData = async () => {
    const url = "http://localhost:5000/";
    const data = await fetch(url);
    const res = await data
      .json()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
    setData(res);
    setMenuWiseData(res);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Select Menu</FormLabel>
        <RadioGroup
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
      <h1>Simulation</h1>
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

      {data
        ? data.map((entry) => {
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
        : null}

      {data ? <PerformanceMeasures data={menuWiseData} /> : null}
      {data ? <RandomCustomerGeneration data={menuWiseData} /> : null}
    </div>
  );
}

export default App;
