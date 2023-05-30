import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  Alert
} from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import database from '../config'
import {collection,query,where,getDocs} from 'firebase/firestore'

const bgImage = require("../assets/background2.png");
const appIcon = require("../assets/appIcon.png");

export default class RideScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bikeId: "",
      userId: "",
      domState: "normal",
      hasCameraPermissions: null,
      scanned: false
    };
  }

  getCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
      hasCameraPermissions: status === "granted",
      domState: "scanner",
      scanned: false
    });
  };

  update  = async()=>{
    var databaseQuery = query(collection(database,'bicycles')
    ,where('id','==',this.state.bikeId))
    var bikeDetails = await getDocs(databaseQuery)
    console.log(this.state.bikeId)

    bikeDetails.forEach((doc)=>{
      var bikeInfo =  doc.data()
      if(bikeInfo.is_bike_available === true){
       console.log("Bike Available")
      }else{
       console.log("Bike Unavailable")
      }
   })
}

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      bikeId: data,
      domState: "normal",
      scanned: true
    });
    this.update()
  };

  render() {
    const { bikeId, userId, domState, scanned } = this.state;
    if (domState !== "normal") {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <Image source={appIcon} style={styles.appIcon} />
          <Text style={styles.title}>e-ride</Text>
          <Text style={styles.subtitle}>A Eco-Friendly Ride</Text>
        </View>
        <View style={styles.lowerContainer}>
          <View style={styles.textinputContainer}>
            <TextInput
              style={[styles.textinput, { width: "82%" }]}
              placeholder={"User Id"}
              placeholderTextColor={"#FFFFFF"}
              onChangeText={(id)=>{this.setState({userId: id})}} 
              value={this.state.userId}
            />
          </View>
          <View style={[styles.textinputContainer, { marginTop: 25 }]}>

            <TextInput
              style={styles.textinput}
              placeholder={"Bicycle Id"}
              placeholderTextColor={"#FFFFFF"}
              value={bikeId}
            />

            <TouchableOpacity
              style={styles.scanbutton}

             onPress={() => this.getCameraPermissions()}


            >
              <Text style={styles.scanbuttonText}>Scan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D0E6F0"
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  upperContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  appIcon: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginTop: 80
  },
  title: {
    fontSize: 40,
    fontFamily: "Organical",
    paddingTop: 20,
    color: "#4C5D70"
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "sans-serif",
    color: "#4C5D70"
  },
  lowerContainer: {
    flex: 0.5,
    alignItems: "center"
  },
  textinputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#4C5D70",
    borderColor: "#4C5D70"
  },
  textinput: {
    width: "57%",
    height: 50,
    padding: 10,
    borderColor: "#4C5D70",
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    backgroundColor: "#F88379",
    fontFamily: "sans-serif",
    color: "#FFFFFF"
  },
  scanbutton: {
    width: 100,
    height: 50,
    backgroundColor: "#FBE5C0",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  scanbuttonText: {
    fontSize: 24,
    color: "#4C5D70",
    fontFamily: "sans-serif"
  },
  button: {
    width: "43%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FBE5C0",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#4C5D70"
  },
  buttonText: {
    fontSize: 24,
    color: "#4C5D70",
    fontFamily: "sans-serif"
  }
});