import * as React from "react";
import { styled } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";

const DataTable = styled((props: DataGridProps) => (
  <DataGrid rowHeight={60} {...props} />
))(({ theme }) => ({
  minHeight: "500px",
  border: "none",

  "& .MuiDataGrid-cell": {
    border: "none !important",
  },
  "& .MuiDataGrid-columnHeader": {
    border: "none !important",
  },
  "& .MuiDataGrid-row": {
    backgroundColor: theme.palette.secondary.light,
    borderRadius: "12px",
    my: "5px",
  },
  "& .MuiDataGrid-row:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

export default DataTable;
