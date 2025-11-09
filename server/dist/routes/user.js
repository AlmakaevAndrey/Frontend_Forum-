"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
console.log('Users route connected');
router.get('/', auth_1.authenticate, (0, auth_1.authorize)('admin'), userControllers_1.getUsers);
exports.default = router;
