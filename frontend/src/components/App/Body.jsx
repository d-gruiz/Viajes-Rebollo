import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Templates from "../Templates/Templates";
import Home from "../App/Home";
import TravelView from "../Travels/TravelView";
import TravelPlan from '../Travels/TravelPlan';
import TravelPlanList from '../Travels/TravelPlanList';
import "../../css/Body.css"

function Body() {
  return (
    <div>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/travels" element={<TravelView />} />
          <Route path="/createTravel" element={<TravelPlan />} />
          <Route path="/lista de plan de viajes" element={<TravelPlanList  />} />
      </Routes>
    </div>
  );
}

export default Body;
