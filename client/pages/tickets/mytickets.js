// import Router from 'next/router';
// import useRequest from '../../hooks/use-request';

import Link from 'next/link';

const MyTicket = ({ tickets }) => {
    const linkStyle = {
        color: 'black',
        textDecorationLine: 'none',
    };

    const ticketList = tickets.map((ticket) => {
        return (
            <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>{ticket.price}</td>
                <td>
                    <Link
                        href="/tickets/view/[ticketId]"
                        as={`/tickets/view/${ticket.id}`}
                    >
                        <a style={linkStyle}>View</a>
                    </Link>
                </td>
            </tr>
        );
    });

    return (
        <div className="container mt-5 ms-3 font-monospace">
            <h1 className="display-5 font-monospace ms-0 ps-0 ">
                Your selling tickets
            </h1>

            <table className="table font-monospace">
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

MyTicket.getInitialProps = async (context, client, currentUser) => {
    const { data } = await client.get('/api/tickets/stock');

    return {
        tickets: data,
    };
};

export default MyTicket;
