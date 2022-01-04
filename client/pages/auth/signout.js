import { useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

export default () => {
    const { doRequest } = useRequest({
        url: '/api/users/signout',
        method: 'post',
        body: {},
        onSuccess: () => Router.push('/'),
    });

    useEffect(() => {
        doRequest();
    }, []);

    return (
        <div className="d-flex align-items-center justify-content-center display-5 mt-5 fw-light font-monospace">
            Signing you out...
        </div>
    );
};
