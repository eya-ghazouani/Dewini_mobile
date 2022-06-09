import React, {useContext, useState, useEffect} from 'react'
import { View, Text, ScrollView,TouchableOpacity, Dimensions, TextInput } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { MainContext } from '../hooks/MainContext';
import Card_product from '../components/Card_product';

const windowheight = Dimensions.get('window').height;
const windowwidth = Dimensions.get('window').width;

const AllProducts = ({navigation}) => {
    const [filterData, setfilterData] = useState([]);
    const [masterData, setmasterData] = useState([]);
    const [search, setsearch] = useState('');

    const fetchdata = async () => {

        let response = await fetch(`${path}/produit`,{
            method:"GET",
            headers: {
                "Content-Type": "application/json"
            
            }
        });
    
        let result = await response.json();
        if (result.message === "success") {
            setmasterData(result.data.slice(0).reverse());
            setfilterData(result.data.slice(0).reverse());
        }
    }
    
    useEffect(() => {
      fetchdata();
    }, [])
    const searchFilterProd = (text) => {
        if(text) {
            const NewData = masterData.filter((item) => {
                const itemData = item.title? item.title.toUpperCase() : ''.toUpperCase();
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
            onChangeText={(texte) => searchFilterProd(texte)}
          />

        </LinearGradient>
        <View style={{maxWidth: windowwidth * 0.88, marginTop: -windowheight * 0.07 , flexDirection: 'row',  marginHorizontal: windowwidth * 0.06, flexWrap: 'wrap' }} >

          {filterData.map(({title, image,qte, _id, etat}, idx) => {
                return (
                  <TouchableOpacity 
                    key={idx}
                    onPress={() => navigation.push('Details_Medic', {id: _id})}
                  >
                  <Card_product image={image} title={title} id={_id}/> 
                 
                  </TouchableOpacity>
                ); 
          })}
            

          
        </View>
        
      </ScrollView>
    </View>
  )
}

export default AllProducts