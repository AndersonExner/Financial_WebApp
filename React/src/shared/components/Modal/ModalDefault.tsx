import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

interface ModalDefaultProps {
    open: boolean;
    handleClose: () => void;
    handleOk: (description: string, value: number) => void;
    initialDescription?: string;
    initialValue?: number;
}

export const ModalDefault: React.FC<ModalDefaultProps> = ({ open, handleClose, handleOk, initialDescription = "", initialValue = 0 }) => {
    const [description, setDescription] = useState(initialDescription);
    const [value, setValue] = useState<string>(initialValue ? `R$ ${initialValue.toFixed(2)}` : "");
    const [descriptionError, setDescriptionError] = useState(false);
    const [valueError, setValueError] = useState(false);

    useEffect(() => {
        if (open) {
            setDescription(initialDescription);
            setValue(initialValue ? `R$ ${initialValue.toFixed(2)}` : "");
        }
    }, [open, initialDescription, initialValue]);

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
        setDescriptionError(false);
    };

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value.replace(/[^\d]/g, "");
        const formattedValue = (Number(inputValue) / 100).toFixed(2);
        setValue(formattedValue ? `R$ ${formattedValue}` : "");
        setValueError(false);
    };

    const handleOkClick = () => {
        if (!description || description.length < 5) {
            setDescriptionError(true);
        }
        const numericValue = Number(value.replace(/[^\d.-]/g, ""));
        if (!value || numericValue <= 0) {
            setValueError(true);
        }
        if (description && description.length >= 5 && value && numericValue > 0) {
            handleOk(description, numericValue);
            resetFields();
        }
    };

    const resetFields = () => {
        setDescription("");
        setValue("");
        setDescriptionError(false);
        setValueError(false);
    };

    const handleCloseClick = () => {
        handleClose();
        resetFields();
    };

    return (
        <Modal
            open={open}
            onClose={handleCloseClick}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {initialDescription ? "Editar Item" : "Adicionar Novo Item"}
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Descrição"
                    value={description}
                    onChange={handleDescriptionChange}
                    error={descriptionError}
                    helperText={descriptionError ? "Campo obrigatório (mínimo 5 caracteres)" : ""}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Valor"
                    value={value}
                    onChange={handleValueChange}
                    error={valueError}
                    helperText={valueError ? "Campo obrigatório (valor maior que zero)" : ""}
                />
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                    <Button onClick={handleCloseClick} sx={{ mr: 1 }} variant="contained" color="error">
                        Cancelar
                    </Button>
                    <Button onClick={handleOkClick} variant="contained" color="success">
                        OK
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};