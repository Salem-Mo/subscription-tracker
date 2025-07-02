const errorMiddleware = (err, req, res, next) => {
    // Fallback status
    let statusCode = err.statusCode || 500;

    // Validation error
    if (err.name === "ValidationError") {
        statusCode = 400;
        return res.status(statusCode).json({
            success: false,
            message: "Validation failed",
            errors: Object.values(err.errors).map((e) => e.message),
        });
    }

    // CastError (e.g. invalid ObjectId)
    if (err.name === "CastError") {
        statusCode = 400;
        return res.status(statusCode).json({
            success: false,
            message: `Invalid ${err.path}: ${err.value}`,
        });
    }

    // Duplicate key
    if (err.code === 11000) {
        statusCode = 400;
        return res.status(statusCode).json({
            success: false,
            message: `Duplicate key: ${Object.keys(err.keyValue).join(", ")} already exists`,
        });
    }

    // fallback generic
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
};

export default errorMiddleware;
