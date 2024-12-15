import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Categories = () => {
  return (
    
    <View style={styles.container}>
      <Text style={styles.head}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={[styles.box, {backgroundColor:'#ddfbf3'}]}>
            <Image source={require('../../assets/pizza.jpg')} style={styles.image}/>
            <Text style={styles.text}>Pizza</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.box, {backgroundColor:'#f5e5ff'}]}>
            <Image source={require('../../assets/juices.jpg')} style={styles.image}/>
            <Text style={styles.text}>Juices</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.box, {backgroundColor:'#e5f1ff'}]}>
        <Image source={require('../../assets/tasty-sandwiches-pepper.jpg')} style={styles.image}/>
        <Text style={styles.text}>Sandwiches</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.box, {backgroundColor:'#ebfde5'}]}>
            <Image source={require('../../assets/three-fresh-drinks.jpg')} style={styles.image}/>
            <Text style={styles.text}>Drinks</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
container:{
    width:"100%",
    borderRadius:10,
    //backgroundColor:"green"
},
head:{
fontSize:20,
fontWeight:"bold",
margin:10,
paddingBottom:5,
},
image:{
    height:20,
    width:20,
    borderRadius:5,
},
box:{
    flexDirection:"row",
    marginHorizontal:10,
    marginBottom:10,
    padding:10,
    borderRadius:20,
    justifyContent:'center',
    alignContent:'center',
    elevation:2
},
text:{
    marginLeft:5,

}
})