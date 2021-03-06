import React from 'react';
import { AxiosResponse } from 'axios';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import TrashCanIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

import useApi from 'hooks/useApi';
import useDialog from 'hooks/useDialog';
import useSnack from 'hooks/useSnack';
import Button from 'Components/Button';
import CancelButton from 'Components/CancelButton';

const useStyles = makeStyles((theme) => ({
    warningButton: {
        backgroundColor: theme.palette.warning.main,
        '&:hover': {
            backgroundColor: theme.palette.warning.main,
        },
    },
    warningColor: {
        color: theme.palette.warning.main,
    },
}));

interface DeleteButtonProps extends IconButtonProps {
    message: string;
    onDeleteRequest: () => Promise<AxiosResponse<unknown>>;
    onSuccess?: () => void;
    onClickBeforeRequest?: () => void;
}

function DeleteButton({
    message,
    onDeleteRequest,
    onSuccess,
    onClickBeforeRequest,
    ...props
}: DeleteButtonProps) {
    const { openDialog, closeDialog, DialogProps, Dialog } = useDialog();
    const classes = useStyles();
    const [snack] = useSnack();
    const [sendDeleteRequest, isLoading] = useApi(onDeleteRequest, {
        onSuccess: () => {
            closeDialog();
            if (onSuccess) onSuccess();
            snack('Item successfully deleted', 'success');
        },
    });
    return (
        <div>
            <IconButton
                onClick={() => {
                    openDialog();
                    if (onClickBeforeRequest) onClickBeforeRequest();
                }}
                className={classes.warningColor}
                {...props}
            >
                {<TrashCanIcon />}
            </IconButton>
            <Dialog
                {...DialogProps}
                title={
                    <Typography variant='h3' className={classes.warningColor}>
                        Warning:
                    </Typography>
                }
            >
                <div>
                    <Typography variant='h6' style={{ marginBottom: 20 }}>
                        <b>{message}</b>
                    </Typography>
                    <DialogActions>
                        <CancelButton
                            onClick={closeDialog}
                            disabled={isLoading}
                        />
                        <Button
                            disabled={isLoading}
                            onClick={sendDeleteRequest}
                            className={classes.warningButton}
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
}

export default DeleteButton;
