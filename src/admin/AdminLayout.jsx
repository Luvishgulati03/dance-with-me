import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Calendar, Building2, CreditCard, HelpCircle, Star, Users, Image, LogOut, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/content', label: 'Page Content', icon: FileText },
    { path: '/admin/events', label: 'Events', icon: Calendar },
    { path: '/admin/studios', label: 'Studios', icon: Building2 },
    { path: '/admin/plans', label: 'Plans', icon: CreditCard },
    { path: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
    { path: '/admin/features', label: 'Features', icon: Star },
    { path: '/admin/personas', label: 'Personas', icon: Users },
    { path: '/admin/media', label: 'Media', icon: Image },
];

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            navigate('/admin');
            return;
        }
        // Verify token
        fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => { if (!res.ok) throw new Error(); })
            .catch(() => { localStorage.removeItem('admin_token'); navigate('/admin'); });
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem('admin_token');
        navigate('/admin');
    };

    return (
        <div className="min-h-screen bg-brand-darker flex">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-brand-dark border-r border-white/10 flex flex-col transform transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="p-6 border-b border-white/10">
                    <Link to="/" className="text-brand-gold font-bold text-lg uppercase tracking-wider">
                        Trillion Dancers
                    </Link>
                    <p className="text-brand-textMuted text-xs mt-1">Admin Panel</p>
                </div>
                <nav className="flex-1 py-4 overflow-y-auto">
                    {NAV_ITEMS.map(item => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${isActive ? 'text-brand-gold bg-brand-purple/20 border-r-2 border-brand-gold' : 'text-brand-textMuted hover:text-white hover:bg-white/5'}`}
                            >
                                <Icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl w-full transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top bar */}
                <header className="bg-brand-dark/50 border-b border-white/10 px-6 py-4 flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden text-white hover:text-brand-gold transition-colors"
                    >
                        {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                    <h2 className="text-white font-semibold text-lg">
                        {NAV_ITEMS.find(i => i.path === location.pathname)?.label || 'Admin'}
                    </h2>
                </header>
                {/* Page content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
