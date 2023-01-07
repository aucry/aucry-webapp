import { ChangeEvent, useState } from 'react';

import {
  ListItemText,
  Avatar,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  Switch,
  Chip,
  Divider,
  Grid,
  ListItem,
  List,
  CardHeader,
  Alert,
  Card,
  styled,
  useTheme
} from '@mui/material';
import { useDropzone } from 'react-dropzone';

import { useTranslation } from 'react-i18next';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import createauction from "./index";

const DotLegend = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
`
);

const BoxUploadWrapper = styled(Box)(
  ({ theme }) => `
    border-radius: ${theme.general.borderRadius};
    padding: ${theme.spacing(2)};
    background: ${theme.colors.alpha.black[5]};
    border: 1px dashed ${theme.colors.alpha.black[30]};
    outline: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: ${theme.transitions.create(['border', 'background'])};

    &:hover {
      background: ${theme.colors.alpha.white[50]};
      border-color: ${theme.colors.primary.main};
    }
`
);

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    background: transparent;
    color: ${theme.colors.primary.main};
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.success.light};
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);

const AvatarDanger = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.error.light};
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);

interface ProductTags {
  key: number;
  label: string;
}

function Sidebar({setFormData, formData, launchFunction}) {
  const [city, setCity] = useState('');
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();
  const {
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: 'image/jpeg, image/png'
  });

  const files = acceptedFiles.map((file, index) => (
    <ListItem disableGutters component="div" key={index}>
      <ListItemText primary={file.name} />
      <b>{file.size} bytes</b>
      <Divider />
    </ListItem>
  ));

  const [checked, setChecked] = useState([true, false]);

  const handleChange1 = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked]);
  };

  const [productTags, setProductTags] = useState<ProductTags[]>([
    { key: 0, label: 'new' },
    { key: 1, label: 'fresh' },
    { key: 2, label: 'electronics' },
    { key: 3, label: 'computer' },
    { key: 4, label: 'software' }
  ]);

  const handleDelete = (productTagToDelete: ProductTags) => () => {
    setProductTags((productTags) =>
      productTags.filter(
        (productTag) => productTag.key !== productTagToDelete.key
      )
    );
  };

  const children = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        ml: 3
      }}
    >
      <FormControlLabel
        label="Appliances"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Outdoor equipment"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
    </Box>
  );

  return (
    <Box>
      <Card
        sx={{
          ml: 3
        }}
      >
        <CardHeader
          title={t('Review & Publish')}
        />
        <Divider />
        <Box p={2}>
          <Typography variant={"h3"}>
            {formData && formData['name']}
          </Typography>
          <Typography variant={"subtitle1"}>
            {formData['currency'] !== undefined && formData['currency']['logoURI'] !== undefined ?
              <img style={{ height: '25px', borderRadius:'25px' }} src={formData['currency']['logoURI']} />
              : ""}
            {formData['currency'] !== undefined ?
                formData['currency']['name']
                : ""}
          </Typography>
          <FormControlLabel
            control={<Switch color="primary" />}
            label={t('Scheduled Start')}
          />
        </Box>
        <Divider />
        <List
          dense
          sx={{
            p: 2
          }}
        >

          {formData['initialValue'] > 0 ?
          <ListItem disableGutters>
            <ListItemText
              sx={{
                width: 110,
                flex: 'initial'
              }}
              primary={t('Initial Value')}
            />
            <b>{formData['initialValue']} {formData['currency'] ? formData['currency']['symbol'] : ""}</b>
          </ListItem>
              : "" }
          {formData['startPrice'] > 0 ?
              <ListItem disableGutters>
            <ListItemText
              sx={{
                width: 110,
                flex: 'initial'
              }}
              primary={t('Start Price')}
            />
            <b>{formData['startPrice']} {formData['currency'] ? formData['currency']['symbol'] : ""}</b>
          </ListItem>
              : "" }
          {formData['bidStep'] > 0 ?
              <ListItem disableGutters>
                <ListItemText
                    sx={{
                      width: 110,
                      flex: 'initial'
                    }}
                    primary={t('Bid Step')}
                />
                <b>{formData['bidStep']} {formData['currency'] ? formData['currency']['symbol'] : ""}</b>
              </ListItem>
          : ""}
          {formData['creatorFee'] > 0 ?
          <ListItem disableGutters>
            <ListItemText
                sx={{
                  width: 110,
                  flex: 'initial'
                }}
                primary={t('Creator Fee')}
            />
            <b>{formData['creatorFee']} %</b>
          </ListItem>
              : "" }
          {formData['reservePrice'] > 0 ?
          <ListItem disableGutters>
            <ListItemText
                sx={{
                  width: 110,
                  flex: 'initial'
                }}
                primary={t('Reserve Price')}
            />
            <b>{formData['reservePrice']} {formData['currency'] ? formData['currency']['symbol'] : ""}</b>
          </ListItem>
              : "" }
        </List>
        <Divider />
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" onClick={() => { launchFunction(); }}>
                {t('Launch Auction')}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Box>
  );
}

export default Sidebar;
