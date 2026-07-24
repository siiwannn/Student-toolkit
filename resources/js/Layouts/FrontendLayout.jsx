import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { User, LogOut, LayoutDashboard } from 'lucide-react';

export default function FrontendLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen flex flex-col bg-[#F8F9FC] text-gray-900 selection:bg-[#7132F5] selection:text-white">
            {/* Navbar */}
            <nav className="bg-white shadow-sm border-b border-[#DEDEE5] sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center gap-2">
                                <ApplicationLogo className="block h-8 w-auto fill-current text-[#7132F5]" />
                                <span className="font-bold text-xl text-[#101114] tracking-tight">Student Toolkit</span>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            {auth?.user ? (
                                <div className="hidden sm:flex sm:items-center sm:ms-6">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-[#101114] bg-white hover:text-[#7132F5] focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {auth.user.name}

                                                    <svg
                                                        className="ms-2 -me-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('dashboard')}>
                                                <div className="flex items-center">
                                                    <LayoutDashboard className="w-4 h-4 mr-2" />
                                                    Dashboard
                                                </div>
                                            </Dropdown.Link>
                                            <Dropdown.Link href={route('profile.edit')}>
                                                <div className="flex items-center">
                                                    <User className="w-4 h-4 mr-2" />
                                                    Profile
                                                </div>
                                            </Dropdown.Link>
                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                <div className="flex items-center text-red-600">
                                                    <LogOut className="w-4 h-4 mr-2" />
                                                    Log Out
                                                </div>
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-sm font-semibold text-[#9497A9] hover:text-[#101114] px-4 py-2 transition-colors"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-[#7132F5] hover:bg-[#5a27c4] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Page Content */}
            <main className="flex-1 flex flex-col">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-[#DEDEE5] py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-[#9497A9]">
                    <p>&copy; {new Date().getFullYear()} Student Toolkit. Built for students.</p>
                </div>
            </footer>
        </div>
    );
}
