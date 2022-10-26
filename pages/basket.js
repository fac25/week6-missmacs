import { useEffect } from "react";

const Basket = () => {

    useEffect(()=>{
      const keys = Object.keys(localStorage)
      const value = Object.values(localStorage)

console.log(keys + "" + value)
        
    },[])

  return <></>;
};

export default Basket;
