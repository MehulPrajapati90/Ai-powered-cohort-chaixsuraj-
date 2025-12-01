import { useState } from "react";
import QueueForm from "../components/QueueForm";
import QueueDisplayTab from "../components/QueueDisplayTab";
import { v4 as uuidv4 } from 'uuid';

export type Status = "pending" | "in-progress" | "completed" | "cancelled";

export interface Customer {
    name: string;
    service: string;
}

export interface Queue {
    id: string;
    status: Status;
    customer: Customer;
}

export default function Home() {
    const [queue, setQueue] = useState<Queue[]>([]);

    console.log("queue", queue);

    const addToQueue = (customer: Customer) => {
        setQueue([...queue, { id: uuidv4(), customer, status: "pending" }]);
    }
    const updateQueue = (id: string, newStatus: Status) => {
        setQueue(queue.map(item => item.id === id ? { ...item, status: newStatus } : item));
    }
    const removeFromQueue = (id: string) => {
        setQueue(queue.filter(item => item.id !== id));
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <div className="bg-white p-4 rounded-md">
                <h1 className="text-2xl font-bold">Queue Management System</h1>
                <p className="text-gray-500">Welcome to the queue management system</p>
            </div>

            <div className="flex justify-center gap-4 w-full min-h-full">
                <QueueForm addToQueue={addToQueue} />
                <QueueDisplayTab 
                    queue={queue}
                    updateQueue={updateQueue}
                    removeFromQueue={removeFromQueue}
                />
            </div>
        </div>
    );
}