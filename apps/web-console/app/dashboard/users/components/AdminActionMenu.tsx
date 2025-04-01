"use client";

import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  useTheme,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import DropdownMenu from "@/components/menu/dropdownMenu";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

// icons
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { api } from "@/services/api";
import { User } from "../page";

interface AddAdminDialogProps {
  selectedRow?: User;
  onCreated?: () => void;
}

export default function AdminActionMenu({
  selectedRow,
  onCreated,
}: AddAdminDialogProps) {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [Apiloading, setApiLoading] = React.useState<boolean>(false);

  const [deleteUserModalStatus, setDeleteUserModalStatus] =
    React.useState<boolean>(false);

  const [changeUserRoleModalStatus, setChangeUserRoleModalStatus] =
    React.useState<boolean>(false);
  const [changedUserRole, setChangedUserRole] = React.useState<
    "owner" | "manager" | "admin" | undefined
  >(selectedRow?.role);

  // functions

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserDeleteAction = async () => {
    try {
      setApiLoading(true);

      await api.delete(`/users/${selectedRow?._id}`);

      setApiLoading(false);
      if (onCreated) onCreated();

      setDeleteUserModalStatus(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("error while deleting the user, error: ", err);
      setDeleteUserModalStatus(false);
    }
  };

  // for changing user role modal

  const handleUserRoleChanging = (value: string) => {
    if (value === "owner") setChangedUserRole(value);
    if (value === "admin") setChangedUserRole(value);
    if (value === "manager") setChangedUserRole(value);
  };

  const handleUserRoleChange = async () => {
    try {
      setApiLoading(true);

      await api.patch(`/users/${selectedRow?._id}`, {
        role: changedUserRole,
      });

      setApiLoading(false);
      if (onCreated) onCreated();

      setChangeUserRoleModalStatus(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("error while edit the user, error: ", err);
      setChangeUserRoleModalStatus(false);
    }
  };

  return (
    <>
      <IconButton aria-label="delete" onClick={handleClick}>
        <MoreVertOutlinedIcon sx={{ color: "white" }} />
      </IconButton>
      <DropdownMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {/* <MenuItem onClick={() => { handleClose(); setChangeUserRoleModalStatus(true) }}> <ModeOutlinedIcon sx={{ mr: '6px', color: theme.palette.primary.main }} /> Edit User</MenuItem> */}
        <MenuItem
          onClick={() => {
            handleClose();
            setDeleteUserModalStatus(true);
          }}
        >
          {" "}
          <DeleteOutlineIcon
            sx={{ mr: "6px", pb: "1px", color: theme.palette.primary.main }}
          />{" "}
          Delete User
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setChangeUserRoleModalStatus(true);
          }}
        >
          {" "}
          <AdminPanelSettingsOutlinedIcon
            sx={{ mr: "6px", pb: "2px", color: theme.palette.primary.main }}
          />{" "}
          Change User Role
        </MenuItem>
      </DropdownMenu>

      {/* modals */}
      {/* delete user modal */}
      <Dialog
        open={deleteUserModalStatus}
        onClose={() => setDeleteUserModalStatus(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Delete User
          <IconButton
            aria-label="close"
            onClick={() => setDeleteUserModalStatus(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          Are you sure you want to remove `&quot`{selectedRow?.displayName}`&quot` user
        </DialogContent>

        <DialogActions sx={{ m: 0, p: 2 }}>
          <Button
            variant="text"
            onClick={() => setDeleteUserModalStatus(false)}
            sx={{ color: "black" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUserDeleteAction}
            variant="contained"
            color="error"
            disabled={Apiloading}
          >
            {Apiloading ? "Deleting" : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* change user role modal */}
      <Dialog
        open={changeUserRoleModalStatus}
        onClose={() => setChangeUserRoleModalStatus(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Change User Role
          <IconButton
            aria-label="close"
            onClick={() => setChangeUserRoleModalStatus(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <FormControl fullWidth sx={{ my: 1 }}>
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select
              labelId="role-select-label"
              label="Role"
              value={changedUserRole}
              onChange={(e) => handleUserRoleChanging(e.target.value)}
            >
              <MenuItem value="owner">Owner</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions sx={{ m: 0, p: 2 }}>
          <Button
            variant="text"
            onClick={() => setChangeUserRoleModalStatus(false)}
            sx={{ color: "black" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUserRoleChange}
            variant="contained"
            disabled={Apiloading}
          >
            {Apiloading ? "Updating" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
