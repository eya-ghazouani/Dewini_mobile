import React, {useContext, useState, useEffect} from 'react'
import { View, Text, ScrollView,TouchableOpacity, Dimensions, TextInput } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { MainContext } from '../hooks/MainContext';
import Categorie_card from '../components/Categorie_card';

const windowheight = Dimensions.get('window').height;
const windowwidth = Dimensions.get('window').width;
const AllCategories = ({navigation}) => {

    let {auth, setChanged} = useContext(MainContext);

  const [filterData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setsearch] = useState('');
  
  const fetchdata = async () => {

    let response = await fetch(`${path}/categorie`,{
        method:"GET",
        headers: {
            "Content-Type": "application/json"
        
        }
    });

    let result = await response.json();
    if (result.message === "success") {
        setmasterData(result.data);
        setfilterData(result.data);
    }
}

useEffect(() => {
  fetchdata();
}, [])

  // let x = JSON.parse(auth)
  console.log(auth)
  const Logout = async () => {
    await AsyncStorage.removeItem('user');
    return setChanged("Loggedout")
  }

  const searchFilter = (text) => {
    if(text) {
        const NewData = masterData.filter((item) => {
            const itemData = item.nom ? item.nom.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setfilterData(NewData);
        setsearch(text);
    } else {
        setfilterData(masterData);
        setsearch(text);
    }
}

  return (
    <View style={{flex: 1}}>
      <ScrollView>

        <LinearGradient
          // Background Linear Gradient
          colors={[ '#01ab9d','#08d4c4']}
          style={{width: '100%', height: windowheight * 0.35}} 
        >

          <TextInput
            placeholder='Rechercher ..'
            style={{marginTop: '30%', backgroundColor: '#fff', marginHorizontal: '5%', borderRadius: 5, paddingLeft: 15, paddingVertical: 3, fontSize: 18}}
            onChangeText={(texte) => searchFilter(texte)}
          />

        </LinearGradient>
        <View style={{maxWidth: windowwidth * 0.88, marginTop: -windowheight * 0.07 , flexDirection: 'row',  marginHorizontal: windowwidth * 0.06, flexWrap: 'wrap' }} >

          {filterData.map(({nom, image, _id}, idx) => {
                      if(nom !== 'Inconnu' ){
            return (
              <TouchableOpacity 
                key={idx}
                onPress={() => navigation.push('Medics', {id: _id})}
              >
                <Categorie_card image={image} nom={nom} id={_id} /> 
              </TouchableOpacity>
            ); }
          })}
                    
        </View>
        
      </ScrollView>
    </View>
  )
}

export default AllCategories