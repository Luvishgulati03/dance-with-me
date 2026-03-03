import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
            <Navbar />
            <main className="flex-grow pt-16 lg:pt-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
