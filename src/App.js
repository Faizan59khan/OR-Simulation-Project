import "./App.css";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import AppBar from './Components/appBar'
import { BrowserRouter,Route, Routes } from "react-router-dom"
import Home from './Home/index.js'
import PerformanceMeasures from './PerformanceMeasures/index.js'
import RandomNumberGeneration from './PredictNewCustomers/RandomCustomerGeneration'




function App() {
  const [data, setData] = useState();
  const [menuWiseData, setMenuWiseData] = useState();
  // const res = [
  //   {
  //     id: 1,
  //     customer: "C1",
  //     arrivalTime: 0,
  //     serviceTime: 1,
  //   },
  //   {
  //     id: 2,
  //     customer: "C2",
  //     arrivalTime: 1,
  //     serviceTime: 2,
  //   },
  //   {
  //     id: 3,
  //     customer: "C3",
  //     arrivalTime: 2,
  //     serviceTime: 1,
  //   },
  //   {
  //     id: 4,
  //     customer: "C4",
  //     arrivalTime: 3,
  //     serviceTime: 1,
  //   },
  // ];

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
      <BrowserRouter>
      <AppBar />
       <Routes>
      <Route path="/" element={<Home data={data} menuWiseData={menuWiseData} setMenuWiseData={setMenuWiseData} />} />
      <Route path="/performancemeasures" element={<PerformanceMeasures data={menuWiseData} />} />
      <Route path="/prediction" element={<RandomNumberGeneration data={menuWiseData} />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
