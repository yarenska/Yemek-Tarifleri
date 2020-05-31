import React, {Component} from 'react';
import axios from 'axios';
import { Text, View } from 'react-native';

class Anasayfa extends Component {
    constructor(props){
        super(props);
        this.state = {
            yemekler: []
        }
    }

    componentDidMount(){
        axios({
            method: 'get',
            url: 'http://192.168.1.27:8086/yemekler',
           }).then((data) => {
            this.setState({
                yemekler: data.data.yemekler
            }) 
        })
    }

    render(){
        return this.state.yemekler.map((yemek) => {
          (<Text>{yemek.ad}</Text>)
        })
    }
}

export default Anasayfa;