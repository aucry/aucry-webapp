import { useState, ChangeEvent } from 'react';

import {
  TextField,
  Grid,
  CardHeader,
  Tab,
  Box,
  Tabs,
  Typography,
  Divider,
  FormControl,
  Checkbox,
  Tooltip,
  InputAdornment,
  FormControlLabel,
  IconButton,
  InputLabel,
  Select,
  Card,
  styled, Switch
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import HelpOutlineTwoToneIcon from '@mui/icons-material/HelpOutlineTwoTone';

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.black[5]};
    padding: ${theme.spacing(2)};
  `
);

const AdditionalInfo = () => {
  const { t }: { t: any } = useTranslation();
  const [ criticalModeActive, setCriticalModeActive ] = useState(false);

  const criticalSwitchHandler = (event) => {
    setCriticalModeActive(event.target.checked);
  };

  return (
      <>

          <Card sx={{mt:4}}>
            <CardHeader title={t('Battle Royale')} sx={{
              pl: 2,
              pr: 2,
              background: 'rgb(0,1,27,50%)'
            }}></CardHeader>
            <Grid container spacing={3} sx={{ pt: 3, pl: 3, pr: 3, pb: 3 }}>
                  <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                      <TextField
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">Kg</InputAdornment>
                          )
                        }}
                        fullWidth
                        name="weight"
                        value={12}
                        variant="outlined"
                        label={t('Weight')}
                        placeholder={t('Write weight ...')}
                      />
                      <Tooltip
                        arrow
                        placement="top"
                        title={t(
                          'Your have the weight units set to kilograms in your app settings'
                        )}
                      >
                        <IconButton
                          size="small"
                          sx={{
                            ml: 1
                          }}
                          color="primary"
                        >
                          <HelpOutlineTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">CM</InputAdornment>
                        )
                      }}
                      fullWidth
                      name="length"
                      variant="outlined"
                      label={t('Length')}
                      placeholder={t('Write length ...')}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">CM</InputAdornment>
                        )
                      }}
                      fullWidth
                      name="width"
                      variant="outlined"
                      label={t('Width')}
                      placeholder={t('Write width ...')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="shipping_class">
                        {t('Shipping class')}
                      </InputLabel>
                      <Select
                        native
                        label={t('Shipping class')}
                        inputProps={{
                          name: 'shipping_class'
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value={1}>{t('No shipping class')}</option>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Card>
      </>
  );
}

export default AdditionalInfo;
