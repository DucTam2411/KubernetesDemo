import Router from 'next/router';
import useRequest from '../../../hooks/use-request';

const TicketShow = ({ ticket, currentUser }) => {
    const fontStyle = { fontWeight: '500' };
    const buttonStyle = {
        border: '0',
    };

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
            <p className="font-monospace ms-2 mt-0 fw-bolder text-muted">
                Price: {ticket.price}
            </p>
            {errors}
            {ticket.userId !== currentUser.id ? (
                <button
                    onClick={() => doRequest()}
                    className={
                        ticket.orderId === undefined
                            ? 'btn btn-dark rounded-0 py-3 fs-5 w-25 font-monospace ms-1'
                            : 'btn btn-outline-dark py-3 fs-5 w-25  font-monospace  rounded-0 disabled'
                    }
                >
                    {ticket.orderId === undefined
                        ? 'Purchase'
                        : 'This has been purchased or reserved'}
                </button>
            ) : (
                <div>
                    <button className="btn btn-outline-dark py-3 font-monospace btn-lg fs-5 rounded-0 disabled">
                        This is your ticket
                    </button>

                    <button
                        onClick={() =>
                            Router.push(
                                '/tickets/edit/[ticketId]',
                                `/tickets/edit/${ticket.id}`
                            )
                        }
                        className="btn btn-dark rounded-0 py-3 fs-5 font-monospace "
                    >
                        Edit
                    </button>
                </div>
            )}
        </div>
    );
};

TicketShow.getInitialProps = async (context, client, currentUser) => {
    const { ticketId } = context.query;
    const { data } = await client.get(`/api/tickets/${ticketId}`);

    return { ticket: data };
};

export default TicketShow;
