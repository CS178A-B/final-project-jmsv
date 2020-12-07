import { IDepartment, Department } from '@entities/department';
import { College } from '@entities/college';
import { getRepository } from 'typeorm';
/**
 * @description saves a new department in the database
 * @param name string
 * @param college College
 * @returns Promise
 */
export const createDepartment = async (
    name: IDepartment['name'],
    college: IDepartment['college']
) => {
    const collegeRepository = getRepository(College);
    const departmentRepository = getRepository(Department);

    const collegeObject = await collegeRepository.findOne(college.id)
    if (collegeObject !== undefined) {
        const department = new Department();
        department.name = name;
        department.college = collegeObject;
        return departmentRepository.save(department);
    }
};