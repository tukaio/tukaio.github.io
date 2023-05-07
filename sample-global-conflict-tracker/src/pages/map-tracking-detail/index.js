import { Row } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GoBack } from "../../components/GoBack";

import database from "../../database";
import "./map-tracking-detail.css";

function MapTrackingDetailPage(props) {
  const params = useParams();
  const navigate = useNavigate();

  const mapTrackingId = params?.id ?? null;
  const mapTrackingDetailId = params?.detailId ?? null;

  const [mapTrackingDetail, setMapTrackingDetail] = useState([]);
  const [mapTracking, setMapTracking] = useState(null);

  useEffect(() => {
    if (mapTrackingId) {
      const mapTracking = database.MapTrackings.getAll().find((i) => i.id === mapTrackingId) ?? null;
      setMapTracking(mapTracking);

      const mapTrackingDetail = database.MapTrackingDetails.getAll().find((i) => i.id === mapTrackingDetailId) ?? null;
      setMapTrackingDetail(mapTrackingDetail);
    }
  }, []);

  return (
    <div className="map-tracking-detail-page">
      <Row>
        <GoBack />
      </Row>
      <Row className="page-title">
        <h2>{mapTrackingDetail?.name}</h2>
      </Row>
      <Row className="page-content">
        <div dangerouslySetInnerHTML={{ __html: mapTrackingDetail?.content }}></div>
      </Row>
    </div>
  );
}

export default MapTrackingDetailPage;
