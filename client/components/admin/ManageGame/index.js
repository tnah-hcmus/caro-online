import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { useTable } from "react-table";
import { makeStyles, TablePagination } from "@material-ui/core";

function Table({ columns, data }) {
  const classes = useStyles();
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <MaUTable {...getTableProps()} size="small" stickyHeader>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell {...column.getHeaderProps()}>{column.render("Header")}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()} hover={true}>
              {row.cells.map((cell) => {
                return <TableCell {...cell.getCellProps()}>{cell.render("Cell")}</TableCell>;
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </MaUTable>
  );
}

function ManageGame() {
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
    ],
    []
  );

  const data = React.useMemo(
    () => [
      {
        firstName: "Phat",
        lastName: "Nguyen",
      },
      {
        firstName: "Phat",
        lastName: "Nguyen",
      },
      {
        firstName: "Phat",
        lastName: "Nguyen",
      },
      {
        firstName: "Phat",
        lastName: "Nguyen",
      },
      {
        firstName: "Phat",
        lastName: "Nguyen",
      },
      {
        firstName: "Phat",
        lastName: "Nguyen",
      },
      {
        firstName: "Phat",
        lastName: "Nguyen",
      },
      {
        firstName: "Phat",
        lastName: "Nguyen",
      },
      {
        firstName: "Phat",
        lastName: "Nguyen",
      },
      {
        firstName: "Phat",
        lastName: "Nguyen",
      },
      {
        firstName: "Phat",
        lastName: "Nguyen",
      },
      {
        firstName: "Phat",
        lastName: "Nguyen",
      },
      {
        firstName: "Phat",
        lastName: "Nguyen",
      },
      {
        firstName: "Phat",
        lastName: "Nguyen",
      },
      {
        firstName: "Phat",
        lastName: "Nguyen",
      },
      {
        firstName: "Phat",
        lastName: "Nguyen",
      },
      {
        firstName: "Phat",
        lastName: "Nguyen",
      },
      {
        firstName: "Phat",
        lastName: "Nguyen",
      },
    ],
    []
  );

  return (
    <div>
      <CssBaseline />
      <Table columns={columns} data={data} />
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={50}
        rowsPerPage={10}
        page={1}
        // onChangePage={handleChangePage}
        // onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default ManageGame;

const useStyles = makeStyles({
  row: {
    "&:hover": {
      background: "#ddd",
    },
  },
});
