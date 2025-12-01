import { useState } from "react";

export default function QueueForm({ addToQueue }: { addToQueue: (customer: any) => void }) {
    const [personName, setPersonName] = useState("");
    const [serviceName, setServiceName] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!personName.trim() || !serviceName.trim()) {
            return;
        };

        addToQueue({ name: personName, service: serviceName });
        handleCancel();
    }

    const handleCancel = () => {
        setPersonName("");
        setServiceName("");
    }

    return (
        <div className="w-full max-w-md">
            {/* Card Container */}
            <div className="bg-slate-800 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl shadow-black/20 overflow-hidden">
                {/* Header */}
                <div className="px-8 pt-8 pb-6 border-b border-slate-700/50">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-white tracking-tight">Join Queue</h2>
                    </div>
                    <p className="text-slate-400 text-sm">Enter your details to be added to the service queue</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-4">
                    {/* Person Name Field */}
                    <div className="space-y-2">
                        <label htmlFor="personName" className="block text-sm font-medium text-slate-300">
                            Your Name
                        </label>
                        <input
                            id="personName"
                            type="text"
                            placeholder="Enter your full name"
                            value={personName}
                            onChange={(e) => setPersonName(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 
                                         focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 
                                         transition-all duration-200 ease-out"
                        />
                    </div>

                    {/* Service Selection */}
                    <div className="space-y-2">
                        <label htmlFor="serviceName" className="block text-sm font-medium text-slate-300">
                            Select Service
                        </label>
                        <div className="relative">
                            <select
                                id="serviceName"
                                value={serviceName}
                                onChange={(e) => setServiceName(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white appearance-none cursor-pointer
                                             focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 
                                             transition-all duration-200 ease-out"
                            >
                                <option value="" disabled className="bg-slate-800">Choose a service...</option>
                                <option value="Service 1" className="bg-slate-800">Service 1</option>
                                <option value="Service 2" className="bg-slate-800">Service 2</option>
                                <option value="Service 3" className="bg-slate-800">Service 3</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex-1 px-6 py-3 bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 rounded-xl text-slate-300 font-medium
                                         transition-all duration-200 ease-out hover:border-slate-500/50 active:scale-[0.98]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 
                                         rounded-xl text-white font-semibold shadow-lg shadow-emerald-500/25
                                         transition-all duration-200 ease-out active:scale-[0.98] hover:shadow-emerald-500/40"
                        >
                            Add to Queue
                        </button>
                    </div>
                </form>
            </div>

            {/* Footer hint */}
            <p className="text-center text-slate-500 text-xs mt-6">
                You'll receive a notification when it's your turn
            </p>
        </div>
    )
}