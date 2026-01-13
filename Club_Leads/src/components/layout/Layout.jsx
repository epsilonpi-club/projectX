import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import './Layout.css';

export default function Layout() {
    return (
        <div className="app-layout">
            <Sidebar />
            <TopNav />
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}
