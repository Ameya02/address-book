import React, { useEffect, useState } from 'react';
import { AddressService } from "../../../services/AddressService";
import {Link, useParams} from "react-router-dom";
import Loadingspin from '../../Loadingspin/Loadingspin';


let ViewAddress = () => {

    let {addressId} = useParams()

    const [state, setState] = useState({
        loading: false,
        address: {},
        errorMessage: '',
    });

    useEffect(() => {
        async function fetchData() 
        {
            try {
                setState({ ...state, loading: true });
                const response = await AddressService.getAddress(addressId);
                setState({
                    ...state,
                    loading: false,
                    address: response.data,
                })
            }
            catch(error) {
                setState({
                    ...state,
                    loading: false,
                    errorMessage: error.message
                });
            }
        }
        fetchData();
    }, [addressId]);

    let {loading, address, errorMessage} = state;
    return (
        <>
            <section className= "view-contact-intro">
                <div className= "container">
                    <div className= "row">
                        <div className="col">
                            <p className= "h4 text- fw-dark fst-italic p-3">View Address </p>
                            <p className= "fst-italic ms-3">Address Details</p>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Loadingspin/> : <>
                    {
                        Object.keys(address).length > 0  &&
                        <section className= "view-contact mt-3">
                        <div className= "container">
                            <div className= "row">
                                
                                <div className="col md-8">
                                <ul className="list-group">
                                <ul className="list-group">
                                                                    <li className="list-group-item list-group-item-action">
                                                                        Name : <span className="fw-bolder">{address.name}</span>
                                                                    </li>
                                                                    <li className="list-group-item list-group-item-action">
                                                                        House No : <span className="fw-bolder">{address.houseNo}</span>
                                                                    </li>
                                                                    <li className="list-group-item list-group-item-action">
                                                                        Building Name : <span className="fw-bolder">{address.buildingName}</span>
                                                                    </li>
                                                                    <li className="list-group-item list-group-item-action">
                                                                        Street Address : <span className="fw-bolder">{address.streetAddress}</span>
                                                                    </li>
                                                                    <li className="list-group-item list-group-item-action">
                                                                        City : <span className="fw-bolder">{address.city}</span>
                                                                    </li>
                                                                    <li className="list-group-item list-group-item-action">
                                                                        State : <span className="fw-bolder">{address.state}</span>
                                                                    </li>
                                                                    <li className="list-group-item list-group-item-action">
                                                                        Zip Code : <span className="fw-bolder">{address.zipCode}</span>
                                                                    </li>
                                                                   
                                                                </ul>

                                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <Link to={'/addresses/list'} className="btn btn-warning mt-1">Back</Link>
                                </div>
        
                            </div>
                        </div>
                    </section>
                    }
                </>
            }
            
        </>
    )
};
export default ViewAddress;