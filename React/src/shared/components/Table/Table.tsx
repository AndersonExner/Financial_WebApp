import React, { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import IconButton from "@mui/material/IconButton";
import TablePagination from "@mui/material/TablePagination";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export interface ITableValuesItem {
    id: number;
    description: string;
    value: number;
    date: string;
}

interface TableValuesProps {
    headers: string[];
    data: ITableValuesItem[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export const TableValues: React.FC<TableValuesProps> = ({ headers, data, onEdit, onDelete }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
            <TableContainer component={Paper} sx={{ flex: 1, overflowY: 'auto' }}>
                <Table stickyHeader>
                    <TableHead sx={{ textAlign: 'center' }}>
                        <TableRow>
                            {headers.map((header, index) => (
                                <TableCell
                                    key={index}
                                    sx={{
                                        fontWeight: 'bold',
                                        backgroundColor: 'primary.main',
                                        padding: '8px',
                                        textAlign: 'center'
                                    }}
                                >
                                    {header}
                                </TableCell>
                            ))}
                            <TableCell
                                sx={{
                                    fontWeight: 'bold',
                                    backgroundColor: 'primary.main',
                                    textAlign: 'right'
                                }}
                            >
                                Ações
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                        },
                                    }}
                                >
                                    <TableCell sx={{ padding: '5px', textAlign: 'center' }}>{item.description}</TableCell>
                                    <TableCell sx={{ padding: '5px', textAlign: 'center' }}>{formatCurrency(item.value)}</TableCell>
                                    <TableCell sx={{ padding: '5px', textAlign: 'center' }}>{item.date}</TableCell>
                                    <TableCell sx={{ padding: '5px', textAlign: 'right' }}>
                                        <IconButton onClick={() => onEdit(item.id)} color="primary">
                                            <EditIcon color="action" />
                                        </IconButton>
                                        <IconButton onClick={() => onDelete(item.id)} color="secondary">
                                            <DeleteIcon color="error" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={headers.length + 1}>
                                    <Typography align="center">No results found</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
};