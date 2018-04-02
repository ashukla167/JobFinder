import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TransportSection from './transportSection';

export default (props) => {
    return (
        <div className="flex-column">
            <div className="marginRight10 marginTop10">
                <SelectField
                    floatingLabelText={"Destination " + (1+parseInt(props.index))}
                    value={props.formValues.cities[props.index]}
                    onChange={(evt, index, value)=>props.changeCity(evt, index, value, props.index)}
                >
                    <MenuItem value="select" primaryText="Select a city" />
                    {props.getUpdatesCities(props.index).map(city=><MenuItem value={city.name} primaryText={city.name} />)}
                </SelectField>
            </div>
            {
                props.formValues.cities[props.index] != "select"?
                    <TransportSection 
                        transports={props.transports}
                        formValues={props.formValues}
                        selectTransport = {props.selectTransport}
                        index={props.index}
                        getUpdatedTransports={props.getUpdatedTransports}
                    /> :""
            }
        </div>
    )
}