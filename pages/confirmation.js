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
    <div className="confirmation">
      <h1>Thanks for your order!</h1>
      <p>
        {driver} your delivery driver is on their way from {location}. They are {time} minutes away.
      </p>
    </div>
  );
}
