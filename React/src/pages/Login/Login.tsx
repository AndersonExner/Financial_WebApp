import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper, FormControlLabel, Checkbox } from "@mui/material";
import { userService } from '../../services/userService';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Preencha todos os campos.");
            return;
        }
        setError("");

        try {
            if (isRegistering) {
                // Se estiver criando conta, use a função createUser do userService
                const response = await userService.createUser(email, password);
                if (response.success) {
                    alert("Usuário criado com sucesso!");
                } else {
                    setError(response.message || "Erro ao criar conta.");
                }
            } else {
                const response = await userService.login(email, password);
                if (response.success) {
                    alert("Login bem-sucedido!");
                } else {
                    setError(response.message || "Erro ao fazer login.");
                }
            }
        } catch (error) {
            setError("Ocorreu um erro ao processar a requisição.");
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 400 }}>
                <Typography variant="h5" textAlign="center" mb={2}>
                    {isRegistering ? "Criar Conta" : "Login"}
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
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isRegistering}
                            onChange={() => setIsRegistering(!isRegistering)}
                            color="primary"
                        />
                    }
                    label="Criar uma conta"
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
                    {isRegistering ? "Registrar" : "Entrar"}
                </Button>
            </Paper>
        </Box>
    );
};