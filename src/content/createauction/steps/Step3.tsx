import {
    Box,
    Card,
    CardHeader, FormControl,
    FormControlLabel,
    Grid,
    InputAdornment,
    InputLabel, Select,
    Switch,
    TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useTranslation} from "react-i18next";
import {useState} from "react";


export default function CreateStep3({updateFormField, formData}){
    const { t }: { t: any } = useTranslation();
    const [ criticalModeActive, setCriticalModeActive ] = useState(false);
    const [ battleRoyaleModeActive, setBattleRoyaleModeActive ] = useState(false);

    const battleRoyaleSwitchHandler = (event) => {
        setBattleRoyaleModeActive(event.target.checked);
        updateFormField('step3.battleRoyaleMode', true);
        updateFormField('step3.criticalMode', false);
    };

    const criticalSwitchHandler = (event) => {
        setCriticalModeActive(event.target.checked);
        updateFormField('step3.criticalMode', true);
        updateFormField('step3.battleRoyaleMode', false);
    };

    return (
        <>
            <Grid container spacing={3} sx={{ pt: 1, pl: 3, pr: 3, pb: 3 }}>
                <Grid item xs={12}>
                    <Box>
                        <Grid container>
                            <Grid item xs={12} md={4}>
                                <Box p={2}>
                                    <FormControlLabel name={"isCriticalMode"}
                                                      control={<Switch checked={formData['step3.criticalMode']} color="primary" onChange={criticalSwitchHandler} />}
                                                      label={t('Enable Critical Mode')}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={8} pt={1.5}>
                            Critical Mode begins near the end of an auction at a time set by you.
                            During this time, bids extend the auction duration.
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                {criticalModeActive &&
                    <>
                        <Grid item xs={12}>
                            <Typography variant="h6" component="h6" sx={{fontWeight: 'bold'}}>
                                {t('Choose Action')}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box display="flex" alignItems="center">
                                <Box pl={2} pr={2}>
                                    <FormControlLabel name={"isCriticalMode"}
                                                      control={<Switch color="primary" onChange={criticalSwitchHandler} />}
                                                      label={
                                                          <>
                                                              <Typography variant="h4" color="text.secondary">
                                                                  {t(
                                                                      'Restart The Clock'
                                                                  )}
                                                              </Typography>
                                                              <Typography variant="h6" color="text.secondary">
                                                                  {t(
                                                                      'Resets the critical mode countdown'
                                                                  )}
                                                              </Typography>
                                                          </>
                                                      }
                                    />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box display="flex" alignItems="center">

                                <Box  pl={2} pr={2}>
                                    <FormControlLabel name={"isCriticalMode"}
                                                      control={<Switch color="primary" onChange={criticalSwitchHandler} />}
                                                      label={
                                                          <>
                                                              <Typography variant="h4" color="text.secondary">
                                                                  {t(
                                                                      'Extend The Clock'
                                                                  )}
                                                              </Typography>
                                                              <Typography variant="h6" color="text.secondary">
                                                                  {t(
                                                                      'Critical Mode bids extend end time'
                                                                  )}
                                                              </Typography>
                                                          </>
                                                      }
                                    />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" component="h6" gutterBottom sx={{fontWeight: 'bold'}}>
                                {t('Critical Mode Threshold')}
                            </Typography>
                            <TextField
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">seconds left</InputAdornment>
                                    )
                                }}
                                type={"number"}
                                value={formData['step3.criticalModeThreshold']}
                                onChange={(e) => updateFormField('step3.criticalModeThreshold', e.target.value)}
                                fullWidth
                                name="regular_price"
                                variant="outlined"
                            />
                            <InputLabel>
                                <Typography variant="h5" component="h5" sx={{ pt: 1, fontStyle: 'italic', fontWeight:'normal'}}>
                                    {t('Critical Mode starts when auction has this long left')}
                                </Typography>
                            </InputLabel>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" component="h6" gutterBottom sx={{fontWeight: 'bold'}}>
                                {t('Time Added')}
                            </Typography>
                            <TextField
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">seconds</InputAdornment>
                                    )
                                }}
                                type={"number"}
                                fullWidth
                                name="regular_price"
                                variant="outlined"
                                value={formData['step3.criticalModeTimeAdded']}
                                onChange={(e) => updateFormField('step3.criticalModeTimeAdded', e.target.value)}
                            />
                            <InputLabel>
                                <Typography variant="h5" component="h5" sx={{ pt: 1, fontStyle: 'italic', fontWeight:'normal'}}>
                                    {t('Each bid will extend auction by this amount of time')}
                                </Typography>
                            </InputLabel>
                        </Grid>
                    </>
                }
            </Grid>
            <Grid container spacing={3} sx={{ pt: 1, pl: 3, pr: 3, pb: 3 }}>
                <Grid item xs={12}>
                    <Box>
                        <Grid container>
                            <Grid item xs={12} md={4}>
                                <Box p={2}>
                                    <FormControlLabel name={"isBattleRoyaleMode"}
                                                      control={<Switch checked={formData['step3.battleRoyaleMode']} color="primary" onChange={battleRoyaleSwitchHandler} />}
                                                      label={t('Enable Battle Royale')}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={8} pt={1.5}>
                                Battle Royale locks new bidders out of the auction at a given time remaining.
                                You can also eliminate lowest remaining bidders gradually to create an awesome battle!
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                {formData['step3.battleRoyaleMode'] &&
                    <>
                        <Grid item xs={12}>
                            <Typography variant="h6" component="h6" sx={{fontWeight: 'bold'}}>
                                {t('Choose Action')}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box display="flex" alignItems="center">
                                <Box pl={2} pr={2}>
                                    <FormControlLabel name={"isCriticalMode"}
                                                      control={<Switch color="primary" onChange={criticalSwitchHandler} />}
                                                      label={
                                                          <>
                                                              <Typography variant="h4" color="text.secondary">
                                                                  {t(
                                                                      'Restart The Clock'
                                                                  )}
                                                              </Typography>
                                                              <Typography variant="h6" color="text.secondary">
                                                                  {t(
                                                                      'Resets the critical mode countdown'
                                                                  )}
                                                              </Typography>
                                                          </>
                                                      }
                                    />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box display="flex" alignItems="center">

                                <Box  pl={2} pr={2}>
                                    <FormControlLabel name={"isCriticalMode"}
                                                      control={<Switch color="primary" onChange={criticalSwitchHandler} />}
                                                      label={
                                                          <>
                                                              <Typography variant="h4" color="text.secondary">
                                                                  {t(
                                                                      'Extend The Clock'
                                                                  )}
                                                              </Typography>
                                                              <Typography variant="h6" color="text.secondary">
                                                                  {t(
                                                                      'Critical Mode bids extend end time'
                                                                  )}
                                                              </Typography>
                                                          </>
                                                      }
                                    />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" component="h6" gutterBottom sx={{fontWeight: 'bold'}}>
                                {t('Battle Royale Start Threshold')}
                            </Typography>
                            <TextField
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">seconds left</InputAdornment>
                                    )
                                }}
                                type={"number"}
                                fullWidth
                                name="regular_price"
                                variant="outlined"
                                value={300}
                            />
                            <InputLabel>
                                <Typography variant="h5" component="h5" sx={{ pt: 1, fontStyle: 'italic', fontWeight:'normal'}}>
                                    {t('Critical Mode starts when auction has this long left')}
                                </Typography>
                            </InputLabel>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" component="h6" gutterBottom sx={{fontWeight: 'bold'}}>
                                {t('Bidders eliminated per cycle')}
                            </Typography>
                            <TextField
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">seconds</InputAdornment>
                                    )
                                }}
                                type={"number"}
                                fullWidth
                                name="regular_price"
                                variant="outlined"
                                value={30}
                            />
                            <InputLabel>
                                <Typography variant="h5" component="h5" sx={{ pt: 1, fontStyle: 'italic', fontWeight:'normal'}}>
                                    {t('Each bid will extend auction by this amount of time')}
                                </Typography>
                            </InputLabel>
                        </Grid>
                    </>
                }
            </Grid>
    </>
    );
}