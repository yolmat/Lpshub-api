const authService = require(
    "../services/auth.service"
);

async function login(req, res, next) {
    try {
        const user = await authService.login(
            req.body
        );

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    login,
};