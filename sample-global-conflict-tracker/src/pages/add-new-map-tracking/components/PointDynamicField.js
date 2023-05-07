import { MinusCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input } from "antd";
import React from "react";

function PointDynamicField(props) {
  const { name, onRemove } = props;
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, index) => (
              <div key={field.key}>
                <Divider>Tọa độ điểm {index + 1}</Divider>
                <Form.Item name={[index, "id"]} hidden>
                  <Input />
                </Form.Item>
                {/* <Form.Item name={[index, "id"]} label="Tên điểm" rules={[{ required: true, message: "Vui lòng nhập" }]}>
                  <Input placeholder="Tên điểm" />
                </Form.Item> */}
                <Form.Item name={[index, "mapX"]} label="Tọa độ X">
                  <Input />
                </Form.Item>
                <Form.Item name={[index, "mapY"]} label="Tọa độ Y">
                  <Input />
                </Form.Item>
                <Form.Item hidden name={[index, "svg"]} label="Tọa độ Y">
                  <Input />
                </Form.Item>
                {fields.length > 0 ? (
                  <Button
                    type="danger"
                    className="dynamic-delete-button"
                    onClick={() => {
                      if (onRemove) {
                        onRemove(field);
                      }
                      remove(field.name);
                    }}
                    icon={<MinusCircleOutlined />}
                  >
                    <span className="text-danger">Xóa trường trên</span>
                  </Button>
                ) : null}
              </div>
            ))}
            <Divider />
          </div>
        );
      }}
    </Form.List>
  );
}

export default PointDynamicField;
