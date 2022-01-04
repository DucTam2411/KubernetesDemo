import { useState, useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email,
            password,
        },
        onSuccess: () => Router.push('/'),
    });

    const onSubmit = async (event) => {
        event.preventDefault();

        await doRequest();
    };

    return (
        <div className="container mt-5 font-monospace form-floating d-flex justify-content-center">
            <form className="w-25" onSubmit={onSubmit}>
                <h1 className="text-center display-6">Sign Up</h1>
                <div className="form-group mt-4">
                    <label>Email Address</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control rounded-0"
                    />
                </div>
                <div className="form-group mt-2">
                    <label>Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control rounded-0"
                    />
                </div>
                {errors}
                <button className="btn btn-dark rounded-0 mt-3 py-3 fs-5 font-monospace w-100">
                    Sign Up
                </button>
            </form>
        </div>
    );
};
