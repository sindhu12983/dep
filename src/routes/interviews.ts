import express from "express"
import {createInterview,getByCandidate_id,getByIdInterview,getByInterviewer_id} from '../service/interviews'
const interviewRouter=express.Router()
/**
 * @swagger
 * /interviews/book/{user_id}:
 *   post:
 *     summary: Book or update an interview
 *     tags: [Interviews]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               slot_id:
 *                 type: integer
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Interview booked successfully
 *       404:
 *         description: Slot not available
 */
interviewRouter.post("/book/:user_id",createInterview)
/**
 * @swagger
 * /interviews/{id}:
 *   get:
 *     summary: Get interview by ID
 *     tags: [Interviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Interview found
 *       404:
 *         description: Interview not found
 */
interviewRouter.get("/:id",getByIdInterview)
/**
 * @swagger
 * /interviews/candidates/{candidate_id}:
 *   get:
 *     summary: Get interviews by candidate ID
 *     tags: [Interviews]
 *     parameters:
 *       - in: path
 *         name: candidate_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Interviews found
 *       404:
 *         description: Interviews not found
 */
interviewRouter.get("/candidates/:candidate_id",getByCandidate_id)
/**
 * @swagger
 * /interviews/interviewer/{interviewer_id}:
 *   get:
 *     summary: Get interviews by interviewer ID
 *     tags: [Interviews]
 *     parameters:
 *       - in: path
 *         name: interviewer_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Interviews found
 *       404:
 *         description: Interviews not found
 */
interviewRouter.get("/interviewer/:interviewer_id",getByInterviewer_id)
export default interviewRouter;

