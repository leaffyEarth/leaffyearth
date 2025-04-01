"use client";

import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { usePathname } from "next/navigation";

// icons
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import GrassOutlinedIcon from "@mui/icons-material/GrassOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface SideBarProps {
  onLinkClick?: () => void;
  handleSidebarToggle?: () => void;
}

export default function SideBar({
  onLinkClick,
  handleSidebarToggle,
}: SideBarProps) {
  const pathname = usePathname();
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        mx: "auto",
        color: "white",
        backgroundColor: theme.palette.primary.main,
        zIndex: 1000,
      }}
      onClick={onLinkClick}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 20px",
          // backgroundColor: theme.palette.primary.main,
        }}
      >
        <img src="/image/leaffyEarthHeaderLogo.png" style={{ width: "70%" }} />

        <CloseOutlinedIcon
          onClick={handleSidebarToggle}
          sx={{
            color: theme.palette.secondary.main,
            cursor: "pointer",
          }}
        />
      </Box>
      <List sx={{ marginTop: "25px" }}>
        <ListItemText
          primary="Dashboard"
          sx={{ py: "10px", px: "15px", color: theme.palette.secondary.main }}
        />
        <ListItemButton
          selected={pathname === "/dashboard"}
          component="a"
          href="/dashboard"
        >
          <ListItemIcon>
            <SpaceDashboardOutlinedIcon
              sx={{ color: theme.palette.secondary.main }}
            />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton
          selected={pathname?.startsWith("/dashboard/users")}
          component="a"
          href="/dashboard/users"
        >
          <ListItemIcon>
            <PersonOutlineOutlinedIcon
              sx={{ color: theme.palette.secondary.main }}
            />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>

        <ListItemText
          primary="Products"
          sx={{ py: "10px", px: "15px", color: theme.palette.secondary.main }}
        />

        <ListItemButton
          selected={pathname?.startsWith("/dashboard/plants")}
          component="a"
          href="/dashboard/plants"
        >
          <ListItemIcon>
            <GrassOutlinedIcon sx={{ color: theme.palette.secondary.main }} />
          </ListItemIcon>
          <ListItemText primary="Plants" />
        </ListItemButton>

        <ListItemButton
          selected={pathname?.startsWith("/dashboard/planters")}
          component="a"
          href="/dashboard/planters"
        >
          <ListItemIcon>
            <Inventory2OutlinedIcon
              sx={{ color: theme.palette.secondary.main, pb: "2px" }}
            />
          </ListItemIcon>
          <ListItemText primary="Planters" />
        </ListItemButton>

        <ListItemText
          primary="Operations"
          sx={{ py: "10px", px: "15px", color: theme.palette.secondary.main }}
        />

        <ListItemButton
          selected={pathname?.startsWith("/dashboard/locations")}
          component="a"
          href="/dashboard/locations"
        >
          <ListItemIcon>
            <FmdGoodOutlinedIcon sx={{ color: theme.palette.secondary.main }} />
          </ListItemIcon>
          <ListItemText primary="Locations" />
        </ListItemButton>

        <ListItemButton
          selected={pathname?.startsWith("/dashboard/nurseries")}
          component="a"
          href="/dashboard/nurseries"
        >
          <ListItemIcon>
            <StorefrontOutlinedIcon
              sx={{ color: theme.palette.secondary.main }}
            />
          </ListItemIcon>
          <ListItemText primary="Partners" />
        </ListItemButton>

        <ListItemText
          primary="Configurations"
          sx={{ py: "10px", px: "15px", color: theme.palette.secondary.main }}
        />
        <ListItemButton
          selected={pathname?.startsWith("/dashboard/settings")}
          component="a"
          href="/dashboard/settings"
        >
          <ListItemIcon>
            <SettingsOutlinedIcon
              sx={{ color: theme.palette.secondary.main }}
            />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>

        {/* Add more items as needed */}
      </List>
    </Box>
  );
}
