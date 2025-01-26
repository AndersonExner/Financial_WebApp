import React, { useState } from "react";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { useTheme } from "@mui/material/styles";
import { useAppMenuContext } from "../../contexts";

interface TopBarProps {
    userName: string;
}

export const TopBar: React.FC<TopBarProps> = ({ userName }) => {
    const theme = useTheme();
    const [search, setSearch] = useState('');

    const { isOpen, options, toogleAppMenuOpen } = useAppMenuContext();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    return (
        <Toolbar variant='regular' disableGutters sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={toogleAppMenuOpen}>
                    <Icon fontSize='large'>{isOpen ? 'menu_open' : 'menu'}</Icon>
                </IconButton>
            </Box>
            <Box flexGrow={1} ml={4}>
                <TextField
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Pesquisar..."
                    variant="outlined"
                    size="small"
                    sx={{
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: '4px',
                    }}
                />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", ml: 4 }}>
                <Typography variant="h6" sx={{ color: "text.secondary" }}>
                    Bem-vindo(a), {userName}.
                </Typography>
            </Box>
        </Toolbar>
    );
};