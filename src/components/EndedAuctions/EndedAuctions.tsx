import {
    FC,
    ChangeEvent,
    MouseEvent,
    useState,
    ReactElement,
    Ref,
    forwardRef
} from 'react';
import PropTypes from 'prop-types';
import {
    Avatar,
    Autocomplete,
    Box,
    Card,
    Checkbox,
    Grid,
    Slide,
    Divider,
    Tooltip,
    IconButton,
    InputAdornment,
    MenuItem,
    Link,
    AvatarGroup,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableContainer,
    TableRow,
    ToggleButton,
    ToggleButtonGroup,
    LinearProgress,
    TextField,
    Button,
    Typography,
    Dialog,
    FormControl,
    Select,
    InputLabel,
    Zoom,
    CardMedia,
    lighten,
    styled
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import type { Project, ProjectStatus } from 'src/models/project';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import LaunchTwoToneIcon from '@mui/icons-material/LaunchTwoTone';
import Label from 'src/components/Label';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone';
import TableRowsTwoToneIcon from '@mui/icons-material/TableRowsTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useSnackbar } from 'notistack';
import { formatDistance, format } from 'date-fns';
import Text from 'src/components/Text';
import {EndedAuction} from "../../models/ended_auction";
import {utils} from "ethers";

const DialogWrapper = styled(Dialog)(
    () => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
);

const AvatarError = styled(Avatar)(
    ({ theme }) => `
      background-color: ${theme.colors.error.lighter};
      color: ${theme.colors.error.main};
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
);

const CardWrapper = styled(Card)(
    ({ theme }) => `

  position: relative;
  overflow: visible;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: inherit;
    z-index: 1;
    transition: ${theme.transitions.create(['box-shadow'])};
  }
      
    &.Mui-selected::after {
      box-shadow: 0 0 0 3px ${theme.colors.primary.main};
    }
  `
);

const ButtonError = styled(Button)(
    ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

const IconButtonError = styled(IconButton)(
    ({ theme }) => `
     background: ${theme.colors.error.lighter};
     color: ${theme.colors.error.main};
     padding: ${theme.spacing(0.75)};

     &:hover {
      background: ${lighten(theme.colors.error.lighter, 0.4)};
     }
`
);

interface EndedAuctionsProps {
    endedAuctions: EndedAuction[];
}

interface Filters {
    status?: ProjectStatus;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & { children: ReactElement<any, any> },
    ref: Ref<unknown>
) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const getProjectStatusLabel = (projectStatus: ProjectStatus): JSX.Element => {
    const map = {
        not_started: {
            text: 'Not started',
            color: 'error'
        },
        in_progress: {
            text: 'In progress',
            color: 'info'
        },
        completed: {
            text: 'Completed',
            color: 'success'
        }
    };

    const { text, color }: any = map[projectStatus];

    return <Label color={color}>{text}</Label>;
};

const applyFilters = (
    endedAuctions: EndedAuction[],
    query: string,
    filters: Filters
): EndedAuction[] => {
    return endedAuctions.filter((endedAuction) => {
        let matches = true;

        if (query) {
            const properties = ['name'];
            let containsQuery = false;

            properties.forEach((property) => {
                if (endedAuction[property].toLowerCase().includes(query.toLowerCase())) {
                    containsQuery = true;
                }
            });

            if (!containsQuery) {
                matches = false;
            }
        }

        Object.keys(filters).forEach((key) => {
            const value = filters[key];

            if (value && endedAuction[key] !== value) {
                matches = false;
            }
        });

        return matches;
    });
};

const applyPagination = (
    endedAuctions: EndedAuction[],
    page: number,
    limit: number
): EndedAuction[] => {
    return endedAuctions.slice(page * limit, page * limit + limit);
};

const EndedAuctions: FC<EndedAuctionsProps> = ({ endedAuctions }) => {
    const [selectedItems, setSelectedProjects] = useState<string[]>([]);
    const { t }: { t: any } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);
    const [query, setQuery] = useState<string>('');
    const [filters, setFilters] = useState<Filters>({
        status: null
    });

    const projectTags = [
        { title: 'Development' },
        { title: 'Design Project' },
        { title: 'Marketing Research' },
        { title: 'Software' }
    ];

    const statusOptions = [
        {
            id: 'all',
            name: 'All'
        },
        {
            id: 'not_started',
            name: t('Not started')
        },
        {
            id: 'completed',
            name: t('Completed')
        },
        {
            id: 'in_progress',
            name: t('In Progress')
        }
    ];

    const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
        event.persist();
        setQuery(event.target.value);
    };

    const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
        let value = null;

        if (e.target.value !== 'all') {
            value = e.target.value;
        }

        setFilters((prevFilters) => ({
            ...prevFilters,
            status: value
        }));
    };

    const handlePageChange = (_event: any, newPage: number): void => {
        setPage(newPage);
    };

    const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLimit(parseInt(event.target.value));
    };

    const filteredEndedAuctions = applyFilters(endedAuctions, query, filters);
    const paginatedEndedAuctions = applyPagination(filteredEndedAuctions, page, limit);
    const selectedBulkActions = selectedItems.length > 0;
    const selectedSomeProjects =
        selectedItems.length > 0 && selectedItems.length < endedAuctions.length;
    const selectedAllProjects = selectedItems.length === endedAuctions.length;

    const [toggleView, setToggleView] = useState<string | null>('table_view');

    const handleViewOrientation = (
        _event: MouseEvent<HTMLElement>,
        newValue: string | null
    ) => {
        setToggleView(newValue);
    };

    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

    const handleConfirmDelete = () => {
        setOpenConfirmDelete(true);
    };

    const closeConfirmDelete = () => {
        setOpenConfirmDelete(false);
    };

    const handleDeleteCompleted = () => {
        setOpenConfirmDelete(false);

        enqueueSnackbar(t('The projects has been deleted successfully'), {
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            },
            TransitionComponent: Zoom
        });
    };

    return (
        <>

                <Card>
                    <Divider />

                    {paginatedEndedAuctions.length === 0 ? (
                        <>
                            <Typography
                                sx={{
                                    py: 10
                                }}
                                variant="h3"
                                fontWeight="normal"
                                color="text.secondary"
                                align="center"
                            >
                                {t(
                                    "No ended auctions found for this token"
                                )}
                            </Typography>
                        </>
                    ) : (
                        <>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>{t('Name')}</TableCell>
                                            <TableCell>{t('Winner')}</TableCell>
                                            <TableCell>{t('Prize')}</TableCell>
                                            <TableCell>{t('Winning Bid')}</TableCell>
                                            <TableCell>{t('Claimed?')}</TableCell>
                                            <TableCell align="center">{t('Actions')}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {paginatedEndedAuctions.map((endedAuction) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    key={endedAuction.auctionAddress}
                                                >
                                                    <TableCell>
                                                        <Typography noWrap variant="h5">
                                                            {endedAuction.config.auctionName}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            noWrap
                                                            variant="subtitle1"
                                                            color="text.primary"
                                                        >
                                                            {endedAuction.highBidder.userName == "" ? "No Winner" : endedAuction.highBidder.userName}
                                                        </Typography>
                                                        <Typography noWrap color="text.secondary">
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        ---
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {utils.formatEther(endedAuction.highBidValue).toString()} WBNB
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography noWrap>
                                                         ----
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Typography noWrap>
                                                           -----
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Box p={2}>
                                <TablePagination
                                    component="div"
                                    count={endedAuctions.length}
                                    onPageChange={handlePageChange}
                                    onRowsPerPageChange={handleLimitChange}
                                    page={page}
                                    rowsPerPage={limit}
                                    rowsPerPageOptions={[5, 10, 15]}
                                />
                            </Box>
                        </>
                    )}
                </Card>
        </>
    );
};

EndedAuctions.propTypes = {
    endedAuctions: PropTypes.array.isRequired
};

EndedAuctions.defaultProps = {
    endedAuctions: []
};

export default EndedAuctions;
