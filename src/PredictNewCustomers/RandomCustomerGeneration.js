import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import PredictionTable from "../Components/PredictionTable";

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
  const [lam, setLam] = useState(false);
  const [meuu, setMeuu] = useState(false);
  const totalTimes = (data) => {
    const res = {
      totalArrivalTime: 0,
      totalServiceTime: 0,
      meanAT: 0,
      meanST: 0,
    };
    data &&
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
    let lam = lambda(data);
    let meuu = meu(data);

    let res = [];
    let timeBetArr = [];
    let serviceTime = [];
    //For CP:
    for (let i = 0; i < value; i++) {
      let j = 0;
      let resultant = 0;
      serviceTime.push(Math.ceil(-meuu * Math.log(Math.random())));
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
    setTimes({ intArr: interArr, arrTime: arrivalTime, serTime: serviceTime });
    setRandomValues(res);
  };
  return (
    <div>
      <div>
        {lam && meuu ? (
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "45%",
              margin: "0 auto",
              alignItems: "center",
            }}
          >
            <h3>Random Numbers Amount</h3>
            <input
              style={{
                width: "300px",
                height: "30px",
                borderRadius: "5px",
                outline: "none",
                border: ".5px solid grey",
              }}
              type="number"
              placeholder="Enter the number of random values"
              onChange={(e) => generateRandomEntries(e.target.value)}
            />
          </label>
        ) : (
          <h3 style={{ textAlign: "center" }}>
            Enter lamba and Meu Values first
          </h3>
        )}
        <label
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "45%",
            margin: "0 auto",
            alignItems: "center",
          }}
        >
          <h3>Lambda</h3>
          <input
            style={{
              width: "300px",
              height: "30px",
              borderRadius: "5px",
              outline: "none",
              border: ".5px solid grey",
            }}
            type="number"
            placeholder="Enter lamda value"
            onChange={(e) => setLam(e.target.value)}
          />
        </label>
        <label
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "45%",
            margin: "0 auto",
            alignItems: "center",
          }}
        >
          <h3>Meu</h3>
          <input
            style={{
              width: "300px",
              height: "30px",
              borderRadius: "5px",
              outline: "none",
              border: ".5px solid grey",
            }}
            type="number"
            placeholder="Enter meuu value"
            onChange={(e) => setMeuu(e.target.value)}
          />
        </label>
      </div>
      <PredictionTable randomValues={randomValues} times={times} />
    </div>
  );
};

export default RandomCustomersGeneration;
