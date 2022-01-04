import Router from 'next/router';
import useRequest from '../../../hooks/use-request';
import { useState } from 'react';
const TicketEdit = ({ ticket, currentUser }) => {
    // const { doRequest, errors } = useRequest({
    //     url: '/api/orders',
    //     method: 'post',
    //     body: {
    //         ticketId: ticket.id,
    //     },
    //     onSuccess: (order) =>
    //         Router.push('/orders/[orderId]', `/orders/${order.id}`),
    // });

    // return (
    //     <div className="container-fluid mt-3 mx-4">
    //         <p className="fs-1 font-monospace ms-2">
    //             <span fontWeight="bold ">{ticket.title} </span>
    //         </p>
    //         <p className="font-monospace ms-2 mt-0 fw-bolder text-muted">
    //             Price: {ticket.price}
    //         </p>
    //         {errors}
    //         {ticket.userId !== currentUser.id ? (
    //             <button
    //                 onClick={() => doRequest()}
    //                 className="btn btn-dark rounded-0 py-3 fs-5 w-25 font-monospace ms-1"
    //             >
    //                 Purchase
    //             </button>
    //         ) : (
    //             <div>
    //                 <button className="btn btn-outline-dark py-3 font-monospace btn-lg fs-5 rounded-0 disabled">
    //                     This is your ticket
    //                 </button>
    //                 <button
    //                     style={{
    //                         radius: '0',
    //                     }}
    //                     className="btn btn-dark rounded-0 py-3 fs-5 font-monospace "
    //                 >
    //                     Edit
    //                 </button>
    //             </div>
    //         )}
    //     </div>
    // );

    const [title, setTitle] = useState(ticket.title);
    const [price, setPrice] = useState(ticket.price);
    const { doRequest, errors } = useRequest({
        url: `/api/tickets/${ticket.id}`,
        method: 'put',
        body: {
            title,
            price,
        },
        onSuccess: () => Router.push('/'),
    });

    const onSubmit = (event) => {
        event.preventDefault();
        doRequest();
    };

    const onBlur = () => {
        const value = parseFloat(price);
        if (isNaN(value)) {
            return;
        }
        setPrice(value.toFixed(2));
    };

    return (
        <div className="container mx-2 mt-4">
            <h1 className="display-6 font-monospace ms-3 mb-2">
                Update a Ticket
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group ms-3 mt-3  font-monospace">
                    <label className="h4">Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control font-monospace rounded-0 w-50"
                    />
                </div>
                <div className="form-group my-3 ms-3 font-monospace">
                    <label className="h4">Price</label>
                    <input
                        value={price}
                        onBlur={onBlur}
                        onChange={(e) => setPrice(e.target.value)}
                        className="form-control font-monospace rounded-0 w-50"
                    />
                </div>

                {errors}
                <button className="btn btn-dark rounded-0 mt-2 py-3 fs-5 w-25 ms-3 font-monospace">
                    Submit
                </button>
            </form>
        </div>
    );
};

TicketEdit.getInitialProps = async (context, client, currentUser) => {
    const { ticketId } = context.query;
    const { data } = await client.get(`/api/tickets/${ticketId}`);

    return { ticket: data };
};

export default TicketEdit;
