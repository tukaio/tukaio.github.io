import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import database from "../../database";
import fakeData from "../../fakeData";

export default function TrackingPointList(props) {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);

  const tableColumns = [
    {
      title: "Code",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Phân loại",
      dataIndex: "trackingTypeName",
      key: "trackingTypeName",
    },
    {
      title: "Tên gọi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Các quốc gia",
      dataIndex: "countries",
      key: "countries",
    },
    {
      title: "Hành động",
      render: (_, record) => {
        return (
          <Row gutter={[16, 16]}>
            <Col>
              <Button type="primary" className="pointer" onClick={() => onEditRecord(record.id)} disabled={true}>
                <EditOutlined />
                <span>Sửa</span>
              </Button>
            </Col>
            <Col>
              <Button danger className="pointer" onClick={() => onDeleteRecord(record.id)}>
                <DeleteOutlined />
                <span>Xóa</span>
              </Button>
            </Col>
          </Row>
        );
      },
    },
  ];

  useEffect(() => {
    reloadDataTable();

    if (props.afterRender) {
      props.afterRender();
    }
  }, []);

  const reloadDataTable = () => {
    const mapTrackings = database.MapTrackings.getAll();
    const dataSrc = mapTrackings?.map((i) => {
      const trackingType = fakeData.TrackingTypes.find((t) => t.id === i.trackingTypeId);
      return {
        id: i.id,
        name: i.name,
        trackingTypeName: trackingType?.name,
        countries: i?.mapTrackingCountries?.map((c) => c?.name).join(", "),
      };
    });
    setDataSource(dataSrc);
  };

  const onDeleteRecord = (id) => {
    database.MapTrackings.remove(id);
    reloadDataTable();
  };

  const onEditRecord = (id) => {
    navigate(`/edit-map-tracking?id=${id}`);
  };

  return (
    <>
      <Button type="primary" onClick={() => navigate("/new-map-tracking")}>
        + Thêm điểm nóng
      </Button>
      <Table dataSource={dataSource} columns={tableColumns} />
    </>
  );
}
