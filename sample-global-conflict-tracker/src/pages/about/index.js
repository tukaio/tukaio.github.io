import { Button, message } from "antd";
import React from "react";
import { table } from "../../database";
import fakeData from "../../fakeData";
import { demoMapTrackings } from "./demoMapTracking";
import { demoMapTrackingDetails } from "./demoMapTrackingDetail";

export default function About(props) {
  const generateData = () => {
    const countries = fakeData.Countries;
    //const mapTrackings = fakeData.MapTrackings;
    //const mapTrackingDetails = fakeData.MapTrackingDetails;
    const trackingTypes = fakeData.TrackingTypes;

    saveDB(table.COUNTRIES, countries);
    //saveDB(table.MAP_TRACKINGS, mapTrackings);
    //saveDB(table.MAP_TRACKING_DETAILS, mapTrackingDetails);
    saveDB(table.TRACKING_TYPES, trackingTypes);

    initDemoData();

    message.success("Khời tạo dữ liệu mẫu thành công");
  };

  const saveDB = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const initDemoData = () => {
    const mapTrackings = demoMapTrackings;
    const mapTrackingDetails = demoMapTrackingDetails;
    saveDB(table.MAP_TRACKINGS, mapTrackings);
    saveDB(table.MAP_TRACKING_DETAILS, mapTrackingDetails);
  };

  return (
    <>
      <Button onClick={() => generateData()}>Khởi tạo dữ liệu mẫu</Button>
    </>
  );
}
