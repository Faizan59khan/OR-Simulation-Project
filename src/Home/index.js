import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TableCell from "../Components/tableCell.js";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Home = ({
  data,
  setMenuWiseData,
  menuWiseData,
  arrivalDistribution,
  serviceDistribution,
  setArrivalDistributions,
  setServiceDistributions,
  serverCount,
  setServerCount,
}) => {
  const [performanceMeasures, setPerformanceMeasures] = useState();
  const [at, setAT] = useState();
  const [st, setST] = useState();
  const selectedMenu = (value) => {
    if (value === "Burger and Fast Food") {
      const res = data.filter((entry) => entry?.["Menu"] === 1);
      setMenuWiseData(res);
    } else {
      const res = data.filter((entry) => entry?.["Menu"] === 2);
      setMenuWiseData(res);
    }
  };

  const selectedArrivalDistribution = (value) => {
    console.log(value);
    if (["Exponential"].includes(value)) {
      setArrivalDistributions("M");
    } else {
      setArrivalDistributions("G");
    }
  };
  const selectedServiceDistribution = (value) => {
    console.log(value);
    if (["Exponential"].includes(value)) {
      setServiceDistributions("M");
    } else {
      setServiceDistributions("G");
    }
  };

  const hanndleChange = (value) => {
    setServerCount(value);
  };

  const modelMeasures = async () => {
    const url = `http://localhost:5000/poisson?server=${serverCount}&at=${
      at || 1
    }&st=${st || 1}`;
    const data = await fetch(url);
    const res = await data
      .json()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(
      res[
        `${arrivalDistribution}${serviceDistribution}${
          serverCount > 1 ? "C" : "1"
        }`
      ]
    );
    let arr = [
      {
        ...res[
          `${arrivalDistribution}${serviceDistribution}${
            serverCount > 1 ? "C" : "1"
          }`
        ],
        model: `${arrivalDistribution}/${serviceDistribution}/${
          serverCount > 1 ? "C" : "1"
        }`,
      },
    ];
    setPerformanceMeasures(arr);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          border: "1px solid grey",
          margin: "0 auto",
          padding: "12px",
          borderRadius: "5px",
        }}
      >
        <div>
          <FormControl>
            <FormLabel
              style={{
                padding: "8px",
                fontSize: "30px",
                fontWeight: "bold",
              }}
              id="demo-radio-buttons-group-label"
            >
              Select Arrival Distribution
            </FormLabel>
            <RadioGroup
              row
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "5px",
                textAlign: "center",
              }}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="Uniform"
                control={<Radio />}
                label="Uniform"
                onChange={(e) => {
                  selectedArrivalDistribution(e.target.value);
                }}
              />
              <FormControlLabel
                value="Exponential"
                control={<Radio />}
                label="Exponential"
                onChange={(e) => {
                  selectedArrivalDistribution(e.target.value);
                }}
              />
              <FormControlLabel
                value="Gamma"
                control={<Radio />}
                label="Gamma"
                onChange={(e) => {
                  selectedArrivalDistribution(e.target.value);
                }}
              />
              <FormControlLabel
                value="Normal"
                control={<Radio />}
                label="Normal"
                onChange={(e) => {
                  selectedArrivalDistribution(e.target.value);
                }}
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel
              style={{
                padding: "8px",
                fontSize: "30px",
                fontWeight: "bold",
              }}
              id="demo-radio-buttons-group-label"
            >
              Select Service Distribution
            </FormLabel>
            <RadioGroup
              row
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "5px",
                textAlign: "center",
              }}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="Uniform"
                control={<Radio />}
                label="Uniform"
                onChange={(e) => {
                  selectedServiceDistribution(e.target.value);
                }}
              />
              <FormControlLabel
                value="Exponential"
                control={<Radio />}
                disabled={arrivalDistribution === "M"}
                label="Exponential"
                onChange={(e) => {
                  selectedServiceDistribution(e.target.value);
                }}
              />
              <FormControlLabel
                value="Gamma"
                control={<Radio />}
                label="Gamma"
                onChange={(e) => {
                  selectedServiceDistribution(e.target.value);
                }}
              />
              <FormControlLabel
                value="Normal"
                control={<Radio />}
                label="Normal"
                onChange={(e) => {
                  selectedServiceDistribution(e.target.value);
                }}
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div style={{ display: "flex" }}>
          <label style={{ margin: "10px", padding: "10px" }}>
            <span>Enter Arrival Time </span>
            <input
              style={{
                width: "300px",
                height: "40px",
                margin: "5px",
                borderRadius: "5px",
              }}
              type="number"
              onChange={(e) => setAT(e.target.value)}
            />
          </label>
          <label style={{ margin: "10px", padding: "10px" }}>
            <span>Enter Service Time </span>
            <input
              style={{
                width: "300px",
                height: "40px",
                margin: "5px",
                borderRadius: "5px",
              }}
              type="number"
              onChange={(e) => setST(e.target.value)}
            />
          </label>
        </div>
        <label style={{ margin: "10px", padding: "10px" }}>
          <span>Set Server Count </span>
          <input
            style={{
              width: "300px",
              height: "40px",
              margin: "5px",
              borderRadius: "5px",
            }}
            type="number"
            onChange={(e) => hanndleChange(e.target.value)}
          />
        </label>
      </div>

      <button
        style={{
          cursor: "pointer",
          borderRadius: "5px",
          margin: "10px",
          padding: " 5px",
          height: "50px",
          color: "#fff",
          textAlign: "center",
          backgroundColor: `${
            arrivalDistribution &&
            serviceDistribution &&
            serverCount &&
            at &&
            st
              ? "#000"
              : "grey"
          }`,
        }}
        disabled={
          !arrivalDistribution ||
          !serviceDistribution ||
          !serverCount ||
          !at ||
          !st
        }
        onClick={() => modelMeasures()}
      >
        Calculate Performance Measures
      </button>
      {performanceMeasures ? (
        <div>
          <h2
            style={{
              border: "1px solid grey",
              width: "50%",
              borderRadius: "5px",
              padding: "5px",
              textAlign: "center",
              margin: "0 auto",
            }}
          >
            Performance Measures For{" "}
            <span style={{ color: "red" }}>
              {performanceMeasures[0]?.model}
            </span>{" "}
            Model
          </h2>
          {performanceMeasures.map((measure) => {
            return (
              <div style={{ margin: "10px" }}>
                <h3
                  style={{
                    border: "1px solid grey",
                    width: "50%",
                    borderRadius: "5px",
                    padding: "5px",
                    textAlign: "center",
                    margin: "0 auto",
                  }}
                >
                  Average Number Of Customers In System:{" "}
                  <span style={{ color: "red" }}>{measure?.L.toFixed(2)}</span>
                </h3>
                <h3
                  style={{
                    border: "1px solid grey",
                    width: "50%",
                    borderRadius: "5px",
                    padding: "5px",
                    textAlign: "center",
                    margin: "0 auto",
                  }}
                >
                  Average Number Of Customers In Queue:{" "}
                  <span style={{ color: "red" }}>{measure?.Lq.toFixed(2)}</span>
                </h3>
                <h3
                  style={{
                    border: "1px solid grey",
                    width: "50%",
                    borderRadius: "5px",
                    padding: "5px",
                    textAlign: "center",
                    margin: "0 auto",
                  }}
                >
                  Average Waiting Time In Queue:{" "}
                  <span style={{ color: "red" }}>{measure?.Wq.toFixed(2)}</span>
                </h3>
                <h3
                  style={{
                    border: "1px solid grey",
                    width: "50%",
                    borderRadius: "5px",
                    padding: "5px",
                    textAlign: "center",
                    margin: "0 auto",
                  }}
                >
                  Average Waiting Time In System:{" "}
                  <span style={{ color: "red" }}>{measure?.W.toFixed(2)}</span>
                </h3>
              </div>
            );
          })}
        </div>
      ) : null}
      {/* <FormControl>
        <FormLabel
          style={{
            padding: "8px",
            fontSize: "30px",
            fontWeight: "bold",
          }}
          id="demo-radio-buttons-group-label"
        >
          Select Menu
        </FormLabel>
        <RadioGroup
          row
          style={{ padding: "5px", textAlign: "center" }}
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
      </FormControl> */}

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
  );
};

export default Home;
