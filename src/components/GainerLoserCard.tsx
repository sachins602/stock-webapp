import { Card, CardContent, CardHeader, CircularProgress, Stack, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface GainerLoserInterface {
    Id: number;
    Symbol: string;
    CompanyName: string;
    Ltp: string;
    Change: string;
    PercentChange: string;
}

function GainerLoserCard() {

    const [topGainers, setTopGainers] = useState<GainerLoserInterface[]>([]);
    const [topLosers, setTopLosers] = useState<GainerLoserInterface[]>([]);
    const [isGainerLoading, setIsGainerLoading] = useState(true);
    const [isLoserLoading, setIsLoserLoading] = useState(true);

    const getGainer = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/smallgainer");
            setTopGainers(response.data);
            setIsGainerLoading(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    const getLoser = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/smallloser");
            setTopLosers(response.data);
            setIsLoserLoading(false);
        }
        catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getGainer();
        getLoser();
    }, []);


    console.log(topGainers.find.name);


    return (
        <Stack direction="row" spacing={8}>
            <Card variant='outlined'>
                {!isGainerLoading ?
                    <>
                        <CardHeader
                            title={'Gainers'}
                            titleTypographyProps={{ align: 'center' }}
                            subheaderTypographyProps={{
                                align: 'center',
                            }}
                            sx={{ backgroundColor: '#78909c' }}
                        />

                        <CardContent sx={{ backgroundColor: '#091929' }}>
                            {topGainers.map(gainer => (
                                <Stack direction="row" spacing={2}>
                                    <Typography variant="h5" component="div" color="green">
                                        {gainer.Symbol}
                                    </Typography>
                                    <Typography variant="h5" component="div" color="green">
                                        {gainer.PercentChange}
                                    </Typography>
                                </Stack>
                            ))}
                        </CardContent>

                    </>
                    : <CircularProgress />}
            </Card>

            <Card variant='outlined'>
                <CardHeader
                    title={'Losers'}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{
                        align: 'center',
                    }}
                    sx={{ backgroundColor: '#78909c' }}
                />
                {!isLoserLoading ?
                    <CardContent sx={{ backgroundColor: '#091929' }}>
                        {topLosers.map(loser => (
                            <Stack direction="row" spacing={2}>
                                <Typography variant="h5" component="div" color="red">
                                    {loser.Symbol}
                                </Typography>
                                <Typography variant="h5" component="div" color="red">
                                    {loser.PercentChange}
                                </Typography>
                            </Stack>
                        ))}
                    </CardContent>
                    : <CircularProgress />}
            </Card>
        </Stack>

    )
}

export default GainerLoserCard