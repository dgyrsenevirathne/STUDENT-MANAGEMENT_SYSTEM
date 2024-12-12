// middleware/auth.js
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    res.status(403).send('Access denied');
};

const isTeacher = (req, res, next) => {
    if (req.user && (req.user.role === 'teacher' || req.user.role === 'admin')) {
        return next();
    }
    res.status(403).send('Access denied');
};

module.exports = { isAdmin, isTeacher };