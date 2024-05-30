import { useEffect, useState } from "react";
import axios from "axios";
import HomeLayout from "../../../layout/HomeLayout";
const Homepage = () => {
  return (
    <HomeLayout>
      <div>
        <h1 className="text-4xl font-bold text-center mt-10">Welcome to the Homepage</h1>

      </div>
     
    </HomeLayout>
  );
};

export default Homepage;
