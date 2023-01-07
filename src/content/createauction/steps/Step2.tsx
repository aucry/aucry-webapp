import {Box, Card, CardHeader, Grid, InputAdornment, InputLabel, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useTranslation} from "react-i18next";


export default function CreateStep2({updateFormField, formData}){
    const { t }: { t: any } = useTranslation();

    return (
            <Box p={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <InputLabel>
                            <Typography variant="h6" component="h6" gutterBottom sx={{fontWeight: 'bold'}}>
                                {t('Initial Auction Value')}
                            </Typography>
                        </InputLabel>
                        <TextField
                            fullWidth
                            value={formData['initialValue']}
                            onChange={(e) => updateFormField('initialValue', e.target.value)}
                            type={"number"}
                            name="title"
                            placeholder={t('e.g. 0.1337')}
                            inputProps={{ min: "0", max: "100000000000000", step: "0.000000000000001" }}
                            variant="outlined"
                        />
                        <InputLabel>
                            <Typography variant="h5" component="h5" sx={{ pt: 1, fontStyle: 'italic', fontWeight:'normal'}}>
                                {t('This is the amount you wish to auction. This will be payable when creating the auction.')}
                            </Typography>
                        </InputLabel>

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" component="h6" gutterBottom sx={{fontWeight: 'bold'}}>
                            {t('Start Price')}
                        </Typography>
                        <TextField
                            fullWidth
                            value={formData['startingBid']}
                            onChange={(e) => updateFormField('startingBid', e.target.value)}
                            name="regular_price"
                            variant="outlined"
                            type={"number"}
                            label={t('e.g. 0.135585')}
                        />
                        <InputLabel>
                            <Typography variant="h5" component="h5" sx={{ pt: 1, fontStyle: 'italic', fontWeight:'normal'}}>
                                {t('The first bid will be this amount')}
                            </Typography>
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" component="h6" gutterBottom>
                            {t('Bid Step')}
                        </Typography>
                        <TextField
                            fullWidth
                            value={formData['minimumStep']}
                            onChange={(e) => updateFormField('minimumStep', e.target.value)}
                            name="sale_price"
                            variant="outlined"
                            label={t('e.g. 0.728448')}
                        />
                        <InputLabel>
                            <Typography variant="h5" component="h5" sx={{ pt: 1, fontStyle: 'italic', fontWeight:'normal'}}>
                                {t('Bids will increment by this amount')}
                            </Typography>
                        </InputLabel>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" component="h6" gutterBottom>
                            {t('Creator Fee')}
                        </Typography>
                        <TextField
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">%</InputAdornment>
                                )
                            }}
                            fullWidth
                            value={formData.creatorFeePercentage}
                            onChange={(e) => updateFormField('creatorFeePercentage', e.target.value)}
                            name="sale_price"
                            variant="outlined"
                            label={t('e.g. 0.728448')}
                        />
                        <InputLabel>
                            <Typography variant="h5" component="h5" sx={{ pt: 1, fontStyle: 'italic', fontWeight:'normal'}}>
                                {t('You will receive this amount of each bid after dev fees')}
                            </Typography>
                        </InputLabel>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" component="h6" gutterBottom>
                            {t('Reserve Price')}
                        </Typography>
                        <TextField
                            fullWidth
                            value={formData['reserve']}
                            onChange={(e) => updateFormField('reserve', e.target.value)}
                            name="sale_price"
                            variant="outlined"
                        />
                        <InputLabel>
                            <Typography variant="h5" component="h5" sx={{ pt: 1, fontStyle: 'italic', fontWeight:'normal'}}>
                                {t('The auction cannot be won until bid reaches this level')}
                            </Typography>
                        </InputLabel>
                    </Grid>
                </Grid>
            </Box>
    );
}