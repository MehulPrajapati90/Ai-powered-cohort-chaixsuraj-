import { Queue } from 'bullmq';

const notificationQueue = new Queue('email-queue', {
    connection: {
        host: "127.0.0.1",
        port: '6379'
    }
});

const init = async () => {
    const res = await notificationQueue.add('email to mehul', {
        email: "ailearn90@gmail.com",
        subject: "Welcome Message",
        body: "Hey, Piyush Welcome"
    });
    console.log("Job added to queue", res.id);
};

init();
