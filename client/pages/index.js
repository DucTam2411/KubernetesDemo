import Link from 'next/link';

const LandingPage = ({ currentUser, tickets }) => {
    const linkStyle = {
        color: 'black',
        textDecorationLine: 'none',
    };
    const ticketList = tickets.map((ticket) => {
        return (
            <tr key={ticket.id}>
                <td className="font-monospace">{ticket.title}</td>
                <td className="font-monospace">{ticket.price}</td>
                <td>
                    <Link
                        href="/tickets/view/[ticketId]"
                        as={`/tickets/view/${ticket.id}`}
                    >
                        <a className="font-monospace" style={linkStyle}>
                            View
                        </a>
                    </Link>
                </td>
            </tr>
        );
    });

    return (
        <div className="container mt-3 ms-3">
            <h1 className="display-5 font-monospace ms-0 ps-0">Now</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th className="font-monospace ms-0 ps-0 fw-bold fs-5">
                            Title
                        </th>
                        <th className="font-monospace ms-0 ps-0 fw-bold fs-5">
                            Price
                        </th>
                        <th className="font-monospace ms-0 ps-0 fw-bold fs-5">
                            Link
                        </th>
                    </tr>
                </thead>
                <tbody>{ticketList}</tbody>
            </table>
        </div>
    );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
    const { data } = await client.get('/api/tickets');

    return { tickets: data };
};

export default LandingPage;
