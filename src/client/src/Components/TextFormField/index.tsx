import React from 'react';
import { FieldProps, getIn } from 'formik';
import { TextField } from '@material-ui/core';

export const TextFormField: React.FC<FieldProps> = ({
    field,
    form,
    ...props
}) => {
    const errorText =
        getIn(form.touched, field.name) && getIn(form.errors, field.name);

    return (
        <TextField
            fullWidth
            autoComplete='off'
            autoCorrect='off'
            autoCapitalize='off'
            helperText={errorText}
            error={!!errorText}
            {...field}
            {...props}
        />
    );
};
