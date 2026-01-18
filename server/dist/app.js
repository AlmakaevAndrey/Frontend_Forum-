"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const fs_1 = require("fs");
const auth_1 = __importDefault(require("./routes/auth"));
const posts_1 = __importDefault(require("./routes/posts"));
const upload_1 = __importDefault(require("./routes/upload"));
const user_1 = __importDefault(require("./routes/user"));
const memes_1 = __importDefault(require("./routes/memes"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const allowedOrigins = [
    'https://frontend-forum.vercel.app', // прод-домен
    'http://localhost:3000', // dev
];
function isVercelPreview(origin) {
    return (origin && origin.includes('vercel.app') && origin.includes('frontend-forum'));
}
//
// app.use((req, res, next) => {
//   console.log(`➡️ ${req.method} ${req.url}`);
//   next();
// });
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin) {
            return callback(null, true);
        }
        if (allowedOrigins.includes(origin) || isVercelPreview(origin)) {
            return callback(null, true);
        }
        console.log('❌ CORS BLOCKED:', origin);
        return callback(new Error('CORS blocked: ' + origin));
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
app.use('/users', user_1.default);
app.use('/auth', auth_1.default);
app.use('/posts', posts_1.default);
app.use('/upload', upload_1.default);
app.use('/memes', memes_1.default);
if (process.env.NODE_ENV === 'production') {
    const clientBuildPath = path_1.default.join(__dirname, '../../client/build');
    if ((0, fs_1.existsSync)(clientBuildPath)) {
        app.use(express_1.default.static(clientBuildPath));
        app.use((req, res, next) => {
            if (!req.path.startsWith('/uploads') &&
                !req.path.startsWith('/auth') &&
                !req.path.startsWith('/users') &&
                !req.path.startsWith('/posts') &&
                !req.path.startsWith('/memes') &&
                !req.path.startsWith('/upload')) {
                res.sendFile(path_1.default.join(clientBuildPath, 'index.html'));
            }
            else {
                next();
            }
        });
    }
    else {
        console.warn('Client build folder not found, skipping static serving');
    }
}
// Глобальный обработчик ошибок
app.use((err, req, res, next) => {
    console.error('🔴 Global error handler caught:', err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
});
exports.default = app;
