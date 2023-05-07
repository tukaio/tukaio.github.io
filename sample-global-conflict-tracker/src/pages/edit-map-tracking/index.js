import React from "react";
import { useSearchParams } from "react-router-dom";
import database from "../../database";
import AddNewTrackingPoint from "../add-new-map-tracking";

export default function EditTrackingPoint(props) {
  const [searchParams] = useSearchParams();
  const mapTrackingId = searchParams.get("id");
  const editData = database.MapTrackings.getById(mapTrackingId);
  return (
    <div className="edit-map-tracking">
      <AddNewTrackingPoint initialValue={editData} isEdit/>
    </div>
  );
}
