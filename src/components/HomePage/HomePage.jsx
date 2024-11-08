import React, { useState } from 'react';
import GeneralGraph from './GeneralGraph';

import {
    Box,
    Typography,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../colors'; // Importa el tema desde tu archivo configurado

const HomePage = () => {
    
    return (
        <>
            <GeneralGraph />
        </>
    );
};

export default HomePage;