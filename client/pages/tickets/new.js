import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const NewTicket = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/tickets',
        method: 'post',
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
                Create a Ticket
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group ms-3 font-monospace">
                    <label className="h4">Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control font-monospace"
                    />
                </div>
                <div className="form-group my-3 ms-3 font-monospace">
                    <label className="h4">Price</label>
                    <input
                        value={price}
                        onBlur={onBlur}
                        onChange={(e) => setPrice(e.target.value)}
                        className="form-control font-monospace"
                    />
                </div>
                {errors}
                <button className="btn btn-dark ms-3 font-monospace">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default NewTicket;
