import { BackwardFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./goback.css";

export function GoBack(props) {
  const navigate = useNavigate();
  return (
    <div
      className="goback"
      onClick={() => {
        navigate(-1);
      }}
    >
      <BackwardFilled />
    </div>
  );
}
