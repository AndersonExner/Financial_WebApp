import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper, FormControlLabel, Checkbox } from "@mui/material";
import { userService } from '../../services/userService';

export const Login = () => {
    const [login, setlogin] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"error" | "success" | "">("");

    const handleLogin = async () => {
        if (!login || !password) {
            setMessage("Preencha todos os campos.");
            setMessageType("error");
            clearMessage();
            return;
        }
        setMessage("");
        setMessageType("")

        try {
            if (isRegistering) {
                // Se estiver criando conta, use a função createUser do userService
                const response = await userService.createUser(login, password);
                if (response.success) {
                    setMessage("Usuário Criado com Sucesso");
                    setMessageType("success");
                    clearMessage();
                } else {
                    setMessage(response.message || "Erro ao criar conta.");
                    setMessageType("error");
                    clearMessage();
                }
            } else {
                const response = await userService.login(login, password);
                console.log(response)
                if (response.success) {
                    alert("Login bem-sucedido!");
                } else {
                    setMessage(response.message || "Erro ao fazer login.");
                    setMessageType("error");
                    clearMessage();
                }
            }
        } catch (error) {
            setMessage("Ocorreu um erro ao processar a requisição.");
            setMessageType("error");
            clearMessage();
        }
    };

    const clearMessage = () => {
        setTimeout(() => {
            setMessage("");
            setMessageType("") 
          }, 5000);
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 400 }}>
                <Typography variant="h5" textAlign="center" mb={2}>
                    {isRegistering ? "Criar Conta" : "Login"}
                </Typography>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isRegistering}
                            onChange={() => setIsRegistering(!isRegistering)}
                            color="success"
                        />
                    }
                    label="Criar uma conta"
                />
                <TextField
                    fullWidth
                    label="Login"
                    variant="outlined"
                    margin="normal"
                    color="primary"
                    value={login}
                    onChange={(e) => setlogin(e.target.value)}
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
                {message && (
                    <Typography color={messageType == "error" ? "error" : "success"} textAlign="center" mt={1}>
                        {message}
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