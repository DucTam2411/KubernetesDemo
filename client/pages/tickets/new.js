import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const NewTicket = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/tickets',
        method: 'post',
        body: {
            title,
            price,
            description,
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
                <div className="form-group ms-3 mt-2 font-monospace">
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
                        className="form-control font-monospace  rounded-0 w-50"
                    />
                </div>

                <div className="form-group my-3 ms-3 font-monospace">
                    <label className="h4">Description</label>
                    <input
                        value={description}
                        onBlur={onBlur}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control font-monospace  rounded-0 w-50"
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

export default NewTicket;
