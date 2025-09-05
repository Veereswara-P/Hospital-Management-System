'use client';

import React from 'react';
import Link from 'next/link';
import { Card, Box, Typography } from '@mui/material';

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ReactElement; // Use ReactElement to allow cloning
  href?: string;
  iconColor?: string; // 1. Add new prop for color
}

export default function SummaryCard({ title, value, icon, href, iconColor = 'inherit' }: SummaryCardProps) {
  // 2. Clone the icon to inject the color style
  const styledIcon = React.cloneElement(icon, {
    sx: { ...icon.props.sx, color: iconColor },
  });

  const cardContent = (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
      <Box sx={{ flexShrink: 0, mr: 2, color: "blue" }}>
        {styledIcon}
      </Box>
      <Box>
        <Typography variant="h6" color='text.primary' component="div">
          {value}
        </Typography>
        <Typography color="text.secondary">
          {title}
        </Typography>
      </Box>
    </Box>
  );

  const cardStyles = {
    textDecoration: "",
    backgroundColor: "#f8f8f8ff",
    //background: "linear-gradient(145deg, #d5d6e8ff, #b2b3c2ff)", // background gradient
  border: "1px solid #4e4e60ff",
  borderRadius: "16px",
  padding: "1.5rem",
  color: "#ffffff",
  boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
  transition: "all 0.3s ease-in-out",
  maxWidth: "320px",
  margin: "1rem auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "&:hover": {
    transform: "translateY(-6px) scale(1.02)",
boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
borderColor: "#6366f1",
},
  };

  if (href) {
    return (
      <Card component={Link} href={href} sx={cardStyles}>
        {cardContent}
      </Card>
    );
  }

  return <Card sx={cardStyles}>{cardContent}</Card>;
}