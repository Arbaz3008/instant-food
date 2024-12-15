import { StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'
import Swiper from'react-native-swiper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
const Slider = () => {
  return (
    <View style={styles.container}>
      <Swiper 
      autoplay={true}
      autoplayTimeout={2}
      showsButtons={true}
      removeClippedSubviews={false}
      dotColor='red'
      activeDotColor='green'
      nextButton={<MaterialIcons name="arrow-right" size={24} color="red" />}
      prevButton={<MaterialIcons name="arrow-left" size={24} color="red" />}
      >
        <View style={styles.slide}>
        <Image source={require('../../assets/pizza.jpg')} style={styles.image}/>
        </View>
        <View style={styles.slide}>
        <Image source={require('../../assets/pizza-filled.jpg')} style={styles.image}/>
        </View>
        <View style={styles.slide}>
        <Image source={require('../../assets/brooast.jpg')} style={styles.image}/>
        </View>
        <View style={styles.slide}>
        <Image source={require('../../assets/fries.jpeg')} style={styles.image}/>
        </View>
        <View style={styles.slide}>
        <Image source={require('../../assets/chicken.jpg')} style={styles.image}/>
        </View>
      </Swiper>
    </View>
  )
}

export default Slider

const styles = StyleSheet.create({
container:{
    width:"95%",
    height:"150",
    alignSelf:"center",
    borderRadius: 20, // Adds rounded corners
    overflow: 'hidden',
},
image:{
    width:"100%",
    height:"100%"
},
slide:{
   width:"100%" ,
   height:"100%",
   justifyContent:"center",
   alignContent:'center',

}
})