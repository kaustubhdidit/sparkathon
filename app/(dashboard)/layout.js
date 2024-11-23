'use client';
// import node module libraries
import { useState, useEffect } from 'react';

// import theme style scss file
import 'styles/theme.scss';
import { useRouter } from 'next/navigation';
// import sub components
import NavbarVertical from '/layouts/navbars/NavbarVertical';
import NavbarTop from '/layouts/navbars/NavbarTop';

export default function DashboardLayout({ children }) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showMenu, setShowMenu] = useState(true);

    // Client-side check for localStorage
    useEffect(() => {
		console.log("Env Variable "+process.env.NEXT_PUBLIC_BACKEND_URL)
        if (!localStorage.getItem("authData")) {
            router.push('/authentication/sign-in');
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    const ToggleMenu = () => {
        setShowMenu(!showMenu);
    };

    // Render nothing while checking authentication
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div id="db-wrapper" className={`${showMenu ? '' : 'toggled'}`}>
            <div className="navbar-vertical navbar">
                <NavbarVertical
                    showMenu={showMenu}
                    onClick={(value) => setShowMenu(value)}
                />
            </div>
            <div id="page-content">
                <div className="header">
                    <NavbarTop
                        data={{
                            showMenu: showMenu,
                            SidebarToggleMenu: ToggleMenu,
                        }}
                    />
                </div>
                {children}
            </div>
        </div>
    );
}
