import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GoBack } from "../../components/GoBack";
import database from "../../database";

function MapTrackingPage(props) {
  const navigate = useNavigate();
  const params = useParams();
  const mapTrackingId = params?.id ?? null;
  const [mapTrackingDetails, setMapTrackingDetails] = useState([]);
  const [mapTracking, setMapTracking] = useState(null);

  useEffect(() => {
    if (mapTrackingId) {
      const mapTracking = database.MapTrackings.getAll().find((i) => i.id === mapTrackingId) ?? null;
      setMapTracking(mapTracking);

      const mapTrackingDetails =
        database.MapTrackingDetails.getAll().filter((i) => i.mapTrackingId === mapTrackingId) ?? [];
      setMapTrackingDetails(mapTrackingDetails);
    }
  }, []);

  const onClickViewDetail = (mapTrackingDetailId) => {
    navigate(`/map-tracking/${mapTrackingId}/detail/${mapTrackingDetailId}`);
  };

  return (
    <div className="map-tracking-page">
      <Row>
        <GoBack />
      </Row>
      <Row className="content">
        <Col span="16" id="map-tracker"></Col>
        <Col span="8">
          <div className="map-tracking detail">
            <p className="title">{mapTracking?.name}</p>
          </div>
          <div className="map-tracking-container">
            {mapTrackingDetails?.map((mapTrackingDetail, index) => {
              const { id, name } = mapTrackingDetail;
              return (
                <Row key={index} className="f-right">
                  <div className="map-tracking" onClick={() => onClickViewDetail(id)}>
                    <p className="title">{name}</p>
                  </div>
                </Row>
              );
            })}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default MapTrackingPage;
