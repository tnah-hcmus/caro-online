import React from "react";
import {Link} from "react-router-dom";
const NotFound = (props) => (
  <div className="header">
    <div className="container">
      <h1 className="header__title">{props.title}</h1>
      {props.subtitle && <h2 className="header__subtitle"><Link to="/" >{props.subtitle}</Link></h2>}
      
    </div>
  </div>
);

NotFound.defaultProps = {
  title: "Không tìm thấy trang cần tìm",
  subtitle: "Quay lại trang chủ"
};

export default React.memo(NotFound);
