import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { TableValues, ITableValuesItem } from "../../shared/components/Table/Table";
import { ModalDefault } from "../../shared/components/Modal/ModalDefault";

const initialData: ITableValuesItem[] = [
    { id: 1, description: "Item 1", value: 100, date: "2023-01-01" },
    { id: 2, description: "Item 2", value: 200, date: "2023-01-02" },
    { id: 3, description: "Item 3", value: 300, date: "2023-01-03" },
    { id: 4, description: "Item 4", value: 400, date: "2023-01-04" },
    { id: 5, description: "Item 5", value: 500, date: "2023-01-05" },
    { id: 6, description: "Item 6", value: 600, date: "2023-01-06" },
    { id: 7, description: "Item 7", value: 700, date: "2023-01-07" },
    { id: 8, description: "Item 8", value: 800, date: "2023-01-08" },
    { id: 9, description: "Item 9", value: 900, date: "2023-01-09" },
    { id: 10, description: "Item 10", value: 1000, date: "2023-01-10" },
];

export const Payments: React.FC = () => {
    const [data, setData] = useState<ITableValuesItem[]>([]);
    const [description, setDescription] = useState<string>("");
    const [value, setValue] = useState<number>(0);
    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);

    useEffect(() => {
        setData(initialData);
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        resetModalFields();
    };

    const handleOk = (description: string, value: number) => {
        if (editId !== null) {
            setData(data.map(item => item.id === editId ? { ...item, description, value } : item));
        } else {
            const newItem: ITableValuesItem = {
                id: data.length + 1,
                description,
                value,
                date: new Date().toISOString().split("T")[0],
            };
            setData([newItem, ...data]);
        }
        handleClose();
    };

    const resetModalFields = () => {
        setDescription("");
        setValue(0);
        setEditId(null);
    };

    const handleEdit = (id: number) => {
        const item = data.find(item => item.id === id);
        if (item) {
            setDescription(item.description);
            setValue(item.value);
            setEditId(id);
            handleOpen();
        }
    };

    const handleDelete = (id: number) => {
        setData(data.filter(item => item.id !== id));
    };

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h4">
                    Gerenciamento de Receitas
                </Typography>
                <Button variant="contained" color="success" size="large" onClick={handleOpen}>
                    Adicionar Receita
                </Button>
            </Box>
            <TableValues headers={["Descrição", "Valor", "Data"]} data={data} onEdit={handleEdit} onDelete={handleDelete} />
            <ModalDefault
                open={open}
                handleClose={handleClose}
                handleOk={handleOk}
                initialDescription={description}
                initialValue={value}
            />
        </Box>
    );
};