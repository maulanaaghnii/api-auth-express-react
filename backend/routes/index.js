import express from "express"
import { getUsers, Login, Logout, Register } from "../controller/Users.js"
import { verifyToken } from "../middleware/VerifyToken.js"
import { refreshToken } from "../controller/RefreshToken.js"

const router = express.Router()

router.get('/users', verifyToken, getUsers) // tidak dapat diakses jika user tidak login
router.post('/users', Register)
router.post('/login', Login)
router.get('/token', refreshToken)
router.delete('/logout', Logout)

export default router