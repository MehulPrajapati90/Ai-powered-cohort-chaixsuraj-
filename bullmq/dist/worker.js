import { Worker } from 'bullmq';
import { Redis } from 'ioredis';
const sendEmail = () => new Promise((res, rej) => setTimeout(() => res(), 5 * 1000));
const connection = new Redis({ maxRetriesPerRequest: null });
const worker = new Worker("email-queue", (job) => {
    console.log(`Message response id: ${job.id}`);
    console.log(`Processing message`);
    console.log(`Sending email to ${job.data.email}`);
    return sendEmail();
}, { connection });
//# sourceMappingURL=worker.js.map