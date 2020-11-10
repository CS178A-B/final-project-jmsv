import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { IJob } from '@entities/job';
import { errors } from '@shared/errors';
import {
    createJob,
} from '@modules/job';
import logger from '@shared/Logger';

const router = Router();

const { BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR } = StatusCodes;

interface jobRequest extends Request {
    body: {
        job: IJob;
    };
}

/******************************************************************************
 *            POST Request example - Create - "POST /api/job/create"
 ******************************************************************************/

router.post('/create', async (req: jobRequest, res: Response) => {
    const { job } = req.body;
    const {
        hoursPerWeek } = job;
    if (!job) {
        return res.status(BAD_REQUEST).json({
            error: errors.paramMissingError,
        });
    }
    try {
        await createJob(hoursPerWeek);
        return res.status(CREATED).end();
    } catch (error) {
        logger.err(error);
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(errors.internalServerError)
            .end();
    }
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
