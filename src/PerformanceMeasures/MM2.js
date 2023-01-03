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
    let startT1 = [];
    let endT1 = [];
    let startT2 = [];
    let endT2 = [];
    let serT1 = [];
    let arrT1 = [];
    let serT2 = [];
    let arrT2 = [];
    if (data) {
      for (let i = 0; i < data.length; i++) {
        serT1.push(data[i]?.["Service Time(minute)"]);
        arrT1.push(data[i]?.["Arrival Time(minute)"]);
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
          <p>Average Wait Time: {performanceMeasures?.avgWT}</p>
          <p>Average Service Time: {performanceMeasures?.avgST}</p>
          <p>
            Average Time Customer Spend In System:{" "}
            {performanceMeasures?.avgCusSpentInSystem}
          </p>
          <p>
            Average Waiting Time Those Who Wait:{" "}
            {performanceMeasures?.avgWTWhoWait}
          </p>
          <p>
            Proportion Of Idle Time Of Server:{" "}
            {performanceMeasures?.idleTimeServer}
          </p>
          <p>
            Probability Of Customer That Has To Wait:{" "}
            {performanceMeasures?.probCusThathastoWait}
          </p>
          <p>Average Response Time: {performanceMeasures?.avgRT}</p>
          <p>
            Average Utilization Time Of Server:{" "}
            {performanceMeasures?.avgUtilizationServer}
          </p>
        </div>
      )}
    </div>
  );
};

export default MM1;
