import axios from 'axios';

export class AddressService {
    static serverURL = `http://localhost:3001/api`;

    static getALLAddresses(){
        let dataURL = `${this.serverURL}/addresses`;
        return axios.get(dataURL);
    }

    static createAddress(address){
        let dataURL = `${this.serverURL}/addresses/create`;
        return axios.post(dataURL, address);
    }

    static updateAddress(address, addressId){
        let dataURL = `${this.serverURL}/addresses/${addressId}`;
        return axios.put(dataURL, address);
    }

    static getAddress(addressId){
        let dataURL = `${this.serverURL}/addresses/${addressId}`;
        return axios.get(dataURL);
    }

    static deleteAddress(addressId){
        let dataURL = `${this.serverURL}/addresses/${addressId}`;
        return axios.delete(dataURL);
    }
}
