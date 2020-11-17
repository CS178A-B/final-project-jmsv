import React from 'react';
import TextField from '../../../Components/TextField/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '../../../Components/Button/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import useApi from '../../../hooks/useApi';
import useSnack from '../../../hooks/useSnack';

import Select from '../../../Components/Select/Select';

import {
    createJob,
    IJobForm,
    targetYears,
    departments,
    jobTypes,
} from '../api/api';

const initialValues = {
    targetYears: [],
    description: '',
    hoursPerWeek: '',
    expirationDate: '',
    startDate: '',
    endDate: '',
    type: [],
    title: '',
    minSalary: '',
    maxSalary: '',
    departmentId: '',
};

function JobForm() {
    const [job, setJob] = React.useState<IJobForm>(initialValues);
    const request = React.useCallback(() => createJob(job), [job]);
    const [snack] = useSnack();
    const [sendRequest, isLoading] = useApi(request, {
        onSuccess: () => {
            snack('Job successfully created', 'success');
            setJob(initialValues);
        },
    });

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendRequest();
    };

    type MyEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;
    const handleChange = (e: MyEvent, key: string) => {
        const { value } = e.target;
        setJob((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <Paper style={{ padding: 50, margin: 50 }}>
            <form onSubmit={submitForm}>
                <Grid container spacing={5} alignContent='center'>
                    <Grid item container justify='flex-start'>
                        <Typography variant='h4'>Post Job</Typography>
                    </Grid>
                    <Grid item container sm={12} md={6} spacing={4}>
                        <Grid item xs={12}>
                            <TextField
                                label='Title'
                                required
                                value={job.title}
                                onChange={(e) => handleChange(e, 'title')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label='Description'
                                multiline
                                required
                                value={job.description}
                                onChange={(e) => handleChange(e, 'description')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Select
                                label='Type'
                                required
                                multiple
                                value={job.type}
                                items={jobTypes}
                                input={<Input />}
                                onChange={(e) =>
                                    handleChange(
                                        e as React.ChangeEvent<
                                            HTMLInputElement
                                        >,
                                        'type'
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Select
                                label='Target years'
                                required
                                multiple
                                value={job.targetYears}
                                items={targetYears}
                                input={<Input />}
                                onChange={(e) =>
                                    handleChange(
                                        e as React.ChangeEvent<
                                            HTMLInputElement
                                        >,
                                        'targetYears'
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label='Hours per week'
                                type='number'
                                required
                                value={job.hoursPerWeek}
                                placeholder={'0'}
                                onChange={(e) =>
                                    handleChange(e, 'hoursPerWeek')
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid item container sm={12} md={6} spacing={4}>
                        <Grid item xs={12}>
                            <TextField
                                label='Start date'
                                type='date'
                                required
                                value={job.startDate}
                                onChange={(e) => handleChange(e, 'startDate')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label='End date'
                                type='date'
                                value={job.endDate}
                                onChange={(e) => handleChange(e, 'endDate')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label='Expiration date'
                                type='date'
                                value={job.expirationDate}
                                onChange={(e) =>
                                    handleChange(e, 'expirationDate')
                                }
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label='Minimum salary ($/hr.)'
                                type='number'
                                placeholder={'0'}
                                required
                                value={job.minSalary}
                                onChange={(e) => handleChange(e, 'minSalary')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label='Maximum salary ($/hr.)'
                                placeholder={'0'}
                                type='number'
                                value={job.maxSalary}
                                onChange={(e) => handleChange(e, 'maxSalary')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Select
                                value={job.departmentId}
                                label='Department'
                                items={departments}
                                required
                                onChange={(e) =>
                                    handleChange(
                                        e as React.ChangeEvent<
                                            HTMLInputElement
                                        >,
                                        'departmentId'
                                    )
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type='submit' isLoading={isLoading}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}

export default JobForm;
