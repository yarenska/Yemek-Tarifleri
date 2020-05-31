import React, {useState} from 'react';
import { StyleSheet,Button, Text, Picker, View } from 'react-native';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      malzemeler: [],
      yemekler: []
    }
  }
  
   malzemeEkle = (itemValue) => {
    if(!this.state.malzemeler.includes(itemValue)) 
      this.setState(prevState => ({
         malzemeler: [...prevState.malzemeler, itemValue]
      }))
    console.log(this.state.malzemeler)
  }

  malzemeleriSil = () => {
    this.setState({
      malzemeler: [],
      yemekler: []
    })
  }

  yemekBul = () => {
    axios({
      method: 'post',
      url: 'http://192.168.1.27:8086/yemekler',
      data: {
        malzemeler: this.state.malzemeler
      }
     }).then((data) => {
       console.log("Data: ", data.data.yemekler);
      this.setState({
          yemekler: data.data.yemekler
      })
    })
  }

  render(){
    return (
      <View>
        <Picker
          selectedValue={this.state.selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => {
              this.malzemeEkle(itemValue)
              this.setState({
                selectedValue: itemValue
              })
          }}
        >
          <Picker.Item label="Patlıcan" value="patlıcan" />
          <Picker.Item label="Domates" value="domates" /> 
          <Picker.Item label="Un" value="un" />
          <Picker.Item label="Şeker" value="şeker" /> 
          <Picker.Item label="Kakao" value="kakao" />
        </Picker>
        <Text>Seçilen malzemeler:</Text>
        {this.state.malzemeler.map(malzeme => (<Text>{malzeme}</Text>))}
        <Button
          title="Yemek bul"
          onPress={() => this.yemekBul()}
        />
        <Button
          title="Malzemeleri sil"
          onPress={() => this.malzemeleriSil()}
        />

        {this.state.yemekler.map(yemek =>(<Text>{yemek.ad}</Text>))}
      </View>  
    );
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
