import Layout from "../components/layout";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Confirmation() {
  const [time, setTime] = useState(59);
  const [driver, setDriver] = useState("");
  const [location, setLocation] = useState("");
  useEffect(() => {
    setTime(Math.floor(Math.random() * (59 - 1)) + 1);
    let randomIndex = Math.floor(Math.random() * (4 - 0)) + 0;
    console.log(randomIndex);
    setDriver(deliveryDrivers[randomIndex].driver);
    setLocation(deliveryDrivers[randomIndex].location);
  }, []);

  const deliveryDrivers = [
    {
      driver: "Sumithra",
      location: "Buckingham Palace",
    },
    {
      driver: "Yassien",
      location: "Stamford Bridge",
    },
    {
      driver: "Karwan",
      location: "The White House",
    },
    {
      driver: "Alex",
      location: "Australia",
    },
  ];

  return (
    <Layout>
      <h1>Thanks for your order!</h1>
      <h2>
        {driver} is on their way from {location}. They are {time} minutes away.
      </h2>
    </Layout>
  );
}
