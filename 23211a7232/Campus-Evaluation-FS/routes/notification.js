const express = require('express');
const router = express.Router();
const controller = require('../controllers/notifications');

router.get('/', controller.getNotifications);
router.get('/unread-count', controller.getUnreadCount);
router.patch('/:id/read', controller.markAsRead);
router.post('/read-all', controller.bulkMarkAsRead);

module.exports = router;
