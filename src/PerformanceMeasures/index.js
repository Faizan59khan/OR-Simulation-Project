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
    <div style={{display: 'flex', width: '80%', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
      <h1>Performance Measures: Single Server</h1>
      <div style={{border: '1px solid grey', padding: '10px'}}>
      <h2>Lambda={lambda(data)}</h2>
      <h2>Meu={meu(data)}</h2>
      <h2>
        Avg no of customers in system: {averageNumberOfCustomers(data)?.system}
      </h2>
      <h2>
        Avg no of customes in queue: {averageNumberOfCustomers(data)?.queue}
      </h2>
      </div>
    </div>
  );
};

export default index;
