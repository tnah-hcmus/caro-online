import React, { useEffect, useState } from "react";

import { useTable, useSortBy, usePagination } from "react-table";
import { makeStyles, TablePagination, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ConfirmModal from "../common/ConfirmModal";

function Table({ columns, data }) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    pageOptions,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination
  );

  const handleChangePage = (event, page) => gotoPage(page);

  const handleChangeRowsPerPage = (event) => setPageSize(event.target.value);

  const onBlockUser = (userId) => {
    setUserId(userId);
    setOpen(true);
  };

  const handleBlockUser = () => {
    console.log("Block user", userId);
    setOpen(false);
  };

  return (
    <>
      <ConfirmModal
        title="Do you want to block this user ?"
        open={open}
        onAgree={handleBlockUser}
        onDisagree={() => setOpen(false)}
      />
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
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className={classes.row}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.column.Header === "Actions" ? (
                        <div className={classes.actions}>
                          <Button
                            onClick={() => history.push(`/admin/manageuser/${cell.value}`)}
                            variant="contained"
                            size="small"
                            color="primary"
                          >
                            View
                          </Button>
                          <Button
                            onClick={() => onBlockUser(cell.value)}
                            variant="contained"
                            size="small"
                            color="secondary"
                          >
                            {cell.row.original.blocked == "False" ? "Block" : "Unblock"}
                          </Button>
                        </div>
                      ) : (
                        cell.render("Cell")
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={pageSize}
        page={pageIndex}
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
    borderBottom: "1px solid #f1f1f1",
    height: 35,
    "&:hover": {
      background: "#f1f1f1",
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
  actions: {
    "&>button": {
      margin: "auto 5px",
    },
  },
});
