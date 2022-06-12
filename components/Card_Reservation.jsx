import React from 'react'
import { View, Text, Dimensions, Image } from 'react-native'
import {Card} from 'react-native-shadow-cards';

const windowWidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;

const Card_Reservation = ({ date_reserv, ordonnance,confirm, notify,dateNotify,id }) => {

  return (
    <View >
      <Card style={{width: windowWidth * 0.6, height:  windowheight * 0.2, borderRadius: 5, alignContent: 'center', alignItems: 'center', backgroundColor: '#fff', margin: windowWidth * 0.01 }}>
        
          <Image
              source={{ uri: `${path}/uploads/images/${ordonnance}`}}
              style={{ width: '100%', height: windowheight * 0.15, borderTopLeftRadius: 5, borderTopRightRadius: 5}}
          />
          <View style={{ width: '100%', height: windowheight * 0.05, alignItems: 'center', alignContent: 'center'}}  >
              <Text>{date_reserv}</Text>
     {confirm == null && notify !== true ?
                <Text style={{color:'gray', marginRight:90}}>En attente...</Text> 
                : null 
              }
      {confirm == true ?
  <Text style={{color:'green', marginRight:90}}>Acceptée</Text> 
                : null 
              }
      {confirm == false?
                <Text style={{color:'red', marginRight:90}}>Réfusée</Text> 
                : null 
              }
      {notify == true?
                <Text style={{color:'orange'}}>Acceptation initiale de {dateNotify}</Text> 
                : null 
              }
          </View>
          
      </Card>
    </View>
  )
}

export default Card_Reservation