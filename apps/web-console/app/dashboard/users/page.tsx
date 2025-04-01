"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, Collapse } from "@mui/material";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { api } from "@/services/api";
import AddAdminDialog from "./components/addAdminDialog";
import AdminActionMenu from "./components/AdminActionMenu";
import DataTable from "@/components/table/dataTable";

export interface User {
  _id: string;
  email: string;
  role: "owner" | "manager" | "admin";
  displayName?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ResponseData {
  data: User[]; // The actual array of users
  page: number; // The current page (1-based) from the server
  limit: number; // The number of items per page
  total: number; // Total number of users in the database
}

export default function UsersPage() {
  const theme = useTheme();

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [rowCount, setRowCount] = useState<number>(0);

  const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>(
    [],
  );
  const [selectedRowsData, setSelectedRowsData] = useState<User[]>([]);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  // userEffect

  useEffect(() => {
    fetchUsers();
  }, [paginationModel]);

  // functions

  async function fetchUsers() {
    try {
      const serverPage = paginationModel.page + 1;
      const response = await api.get<ResponseData>(
        `/users?page=${serverPage}&limit=${paginationModel.pageSize}`,
      );

      setUsers(response.data.data);
      setRowCount(response.data.total);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.message || "Failed to fetch users");
    }
  }

  const handleSelectionChange = (newSelection: GridRowSelectionModel) => {
    setSelectedRowIds(newSelection);
    const selectedData = users.filter((user) =>
      newSelection.includes(user._id),
    );
    setSelectedRowsData(selectedData);
  };

  const columns: GridColDef[] = [
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "displayName", headerName: "Display Name", flex: 1 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    { field: "updatedAt", headerName: "Updated At", flex: 1 },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "36px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
          User & Admin
        </Typography>

        <AddAdminDialog onCreated={fetchUsers} />
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Collapse
        orientation="vertical"
        in={selectedRowsData.length > 0}
        timeout={200}
        unmountOnExit
      >
        <Box
          sx={{
            display: "flex",
            height: "70px",
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
            backgroundColor: theme.palette.primary.main,
            borderRadius: "12px ",
            px: "12px",
          }}
        >
          <Typography variant="subtitle1" sx={{ mb: 0 }}>
            Selected {selectedRowsData.length}
          </Typography>

          {selectedRowsData.length == 1 && (
            <AdminActionMenu
              selectedRow={selectedRowsData[0]}
              onCreated={fetchUsers}
            />
          )}
        </Box>
      </Collapse>

      <DataTable
        rows={users}
        columns={columns}
        getRowId={(row) => row._id}
        checkboxSelection
        // SERVER-SIDE PAGINATION PROPS
        paginationMode="server"
        rowCount={rowCount}
        // MUI DataGrid is 0-based. You track it with `page`.
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rowSelectionModel={selectedRowIds}
        onRowSelectionModelChange={handleSelectionChange}
        sx={{
          "& .MuiDataGrid-row": {
            my: "5px",
          },
        }}
      />
    </Box>
  );
}
