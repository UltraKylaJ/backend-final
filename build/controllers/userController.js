"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.loginUser = exports.createUser = void 0;
const user_1 = require("../models/user");
const auth_1 = require("../services/auth");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new user_1.User({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        city: req.body.city,
        state: req.body.state
    });
    try {
        if (newUser.username && newUser.password) {
            let hashedPassword = yield (0, auth_1.hashPassword)(newUser.password);
            newUser.password = hashedPassword;
            let created = yield newUser.save();
            res.status(201).json({
                username: created.username,
                city: created.city,
                userId: created._id
            });
        }
        else {
            res.status(400).send('Username and password required');
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.createUser = createUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let existingUser = yield user_1.User.findOne({ username: req.body.username });
    if (existingUser) {
        let passwordsMatch = yield (0, auth_1.comparePasswords)(req.body.password, existingUser.password);
        if (passwordsMatch) {
            let token = yield (0, auth_1.signUserToken)(existingUser);
            res.status(200).json({ token });
        }
        else {
            res.status(401).json('Invalid password');
        }
    }
    else {
        res.status(401).json('Invalid username');
    }
});
exports.loginUser = loginUser;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let usersList = yield user_1.User.find();
    res.status(200).json(usersList);
});
exports.getAllUsers = getAllUsers;
