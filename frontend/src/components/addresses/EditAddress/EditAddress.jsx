import React, { useEffect, useState } from 'react';
import { AddressService } from "../../../services/AddressService";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loadingspin from '../../Loadingspin/Loadingspin';

let EditAddress = () => {

    let navigate = useNavigate();
    let { addressId } = useParams();

    const [state, setState] = useState({
        loading: false,
        address: {
            name : '',
            houseNn : '',
            buildingname : '',
            streetaddress : '',
            city : '',
            state : '',
            zipcode: '',

        },
        errorMessage: ''
    });

    useEffect(() => {
        async function fetchData() {
            try {
                setState({ ...state, loading: true });
                let response = await AddressService.getAddress(addressId);
                setState({
                    ...state,
                    loading: false,
                    address: response.data[0],
                });
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
    }, [addressId]);

    let updateInput = (event) => {
        setState({
            ...state,
            address: {
                ...state.address,
                [event.target.name]: event.target.value
            }
        });
    };

    let submitForm = async (event) => {
        async function fetchData()
        { 
        event.preventDefault();
        try {
            const response = await AddressService.updateAddress(state.address, addressId);
            if (response) {
                navigate(`/addresses/list`, { replace: true });
            }

        }
        catch (error) {
            setState({ ...state, errorMessage: error.message });
            navigate(`/addresses/edit/${addressId}`, { replace: false })
        }
        }
        fetchData();
    };

    let { loading, address, errorMessage } = state;

    return (
        <>
            {
                loading ? <Loadingspin /> : <>
                    <section className="add-address p-3">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <p className="h4 text- fw-dark fst-italic">Edit Contact</p>
                                    <p className="fst-italic">Edit a contact address</p>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <form onSubmit={submitForm}>
                                    <div className="mb-2">
                                    <input
                                        required={true} 
                                        name="name"
                                        value={address.name}
                                        onChange = {updateInput}
                                        readOnly
                                        type="text" className="form-control" placeholder="Name"/>
                                </div>
                                <div className="mb-2">
                                    <input 
                                        required={true} 
                                        name="houseNo"
                                        value={address.houseno}
                                        onChange = {updateInput}
                                        type="text" className="form-control" placeholder="House No"/>
                                </div>
                                <div className="mb-2">
                                    <input 
                                        required={true} 
                                        name="buildingName"
                                        value={address.buildingname}
                                        onChange = {updateInput}
                                        type="text" className="form-control" placeholder="Building Name"/>
                                </div>
                                <div className="mb-2">
                                    <input 
                                        required={true} 
                                        name="streetAddress"
                                        value={address.streetaddress}
                                        onChange = {updateInput}
                                        type="text" className="form-control" placeholder="Street Address"/>
                                </div>
                                <div className="mb-2">
                                    <input 
                                        required={true} 
                                        name="city"
                                        value={address.city}
                                        onChange = {updateInput}
                                        type="text" className="form-control" placeholder="City"/>
                                </div>
                                <div className="mb-2">
                                    <input 
                                        required={true} 
                                        name="state"
                                        value={address.state}
                                        onChange = {updateInput}
                                        type="text" className="form-control" placeholder="State"/>
                                </div>
                                <div className="mb-2">
                                    <input 
                                        required={true} 
                                        name="zipCode"
                                        value={address.zipcode}
                                        onChange = {updateInput}
                                        type="text" className="form-control" placeholder="Zip Code"/>
                                </div>
                                        <div className="mb-2">
                                            <input type="submit" className="btn btn-warning" value="Update" />
                                            <Link to={'/addresses/list'} className="btn btn-dark ms-2">Exit</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            }
        </>
    )
};
export default EditAddress;