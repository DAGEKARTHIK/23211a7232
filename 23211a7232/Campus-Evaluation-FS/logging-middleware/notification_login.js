const express = require('express');
const router = express.Router();
const notificationLogger = require('./notificationLogger');
const notificationRoutes = require('../routes/notifications');

// Mount the logger middleware strictly onto the notification routes
router.use('/', notificationLogger, notificationRoutes);

module.exports = router;
