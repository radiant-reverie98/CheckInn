const verifyRole = (allowedRole) => {
    return (req,res,next) => {
        const userRoles = req.user.roles;
        const hasRole = userRoles.some(role => role === allowedRole);
        if(!hasRole){
            return res.status(403).json({message: "Access denied"})
        }
        next();
    }
}

export default verifyRole