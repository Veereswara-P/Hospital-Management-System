'use client';

import React from 'react';
import Link from 'next/link'; // 1. Import the Link component
import { Box, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

const drawerWidth = 240;

// 2. Create an array for our navigation items


const navItems = [
  { text: 'Dashboard', href: '/' },
  { text: 'Patients', href: '/patients' },
  { text: 'Appointments', href: '/appointments' },
  { text: 'Staff', href: '/staff' }, 
  { text: 'Billing', href: '/billing' }, 
  { text: 'Pharmacy', href: '/pharmacy' },
  { text: 'Lab Tests', href: '/lab' }, // New link for Lab Tests
  { text: 'Reports', href: '/reports' },
  { text: 'User Management', href: '/admin' }, // New link for User Management
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Hospital Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {/* 3. Map over the array to create the links */}
          {navItems.map((item) => (
            <Link href={item.href} key={item.text} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}