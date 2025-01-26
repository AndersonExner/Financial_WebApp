import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Icon from "@mui/material/Icon";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";

import { useAppMenuContext, useAppThemeContext } from "../../contexts";
import { TopBar } from "../TopBar/TopBar";

interface IAppMenuItemProps {
    label: string;
    icon: string;
    to: string;
    showLabel: boolean;
    onClick: (() => void) | undefined;
    color?: string;
}

const AppMenuItem: React.FC<IAppMenuItemProps> = ({ label, icon, to, showLabel, onClick, color }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const resolvedPath = useResolvedPath(to);
    const match = useMatch({ path: resolvedPath.pathname, end: false });

    const handleClick = () => {
        navigate(to);
        onClick?.();
    };

    return (
        <ListItemButton onClick={handleClick} selected={!!match} style={{ alignItems: "center", textAlign: "left", color: color }}>
            <ListItemIcon style={{ marginLeft: theme.spacing(1), color: color }}>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            {showLabel && <ListItemText primary={label} />}
        </ListItemButton>
    );
};

interface IAppMenuProps {
    children: React.ReactNode;
}

export const AppMenu: React.FC<IAppMenuProps> = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { isOpen, options, toogleAppMenuOpen } = useAppMenuContext();
    const { toggleTheme } = useAppThemeContext();

    return (
        <>
            <Drawer
                open={isOpen}
                variant={smDown ? 'temporary' : 'permanent'}
                onClose={toogleAppMenuOpen}
                anchor='left'
            >
                <Box
                    width={isOpen ? theme.spacing(28) : theme.spacing(10)}
                    display={'flex'}
                    flexDirection={'column'}
                    height={'100%'}
                >
                    <Box
                        width="100%"
                        height={theme.spacing(20)}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {/* <Avatar sx={{ height: theme.spacing(12), width: theme.spacing(12) }} /> */}
                    </Box>

                    <Divider />

                    <Box flex={1}>
                        <List component={'nav'} style={{ width: '100%' }}>
                            {options.map(item => (
                                <AppMenuItem
                                    key={item.path}
                                    label={item.label}
                                    icon={item.icon}
                                    to={item.path}
                                    onClick={undefined}
                                    showLabel={isOpen}
                                    color={item.color}
                                />
                            ))}
                        </List>
                    </Box>

                    <Box marginBottom={theme.spacing(5)}>
                        <List>
                            <ListItemButton>
                                <ListItemIcon style={{ marginLeft: theme.spacing(1) }}>
                                    <Icon>logout</Icon>
                                </ListItemIcon>
                                {isOpen && <ListItemText primary="LogOut" />}
                            </ListItemButton>
                        </List>
                    </Box>
                </Box>
            </Drawer>
            <Box
                height="100vh"
                marginLeft={isOpen ? theme.spacing(28) : theme.spacing(10)}
                sx={{ transition: theme.transitions.create(['margin'], { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen }) }}
                p={4}
            >
                <TopBar userName="Teste" />
                {children}
            </Box>
        </>
    );
};

export default AppMenu;