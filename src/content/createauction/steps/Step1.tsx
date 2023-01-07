import {
    Autocomplete,
    createFilterOptions,
    Card,
    CardHeader,
    Dialog,
    Grid,
    InputLabel,
    TextField,
    DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box
} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import useCmcTokens, {CMCTokenData} from "../../../hooks/useCmcTokens";

const filter = createFilterOptions<CMCTokenData>();

export default function CreateStep1({updateFormField, formData}){
    const { t }: { t: any } = useTranslation();
    const [value, setValue] = useState<CMCTokenData | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [open, toggleOpen] = useState(false);
    const tokenList = useCmcTokens();

    const handleClose = () => {
        setDialogValue({
            title: '',
            year: '',
        });
        toggleOpen(false);
    };

    const [dialogValue, setDialogValue] = React.useState({
        title: '',
        year: '',
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setValue({
            name: dialogValue.title,
            address: dialogValue.year,
            symbol: '',
            decimals: 0
        });
        handleClose();
    };

    return (
        <Grid container spacing={3} sx={{p: 3}}>
            <Grid item xs={12}>
                <InputLabel>
                    <Typography variant="h6" component="h6" gutterBottom sx={{fontWeight: 'bold'}}>
                        {t('Auction Name')}
                    </Typography>
                </InputLabel>
                <TextField
                    fullWidth
                    value={formData.auctionName}
                    name="title"
                    placeholder={t('e.g. Elon Moon 🚀')}
                    variant="outlined"
                    onChange={(e) => updateFormField("auctionName", e.target.value)}
                />
                <InputLabel>
                    <Typography variant="h5" component="h5" sx={{ pt: 1, fontStyle: 'italic', fontWeight:'normal'}}>
                        {t('Give the auction an attention grabbing name - max 100 characters')}
                    </Typography>
                </InputLabel>

            </Grid>
            <Grid item xs={12}>
                <InputLabel>
                    <Typography variant="h6" component="h6" gutterBottom sx={{fontWeight: 'bold'}}>
                        {t('Auction Currency')}
                    </Typography>
                </InputLabel>
                <Autocomplete
                    value={formData.currency}
                    onChange={(event, newValue) => {
                        if (typeof newValue === 'string') {
                            // timeout to avoid instant validation of the dialog's form.
                            setTimeout(() => {
                                toggleOpen(true);
                                setDialogValue({
                                    title: newValue,
                                    year: '',
                                });
                            });
                        } else if (newValue && newValue.symbol === 'XXXXXXXXXXXXXXXXXXXX') {
                            toggleOpen(true);
                            setDialogValue({
                                title: newValue.address,
                                year: '',
                            });
                        } else {
                            setValue(newValue);
                            updateFormField("currency", newValue)

                        }
                    }}
                    filterOptions={(options, params) => {
                        if(params.inputValue.length > 1) {
                            const filtered = filter(options, params);
                            if (params.inputValue !== '' && params.inputValue.startsWith('0x') && params.inputValue.length === 42) {
                                filtered.push({
                                    address: params.inputValue,
                                    symbol: 'XXXXXXXXXXXXXXXXXXXX',
                                    decimals: 0,
                                    logoURI: '',
                                    name: `Use custom token address "${params.inputValue}"`,
                                });
                            }
                            return filtered;
                        } else {
                            const filtered = []
                            filtered.push({
                                address: params.inputValue,
                                symbol: '',
                                decimals: 0,
                                logoURI: '',
                                name: `Please enter at least two characters`,
                            });
                            return filtered;
                        }
                    }}
                    options={tokenList}
                    getOptionLabel={(option) => {
                        // e.g value selected with enter, right from the input
                        if (typeof option === 'string') {
                            return option;
                        }
                        if (option.name) {
                            return option.name;
                        }
                        return option.name;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    ListboxProps={{ style: { maxHeight: "15rem" }}}
                    renderOption={(props, option) => (
                        <li {...props}>
                            <Grid container>
                                <Grid item xs={1} >
                                    <img style={{ height: '25px', borderRadius:'25px' }} src={option.logoURI} />
                                </Grid>
                                <Grid item xs={9}>
                                    {option.name}
                                </Grid>
                                <Grid item xs={2}>
                                    {option.symbol !== 'XXXXXXXXXXXXXXXXXXXX' ? option.symbol : ''}
                                </Grid>
                            </Grid>
                        </li>)}
                    freeSolo
                    renderInput={(params) => <TextField {...params}
                                                        onChange={event => { setInputValue(event.target.value)}}  />}
                />
                <Dialog open={open} onClose={handleClose}>
                    <form onSubmit={handleSubmit}>
                        <DialogTitle>Confirmation</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please take care when using a custom contract address.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                value={dialogValue.title}
                                onChange={(event) =>
                                    setDialogValue({
                                        ...dialogValue,
                                        title: event.target.value,
                                    })
                                }
                                label="title"
                                type="hidden"
                                variant="standard"
                            />
                            <TextField
                                margin="dense"
                                id="name"
                                value={dialogValue.year}
                                onChange={(event) =>
                                    setDialogValue({
                                        ...dialogValue,
                                        year: event.target.value,
                                    })
                                }
                                label="year"
                                type="hidden"
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Add</Button>
                        </DialogActions>
                    </form>
                </Dialog>
                <InputLabel>
                    <Typography variant="h5" component="h5" sx={{ pt: 1, fontStyle: 'italic', fontWeight:'normal'}}>
                        {t('Enter the name (or BEP20 address) of the currency this auction and its bids will be in')}
                    </Typography>
                </InputLabel>

            </Grid>
        </Grid>
    );
}