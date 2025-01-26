import React from "react";
import Box from "@mui/material/Box";

export const ConstructionPage = () => {
    return (
        <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            height="90vh"
        >
            <img src={'/construction.jpg'} alt="Em Construção" style={{ width: '400px', height: '400px' }} />
        </Box>
    );
};