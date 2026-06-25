const express = require('express');
const app = express();
const notificationModule = require('./logging-middleware/notification_login');

app.use(express.json());


app.use('/api/v1/notifications', notificationModule);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running smoothly on http://localhost:${PORT}`);
});
