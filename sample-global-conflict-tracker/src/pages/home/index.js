import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import database from "../../database";
import "./home.css";

function HomePage(props) {
  const navigate = useNavigate();
  const [trackingTypeSelected, setTrackingTypeSelected] = useState(null);
  const [mapTrackings, setMapTrackings] = useState([]);

  useEffect(() => {
    window.loadSVGWorldMap();
    setTrackingTypeSelected("TRACKING_TYPE_1");
  }, []);

  useEffect(() => {
    getMapTrackings(trackingTypeSelected);
  }, [trackingTypeSelected]);

  const getMapTrackings = (trackingTypeId) => {
    const mapTrackings = database.MapTrackings.getAll().filter((i) => i.trackingTypeId === trackingTypeId) ?? [];
    setMapTrackings(mapTrackings);
  };

  /// Events
  const onChangeMapTracingType = (trackingTypeIdSelected) => {
    setTrackingTypeSelected(trackingTypeIdSelected);
  };

  const onSelectMapTracking = (mapTrackingId) => {
    navigate(`/map-tracking/${mapTrackingId}`);
  };

  return (
    <div className="home-page">
      <Row className="header">
        <Col span={12} className="d-flex">
          <h1 className="map-title">{"BẢN ĐỒ CÁC ĐIỂM NÓNG VỀ XUNG ĐỘT"}</h1>
        </Col>
        <Col span={12}>
          <Row className="tracking-type-container">
            {database.TrackingTypes.getAll()?.map((trackingType, index) => {
              const { id, code, name } = trackingType;
              return (
                <div
                  key={index}
                  className={`tracking-type ${id === trackingTypeSelected ? "selected" : ""}`}
                  onClick={() => onChangeMapTracingType(id)}
                >
                  <p className="tracking-type-label">
                    <span>{name}</span>
                  </p>
                </div>
              );
            })}
          </Row>
        </Col>
      </Row>
      <Row className="content">
        <Col className="map-content">
          <div id="mapContainer"></div>
        </Col>
        <Col className="map-tracking-container">
          {mapTrackings?.map((mapTracking, index) => {
            const { id, name } = mapTracking;
            return (
              <Row key={index} className="f-right">
                <div className="map-tracking" onClick={() => onSelectMapTracking(id)}>
                  <p className="title">{name}</p>
                </div>
              </Row>
            );
          })}
        </Col>
      </Row>
    </div>
  );
}

export default HomePage;
