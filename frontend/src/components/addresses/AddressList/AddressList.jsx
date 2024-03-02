import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { AddressService } from "../../../services/AddressService";
import Loadingspin from '../../Loadingspin/Loadingspin';


let AddressList = () => {

    const [state, setState] = useState({
        loading: false,
        addresses: [],
        errorMessage: ''
    });

    useEffect(() => {
        async function fetchData() 
        {
            try {
                setState({ ...state, loading: true });
                const response = await AddressService.getALLAddresses();
                setState({
                    ...state,
                    loading: false,
                    addresses: response.data,
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
    }, []);

    let clickDelete = (addressId) => {
        async function fetchData() {
        try {
            let response = await AddressService.deleteAddress(addressId);
            if(response){
                setState({ ...state, loading: true });
                const response = await AddressService.getALLAddresses();
                setState({
                    ...state,
                    loading: false,
                    address: response.data,

            })
        }
            
        } 
        catch (error) {
            setState({
                ...state,
                loading: false,
                errorMessage: error.message
            });
        }
    }
        fetchData();

    }

    
    let { loading, addresses, errorMessage } = state;

    return (
        <>
            <section className="address-search p-3">
                <div className="container">
                    <div className="grid">
                        <div className="row">
                            <div className="col">
                                <p className="h3 text-white fw-bold">Address Manager
                                    <Link to={'/addresses/add'} className="btn btn-success ms-2">
                                        <i className="fa fa-plus me-2" />
                                        New</Link>

                                </p>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </section>
            {
                loading ? <Loadingspin /> : <>
                    <section className="address-list">
                        <div className="container">
                            <div className="row">
                                {
                                    addresses.length > 0 &&
                                    addresses.map(address => {
                                        return (
                                            <div className="col-md-6" key={address.id}>
                                                <div className="card my-2">
                                                    <div className="card-body">
                                                        <div className="row align-items-center j-flex justify-content-around">
                                                            <div className="col-md-7">
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
                                                            </div>
                                                            <div className="col-md-1 d-flex flex-column align-items-center">
                                                                <Link to={`/addresses/view/${address._id}`} className="btn btn-primary my-1">
                                                                    <i className="fa fa-eye" />
                                                                </Link>
                                                                <Link to={`/addresses/edit/${address._id}`} className="btn btn-warning my-1">
                                                                    <i className="fa fa-pen" />
                                                                </Link>
                                                                <button className="btn btn-danger my-1" onClick={() => clickDelete(address._id)}>
                                                                    <i className="fa fa-trash" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </section>
                </>
            }


        </>
    )
};
export default AddressList;