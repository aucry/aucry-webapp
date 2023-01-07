import {
  TextField,
  Autocomplete,
  Box,
  Card,
  Grid,
  styled, InputLabel, Typography, CardHeader
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Label} from "@mui/icons-material";

const EditorWrapper = styled(Box)(
  ({ theme }) => `

    .ql-editor {
      min-height: 100px;
    }

    .ql-snow .ql-picker {
      color: ${theme.colors.alpha.black[100]};
    }

    .ql-snow .ql-stroke {
      stroke: ${theme.colors.alpha.black[100]};
    }

    .ql-toolbar.ql-snow {
      border-top-left-radius: ${theme.general.borderRadius};
      border-top-right-radius: ${theme.general.borderRadius};
    }

    .ql-toolbar.ql-snow,
    .ql-container.ql-snow {
      border-color: ${theme.colors.alpha.black[30]};
    }

    .ql-container.ql-snow {
      border-bottom-left-radius: ${theme.general.borderRadius};
      border-bottom-right-radius: ${theme.general.borderRadius};
    }

    &:hover {
      .ql-toolbar.ql-snow,
      .ql-container.ql-snow {
        border-color: ${theme.colors.alpha.black[50]};
      }
    }
`
);

const productTags = [
  { title: 'new' },
  { title: 'fresh' },
  { title: '2021' },
  { title: 'electronics' }
];

function GeneralSection() {
  const { t }: { t: any } = useTranslation();

  return (
    <Card>
      <CardHeader title={t('Basic Settings')} sx={{
        background: 'rgb(0,1,27,50%)'
      }}></CardHeader>
      <Grid container spacing={3} sx={{p: 3}}>
        <Grid item xs={12}>
          <InputLabel>
            <Typography variant="h6" component="h6" gutterBottom sx={{fontWeight: 'bold'}}>
              {t('Auction Name')}
            </Typography>
          </InputLabel>
          <TextField
            fullWidth
            name="title"
            placeholder={t('e.g. Elon Moon 🚀')}
            variant="outlined"
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
              {t('Auction Currency Contract Address')}
            </Typography>
          </InputLabel>
          <TextField
              fullWidth
              name="title"
              placeholder={t('e.g. 0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')}
              variant="outlined"
          />
          <InputLabel>
            <Typography variant="h5" component="h5" sx={{ pt: 1, fontStyle: 'italic', fontWeight:'normal'}}>
              {t('Enter the address of the currency this auction and its bids will be in, or choose from the list')}
            </Typography>
          </InputLabel>

        </Grid>

        <Grid item xs={12}>
          <InputLabel>
            <Typography variant="h6" component="h6" gutterBottom sx={{fontWeight: 'bold'}}>
              {t('Initial Auction Value')}
            </Typography>
          </InputLabel>
          <TextField
              fullWidth
              type={"number"}
              name="title"
              placeholder={t('e.g. 0.1337')}
              variant="outlined"
          />
          <InputLabel>
            <Typography variant="h5" component="h5" sx={{ pt: 1, fontStyle: 'italic', fontWeight:'normal'}}>
              {t('This is the amount you wish to auction. This will be payable when creating the auction.')}
            </Typography>
          </InputLabel>

        </Grid>
      </Grid>
    </Card>
  );
}

export default GeneralSection;
