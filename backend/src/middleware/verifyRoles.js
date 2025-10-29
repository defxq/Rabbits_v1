const verifyRoles = (allowedRoles) => {
    return (req, res, next) => {
        if (!(req.user.roles)) return res.status(403).json({ message: "This user does not has any roles" });
        const allowed = allowedRoles.find(role => role === req.user.roles);
        if (!allowed) {
            return res.status(403).json({ message: "You dont have permission!" });
        }
        next();
    }
};

export default verifyRoles;