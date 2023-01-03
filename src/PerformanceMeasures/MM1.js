import React, { useEffect, useState } from "react";
import TableMM1 from "../Components/Tablemm1";

const MM1 = ({ data }) => {
  console.log(data);
  const [otherTimes, setOtherTimes] = useState();
  const [MM1, setMM1] = useState(true);
  const [performanceMeasures, setPerformanceMeasures] = useState();

  const measureOtherTimes = (startT, endT, arrT, serT) => {
    let turnAroundTime = [];
    let waitTime = [];
    let responseTime = [];
    let data = [];
    for (let i = 0; i < startT.length; i++) {
      turnAroundTime[i] = Math.abs(endT[i] - arrT[i]);
      waitTime[i] = Math.abs(turnAroundTime[i] - serT[i]);
      responseTime[i] = Math.abs(startT[i] - arrT[i]);
      data &&
        data.push({
          arrT: arrT[i],
          serT: serT[i],
          startT: startT[i],
          endT: endT[i],
          turnAroundTime: turnAroundTime[i],
          waitTime: waitTime[i],
          responseTime: responseTime[i],
        });
    }
    //Performance Measures
    const performanceMeasures = {};
    let totalWT = waitTime.reduce((a, b) => a + b);
    let totalTAT = turnAroundTime.reduce((a, b) => a + b);
    let totalST = serT.reduce((a, b) => a + b);
    let totalRT = responseTime.reduce((a, b) => a + b);
    console.log(totalWT, startT.length);
    performanceMeasures.avgWT = totalWT / startT.length;
    performanceMeasures.avgST = totalST / startT.length;
    performanceMeasures.avgCusSpentInSystem = totalTAT / startT.length;
    performanceMeasures.avgWTWhoWait = totalWT / startT.length - 1;
    performanceMeasures.idleTimeServer = 0 / totalST;
    performanceMeasures.probCusThathastoWait =
      startT.length - 1 / startT.length;
    performanceMeasures.avgRT = totalRT / startT.length;
    performanceMeasures.avgUtilizationServer =
      performanceMeasures.probCusThathastoWait / totalST;
    return { data, performanceMeasures };
  };

  useEffect(() => {
    let startT = [];
    let endT = [];
    let serT = [];
    let arrT = [];
    if (data) {
      for (let i = 0; i < data.length; i++) {
        serT.push(data[i]?.["Service Time(minute)"]);
        arrT.push(data[i]?.["Arrival Time(minute)"]);
        if (i === 0) {
          startT.push(data[i]?.["Arrival Time(minute)"]);
          endT.push(data[i]?.["Service Time(minute)"]);
        } else {
          startT.push(endT[endT.length - 1]);
          endT.push(
            data[i]?.["Service Time(minute)"] + startT[startT.length - 1]
          );
        }
      }
      setPerformanceMeasures(
        measureOtherTimes(startT, endT, arrT, serT)?.performanceMeasures
      );
      setOtherTimes(measureOtherTimes(startT, endT, arrT, serT)?.data);
    }
  }, [data]);
  return (
    <div>
      <div
        style={{
          display: "flex",
          padding: "5px",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <h4>Switch to: </h4>
        <button
          style={{ borderRadius: "5px", margin: "5px", padding: " 5px" }}
          onClick={() => setMM1(!MM1)}
        >
          {MM1 ? "MM1 Measures" : "MM1 Table"}
        </button>
      </div>
      {MM1 ? (
        <TableMM1 data={otherTimes} />
      ) : (
        <div>
          <h1>Measures</h1>
          <h3>
            Average Wait Time:{" "}
            <span style={{ color: "red" }}>{performanceMeasures?.avgWT}</span>
          </h3>
          <h3>
            Average Service Time:{" "}
            <span style={{ color: "red" }}>{performanceMeasures?.avgST}</span>
          </h3>
          <h3>
            Average Time Customer Spend In System:{" "}
            <span style={{ color: "red" }}>
              {performanceMeasures?.avgCusSpentInSystem}
            </span>
          </h3>
          <h3>
            Average Waiting Time Those Who Wait:{" "}
            <span style={{ color: "red" }}>
              {performanceMeasures?.avgWTWhoWait}
            </span>
          </h3>
          <h3>
            Proportion Of Idle Time Of Server:{" "}
            <span style={{ color: "red" }}>
              {performanceMeasures?.idleTimeServer}
            </span>
          </h3>
          <h3>
            Probability Of Customer That Has To Wait:{" "}
            <span style={{ color: "red" }}>
              {performanceMeasures?.probCusThathastoWait}
            </span>
          </h3>
          <h3>
            Average Response Time:{" "}
            <span style={{ color: "red" }}>{performanceMeasures?.avgRT}</span>
          </h3>
          <h3>
            Average Utilization Time Of Server:{" "}
            <span style={{ color: "red" }}>
              {performanceMeasures?.avgUtilizationServer}
            </span>
          </h3>
        </div>
      )}
    </div>
  );
};

export default MM1;
