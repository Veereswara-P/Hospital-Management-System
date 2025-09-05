'use client'; // This layout is interactive, so it's a client component

import React from 'react';
import Link from 'next/link';
import { Box, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { text } from 'stream/consumers';

const drawerWidth = 200;

const navItems = [
  { text: 'Hospital Website', href: '/' },
  { text: 'Dashboard', href: '/dashboard' },
  { text: 'Patients', href: '/dashboard/patients' },
  { text: 'Appointments', href: '/dashboard/appointments' },
  { text: 'Staff', href: '/dashboard/staff' },
  { text: 'Billing', href: '/dashboard/billing' },
  { text: 'Pharmacy', href: '/dashboard/pharmacy' },
  { text: 'Lab Tests', href: '/dashboard/lab' },
  { text: 'Reports', href: '/dashboard/reports' },
  { text: 'User Management', href: '/dashboard/admin' },
];

export default function DashboardPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeRegistry> {/* MUI Theme Provider */}
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
          <Toolbar>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6" noWrap component="div">
                Sri Lalitha Hospital - Admin Panel
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' } }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <List>
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
        <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </ThemeRegistry>
  );
}