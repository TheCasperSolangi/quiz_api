import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import {
    User,
    Key,
    History,
    Plus,
    CheckCircle2,
    AlertCircle,
    Loader2,
    ExternalLink,
    Shield,
    Activity,
    LogOut,
    Copy,
    Check
} from "lucide-react";

interface UserProfile {
    id: string;
    email: string;
    full_name: string;
    organization_name: string;
}

interface ApiKeySummary {
    total_keys: number;
    active_keys: number;
    revoked_keys: number;
    exhausted_keys: number;
    total_requests: number;
    total_remaining: number;
    total_limit: number;
    overall_usage_percentage: number;
}

interface ApiKey {
    _id: string;
    key: string;
    revoked: boolean;
    max_requests: number;
    requests: number;
    remaining: number;
    createdAt: string;
    status: string;
    created_at_formatted: string;
}

const MyProfile = () => {
    const [activeTab, setActiveTab] = useState<"profile" | "keys" | "logs">("profile");
    const [user, setUser] = useState<UserProfile | null>(null);
    const [keySummary, setKeySummary] = useState<ApiKeySummary | null>(null);
    const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
    const [loading, setLoading] = useState(true);
    const [creatingKey, setCreatingKey] = useState(false);
    const [error, setError] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [newApiKey, setNewApiKey] = useState("");
    const [copied, setCopied] = useState(false);

    const token = Cookies.get("token");

    useEffect(() => {
        if (!token) {
            window.location.href = "/signup";
            return;
        }
        fetchData();
    }, [token]);

    const fetchData = async () => {
        setLoading(true);
        setError("");
        try {
            const headers = { Authorization: `Bearer ${token}` };

            // Fetch User Profile
            const userRes = await fetch("https://api.deskarro.com/api/auth/me", { headers });
            const userData = await userRes.json();
            if (userData.user) setUser(userData.user);

            // Fetch API Keys
            const keysRes = await fetch("https://api.deskarro.com/api/keys", { headers });
            const keysData = await keysRes.json();
            if (keysData.success) {
                setKeySummary(keysData.summary);
                setApiKeys(keysData.api_keys);
            }
        } catch (err) {
            setError("Failed to fetch data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const createApiKey = async () => {
        setCreatingKey(true);
        setError("");
        try {
            const res = await fetch("https://api.deskarro.com/api/keys", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ max_requests: 2000 })
            });
            const data = await res.json();
            if (data.apiKey) {
                setNewApiKey(data.apiKey);
                setShowSuccessModal(true);
                await fetchData(); // Refresh list
            }
        } catch (err) {
            setError("Could not create API key.");
        } finally {
            setCreatingKey(false);
        }
    };

    const handleCopyKey = () => {
        navigator.clipboard.writeText(newApiKey).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        setNewApiKey("");
        setCopied(false);
    };

    const handleLogout = () => {
        Cookies.remove("token");
        localStorage.clear();
        window.location.href = "/signup";
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-orange-500 animate-spin" />
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-[#020617] text-white selection:bg-orange-500/30 font-sans">
                {/* Background Decor */}
                <div className="fixed inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px]" />
                </div>

                {/* Success Modal */}
                <AnimatePresence>
                    {showSuccessModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6"
                            onClick={handleCloseModal}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-orange-500/30 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-orange-500/10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">API Key Created Successfully!</h3>
                                    <p className="text-gray-400 mb-6">
                                        Please copy it and secure it seriously. You won't be able to see it again.
                                    </p>
                                </div>

                                <div className="relative mb-6">
                                    <div className="bg-black/40 border border-white/10 rounded-xl p-4 pr-20">
                                        <p className="text-sm font-mono text-gray-300 truncate select-all">
                                            {newApiKey}
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleCopyKey}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg font-bold text-white text-sm hover:opacity-90 transition-opacity"
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="h-4 w-4" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="h-4 w-4" />
                                                Copy
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 mb-6">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                                        <p className="text-sm text-orange-300">
                                            <span className="font-bold">Important:</span> This is the only time you'll see your API key. Store it securely and never share it publicly.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCloseModal}
                                    className="w-full px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all"
                                >
                                    I've Copied My Key
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <h1 className="text-4xl font-extrabold tracking-tight mb-2 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                                    <span className="text-xl font-black">D</span>
                                </div>
                                My Profile
                            </h1>
                            <p className="text-gray-400">Manage your Deskarro account, API keys, and logs.</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-semibold text-gray-300 hover:text-white"
                        >
                            <LogOut size={18} /> Sign Out
                        </button>
                    </header>

                    {/* Navigation Tabs */}
                    <div className="flex bg-white/5 border border-white/10 p-1.5 rounded-2xl mb-10 w-fit">
                        {[
                            { id: "profile", label: "Overview", icon: User },
                            { id: "keys", label: "API Keys", icon: Key },
                            { id: "logs", label: "Usage Logs", icon: History }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id
                                    ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/20"
                                    : "text-gray-400 hover:text-gray-200"
                                    }`}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {activeTab === "profile" && (
                            <motion.div
                                key="profile"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                            >
                                <div className="lg:col-span-2 space-y-8">
                                    <section className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                            <Shield className="text-orange-500" size={20} /> Personal Information
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Full Name</p>
                                                <p className="text-lg font-medium">{user?.full_name}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Email Address</p>
                                                <p className="text-lg font-medium">{user?.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Organization</p>
                                                <p className="text-lg font-medium">{user?.organization_name || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">User ID</p>
                                                <p className="text-gray-400 font-mono text-sm">{user?.id}</p>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="bg-gradient-to-br from-orange-500/10 to-red-600/10 border border-orange-500/20 rounded-3xl p-8">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-xl font-bold flex items-center gap-2">
                                                <Activity className="text-orange-500" size={20} /> Subscription Status
                                            </h3>
                                            <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-black uppercase tracking-tighter rounded-full border border-orange-500/30">Starter</span>
                                        </div>
                                        <p className="text-gray-300 leading-relaxed mb-6">
                                            Your account is currently in the Starter phase. You have access to create up to 5 API keys with a base limit of 2,000 requests per key.
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <button className="px-6 py-2.5 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors text-sm shadow-lg shadow-orange-500/20">
                                                Upgrade Plan
                                            </button>
                                            <button className="px-6 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-colors text-sm">
                                                View Billing
                                            </button>
                                        </div>
                                    </section>
                                </div>

                                <div className="space-y-8">
                                    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                                        <h3 className="text-lg font-bold mb-4">Quick Summary</h3>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-400">Total API Keys</span>
                                                <span className="font-bold">{keySummary?.total_keys || 0}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-400">Total Requests</span>
                                                <span className="font-bold">{keySummary?.total_requests || 0}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-400">Remaining</span>
                                                <span className="font-bold text-orange-500">{keySummary?.total_remaining || 0}</span>
                                            </div>
                                            <div className="pt-4 border-t border-white/5">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Usage Percentage</span>
                                                    <span className="text-xs font-bold text-gray-300">{keySummary?.overall_usage_percentage || 0}%</span>
                                                </div>
                                                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${keySummary?.overall_usage_percentage || 0}%` }}
                                                        className="h-full bg-gradient-to-r from-orange-500 to-red-600"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "keys" && (
                            <motion.div
                                key="keys"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-8"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1">Active Credentials</h3>
                                        <p className="text-gray-400 text-sm">Manage your secret keys for accessing Deskarro API.</p>
                                    </div>
                                    <button
                                        onClick={createApiKey}
                                        disabled={creatingKey}
                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-bold text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all active:scale-95 disabled:opacity-50"
                                    >
                                        {creatingKey ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
                                        New API Key
                                    </button>
                                </div>

                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3">
                                        <AlertCircle size={20} /> {error}
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {apiKeys.map((key) => (
                                        <motion.div
                                            layout
                                            key={key._id}
                                            className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all flex flex-col group"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${key.status === "active" ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-red-500/10 border-red-500/30 text-red-400"
                                                    }`}>
                                                    {key.status}
                                                </span>
                                                <span className="text-xs text-gray-500">{key.created_at_formatted}</span>
                                            </div>

                                            <div className="bg-black/20 rounded-xl p-3 mb-6 relative group/key overflow-hidden">
                                                <p className="text-xs font-mono text-gray-400 truncate">
                                                    {key.key}
                                                </p>
                                            </div>

                                            <div className="space-y-4 mt-auto">
                                                <div>
                                                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">
                                                        <span>Usage Limit</span>
                                                        <span>{key.requests} / {key.max_requests}</span>
                                                    </div>
                                                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-orange-500"
                                                            style={{ width: `${(key.requests / key.max_requests) * 100}%` }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-gray-400">Remaining</span>
                                                    <span className="font-bold text-white">{key.remaining}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                    {apiKeys.length === 0 && !loading && (
                                        <div className="col-span-full py-20 text-center bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
                                            <Key className="mx-auto text-gray-700 mb-4" size={48} />
                                            <h3 className="text-xl font-bold mb-2">No API keys found</h3>
                                            <p className="text-gray-500 mb-6">Create your first key to start using Deskarro API.</p>
                                            <button
                                                onClick={createApiKey}
                                                className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all"
                                            >
                                                Create API Key
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "logs" && (
                            <motion.div
                                key="logs"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-20 text-center"
                            >
                                <History className="mx-auto text-gray-700 mb-6" size={64} />
                                <h3 className="text-2xl font-bold mb-3">No activity logs yet</h3>
                                <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
                                    nothing to show right now use your api to view logs. Once you start making requests, detailed analytics will appear here.
                                </p>
                                <div className="mt-10 flex justify-center gap-4">
                                    <a href="https://docs.deskarro.com" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-bold hover:bg-white/10 transition-all">
                                        Documentation <ExternalLink size={18} />
                                    </a>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
};

export default MyProfile;