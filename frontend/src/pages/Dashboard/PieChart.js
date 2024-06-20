import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { format } from 'date-fns';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import brLocale from 'date-fns/locale/pt-BR';
import api from '../../services/api';
import { toast } from 'react-toastify';

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            display: true,
        },
        title: {
            display: true,
            text: 'Gráfico de Pizza',
            position: 'left',
        },
    },
};

const PieChart = () => {
    const [initialDate, setInitialDate] = useState(new Date());
    const [finalDate, setFinalDate] = useState(new Date());
    const [ticketsData, setTicketsData] = useState({ data: [] });
    const companyId = localStorage.getItem('companyId');
    let cancelRequest = false; // Variável para controle de requisição

    useEffect(() => {
        handleGetTicketsInformation(); // Chamada inicial ao montar o componente

        return () => {
            // Cleanup function para cancelar a requisição
            cancelRequest = true;
        };
    }, []);

    const dataCharts = {
        labels:
            ticketsData &&
            ticketsData.data.length > 0 &&
            ticketsData.data.map((item) => item.nome),
        datasets: [
            {
                data:
                    ticketsData.data.length > 0 &&
                    ticketsData.data.map((item) => item.quantidade),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF8C00',
                ],
            },
        ],
    };

    const handleGetTicketsInformation = async () => {
        try {
            const { data } = await api.get(
                `/dashboard/ticketsUsers?initialDate=${format(
                    initialDate,
                    'yyyy-MM-dd'
                )}&finalDate=${format(
                    finalDate,
                    'yyyy-MM-dd'
                )}&companyId=${companyId}`
            );

            // Verifica se o componente foi desmontado antes de atualizar o estado
            if (!cancelRequest) {
                setTicketsData(data);
            }
        } catch (error) {
            toast.error('Erro ao obter informações da conversa');
        }
    };

    return (
        <>
            <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
            >
                Total de Conversas por Usuários
            </Typography>

            <Stack
                direction={'row'}
                spacing={2}
                alignItems={'center'}
                sx={{ my: 2 }}
            >
                <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    locale={brLocale}
                >
                    <DatePicker
                        value={initialDate}
                        onChange={(newValue) => {
                            setInitialDate(newValue);
                        }}
                        label="Início"
                        renderInput={(params) => (
                            <TextField
                                fullWidth
                                {...params}
                                sx={{ width: '20ch' }}
                            />
                        )}
                    />
                </LocalizationProvider>

                <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    locale={brLocale}
                >
                    <DatePicker
                        value={finalDate}
                        onChange={(newValue) => {
                            setFinalDate(newValue);
                        }}
                        label="Fim"
                        renderInput={(params) => (
                            <TextField
                                fullWidth
                                {...params}
                                sx={{ width: '20ch' }}
                            />
                        )}
                    />
                </LocalizationProvider>

                <Button
                    className="buttonHover"
                    onClick={handleGetTicketsInformation}
                    variant="contained"
                >
                    Filtrar
                </Button>
            </Stack>

            <Pie options={options} data={dataCharts} />
        </>
    );
};

export default PieChart;
