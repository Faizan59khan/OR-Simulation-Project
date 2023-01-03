import React, { useState } from "react";

const Index = ({ data }) => {
  const [lam, setLam] = useState(false);
  const [meuu, setMeuu] = useState(false);
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
    console.log(res);
    return res;
  };
  const lambda = (data) => {
    return 1 / totalTimes(data)?.meanAT;
  };
  const meu = (data) => {
    return 1 / totalTimes(data)?.meanST;
  };

  const averageNumberOfCustomers = (data) => {
    // let lam = lambda(data);
    // let meuu = meu(data);
    let lamm = 1 / lam;
    let meuuu = 1 / meuu;
    let rho = lamm / meuuu;
    const system = lamm / (meuuu - lamm);
    const queue = system - lamm / meuuu;
    const noInQueue = Math.pow(rho, 2) / (1 - rho);
    const meanWaitQueue = noInQueue / lamm;
    const meanWaitSystem = meanWaitQueue + 1 / meuuu;
    const meanNoSystem = meanWaitSystem * lamm;
    const proportionTime = 1 - rho;

    return {
      system,
      queue,
      rho,
      noInQueue,
      meanWaitQueue,
      meanWaitSystem,
      meanNoSystem,
      proportionTime,
    };
  };
  return (
    <div
      style={{
        display: "flex",
        width: "80%",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
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
      <h1>Performance Measures: Single Server</h1>

      {lam && meuu ? (
        <div style={{ padding: "10px" }}>
          <h3 style={{ border: "1px solid grey", padding: "4px" }}>
            Lambda={1 / lam}
          </h3>
          <h3 style={{ border: "1px solid grey", padding: "4px" }}>
            Meu={1 / meuu}
          </h3>
          <h3 style={{ border: "1px solid grey", padding: "4px" }}>
            Utilization Factor: {averageNumberOfCustomers(data)?.rho}
          </h3>
          <h3 style={{ border: "1px solid grey", padding: "4px" }}>
            Avg no of customers in system:{" "}
            {averageNumberOfCustomers(data)?.system}
          </h3>
          <h3 style={{ border: "1px solid grey", padding: "4px" }}>
            Avg no of customes in queue: {averageNumberOfCustomers(data)?.queue}
          </h3>
          <h3 style={{ border: "1px solid grey", padding: "4px" }}>
            Number In Queue:
            {averageNumberOfCustomers(data)?.noInQueue.toFixed(2)} customers
          </h3>
          <h3 style={{ border: "1px solid grey", padding: "4px" }}>
            Mean Wait In Queue:
            {averageNumberOfCustomers(data)?.meanWaitQueue.toFixed(2)} minutes
          </h3>
          <h3 style={{ border: "1px solid grey", padding: "4px" }}>
            Mean Wait In System:
            {averageNumberOfCustomers(data)?.meanWaitSystem.toFixed(2)} minutes
          </h3>
          <h3 style={{ border: "1px solid grey", padding: "4px" }}>
            Mean Number In System:
            {averageNumberOfCustomers(data)?.meanNoSystem.toFixed(2)} customers
          </h3>
          <h3 style={{ border: "1px solid grey", padding: "4px" }}>
            Proportion Time Server:
            {averageNumberOfCustomers(data)?.proportionTime}
          </h3>
        </div>
      ) : null}
    </div>
  );
};

export default Index;
