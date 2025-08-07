"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../controllers/authControllers");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.send('Auth route is working');
});
router.post('/login', async (req, res) => {
    await (0, authControllers_1.loginRoute)(req, res);
});
router.post('/register', async (req, res) => {
    await (0, authControllers_1.registerRoute)(req, res);
});
router.post('/logout', auth_middleware_1.verifyToken, async (req, res) => {
    await (0, authControllers_1.logoutRoute)(req, res);
});
router.get('/me', auth_middleware_1.verifyToken, async (req, res) => {
    await (0, authControllers_1.selfRoute)(req, res);
});
exports.default = router;
