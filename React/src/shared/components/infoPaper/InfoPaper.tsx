import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { SvgIconComponent } from "@mui/icons-material";

interface IInfoPaperProps {
    title: string;
    value: string;
    icon: SvgIconComponent;
    iconColor: string;
}

export const InfoPaper: React.FC<IInfoPaperProps> = ({ title, value, icon: IconComponent, iconColor = 'blue' }) => {
    const theme = useTheme();

    return (
        <Paper elevation={3} sx={{ padding: 2, width: '100%', maxWidth: theme.spacing(40) }} square={false}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Box>
                    <Typography variant='h6' gutterBottom sx={{ color: 'text.secondary' }}>
                        {title}
                    </Typography>
                    <Typography variant='h5'>
                        {value}
                    </Typography>
                </Box>
                
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: theme.spacing(8),
                        height: theme.spacing(8),
                        borderRadius: '50%',
                        backgroundColor: iconColor,
                        color: 'white'
                    }}
                >
                    <IconComponent fontSize='large' />
                </Box>
            </Box>
        </Paper>
    );
};