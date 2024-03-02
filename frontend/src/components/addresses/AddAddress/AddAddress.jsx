import React, { useEffect, useState } from 'react';
import { AddressService } from "../../../services/AddressService";
import {Link, useNavigate} from "react-router-dom";
import Loadingspin from '../../Loadingspin/Loadingspin';


let AddAddress = () => {

    let navigate = useNavigate();

    const [state, setState] = useState({
        loading: false,
        address: {
            name : '',
            houseNo : '',
            buildingName : '',
            streetAddress : '',
            city : '',
            state : '',
            zipCode: '',

        },
        errorMessage: ''

    });

    let updateInput = (event) =>{
        setState({
            ...state,
            address: {
                ...state.address,
                [event.target.name] : event.target.value
            }
        })
    }

    useEffect(() => {
        async function fetchData() 
        {
            try {
                setState({ ...state, loading: true });
                setState({
                    ...state,
                    loading: false,
                })
            }
            catch(error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    let submitForm = async (event) => {
       
            event.preventDefault();
            try {
                const response = await AddressService.createAddress(state.address);
                if(response){
                    navigate('/addresses/list', {replace:true});
                }

            } 
            catch (error) {
                    setState({...state, errorMessage: error.message});
                    navigate('/addresses/add', {replace:false})
            }
      
    };

    let { loading, address,  errorMessage } = state;
    return (
        <>
            <section className= "add-address p-3">
                <div className= "container">
                    <div className= "row">
                        <div className="col">
                            <p className= "h4 text- fw-dark fst-italic">Create Contact</p>
                            <p className= "fst-italic">Add a new contact to your Address Book</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <form onSubmit={submitForm}>
                                <div className="mb-2">
                                    <input
                                        required={true} 
                                        name="name"
                                        value={address.name}
                                        onChange = {updateInput}
                                        type="text" className="form-control" placeholder="Name"/>
                                </div>
                                <div className="mb-2">
                                    <input 
                                        required={true} 
                                        name="houseNo"
                                        value={address.houseNo}
                                        onChange = {updateInput}
                                        type="text" className="form-control" placeholder="House No"/>
                                </div>
                                <div className="mb-2">
                                    <input 
                                        required={true} 
                                        name="buildingName"
                                        value={address.buildingName}
                                        onChange = {updateInput}
                                        type="text" className="form-control" placeholder="Building Name"/>
                                </div>
                                <div className="mb-2">
                                    <input 
                                        required={true} 
                                        name="streetAddress"
                                        value={address.streetAddress}
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
                                        value={address.zipCode}
                                        onChange = {updateInput}
                                        type="text" className="form-control" placeholder="Zip Code"/>
                                </div>
                                <div className="mb-2">
                                    <input type="submit" className="btn btn-success" value="Create"/>
                                    <Link to={'/addresses/list'}className= "btn btn-dark ms-2">Exit</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};
export default AddAddress;