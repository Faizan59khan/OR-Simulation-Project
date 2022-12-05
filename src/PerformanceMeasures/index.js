import React from "react";

const index = ({ data }) => {
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
    let lam = lambda(data);
    let meuu = meu(data);
    const system = lam / (meuu - lam);
    const queue = system - lam / meuu;

    return {
      system,
      queue,
    };
  };
  return (
    <div>
      <h1>Performance Measures: Single Server</h1>
      <p>Lambda={lambda(data)}</p>
      <p>Meu={meu(data)}</p>
      <p>
        Avg no of customers in system: {averageNumberOfCustomers(data)?.system}
      </p>
      <p>
        Avg no of customes in queue: {averageNumberOfCustomers(data)?.queue}
      </p>
    </div>
  );
};

export default index;
