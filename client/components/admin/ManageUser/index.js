import React, { useEffect } from "react";

import { connect } from "react-redux";
import Table from "../Table";
import { Typography } from "@material-ui/core";

function ManageUser(props) {
  const generateData = (usersList) => {
    return (usersList || []).map((user, i) => {
      const stt = i + 1;
      const email = user.email;
      const name = user.name;
      const verified = user.isVerified ? "Đã xác thực" : "Chưa xác thực";
      const blocked = user.isBlocked ? "Đã bị khóa" : "Chưa bị khóa";
      return { stt, email, name, verified, blocked };
    });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "STT",
        accessor: "stt",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Verified",
        accessor: "verified",
      },
      {
        Header: "Blocked",
        accessor: "blocked",
      },
    ],
    []
  );

  const data = React.useMemo(() => generateData(props.usersList), []);

  return (
    <div>
      <Typography variant="h4">Manage User</Typography>
      <Table columns={columns} data={data} />
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log({ state });
  return { usersList: state.user.usersList };
};

export default connect(mapStateToProps)(ManageUser);
