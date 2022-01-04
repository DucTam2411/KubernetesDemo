import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const OrderShow = ({ order, currentUser }) => {
    const progressbarStyle = function () {
        var percent = ((60 - timeLeft) / 60) * 100;
        return {
            width: percent + '%',
        };
    };
    const [timeLeft, setTimeLeft] = useState(0);
    const { doRequest, errors } = useRequest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId: order.id,
        },
        onSuccess: () => Router.push('/orders'),
    });

    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft / 1000));
        };

        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, [order]);

    if (timeLeft < 0) {
        return (
            <div className="d-flex flex-column ms-3 mt-3 font-monospace justify-content-center display-6 fw-light text-center">
                Order Expired
            </div>
        );
    }

    return (
        <div className="d-flex flex-column container mx-auto mt-4 font-monospace justify-content-center w-25">
            <div className="justify-content-center mt-1 text-center h6 ">
                Time left to pay: {timeLeft} seconds
            </div>
            <div className="progress mb-3 mt-3 rounded-0">
                <div
                    style={progressbarStyle()}
                    className="progress-bar progress-bar-striped progress-bar-animated bg-danger rounded-0"
                    role="progressbar"
                ></div>
            </div>
            <StripeCheckout
                className="font-monospace"
                allowRememberMe
                image="https://images.pexels.com/photos/10642789/pexels-photo-10642789.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                token={({ id }) => doRequest({ token: id })}
                alipay
                currency="USD"
                stripeKey="pk_test_51KCRsGLvZDUJFzyRHLaNTJZhJhUTNHkH1hlct9qlacb4tKxQQda6OnaOgmke2Ix244yqZpEn5TcOUGuzY4FwqNay00t4jmNWCz"
                currency="USD"
                amount={order.ticket.price * 100}
                panelLabel="Give Money"
                email={currentUser.email}
                description={order.ticket.title}
            >
                <button className="btn btn-dark btn-lg w-100 py-3 rounded-0 ">
                    PAY
                </button>
            </StripeCheckout>
            {errors}
        </div>
    );
};

OrderShow.getInitialProps = async (context, client) => {
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`);
    return { order: data };
};

export default OrderShow;
