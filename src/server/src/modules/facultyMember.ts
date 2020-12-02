import { getRepository } from 'typeorm';
import { FacultyMember } from '@entities/facultyMember';
import { IUser, User } from '@entities/user';
import { IFacultyMember } from '@entities/facultyMember';

/**
 * @description Creates a faculty member using an existing user record from the database
 * @param user user object
 * @returns Promise
 */
export const createFacultyMember = (user: IUser) => {
    const facultyMemberRepository = getRepository(FacultyMember);
    const facultyMemberToInsert = facultyMemberRepository.create({
        user,
    });
    return facultyMemberRepository.save(facultyMemberToInsert);
};

/**
 * @description updates an existing faculty member profile in the database
 * @param id number
 * @param user User
 * @param departmentId string
 * @param websiteLink string
 * @param office string
 * @param title string
 * @returns Promise
 */
export const updateFacultyMember = async (
    user: IFacultyMember['user'],
    departmentId: IFacultyMember['departmentId'],
    websiteLink: IFacultyMember['websiteLink'],
    office: IFacultyMember['office'],
    title: IFacultyMember['title'],
    id: number
) => {


    const facultyToUpdate = await getRepository(FacultyMember).findOne(id);
    if (facultyToUpdate !== undefined) {
        await getRepository(User).update(user.id, {
            biography: user.biography,
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
        });
        return await getRepository(FacultyMember).update(id, {
            departmentId,
            websiteLink,
            office,
            title,
        });
    }
    return undefined;
};