import express from "express"
import {createSlot,getByIdSlot,getByIid,getByStatus,uptInterviewer} from '../service/slots'
const slotRouter=express.Router()
/**
 * @swagger
 * /slots/creation/{id}:
 *   post:
 *     summary: Create a new slot
 *     tags: [Slots]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               interviewer_id:
 *                 type: integer
 *               start_time:
 *                 type: string
 *                 format: date-time
 *               end_time:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Slot created successfully
 *       404:
 *         description: User not allowed
 */
slotRouter.post("/creation/:id",createSlot)
/**
 * @swagger
 * /slots/{id}:
 *   get:
 *     summary: Get slot by ID
 *     tags: [Slots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Slot found
 *       404:
 *         description: Slot not found
 */
slotRouter.get("/:id",getByIdSlot)
/**
 * @swagger
 * /slots/interviewer/{interviewer_id}:
 *   get:
 *     summary: Get slots by interviewer ID
 *     tags: [Slots]
 *     parameters:
 *       - in: path
 *         name: interviewer_id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Slots found
 *       404:
 *         description: Interviewer not found
 */
slotRouter.get("/interviewer/:interviewer_id",getByIid)
/**
 * @swagger
 * /slots/status/{status}:
 *   get:
 *     summary: Get slots by booking status
 *     tags: [Slots]
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Slots found
 *       404:
 *         description: Slots not found
 */
slotRouter.get("/status/:status",getByStatus)
/**
 * @swagger
 * /slots/{id}:
 *   put:
 *     summary: Update interviewer of slot
 *     tags: [Slots]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               interviewer_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Interviewer updated successfully
 *       404:
 *         description: Invalid interviewer
 */
slotRouter.put("/:id",uptInterviewer)
export default slotRouter;