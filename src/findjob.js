import React , {Component} from 'react';
import ComponentService from './componentService';
import CitySection from './CitySection/citySection';
import update from 'react-addons-update';
import RaisedButton from 'material-ui/RaisedButton';
import SuccessTemplate from './CitySection/successTemplate';

class FindJob extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formValues: {
                cities: [],
                transports: []
            },
            jobNotFound: true
        }

        this.getAllData();
    }

    getAllData() {
        const token = ComponentService.intializeUserToken();
        const transports = ComponentService.getAlltransport();
        const cities = ComponentService.getAllCities();

        Promise.all([token, transports, cities]).then(data => {
            this.setState({
                cities: data[2],
                transports: data[1],
                token: data[0].token,
                formValues: this.initializeForm()
            })
        }).catch((e) => {
            console.log('Some Error is there');
        })
    }

    initializeForm() {
        return {
            transports: [],
            cities: ["select"]
        };
    }

    changeCity(evt, selectInd, value, ind) {
        const selectCities = this.state.formValues.cities.slice();
        selectCities[ind] = value;
        selectCities.splice(ind+1);
        const selectedTransports = this.state.formValues.transports.slice();
        selectedTransports.splice(ind);
        this.setState({
            formValues: update(this.state.formValues, {
                cities: {$set: selectCities},
                transports: {$set: selectedTransports}
            })
        });
    }

    selectTransport(evt, value, ind) {
        const selectedTransports = this.state.formValues.transports;
        const updateObj = {};
        if(ind<3  && !selectedTransports[ind+1]) {
            updateObj.cities = {[ind+1]:{$set: 'select'}};
        }
        updateObj.transports = {[ind]: {$set: value}}
        this.setState({
            formValues: update(this.state.formValues, updateObj)
        });
    }

    getUpdatesCities(ind) {
        const selectedCities = this.state.formValues.cities.slice(0, ind);
        return this.state.cities.filter(city => !selectedCities.includes(city.name));
    }

    getUpdatedTransports() {
        const selectedTransports = this.state.formValues.transports;
        return this.state.transports.map(transport => {
            return {
                name: transport.name,
                max_distance: transport.max_distance,
                speed: transport.speed,
                total_no: (transport.total_no - this.findOccurences(selectedTransports, transport.name))
            }
        })
    }

    findOccurences(arr, name) {
        let cnt = 0;
        arr.forEach(ele => {if(ele == name) cnt++})
        return cnt;
    } 

    getTotalTime() {
        let totalTime = 0;
        const selectCities = this.state.formValues.cities;
        const selectedTransports = this.state.formValues.transports;
        selectCities.forEach((city, index) => {
            let timeTaken = 0;
            if(city != 'select' && selectedTransports[index]) {
                const currCity = this.state.cities.find(obj => obj.name == city);
                const currTransport = this.state.transports.find(obj => obj.name == selectedTransports[index]);
                timeTaken = (currCity.distance)/(currTransport.speed);
            }
            totalTime+=timeTaken;
        });
        return totalTime;
    }

    getJob() {
        const data = {
            token: this.state.token,
            city_names: this.state.formValues.cities,
            transportvehicle_names: this.state.formValues.transports
        };

        ComponentService.findJob(data).then(response => {
            if(response.status == "success") {
                this.setState({
                    jobNotFound: false,
                    jobCity: response.city_name
                })
            } else {
                alert("No job found bro");
                this.initializeForm();
            }
        })
    }

    render() {
        return (
            <div className="flex-column">
                {
                    this.state.jobNotFound?
                        <div>
                            <div className="flex-row flexWrap justify-content">
                                {
                                    this.state.formValues.cities.map((city, index) => <CitySection 
                                                                                cities={this.state.cities}
                                                                                transports={this.state.transports}
                                                                                formValues={this.state.formValues}
                                                                                city={city} 
                                                                                index={index} 
                                                                                changeCity={this.changeCity.bind(this)}
                                                                                selectTransport={this.selectTransport.bind(this)}
                                                                                getUpdatesCities={this.getUpdatesCities.bind(this)}
                                                                                getUpdatedTransports={this.getUpdatedTransports.bind(this)}
                                                                            />)         
                                }
                            </div>
                            <div className="flex-row justify-content marginTop10">
                                <h1>Total Time: {this.getTotalTime()}</h1>
                                <div className="marginRight10 paddingTop20">
                                    <RaisedButton 
                                        label="Get job" 
                                        disabled={this.state.formValues.transports.length!=4} 
                                        onClick={this.getJob.bind(this)} />
                                </div>
                            </div>
                        </div>: <SuccessTemplate jobCity={this.state.jobCity} />
                }
                
            </div>
        )
    }
}

export default FindJob;