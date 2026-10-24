import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "../../components/header/header"
import { Sidebar } from "../../components/sidebar/sidebar"
import './layout.scss'

export const Layout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (!isMenuOpen) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
            }
        };
        const handleResize = () => {
            if (window.matchMedia("(min-width: 768px)").matches) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("resize", handleResize);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("resize", handleResize);
        };
    }, [isMenuOpen]);

    return (
        <div className={`app${isMenuOpen ? " menu-open" : ""}`}>
            <Header
                isMenuOpen={isMenuOpen}
                onMenuToggle={() => setIsMenuOpen((open) => !open)}
            />

            <div className="app_body">
                <div className="container">

                    <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

                    <main className='app_content'>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    )
}