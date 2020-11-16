import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { IJob, jobType } from '../api/api';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AssistantIcon from '@material-ui/icons/AssistantPhoto';
import GraderIcon from '@material-ui/icons/Assignment';
import ResearchIcon from '@material-ui/icons/FindInPage';
import TutorIcon from '@material-ui/icons/SupervisedUserCircle';
import VolunteerIcon from '@material-ui/icons/Accessibility';
import OtherIcon from '@material-ui/icons/AddCircle';
import { isGreaterThanZero } from '../../../utils/helpers';
import SalaryDisplayer from '../SalaryDisplayer/SalaryDisplayer';
interface Props {
    job: IJob;
    onClick: (job: IJob) => void;
    isSelected: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        Box: {
            '&:hover': { backgroundColor: '#efefef' },
        },
        Selected: {
            backgroundColor: '#efefef',
        },
    })
);

const getIcon = (type: jobType): JSX.Element => {
    const color = 'primary';
    const size = 'large';
    switch (type) {
        case 'assistant':
            return <AssistantIcon fontSize={size} color={color} />;
        case 'grader':
            return <GraderIcon fontSize={size} color={color} />;
        case 'researcher':
            return <ResearchIcon fontSize={size} color={color} />;
        case 'tutor':
            return <TutorIcon fontSize={size} color={color} />;
        case 'volunteer':
            return <VolunteerIcon fontSize={size} color={color} />;
        default:
            return <OtherIcon fontSize={size} color={color} />;
    }
};

function JobPreview({ job, onClick, isSelected }: Props) {
    const classes = useStyles();
    return (
        <Box
            className={isSelected ? classes.Selected : classes.Box}
            style={{ padding: 30, minHeight: 150 }}
            borderRadius={16}
            border={1}
            borderColor='#b2bec3'
            onClick={() => onClick(job)}
        >
            <Grid container spacing={4} alignItems='center' justify='center'>
                <Grid
                    container
                    item
                    md={3}
                    xs={12}
                    justify='center'
                    alignItems='center'
                >
                    {getIcon(job.type[0])}
                </Grid>
                <Grid
                    item
                    container
                    direction='column'
                    spacing={1}
                    md={9}
                    xs={12}
                >
                    <Grid item>
                        <Typography variant='h6' color='primary'>
                            {job.title}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='body1'>
                            {job.hoursPerWeek} hr/week
                        </Typography>
                    </Grid>
                    {isGreaterThanZero(job.minSalary) && (
                        <Grid item>
                            <SalaryDisplayer
                                minSalary={job.minSalary}
                                maxSalary={job.maxSalary}
                            />
                        </Grid>
                    )}
                    <Grid item>
                        <Typography variant='body1'>
                            TODO: Display faculty member's name
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default JobPreview;
