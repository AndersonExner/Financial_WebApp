import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (!email || !password) {
            setError("Preencha todos os campos.");
            return;
        }
        setError("");
        console.log("Login bem-sucedido", { email, password });
        // Aqui você pode adicionar a lógica de autenticação
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 400 }}>
                <Typography variant="h5" textAlign="center" mb={2}>
                    Login
                </Typography>
                <TextField
                    fullWidth
                    label="E-mail"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Senha"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && (
                    <Typography color="error" textAlign="center" mt={1}>
                        {error}
                    </Typography>
                )}
                <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    sx={{ mt: 2 }}
                    onClick={handleLogin}
                >
                    Entrar
                </Button>
            </Paper>
        </Box>
    );
};
