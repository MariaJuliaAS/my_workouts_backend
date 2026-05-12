import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 3,
    message: "Too many login attempts, please try again later."
})

export { rateLimiter };