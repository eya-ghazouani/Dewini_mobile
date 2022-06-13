import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, TextInput, Alert, Linking, 
    Platform, Modal, StatusBar } from 'react-native'
import React ,{useState}from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { FAB, Card, Title, Button} from 'react-native-paper';
import openMap from 'react-native-open-maps'
import {MaterialIcons, Entypo} from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable';
const WindowHeight = Dimensions.get('window').height;
const Contact = () => {
 
    const redirectToMap=()=>{
        openMap({query: "Jendouba"});
    }

const openDial=()=>{
   if(Platform.OS === "android"){
      Linking.openURL("tel: 54864778")
    }else {
      Linking.openURL("telprompt: 54864778")
           }
    }
   
  return (
    <View style={styles.root}>
            <StatusBar backgroundColor="#01ab9d" barStyle="#01ab9d"/>
  <LinearGradient
                             colors={[ '#01ab9d','#08d4c4']}
                             style={{height:"20%"}}
  />
   

    

  <Card style={styles.mycard} onPress={()=>{
       Linking.openURL(`mailto: samatounes12@gmail.com`)
    }}>
        <View style={styles.cardContent} >
           <MaterialIcons name='email' size={32} color='#01ab9d'/>
           <Text style={styles.mytext}>samatounes12@gmail.com</Text>
        </View>
   </Card>

   <Card style={styles.mycard} onPress={()=>
        openDial()
     }>
      <View style={styles.cardContent}>
          <Entypo name='phone' size={32} color='#01ab9d'/>
          <Text style={styles.mytext}>54864778</Text>
      </View>
   </Card>

    <Card style={styles.mycard} onPress={()=>{
         redirectToMap()
     }}>
       <View style={styles.cardContent}>
           <Entypo name='location' size={32} color='#01ab9d'/>
           <Text style={styles.mytext}>Jendouba</Text>
       </View>
    </Card>
    <View style={styles.header}>
            <Animatable.Image
            animation="bounceIn"
            duraton="1500"
            source={require('../assets/dawini6.png')}
            style={styles.logo}
            resizeMode="stretch"/>
        </View>
<View style={{flexDirection:'row', justifyContent:'space-around', padding:10}}>
  
</View>

  </View>
  )
}

export default Contact
const {height} = Dimensions.get("screen");
const height_logo = height *0.28;
const theme={
    colors:{
      primary:'#01ab9d'
    }
  }
const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: WindowHeight ,
    },
    
    root:{
        flex:1, 
    },
    mycard:{
      margin:3
    }, 
    cardContent:{
      flexDirection:'row',
      padding:8
    }, 
    mytext: {
      fontSize:18,
      marginTop:3,
      marginLeft:5
    },
    action:{
        flexDirection:'row',
    },
    header:{
        flex:2,
        justifyContent:'center',
        alignItems:'center'
    },
    logo:{
        width: height_logo,
        height:height_logo,
        borderRadius:height_logo/2,
    },
    
})
