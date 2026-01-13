import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TopNavBar from './TopNavBar';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import './Layout.css';

export default function Layout() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const closeSidebar = () => {
        setSidebarCollapsed(true);
    };

    return (
        <div className="app-layout">
            <TopNavBar onToggleSidebar={toggleSidebar} />
            <Sidebar isCollapsed={sidebarCollapsed} onClose={closeSidebar} />

            <main className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
                <div className="page-container">
                    <Outlet />
                </div>
            </main>

            <MobileNav />
        </div>
    );
}
