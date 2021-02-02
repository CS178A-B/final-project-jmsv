import React from 'react';
import Avatar from '@material-ui/core/Avatar';

import CardPreview from 'Components/CardPreview';
import { IStudentPreview } from 'Domains/Student/api';

interface Props {
    studentPreview: IStudentPreview;
    onClick: () => void;
    isSelected: boolean;
}

function StudentPreview({ studentPreview, onClick, isSelected }: Props) {
    const prepareValues = () => {
        const departmentName = studentPreview.department?.name;
        const classStanding = studentPreview.classStanding;
        return {
            Major: departmentName ? departmentName : 'Not provided',
            'Class Standing': classStanding ? classStanding : 'Not provided',
        };
    };

    const getStudentName = () => {
        const { firstName, lastName } = studentPreview.user;
        return `${firstName} ${lastName}`;
    };

    return (
        <CardPreview
            isSelected={isSelected}
            onClick={onClick}
            visual={<Avatar style={{ width: 70, height: 70 }} />}
            title={getStudentName()}
            values={prepareValues()}
        />
    );
}

export default StudentPreview;
