import bcrypt from 'bcrypt';
import { User } from '@entities/user';
import { VerificationKey } from '@entities/verificationKey';
import { createStudent } from '@modules/student';
import { createFacultyMember } from '@modules/facultyMember';
import { getRepository, UpdateResult } from 'typeorm';
import { sendEmail } from '@lib/mail';
import { makeRandomString } from '@lib/randomKey';

/**
 * @description Return a boolean value checking if the user with the given id exists.
 * @param {number} userId - id of the user.
 * @returns Promise
 */
export const userIdExists = async (userId: number) => {
    const user = await getRepository(User)
        .createQueryBuilder('user')
        .where({ id: userId })
        .getOne();
    return user !== undefined;
};

/**
 * @description Finds user by email
 * @param {string} email - user's email address
 * @returns Promise
 */
export const findUserByEmail = (email: string) => {
    return User.findOne({ email });
};

/**
 * @description Create a verification key and send a user an email with the verification key.
 * @param {number} id - user's id
 * @param {string} emailText - email text to use when sending the verification email
 */
const sendEmailVerificationEmail = async (
    id: User['id'],
    emailText: string
) => {
    const user = await User.findOneOrFail({ id });

    let key: string;

    do {
        key = makeRandomString(/*length=*/ 20);
    } while (await VerificationKey.findOne({ key: key }));

    const verificationKey = VerificationKey.create({ user, key });

    await verificationKey.save();

    const link =
        process.env.NODE_ENV === 'production'
            ? 'obscure-ocean-12960.herokuapp.com'
            : 'localhost:3000';

    // Send email with the verification link.
    sendEmail(
        user.email,
        `Verify your email address`,
        `${emailText} Please follow the link below to verify your email and complete your registration.\n\nhttp://${link}/verify/${key}`
    );
};

/**
 * @description Creates a user object and saves it in the database
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @param {string} firstName - User's first name
 * @param {string} lastName - User's last name
 * @param {role} role - user's role, either 'student' or 'facultyMember'
 * @returns Promise
 */
export const createUser = async (
    email: User['email'],
    password: User['password'],
    firstName: User['firstName'],
    lastName: User['lastName'],
    role: User['role']
) => {
    const userToInsert = User.create({
        email,
        password,
        firstName,
        lastName,
        role,
        emailVerified: false,
    });

    await userToInsert.save();

    await sendEmailVerificationEmail(
        userToInsert.id,
        "Welcome to R'match!\n\nYour account has been created."
    );

    return userToInsert;
};

/**
 * @description Registers user's information based on their role
 * @param {string} email - User's email address
 * @param {string} password - User's password (not encrypted)
 * @param {string} firstName - User's first name
 * @param {string} lastName - User's last name
 * @param {role} role - User's role, either 'student' or 'facultyMember'
 * @returns Promise
 */
export const registerUser = async (
    email: User['email'],
    password: User['password'],
    firstName: User['firstName'],
    lastName: User['lastName'],
    role: User['role']
) => {
    const encryptedPassword = await bcrypt.hash(password, 10);
    // Create user regardless of role
    const newUser = await createUser(
        email,
        encryptedPassword,
        firstName,
        lastName,
        role
    );
    switch (role) {
        case 'student':
            // Inserts information in student table
            return createStudent(newUser);
        case 'facultyMember':
            // Inserts information in facultyMember table
            return createFacultyMember(newUser);
        default:
            return undefined;
    }
};

/**
 * @description Makes password field of the user object null.
 * @param {User} user - user object
 * @returns Promise
 */
export const hidePassword = async (user: User) => {
    const { firstName, lastName, id, middleName, biography, email } = user;

    return User.create({
        firstName,
        lastName,
        id,
        middleName,
        biography,
        email,
    });
};

/**
 * @description Returns an user object corresponding to the input userId.
 * @param {number} userId - id of the requested user.
 * @returns Promise
 */
export const getUserById = async (userId: number) => {
    const getUserByIdResult: {
        result?: User;
        message: string;
    } = {
        result: undefined,
        message: '',
    };

    // Check if the user with the email exists.
    const user = await getRepository(User)
        .createQueryBuilder('user')
        .where({ id: userId })
        .select([
            'user.id',
            'user.firstName',
            'user.lastName',
            'user.middleName',
            'user.biography',
            'user.email',
        ])
        .getOne();

    if (!user) {
        getUserByIdResult.message = 'A user with the id does not exist.';
        return getUserByIdResult;
    }

    getUserByIdResult.message = 'Successful';
    getUserByIdResult.result = user;

    return getUserByIdResult;
};

/**
 * @description Update a user's email.
 * @param {number} id - id of the user.
 * @param {string} email - new email.
 * @returns Promise
 */
export const updateEmail = async (id: User['id'], email: User['email']) => {
    const emailUpdateResult: {
        result?: UpdateResult;
        message: string;
    } = {
        result: undefined,
        message: '',
    };
    const user = await User.findOne({ id });

    if (!user) {
        emailUpdateResult.message = 'The requested user does not exist.';
        return emailUpdateResult;
    }

    if (user.email === email) {
        emailUpdateResult.message =
            'The email is the same as your current email.';
        return emailUpdateResult;
    }

    const userWithSameEmail = await User.findOne({ email });
    if (userWithSameEmail) {
        emailUpdateResult.message =
            'The email is already taken by another user.';
        return emailUpdateResult;
    }

    emailUpdateResult.result = await User.update(id, {
        email,
        emailVerified: false,
    });

    await sendEmailVerificationEmail(
        id,
        'Your email was successfully updated.'
    );

    return emailUpdateResult;
};

/**
 * @description Verify a user's email.
 * @param {string} verificationKeyString - verification key
 * @returns Promise
 */
export const verifyEmail = async (
    verificationKeyString: VerificationKey['key']
) => {
    const emailVerificationResult: {
        result?: UpdateResult;
        message: string;
    } = {
        result: undefined,
        message: '',
    };

    const verificationKey = await VerificationKey.findOne({
        key: verificationKeyString,
    });

    if (!verificationKey) {
        emailVerificationResult.message = 'Email verification unsuccessful.';
        return emailVerificationResult;
    }

    emailVerificationResult.result = await User.update(verificationKey.userId, {
        emailVerified: true,
    });

    await VerificationKey.delete({ key: verificationKeyString });

    return emailVerificationResult;
};
