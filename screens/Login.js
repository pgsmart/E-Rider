import * as React from 'react'
import { StyleSheet,Text,View,TouchableOpacity,TextInput,Alert } from 'react-native'
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'
import db from '../config'
import {Timestamp,collection,query,where,getDocs, CollectionReference,updateDoc,addDoc,increment,doc,limit} from 'firebase/firestore'
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends React.Component{

    constructor(){
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    checkLogin = (email,password)=>{
        console.log(email+ ","+password)
        var auth = getAuth()
        console.log(auth)
        signInWithEmailAndPassword(auth,email,password).then(()=>{this.props.navigation.navigate('screen2')})
        .catch(()=>{Alert.alert("Email or Password incorrect!")})
    }

    render(){
            return(
                <View>
                <Text>Login</Text>
                <View style={styles.inputContainer}>
                <TextInput style={styles.inputBox}  placeholder='Email' onChangeText={(text)=>{this.setState({email:text})}} value={this.state.email} ></TextInput>
                
                </View>
                <View style={styles.inputContainer}>
                <TextInput style={styles.inputBox} placeholder='Password' onChangeText={(text)=>{this.setState({password:text})}} value={this.state.password}></TextInput>
             
                </View>
                
                <TouchableOpacity style={styles.submitButton} onPress={()=>{this.checkLogin(this.state.email,this.state.password)}}><Text style={styles.submitText}>Submit</Text></TouchableOpacity>
                </View>
            )
    }
}

const styles = StyleSheet.create({
inputContainer:{
    display: 'flex',
    flexDirection: "row",
    justifyContent:"center"
},

submitButton:{
    borderRadius:20,
    borderWidth:2,
    width:'50%',
    height:50,
    marginTop:20,
    justifyContent: 'center',
    alignSelf: 'center',
},
submitText:{
    fontSize:20,
    textAlign: "center"
},
inputBox:{
    borderRadius: 20,
    borderWidth:2,
    width:'50%',
    height:50,
    marginTop:20,
}
})