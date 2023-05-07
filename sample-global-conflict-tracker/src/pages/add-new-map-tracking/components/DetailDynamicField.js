import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input } from "antd";
import React from "react";
import { TextAreaTinyMCE } from "./TextAreaTinyMCE";

function DetailDynamicField(props) {
  const { name } = props;
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, index) => (
              <div key={field.key}>
                <Divider className="m-0">Chi tiết {index + 1}</Divider>
                <Form.Item
                  name={[index, "name"]}
                  label="Tiêu đề"
                  rules={[{ required: true, message: "Vui lòng nhập" }]}
                >
                  <Input placeholder="Tiêu đề" />
                </Form.Item>
                <Form.Item name={[index, "content"]} label="Nội dung">
                  <TextAreaTinyMCE />
                </Form.Item>
                {fields.length > 1 ? (
                  <Button
                    type="danger"
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                    icon={<MinusCircleOutlined />}
                  >
                    <span className="text-danger">Xóa trường trên</span>
                  </Button>
                ) : null}
              </div>
            ))}
            <Divider />
            <Form.Item>
              <Button type="dashed" onClick={() => add()} style={{ width: "60%" }}>
                <PlusOutlined /> Thêm chi tiết
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
}

export default DetailDynamicField;
