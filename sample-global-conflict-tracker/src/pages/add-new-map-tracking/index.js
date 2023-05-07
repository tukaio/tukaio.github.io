import { Button, Card, Col, Form, Input, Row, Select, Space, Tabs, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import database from "../../database";
import { randomGuid } from "../../helpers";
import DetailDynamicField from "./components/DetailDynamicField";
import PointDynamicField from "./components/PointDynamicField";
import defaultData from "./defaultData";
const { Option } = Select;
const detailTab = {
  DETAIL: "DETAIL",
  MAP_POINT: "MAP_POINT",
};

export default function AddNewTrackingPoint(props) {
  const { initialValue, isEdit } = props;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [redPoints, setRedPoints] = useState([]);
  const [currentTabDetail, setCurrentTabDetail] = useState(detailTab.DETAIL);
  const pageTitle = isEdit ? "CHỈNH SỬA" : "THÊM MỚI";
  const options = database.TrackingTypes.getAll()?.map((t) => {
    return {
      value: t.id,
      label: t.name,
    };
  });

  console.log("debug edit initialValue ", initialValue);

  useEffect(() => {
    const countries = database.Countries.getAll();
    setCountries(countries);
    setTimeout(() => {
      let formValues = defaultData;
      if (isEdit) {
        formValues = initialValue;
      }

      form.setFieldsValue(formValues);
      setRedPoints(formValues?.coords);
    }, 1000);
  }, []);

  useEffect(() => {
    if (currentTabDetail === detailTab.MAP_POINT) {
      console.log("loading map");
      setTimeout(() => {
        window.loadSVGWorldMap();
        if (window.fillRedPointToMap) {
          clearTimeout(window.fillRedPointToMap);
        }

        window.fillRedPointToMap = setTimeout(() => {
          const { coords } = form.getFieldsValue();
          fillRedPointToMap(coords);
        }, 2000);
      }, 1000);
    }
  }, [currentTabDetail]);

  useEffect(() => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      coords: redPoints,
    });
  }, [redPoints]);

  const fillRedPointToMap = (coords) => {
    if (coords && coords?.length > 0) {
      for (let i = 0; i < coords.length; i++) {
        const point = coords[i];
        window.addPointToMap(point);
      }
    }
  };

  // Get action add new point from js
  window.addNewRedPoint = (point) => {
    setRedPoints([...redPoints, point]);
  };

  const onRemoveRedPoint = (field) => {
    const removePoint = redPoints[field.name];
    if (removePoint) {
      const newRedPoints = redPoints.filter((p) => p.id !== removePoint.id) ?? [];
      setRedPoints(newRedPoints);

      if (window.removePointFromMap && currentTabDetail === detailTab.MAP_POINT) {
        window.removePointFromMap(removePoint.id);
      }
    }
  };

  const onClickAdd = async () => {
    const formValues = await form.validateFields();
    try {
      const mapTrackingId = randomGuid();
      const { countryIds, mapTrackingDetails } = formValues;
      let mapTrackingCountries = [];
      if (countryIds && countryIds?.length > 0) {
        for (var i = 0; i < countryIds.length; i++) {
          const countryId = countryIds[i];
          const country = countries.find((c) => c.id === countryId);
          if (country) {
            mapTrackingCountries.push(country);
          }
        }
      }

      let _mapTrackingDetails = [];
      if (mapTrackingDetails && mapTrackingDetails?.length > 0) {
        for (var i = 0; i < mapTrackingDetails.length; i++) {
          const _mapTrackingDetail = mapTrackingDetails[i];
          const newMapTrackingDetail = {
            ..._mapTrackingDetail,
            id: randomGuid(),
            mapTrackingId: mapTrackingId,
          };

          _mapTrackingDetails.push(newMapTrackingDetail);
        }
      }

      database.MapTrackingDetails.addRange(_mapTrackingDetails);

      const mapTracking = {
        ...formValues,
        id: mapTrackingId,
        mapTrackingCountries: mapTrackingCountries,
        mapTrackingDetails: _mapTrackingDetails,
      };

      database.MapTrackings.add(mapTracking);
      message.success("Thêm thành công.");
    } catch (err) {
      message.error("Thao tác thất bại, vui lòng kiểm tra lại.");
    }
  };

  function BackButton() {
    return (
      <Button type="secondary" htmlType="button" onClick={() => navigate(-1)}>
        <b>Trở về</b>
      </Button>
    );
  }

  function AddNewButton() {
    return (
      <Button type="primary" htmlType="submit" onClick={onClickAdd}>
        LƯU
      </Button>
    );
  }

  function MapTrackingDetails() {
    return (
      <Card title="Chi tiết">
        <DetailDynamicField name="mapTrackingDetails" />
      </Card>
    );
  }
  const tabItems = [
    {
      key: detailTab.DETAIL,
      label: `Chi tiết`,
      children: <MapTrackingDetails />,
    },
    {
      key: detailTab.MAP_POINT,
      label: `Thể hiện trên bản đồ`,
      children: (
        <Card>
          <span>Double click to add new point</span>
          <div id="mapContainer"></div>
        </Card>
      ),
    },
  ];

  return (
    <div className="AddNewTrackingPoint">
      <h2 className="m-0">{pageTitle}</h2>
      <Form form={form}>
        <BackButton /> <AddNewButton />
        <p></p>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card title="Thông tin chung">
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập.",
                  },
                ]}
              >
                <Input placeholder="Nhập tên điểm nóng" />
              </Form.Item>
              <Form.Item
                name="trackingTypeId"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn",
                  },
                ]}
              >
                <Select options={options} placeholder="Loại"></Select>
              </Form.Item>
              <Form.Item name="countryIds">
                <Select
                  allowClear
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Chọn quốc gia"
                  onChange={() => {}}
                  optionLabelProp="label"
                  filterOption={(input, option) =>
                    option.props?.children?.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                    option.props?.label?.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {countries?.map((c, index) => {
                    return (
                      <Option key={index} value={c.id} label={c.name}>
                        <Space>{c.name}</Space>
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <div className="div-scrollable">
                <PointDynamicField name="coords" onRemove={onRemoveRedPoint} />
              </div>
            </Card>
          </Col>
          <Col span={18}>
            <Tabs
              defaultActiveKey={currentTabDetail}
              items={tabItems}
              onChange={(tabId) => {
                setCurrentTabDetail(tabId);
              }}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
}
