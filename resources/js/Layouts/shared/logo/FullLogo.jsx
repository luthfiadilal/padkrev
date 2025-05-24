import { Link } from 'react-router';

const FullLogo = () => {
    return (
        <Link to={'/'}>
            <div className="flex h-[60px] items-center justify-center bg-green-300">
                <img
                    src="storage/img/padkrevlogo.png"
                    alt="logo"
                    className="object-cover"
                />
            </div>
        </Link>
    );
};

export default FullLogo;
