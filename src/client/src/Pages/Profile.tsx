import React from 'react';

import { AuthContext } from 'Contexts/AuthContext';
import StudentProfile from 'Domains/Student/StudentProfile';
import FacultyMemberProfileForm from 'Domains/FacultyMember/FacultyMemberProfileForm';

function Profile() {
    const { user } = React.useContext(AuthContext);
    return user?.role === 'student' ? (
        <StudentProfile />
    ) : (
        <FacultyMemberProfileForm />
    );
}

export default Profile;
