import Link from 'next/link';

const OrderIndex = ({ orders }) => {
    const cardStyle = {
        width: '18rem',
    };
    const linkStyle = {
        color: 'black',
        textDecorationLine: 'none',
    };

    const listStyle = {
        listStyle: 'none',
    };
    return (
        <div className="container ms-3 my-5 ">
            <h1 className="display-5 font-monospace ms-0 ps-0">History</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th className="font-monospace ms-0 ps-0 fw-bold fs-5">
                            Title
                        </th>
                        <th className="font-monospace ms-0 ps-0 fw-bold fs-5">
                            Price
                        </th>
                        <th className="font-monospace ms-0 ps-1 fw-bold fs-5">
                            Status
                        </th>
                        <th className="font-monospace ms-0 ps-0 fw-bold fs-5">
                            Link
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) => {
                        return (
                            <tr key={order.ticket.id}>
                                <td className="font-monospace">
                                    {order.ticket.title}
                                </td>
                                <td className="font-monospace">
                                    {order.ticket.price}
                                </td>
                                <td className="font-monospace">
                                    {order.status === 'created'
                                        ? 'wait to pay'
                                        : order.status}
                                </td>
                                <td>
                                    <Link
                                        href="/tickets/[ticketId]"
                                        as={`/tickets/${order.ticket.id}`}
                                    >
                                        <a
                                            className="font-monospace"
                                            style={linkStyle}
                                        >
                                            View
                                        </a>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

OrderIndex.getInitialProps = async (context, client) => {
    const { data } = await client.get('/api/orders');

    return { orders: data };
};

export default OrderIndex;

// const OrderIndex = ({ orders }) => {
//     const cardStyle = {
//         width: '18rem',
//     };

//     const listStyle = {
//         listStyle: 'none',
//     };
//     return (
//         <ul>
//             {orders.map((order) => {
//                 return (
//                     <li
//                         className="list-group list-group-horizontal mt-3"
//                         key={order.id}
//                     >
//                         {/* {order.ticket.title} - {order.status}

//                         */}
//                         <div className="card my-2" style={cardStyle}>
//                             <div class="card-body ">
//                                 <h5 class="card-title font-monospace fs-2">
//                                     {order.ticket.title}
//                                 </h5>
//                                 <h6 class="card-subtitle mb-2 text-muted fs-5 font-monospace">
//                                     Price{' '}
//                                     <span className="fw-bolder">
//                                         {order.ticket.price}
//                                     </span>
//                                 </h6>
//                                 <p class="card-text font-monospace">
//                                     Status: Cancel
//                                 </p>
//                             </div>
//                         </div>
//                     </li>
//                 );
//             })}
//         </ul>
//     );
// };

// OrderIndex.getInitialProps = async (context, client) => {
//     const { data } = await client.get('/api/orders');

//     return { orders: data };
// };

// export default OrderIndex;
