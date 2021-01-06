import React, { useEffect } from "react";

import { useTable, useSortBy } from "react-table";
import { makeStyles, TablePagination } from "@material-ui/core";

function Table({ columns, data }) {
  const classes = useStyles();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  const firstPageRows = rows.slice(0, 10);

  const handleChangePage = () => {};
  const handleChangeRowsPerPage = () => {};

  return (
    <>
      <table {...getTableProps()} className={classes.root}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className={classes.header}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} className={classes.th}>
                  {column.render("Header")}
                  <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className={classes.row}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={50} // users.length
        rowsPerPage={10} // user.
        page={1}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}

export default Table;

const useStyles = makeStyles({
  root: {
    width: "100%",
    borderSpacing: 0,
    borderCollapse: "collapse",
  },
  row: {
    borderBottom: "1px solid #ddd",
    height: 35,
    "&:hover": {
      background: "#ddd",
    },
    "& > td": {
      paddingLeft: 10,
    },
  },
  header: {
    background: "#888",
    color: "white",
    textAlign: "left",
    height: 40,
    "& > th": {
      paddingLeft: 10,
    },
  },
});
