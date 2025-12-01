import type { Queue, Status } from "../pages/Home";

interface QueueDisplayTabProps {
  queue: Queue[];
  updateQueue: (id: string, newStatus: Status) => void;
  removeFromQueue: (id: string) => void;
}

export default function QueueDisplayTab({ queue, updateQueue, removeFromQueue }: QueueDisplayTabProps) {
  const customColor = (status: Status) => {
    switch (status) {
      case "pending":
        return "bg-gray-400/70 text-gray-500";
      case "in-progress":
        return "bg-yellow-700 text-yellow-700";
      case "completed":
        return "bg-emerald-700 text-emerald-700";
      case "cancelled":
        return "bg-red-600 text-red-600";
    }
  }
  console.log("queue", queue);
  return (
    <div className="w-full max-w-[800px] min-h-full">
      <div className="bg-slate-800 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl shadow-black/20 overflow-hidden">
        <div className="px-8 pt-8 pb-6 border-b border-slate-700/50">
          <h2 className="text-2xl font-semibold text-white tracking-tight">Queue</h2>
        </div>
        <div className="p-8 space-y-4">
          <div className="space-y-2">
            {queue.length === 0 && (
              <p className="text-center text-slate-500 text-xs mt-6">
                Nothing present in the queue now.
              </p>
            )}
            <div className="flex flex-col gap-2">
              {queue.map((item) => (
                <div key={item.id} className="flex flex-col items-center justify-between bg-slate-700/50 p-4 rounded-lg gap-5">
                  <div className="flex items-center justify-between gap-2 w-full px-3">
                    <div className="flex flex-col gap-1 text-neutral-300">
                      <h4 className="font-medium text-xl font-sans text-neutral-100 tracking-tight">{item.customer.name}</h4>
                      <h4 className="text-[12px] font-sans tracking-tight">{"-"} {item.customer.service}</h4>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${customColor(item.status)} animate-pulse duration-1000 infinite`}>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full px-3">
                    {item.status === "pending" && (
                      <button onClick={() => updateQueue(item.id, "in-progress")} className="bg-yellow-700 text-white px-4 py-1 rounded-md">
                        Serve
                      </button>
                    )}
                    {item.status === "in-progress" && (
                      <button onClick={() => updateQueue(item.id, "completed")} className="bg-emerald-700 text-white px-4 py-1 rounded-md">
                        Complete
                      </button>
                    )}
                    {item.status === "completed" && (
                      <button onClick={() => removeFromQueue(item.id)} className="bg-red-700 text-white px-4 py-1 rounded-md">
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}