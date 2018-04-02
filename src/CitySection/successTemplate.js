import React from 'react';

export default (props) => {
    return (
        <div classNmae="flex-column justify-content">
            <div>Congrats Job Found</div>
            <div>Job city: {props.jobCity}</div>
        </div>
    );
};