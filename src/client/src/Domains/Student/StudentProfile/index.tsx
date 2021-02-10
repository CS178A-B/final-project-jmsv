import React from 'react';
import Grid from '@material-ui/core/Grid';
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined';

import { AuthContext } from 'Contexts/AuthContext';
import useDialog from 'hooks/useDialog';
import useApi from 'hooks/useApi';
import BaseProfile from 'Components/BaseProfile';
import LabelValue from 'Components/LabelValue';
import LabelValues from 'Components/LabelValues';
import Loader from 'Components/Loader';
import StudentProfileForm from 'Domains/Student/StudentProfileForm';
import WorkExperiences from 'Domains/Student/WorkExperiences';
import {
    getStudentProfile,
    IStudent,
    getWorkExperiences,
    IWorkExperience,
} from 'Domains/Student/api';
import StudentProfileContext from '../Contexts/StudentProfileContext';

const workExperiencesDummy = [
    {
        id: 1,
        startDate: '2021-01-29T03:31:04.627Z',
        endDate: '2021-03-29T03:31:04.627Z',
        title: 'ARC Tutor',
        employer: 'UCR Academic Resource center',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        id: 2,
        startDate: '2021-01-29T03:31:04.627Z',
        title: 'Web developer',
        employer: 'Microsoft',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        id: 3,
        startDate: '2021-01-29T03:31:04.627Z',
        endDate: '2021-06-29T03:31:04.627Z',
        title: 'Software Engineer Intern',
        employer: 'Google',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
];

interface StudentProfileProps {
    studentId: number;
}

function StudentProfile({ studentId }: StudentProfileProps) {
    const [studentProfile, setStudentProfile] = React.useState<IStudent>();
    const [workExperiences, setWorkExperiences] = React.useState<
        IWorkExperience[]
    >([]);
    const { openDialog, closeDialog, DialogProps, Dialog } = useDialog();
    const { user } = React.useContext(AuthContext);

    const getWorkExperiencesRequest = React.useCallback(
        () => getWorkExperiences(studentId),
        [studentId]
    );

    const getProfileRequest = React.useCallback(
        () => getStudentProfile(studentId),
        [studentId]
    );

    const [sendGetProfileRequest, isGettingProfileLoading] = useApi(
        getProfileRequest,
        {
            onSuccess: (results) => {
                setStudentProfile(results.data.student);
            },
        }
    );

    const [
        sendGetWorkExperiencesRequest,
        isGettingWorkExperiencesLoading,
    ] = useApi(getWorkExperiencesRequest, {
        onSuccess: () => setWorkExperiences(workExperiencesDummy),
        onFailure: () => setWorkExperiences(workExperiencesDummy),
        // setWorkExperiences(results.data.workExperiences),
    });

    const getCoursesTitles = () => {
        return studentProfile?.courses.map(
            (course) => `${course.shortTitle} - ${course.fullTitle}`
        );
    };

    const getCoursesIds = () => {
        return studentProfile?.courses.map((course) => course.id);
    };

    const isUserProfileOwner =
        user?.role === 'student' && user?.specificUserId === studentId;

    React.useEffect(() => {
        sendGetProfileRequest();
        sendGetWorkExperiencesRequest();
    }, [sendGetProfileRequest, sendGetWorkExperiencesRequest]);

    return isGettingProfileLoading ? (
        <Loader center />
    ) : studentProfile ? (
        <StudentProfileContext.Provider
            value={{
                userId: studentProfile.user.id,
                hasPermission: isUserProfileOwner,
            }}
        >
            <Grid container spacing={2} justify='center' alignItems='center'>
                <BaseProfile
                    user={studentProfile.user}
                    department={studentProfile.department}
                    onEdit={openDialog}
                    hasPermission={isUserProfileOwner}
                />
                <Grid item md={4} xs={12}>
                    <LabelValue
                        label='Class Standing'
                        value={studentProfile.classStanding}
                    />
                </Grid>
                <Grid item md={4} xs={12}>
                    <LabelValue label='SID' value={studentProfile.sid} />
                </Grid>
                <Grid item md={4} xs={12}>
                    <LabelValue label='GPA' value={studentProfile.gpa} />
                </Grid>
                <Grid item md={12} xs={12}>
                    <LabelValues
                        label='Courses Taken'
                        values={getCoursesTitles()}
                        icon={<SchoolOutlinedIcon />}
                    />
                </Grid>
                <Grid item md={12} xs={12}>
                    {isGettingWorkExperiencesLoading ? (
                        <Loader />
                    ) : (
                        <WorkExperiences workExperiences={workExperiences} />
                    )}
                </Grid>
            </Grid>
            <Dialog {...DialogProps} title='Edit Profile'>
                <StudentProfileForm
                    onClose={closeDialog}
                    onSuccess={sendGetProfileRequest}
                    studentProfileInformation={{
                        id: studentProfile.id,
                        userId: studentProfile.user.id,
                        firstName: studentProfile.user.firstName,
                        middleName: studentProfile.user.middleName,
                        lastName: studentProfile.user.lastName,
                        collegeId: studentProfile.department?.college.id,
                        departmentId: studentProfile.department?.id,
                        sid: studentProfile.sid,
                        gpa: studentProfile.gpa?.toString(),
                        classStanding: studentProfile.classStanding,
                        email: studentProfile.user.email,
                        biography: studentProfile.user.biography,
                        courseIds: getCoursesIds(),
                    }}
                />
            </Dialog>
        </StudentProfileContext.Provider>
    ) : (
        <> </>
    );
}

export default StudentProfile;
