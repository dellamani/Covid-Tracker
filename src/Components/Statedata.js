import React,{Component} from 'react';
import Axios from 'axios';
import {Card,Accordion,Button} from 'react-bootstrap';

class  Statedata extends Component{
    constructor(){
        super();
        this.state={
            stateData:{}
        }
    }

    componentDidMount(){
        Axios.get("https://api.covid19india.org/state_district_wise.json").then(response=>{
            this.setState({stateData:response.data})
            console.log(response.data);

        });
    }

    render(){
        let keys=Object.keys(this.state.stateData);
        return(
            <div className="row">
                <div className="col-md-12">
                 <Accordion defaultActiveKey="0">
                {
                    keys.slice(1).map((itm,ky)=>{
                        let districts =this.state.stateData[itm].districtData;
                        let district_keys=Object.keys(districts);
                        let total_active=0;
                        let total_confirmed=0;
                        let total_deaths=0;
                        let total_recover=0;
                        let district_list=[];
                        for(let x in districts){
                            total_active+=districts[x].active;
                            total_confirmed+=districts[x].confirmed;
                            total_deaths+=districts[x].deceased;
                            total_recover+=districts[x].recovered;
                            let ob=districts[x];
                            ob['district_name']=x;
                            district_list.push(ob);
                        }
            

                        return(
                            <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="info" eventKey={ky}>
                            {itm}-<span className="btn-dark p-1 mr-1">Total Cases-{total_confirmed}</span> <span className="btn-dark p-1 mr-1">Active - {total_active}</span>  <span className="btn-dark p-1 mr-1">Recovered - {total_recover}</span> <span className="btn-dark p-1 mr-1">Deaths-{total_deaths}</span>
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={ky}>
                        <Card.Body>
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <td>District</td>
                                        <td>Active</td>
                                        <td>Confirmed</td>
                                        <td>Deaths</td>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    district_list.map((itm,ky)=>{
                                        return(

                                            <tr>
                                                <td>{itm.district_name}</td>
                                                <td>{itm.confirmed}</td>
                                                <td>{itm.active}</td>
                                                <td>{itm.recovered}</td>
                                                <td>{itm.decreased}</td>

                                            </tr>
                                        )

                                    })
                                 }



                                </tbody>
                            </table>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                        )
                    })
                        
                }
                    </Accordion>
                </div>

            </div>

        )
    }
}

export default Statedata;