import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

export default (props) => {
    return( 
        <div className="flex-column">
            <RadioButtonGroup onChange={(evt, value) => props.selectTransport(evt, value, props.index)} valueSelected={props.formValues.transports[props.index]}>
                {
                    props.getUpdatedTransports().map(transport => {
                        return <RadioButton value={transport.name} label={`${transport.name} (${transport.total_no})`} disabled={!transport.total_no}/>
                    })
                }
            </RadioButtonGroup>
        </div>
    );
};