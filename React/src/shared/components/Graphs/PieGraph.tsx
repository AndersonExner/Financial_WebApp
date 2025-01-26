import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";

interface IPieGraphProps {
    titulo: string;
    data: { label: string; value: number }[];
    height: number;
    width: string | number;
    valueFormatter: (item: { value: number }) => string;
}

export const PieGraph: React.FC<IPieGraphProps> = ({ titulo, data, height = 200, width, valueFormatter }) => {
    return (
        <Paper sx={{ p: 2, width: width  }} elevation={3}>
            <Typography variant='h6' gutterBottom sx={{ color: 'text.secondary' }}>{titulo}</Typography>
            <PieChart
                series={[
                    {
                        data: data,
                        highlightScope: { fade: 'global', highlight: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        innerRadius: 50,
                        outerRadius: 120,
                        valueFormatter: valueFormatter
                    },
                ]}
                height={height}
            />
        </Paper>
    );
};