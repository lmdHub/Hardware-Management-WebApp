// Error handling middleware for Express
const errorMiddleware = (err, req, res, next) => {
    try {
        // Clone the error object and preserve the message
        let error = { ...err };
        error.message = err.message;

        // Log the error for debugging
        console.log(err);

        // Handle Mongoose CastError (invalid ObjectId, etc.)
        if (err.name === 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`;
            error = new Error(message);
            error.statusCode = 400;
        }

        // Handle MongoDB duplicate key error
        if (err.code === 11000) {
            const message = `Duplicate field value entered: ${JSON.stringify(err.keyValue)}`;
            error = new Error(message);
            error.statusCode = 400;
        }

        // Handle Mongoose validation errors
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message).join(', ');
            error = new Error(message);
            error.statusCode = 400;
        }

        // Send error response to client
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Server Error'
        });
    } catch (error) {
        // Pass any unexpected errors to the next middleware
        next(error);
    }
};

export default errorMiddleware;
