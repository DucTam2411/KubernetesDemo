import axios from 'axios';
import { VscError } from 'react-icons/vsc';

import { useState } from 'react';

export default ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async (props = {}) => {
        try {
            setErrors(null);
            const response = await axios[method](url, { ...body, ...props });

            if (onSuccess) {
                onSuccess(response.data);
            }

            return response.data;
        } catch (err) {
            console.log(err);
            setErrors(
                <div className="alert alert-light rounded-0 border font-monospace">
                    <h4>
                        <VscError /> Ooops....
                    </h4>
                    <ul>
                        {err.response.data.errors.map((err) => (
                            <li key={err.message}>{err.message}</li>
                        ))}
                    </ul>
                </div>
            );
        }
    };

    return { doRequest, errors };
};
