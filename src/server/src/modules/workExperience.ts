import { WorkExperience } from '@entities/workExperience';
import { Student } from '@entities/student';
import { UpdateResult } from 'typeorm';

/**
 * @description Finds a work experience by id
 * @param {number} id - Id of work experience to find
 * @returns Promise
 */
export const findWorkExperience = (id: WorkExperience['id']) => {
    return WorkExperience.findOne(id);
};

/**
 * @description Saves a new work experience. Assigns relationships with student table
 * @param {string} description - Description of the work experience
 * @param {string} employer - Employer of the work experience
 * @param {Date} startDate - Start date of the work experience
 * @param {Date} endDate - End date of the work experience
 * @param {string} title - Title of the work experience
 * @param {number} studentId - Id of the student that posted the work experience
 * @returns Promise
 */
export const createWorkExperience = async (
    description: WorkExperience['description'],
    employer: WorkExperience['employer'],
    startDate: WorkExperience['startDate'],
    endDate: WorkExperience['endDate'],
    title: WorkExperience['title'],
    studentId: WorkExperience['studentId']
) => {
    const insertResult: { result?: WorkExperience; message: string } = {
        result: undefined,
        message: '',
    };

    const startDateAsDate = new Date(startDate);
    let endDateAsDate;
    if (endDate) endDateAsDate = new Date(endDate);

    const studentToUpdate = await Student.findOne({
        where: { id: studentId },
    });
    if (!studentToUpdate) {
        insertResult.message =
            'Student that posted the work experience does not exist';
        return insertResult;
    }

    const workExperienceToInsert = await WorkExperience.create({
        description,
        startDate: startDateAsDate,
        employer,
        title,
        endDate: endDateAsDate,
        studentId,
    }).save();

    insertResult.result = workExperienceToInsert;
    insertResult.message = 'Work experience successfully inserted';
    return insertResult;
};

//NOTE: Needed to change this type to a string to prevent the string is not assignable to number error.
export const getWorkExperiences = (studentId: number) => {
    return WorkExperience.find({ where: { studentId } });
};

/**
 * @description Updates the properties of an already existing work experience.
 * @param {WorkExperience} workExperience - Work experience object storing the fields to update
 * @param {string} workExperience.description - New description of the work experience
 * @param {string} workExperience.employer - New employer of the work experience
 * @param {Date} workExperience.startDate - New start date of the work experience
 * @param {Date} workExperience.endDate - New end date of the work experience
 * @param {string} workExperience.title - New title of the work experience
 * @param {number} workExperience.id - Id of the work experience to update
 * @returns Promise
 */

export const updateWorkExperience = (workExperience: WorkExperience) => {
    const {
        description,
        employer,
        startDate,
        endDate,
        title,
        id,
    } = workExperience;
    let endDateAsDate;
    if (endDate) {
        endDateAsDate = new Date(endDate);
    }
    return WorkExperience.update(id, {
        description,
        employer,
        startDate: new Date(startDate),
        endDate: endDateAsDate,
        title,
    });
};

/**
 * @description Deletes an existing work experience from the database
 * @param {number} id - Id of work experience to delete
 * @returns Promise
 */
export const deleteWorkExperience = (id: WorkExperience['id']) => {
    return WorkExperience.delete(id);
};
