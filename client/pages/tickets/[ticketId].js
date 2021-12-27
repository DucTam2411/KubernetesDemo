import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const TicketShow = ({ ticket }) => {
    const fontStyle = { fontWeight: '500' };

    const { doRequest, errors } = useRequest({
        url: '/api/orders',
        method: 'post',
        body: {
            ticketId: ticket.id,
        },
        onSuccess: (order) =>
            Router.push('/orders/[orderId]', `/orders/${order.id}`),
    });

    return (
        <div className="container-fluid mt-3 mx-4">
            <p className="fs-1 font-monospace ms-2">
                <span fontWeight="bold ">{ticket.title} </span>
            </p>
            <p className="font-monospace ms-2 mt-0">Price: {ticket.price}</p>
            {errors}
            <button
                onClick={() => doRequest()}
                className="btn btn-dark font-monospace ms-1"
            >
                Purchase
            </button>
        </div>
    );
};

TicketShow.getInitialProps = async (context, client) => {
    const { ticketId } = context.query;
    const { data } = await client.get(`/api/tickets/${ticketId}`);

    return { ticket: data };
};

export default TicketShow;
