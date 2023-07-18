import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
    Container,
    Typography,
    Box,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListSubheader,
    Snackbar,
    Alert
} from "@mui/material";
import copy from "copy-to-clipboard";
import { ContactData } from '../../constants'
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';

export const Contact = () => {
    const [openSnackbar, setSnackbarState] = useState(false);
    const [copiedValue, setCopiedValue] = useState(null);

    const timeoutID = useRef(null);
    const { t } = useTranslation();
    const ClearTimeout = () => {
        if (timeoutID.current) {
            clearTimeout(timeoutID.current)
            timeoutID.current = 0;
        }
    }
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarState(false)
        return ClearTimeout();
    }
     const copyValue = (text) => {
         ClearTimeout();
         copy(text);
         setCopiedValue(text);
         setSnackbarState(true);
         timeoutID.current = setTimeout(() => {
             handleClose()
             return ClearTimeout()
         }, 3000)
     }
    return (
        <Container maxWidth={'sm'}>
            <Box sx={{marginTop: '25px', width: '100%'}}>
                <Typography variant={'h1'}
                            gutterBottom
                            sx={{fontSize: '38px',  textAlign: 'center', fontWeight: 'bold'}}

                >{t('contact')}</Typography>
                <Divider />
                <Box sx={{alignItems: 'center'}}>
                    <List sx={{textAlign: 'center'}}>
                        <ListSubheader sx={{fontSize: '25px', fontWeight: 'bold'}}>
                            <PermPhoneMsgIcon sx={{marginRight: '15px'}} />
                            {t('phone')}
                        </ListSubheader>
                        <ListItem disablePadding>
                            <ListItemButton sx={{display: 'flex', justifyContent: 'space-between'}}
                                            onClick={() => copyValue(ContactData.numbers.OleksandrNumber)}>
                                <Typography>
                                    {t('oleksandr')}:
                                </Typography>
                                <Typography >{ContactData.numbers.OleksandrText}</Typography>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton sx={{display: 'flex', justifyContent: 'space-between'}}
                                            onClick={() => copyValue(ContactData.numbers.VasilyNumber)}>
                                <Typography>
                                    {t('vasily')}:
                                </Typography>
                                <Typography>{ContactData.numbers.VasilyText}</Typography>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
                <Divider />
            </Box>
            <Box sx={{ width: 150 }}>
                  <Snackbar
                    anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                    open={openSnackbar}
                    onClose={handleClose}
                  >
                      <Alert severity="success" onClose={handleClose}>{copiedValue} copied</Alert>
                  </Snackbar>
            </Box>
        </Container>
    );
}
