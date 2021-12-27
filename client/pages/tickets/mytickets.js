// import Router from 'next/router';
// import useRequest from '../../hooks/use-request';

// const MyTicket = ({ ticket }) => {
//     const { doRequest, errors } = useRequest({
//         url: '/api/orders',
//         method: 'post',
//         body: {
//             ticketId: ticket.id,
//         },
//         onSuccess: (order) =>
//             Router.push('/orders/[orderId]', `/orders/${order.id}`),
//     });

//     return (
//         <div>
//             <h1>{ticket.title}</h1>
//             <h4>Price: {ticket.price}</h4>
//             {errors}
//             <button onClick={() => doRequest()} className="btn btn-primary">
//                 Purchase
//             </button>
//         </div>
//     );
// };

// MyTicket.getInitialProps = async (context, client) => {
//     const { ticketId } = context.query;
//     const { data } = await client.get(`/api/tickets/${ticketId}`);

//     return { ticket: data };
// };

// export default MyTicket;

// import Router from 'next/router';

const MyTicket = ({ tickets }) => {
    const ticketList = tickets.map((ticket) => {
        return (
            <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>{ticket.price}</td>
                <td>
                    <Link
                        href="/tickets/[ticketId]"
                        as={`/tickets/${ticket.id}`}
                    >
                        <a>View</a>
                    </Link>
                </td>
            </tr>
        );
    });

    return (
        <div className="container mt-3">
            <h1>Tickets</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>{ticketList}</tbody>
            </table>
        </div>
    );
};

MyTicket.getInitialProps = async (context, client, currentUser) => {
    // const { ticketId } = context.query;
    // const { data } = await client.get(`/api/tickets/${ticketId}`);

    const { data } = await client.get('/api/tickets/stock');

    return {
        tickets: data,
    };
};

export default MyTicket;
