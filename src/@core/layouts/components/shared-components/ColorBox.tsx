import React from 'react';
import { Box, Typography } from '@mui/material';

interface ColorBoxProps {
  label: string;
  color: string;
}

const ColorBox: React.FC<ColorBoxProps> = ({ label, color }) => {
  return (
    <Box display="flex" alignItems="center">
      <Typography>{label}</Typography>
      <Box
        width={24}
        height={24}
        bgcolor={color}
        border={1}
        borderColor="rgba(0, 0, 0, 0.2)"
        marginLeft={1}
        borderRadius={0.8}
      />
    </Box>
  );
};

export default ColorBox;
