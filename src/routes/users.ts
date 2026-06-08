import express from "express"
import { createUser,getByUserId,getByRole} from "../service/users"
const userRouter=express.Router()
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                  type: string
 *               role:
 *                  type: string
 *     responses:
 *       200:
 *         description: User created successfully
 */
userRouter.post("/",createUser)
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
userRouter.get("/:id",getByUserId)
/**
 * @swagger
 * /users/role/{role}:
 *   get:
 *     summary: Get user by Role
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
userRouter.get("/role/:role",getByRole)
export default userRouter;