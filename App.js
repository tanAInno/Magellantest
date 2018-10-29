import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions} from 'react-native';
import axios from 'react-native-axios';
import PBA from 'react-native-animated-progress-bar'

export default class App extends Component {

    state = {
        PM2_5 : "",
        Temperature : "",
        Humidity : "",
    }

    componentDidMount(){
        this._interval = setInterval(() => {
            this.getMagellan()
        }, 2000)
    }

    componentWillUnmount(){
        clearInterval(this._interval)
    }

    async getMagellan(){
        await axios.get("https://www.aismagellan.io/api/things/pull/5a1e0b60-d282-11e8-be06-154c92873ad1")
        .then(response => {
            this.setState({PM2_5 : response.data.PM2_5})
            this.setState({Temperature : response.data.Temperature})
            this.setState({Humidity : response.data.Humidity})
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
          <View style={styles.container}>
              <View style={styles.wrapper}>
                  <Text style={styles.head}>
                      Magellan Test
                  </Text>
                  <View style={styles.box}>
                      <Text style={styles.header}>PM2_5</Text>
                      <Text style={styles.number}>
                          {this.state.PM2_5}
                      </Text>
                      <View style={styles.progress}>
                          <PBA
                              progress={this.state.PM2_5 / 50}
                              backgroundStyle={{backgroundColor: '#90dd6a'}}
                              progressStyle={{backgroundColor: '#90dd6a'}}
                              incompleteStyle={{backgroundColor: '#2a2f27'}}
                          />
                      </View>
                  </View>
                  <View style={styles.box}>
                      <Text style={styles.header}>Temperature</Text>
                      <Text style={styles.number}>
                          {this.state.Temperature}
                      </Text>
                      <View style={styles.progress}>
                          <PBA
                              progress={this.state.Temperature / 45}
                              backgroundStyle={{backgroundColor: '#90dd6a'}}
                              progressStyle={{backgroundColor: '#90dd6a'}}
                              incompleteStyle={{backgroundColor: '#2a2f27'}}
                          />
                      </View>
                  </View>
                  <View style={styles.box}>
                      <Text style={styles.header}>Humidity</Text>
                      <Text style={styles.number}>
                          {this.state.Humidity}
                      </Text>
                      <View style={styles.progress}>
                          <PBA
                              progress={this.state.Humidity / 100}
                              backgroundStyle={{backgroundColor: '#90dd6a'}}
                              progressStyle={{backgroundColor: '#90dd6a'}}
                              incompleteStyle={{backgroundColor: '#2a2f27'}}
                          />
                      </View>
                  </View>
              </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#303036',
    },
    wrapper: {
        marginTop: 50,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        alignItems: 'center'
    },
    box: {
        width: "85%",
        height: "25%",
        marginTop: 20,
        backgroundColor: '#2a2f27',
        borderWidth: 3,
        borderRadius: 7,
        borderColor: '#90dd6a'
    },
    number: {
        fontSize: 60,
        color: '#ffffff',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 25
    },
    header: {
        fontSize: 25,
        color: '#ffffff',
        fontWeight: 'bold',
        marginLeft: 8,
        marginTop: 5
    },
    head: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#90dd6a',
        marginLeft: 5,
        marginTop: 5
    },
    progress: {
        width: '80%',
        height: '13%',
        marginTop: 15,
        alignSelf: 'center' 
    }
});
