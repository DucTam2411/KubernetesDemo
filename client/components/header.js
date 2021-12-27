import Link from 'next/link';

export default ({ currentUser }) => {
    const divStyle = {
        color: 'black',
    };

    const links = [
        !currentUser && { label: 'Sign Up', href: '/auth/signup' },
        !currentUser && { label: 'Sign In', href: '/auth/signin' },
        currentUser && { label: 'Sell Tickets', href: '/tickets/new' },
        currentUser && { label: 'My Orders', href: '/orders' },
        currentUser && { label: 'Stock', href: '/tickets/mytickets' },
        currentUser && { label: 'Sign Out', href: '/auth/signout' },
    ]
        .filter((linkConfig) => linkConfig)
        .map(({ label, href }) => {
            return (
                <li key={href} className="nav-item">
                    <Link href={href}>
                        <a
                            className="nav-link active font-monospace"
                            style={divStyle}
                        >
                            {label}
                        </a>
                    </Link>
                </li>
            );
        });

    return (
        <nav className="navbar navbar-light bg-light">
            <Link href="/">
                <a className="navbar-brand ms-3 display-5 font-monospace fw-bold ">
                    Ticketing
                </a>
            </Link>

            <div className="d-flex justify-content-end">
                <ul className="nav d-flex align-items-center">{links}</ul>
            </div>
        </nav>
    );
};
