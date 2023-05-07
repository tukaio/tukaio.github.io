import { DesktopOutlined, FileOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as Spinner } from "../../assets/loading.svg";
import "./admin.css";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, path) {
  return {
    key,
    label,
    path,
  };
}

const pageTypes = {
  LIST: "list",
  ADD_NEW: "new",
  EDIT: "edit",
};

const modules = {
  HOME: "home",
  MAP_TRACKING: "map-tracking",
  ABOUT: "about",
};

const items = [
  getItem("Tất cả điểm nóng", modules.MAP_TRACKING, <DesktopOutlined />, "/admin/map-tracking/list"),
  getItem("About", modules.ABOUT, <FileOutlined />, "/about"),
];

export default function AdminPage(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    hideSpinner();
  }, []);

  const hideSpinner = () => {
    setTimeout(() => {
      setShowSpinner(false);
    }, 500);
  };

  return (
    <div className="admin-page">
      <>Hello</>
    </div>
  );
}

const LoadingOverlay = ({ children, showSpinner }) => {
  const overlay = React.useRef(null);
  return (
    <span className="overlay" ref={overlay}>
      {children}
      {showSpinner && (
        <span className="cover">
          <span className="spinner">
            <Spinner />
          </span>
        </span>
      )}
    </span>
  );
};
