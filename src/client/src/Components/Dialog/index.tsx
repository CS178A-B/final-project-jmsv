import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MUIDialog from '@material-ui/core/Dialog';
import MUIDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from '@material-ui/core/DialogContent';
interface DialogProps {
    children: JSX.Element;
    open: boolean;
    onClose?: () => void;
    title: string | JSX.Element;
}


function Dialog({ children, open, onClose, title }: DialogProps) {
    return (
        <MUIDialog open={open} onClose={onClose} maxWidth='md' fullWidth>
            <MUIDialogTitle>
                <Grid container justify='space-between' alignItems='center'>
                    <Grid item>
                        {typeof title === 'string' ? (
                            <Typography variant='h4'>{title}</Typography>
                        ) : (
                            title
                        )}
                    </Grid>
                    <Grid item>
                        {onClose ? (
                            <IconButton color='secondary' onClick={onClose}>
                                <CloseIcon />
                            </IconButton>
                        ) : null}
                    </Grid>
                </Grid>
            </MUIDialogTitle>
            <DialogContent>{children}</DialogContent>
        </MUIDialog>
    );
}

export default Dialog;
