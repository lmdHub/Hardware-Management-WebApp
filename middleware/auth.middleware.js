// Middleware to handle user authorization
// Let someone is making a request to get user details -> authorize middleware -> verify if the user is authorized to make this request -> if yes, proceed to the controller -> if not, return an error response

const authororize = async (req, res, next) => {
    try {
        // Dummy authorization logic

        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) return res.status(401).json({ success: false, message: 'Not authorized, no token' });

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await user.findById(decoded.userId);

        if (!user) return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
        req.user = user;
        next();
    }
    
    catch (error) {
        next(error);
        res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
}

export default authororize;