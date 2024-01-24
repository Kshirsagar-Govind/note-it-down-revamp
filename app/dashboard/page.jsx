"use client";
import React, { Component, useEffect } from "react";
import Header from "../(components)/header";
import { Bar } from "react-chartjs-2";
import ExpenseGraph from "../(components)/bar-chart";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

const state = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Rainfall",
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [65, 59, 80, 81, 56],
    },
  ],
};

// export class ChartJSGraph extends React.Component {
//   render() {
//     return (
//       <div>
//         <Bar
//           data={state}
//           options={{
//             title: {
//               display: true,
//               text: "Average Rainfall per month",
//               fontSize: 20,
//             },
//             legend: {
//               display: true,
//               position: "right",
//             },
//           }}
//         />
//       </div>
//     );
//   }
// }

const HomePage = () => {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  React.useEffect(() => {
    console.log(user);
    if (!user) {
      // redirect("/auth");
      // alert('Please Login to contiue')
    }
  }, [user]);

  if (user) {
    return (
      <div className="w-full h-full overflow-hidden">
        <div className=" py-10 px-8">
          <Header title="Home" />
        </div>
        <div className="p-10">
          <div className="home-graph-container">
            <ExpenseGraph />
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="">loading</div>;
  }
};

export default HomePage;
