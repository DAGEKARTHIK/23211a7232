const generateUniqueId = () => 'corr_' + Math.random().toString(36).substr(2, 9);

const logger = {
    info: (data) => console.log(JSON.stringify({ timestamp: new Date().toISOString(), level: 'INFO', ...data })),
    warn: (data) => console.warn(JSON.stringify({ timestamp: new Date().toISOString(), level: 'WARN', ...data })),
    error: (data) => console.error(JSON.stringify({ timestamp: new Date().toISOString(), level: 'ERROR', ...data }))
};

const notificationLoggingMiddleware = (req, res, next) => {
    const startTime = process.hrtime();
    const correlationId = req.headers['x-correlation-id'] || generateUniqueId();
    req.correlationId = correlationId; 
    
  // Simulated user context (In production, retrieve this from your auth middleware)
    req.user = { id: 'usr_4d2e1a3b' }; 
    const userId = req.user ? req.user.id : 'anonymous';

    logger.info({
    message: 'Incoming notification request',
    correlation_id: correlationId,
    user_id: userId,
    method: req.method,
    url: req.originalUrl
    });

    res.on('finish', () => {
    const diff = process.hrtime(startTime);
    const durationMs = (diff * 1e3 + diff * 1e-6).toFixed(2);

    const logPayload = {
        message: 'Notification request processed',
        correlation_id: correlationId,
        user_id: userId,
        method: req.method,
        url: req.originalUrl,
        status_code: res.statusCode,
        duration_ms: parseFloat(durationMs)
    };

    if (res.statusCode >= 500) {
        logger.error({ ...logPayload, error: res.statusMessage });
    } else if (res.statusCode >= 400) {
        logger.warn(logPayload);
    } else {
        logger.info(logPayload);
    }
    });

    next();
};

module.exports = notificationLoggingMiddleware;
