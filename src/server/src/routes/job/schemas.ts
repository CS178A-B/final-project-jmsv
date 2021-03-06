import Joi from 'joi';

const baseJob = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    hoursPerWeek: Joi.number().required(),
    minSalary: Joi.number().required(),
    maxSalary: Joi.number().optional(),
    targetYears: Joi.array()
        .items(Joi.string().valid('Freshman', 'Sophmore', 'Junior', 'Senior'))
        .required(),
    type: Joi.array()
        .items(
            Joi.string().valid(
                'grader',
                'assistant',
                'researcher',
                'volunteer',
                'tutor',
                'other'
            )
        )
        .required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().optional(),
    expirationDate: Joi.date().optional(),
    departmentId: Joi.number().required(),
}).required();

export const jobCreateSchema = Joi.object({
    job: baseJob,
});

export const jobUpdateSchema = Joi.object({
    job: baseJob.keys({
        id: Joi.number().required(),
    }),
});

export const jobReadSchema = Joi.object({
    title: Joi.string().required(),
    types: Joi.array()
        .items(
            Joi.string()
                .valid(
                    'grader',
                    'assistant',
                    'researcher',
                    'volunteer',
                    'tutor',
                    'other'
                )
                .required()
        )
        .required(),
    startDate: Joi.date().allow('').optional(),
    minSalary: Joi.string().allow('').optional(),
    hoursPerWeek: Joi.string().allow('').optional(),
    page: Joi.string().required(),
    numOfItems: Joi.string().required(),
});

export const getNewJobsSchema = Joi.object({
    page: Joi.string().required(),
    numOfItems: Joi.string().required(),
});

export const jobIdSchema = Joi.object({
    jobId: Joi.number().required(),
});

export const getApplicantsSchema = Joi.object({
    jobId: Joi.string().required(),
    departmentIds: Joi.array().allow('').items(Joi.number()).optional(),
    classStandings: Joi.array()
        .allow('')
        .items(Joi.string().valid('Freshman', 'Sophomore', 'Junior', 'Senior'))
        .optional(),
    minimumGpa: Joi.string().optional().allow(''),
    courseIds: Joi.array().allow('').items(Joi.number()).optional(),
    page: Joi.string().required(),
    numOfItems: Joi.string().required(),
});
