// Mock database store for execution testing
let mockNotifications = [
    {
    id: "notif_89f7a2c1",
    recipient_id: "usr_4d2e1a3b",
    sender: { id: "usr_9b8c7d6e", name: "Jane Doe", avatar_url: "https://example.com" },
    type: "COMMENT_LIKE",
    title: "New Like",
    body: "Jane Doe liked your comment on post 'System Architecture'.",
    is_read: false,
    action_url: "https://example.com",
    created_at: "2026-06-25T14:10:00Z"
    }
];

exports.getNotifications = (req, res) => {
    res.status(200).json({
    success: true,
    data: {
        notifications: mockNotifications,
        pagination: { current_page: 1, per_page: 20, total_count: mockNotifications.length, total_pages: 1 }
    }
    });
};

exports.getUnreadCount = (req, res) => {
    const unread = mockNotifications.filter(n => !n.is_read).length;
    res.status(200).json({ success: true, data: { unread_count: unread } });
};

exports.markAsRead = (req, res) => {
    const { id } = req.params;
    const notif = mockNotifications.find(n => n.id === id);
    
    if (!notif) {
    return res.status(404).json({ success: false, message: "Notification not found" });
    }

    notif.is_read = true;
    res.status(200).json({
    success: true,
    message: "Notification marked as read.",
    data: { id: notif.id, is_read: true, read_at: new Date().toISOString() }
    });
};

exports.bulkMarkAsRead = (req, res) => {
    let count = 0;
    mockNotifications.forEach(n => {
    if (!n.is_read) { n.is_read = true; count++; }
    });
    res.status(200).json({ success: true, message: "All notifications marked as read.", data: { affected_rows: count } });
};
