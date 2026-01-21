import SACSidebar from './SACSidebar';
import SACTopNav from './SACTopNav';
import './SACLayout.css';

export default function SACLayout({ children }) {
    return (
        <div className="sac-layout">
            <SACSidebar />
            <div className="sac-main">
                <SACTopNav />
                <main className="sac-content">
                    {children}
                </main>
            </div>
        </div>
    );
}
