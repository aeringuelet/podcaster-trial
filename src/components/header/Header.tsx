import { Link, Outlet } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <header className='py-6 px-8 shadow-lg border-b mb-8 sticky w-full z-20 bg-white'>
                <div className='flex flex-row justify-between items-center'>
                    <Link to={'/'}>
                        <p className='text-lg font-bold text-orange-700 uppercase'>
                            Podcaster
                        </p>
                    </Link>
                    <div className='flex h-3 w-3 mr-4'>
                        <span className='animate-ping absolute inline-flex h-3 w-3 rounded-full bg-orange-700 opacity-75'></span>
                        <span className='relative inline-flex rounded-full h-3 w-3 bg-orange-700'></span>
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    );
};

export default Header;
