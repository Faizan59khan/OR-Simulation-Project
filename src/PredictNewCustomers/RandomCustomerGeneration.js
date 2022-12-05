import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const RandomCustomersGeneration = ({ data }) => {
  const [inputValue, setInputValue] = useState(0);
  const [timeBWArrivals, setTimeBWArrivals] = useState([]);
  const [times, setTimes] = useState();
  const [randomValues, setRandomValues] = useState();

  const totalTimes = (data) => {
    const res = {
      totalArrivalTime: 0,
      totalServiceTime: 0,
      meanAT: 0,
      meanST: 0,
    };
    data.forEach((entry) => {
      res.totalArrivalTime =
        res?.totalArrivalTime + entry?.["Arrival Time(minute)"];
      res.totalServiceTime =
        res?.totalServiceTime + entry?.["Service Time(minute)"];
    });
    res.meanAT = res?.totalArrivalTime / data.length;
    res.meanST = res?.totalServiceTime / data.length;
    return res;
  };
  function factorialize(num) {
    if (num === 0 || num === 1) return 1;
    for (var i = num - 1; i >= 1; i--) {
      num *= i;
    }
    return num;
  }
  const lambda = (data) => {
    return 1 / totalTimes(data)?.meanAT;
  };
  const meu = (data) => {
    return 1 / totalTimes(data)?.meanST;
  };

  const generateRandomEntries = (value) => {
    // let lam = lambda(data);
    // let meuu = meu(data);
    let lam = 2.15;
    let meu = 1.58;
    let res = [];
    let timeBetArr = [];
    let serviceTime = [];
    //For CP:
    for (let i = 0; i < value; i++) {
      let j = 0;
      let resultant = 0;
      serviceTime.push(Math.ceil(-meu * Math.log(Math.random())));
      do {
        resultant +=
          (Math.pow(lam, j) * Math.pow(2.71828182846, -lam)) / factorialize(j); //Formula => Sum of all (lam^x * x^-lam)/x!
        j++;
      } while (j < i);
      res.push({ timeBWArrivals: i, commulativeProb: resultant });
      timeBetArr.push(i);
    }
    //For Inter Arrival:
    let interArr = [0];
    let arrivalTime = [0];
    for (let i = 0; i < value - 1; i++) {
      let random = Math.random();
      for (let j = 0; j < res.length; j++) {
        if (res[j]?.commulativeProb >= random) {
          interArr.push(j === 0 ? 1 : j);
          break;
        }
      }
    }
    //For Arrival Time:
    for (let i = 0; i < value - 1; i++) {
      console.log(timeBetArr[i + 1], interArr[i]);
      arrivalTime.push(timeBetArr[i + 1] + interArr[i]);
    }

    console.log(arrivalTime);
    setTimes({ intArr: interArr, arrTime: arrivalTime, serTime: serviceTime });
    setRandomValues(res);
  };
  return (
    <div>
      <input
        placeholder="Enter the number of random values"
        onChange={(e) => generateRandomEntries(e.target.value)}
      />
      <Grid sx={{ width: "50%", margin: "0 auto" }} container spacing={2}>
        <Grid item xs={2}>
          <h3>No of Time b/w Arrivals</h3>
        </Grid>
        <Grid item xs={2}>
          <h3>Commulative Probability</h3>
        </Grid>
      </Grid>
      {randomValues
        ? randomValues.map((entry) => {
            return (
              <Grid
                sx={{ width: "50%", margin: "0 auto" }}
                container
                spacing={2}
              >
                <Grid item xs={4}>
                  <Item>{entry?.timeBWArrivals}</Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>{entry?.commulativeProb}</Item>
                </Grid>
              </Grid>
            );
          })
        : null}
      <Grid sx={{ width: "50%", margin: "0 auto" }} container spacing={2}>
        <Grid item xs={4}>
          <h3>Inter Arrivals</h3>
        </Grid>
        <Grid item xs={4}>
          <h3>Arrival Time</h3>
        </Grid>
        <Grid item xs={4}>
          <h3>Service Time</h3>
        </Grid>
      </Grid>
      {times
        ? times?.intArr?.map((entry, index) => {
            return (
              <Grid
                sx={{ width: "50%", margin: "0 auto" }}
                container
                spacing={2}
              >
                <Grid item xs={4}>
                  <Item>{entry}</Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>{times?.arrTime[index]}</Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>{times?.serTime[index]}</Item>
                </Grid>
              </Grid>
            );
          })
        : null}
    </div>
  );
};

export default RandomCustomersGeneration;
