const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');

const sentToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, token })
}

exports.signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({ username, email, password });
        sentToken(user, 201, res);
    } catch (error) {
        next(error);
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorResponse('Please provide email and password.', 400));
    }

    try {
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.comparePasswords(password))) {
            return next(new ErrorResponse('Invalid Credentials.', 401));
        }

        sentToken(user, 200, res);
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        })
    }
}
