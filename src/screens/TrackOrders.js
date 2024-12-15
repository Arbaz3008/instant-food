import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'

const TrackOrders = () => {
  return (
    <View style={styles.container}>
      <View style={{backgroundColor:'red',paddingVertical:15, paddingHorizontal:15}}>
        <TouchableOpacity>
            <Text style={{color:"white"}}>close</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Text style={{fontSize:20, fontWeight:"bold" , marginHorizontal:10, marginTop:5,marginBottom:10}}> My Orders</Text>
        <View style={styles.main}>
        <Text style={styles.id}>Order id : 234567y</Text>
           <Text style={styles.time}>Time : 4:45 AM</Text>

<View style={styles.ordercontainer}>
  <View>
<Image source={require('../../assets/sands.jpeg')} style={styles.image} />
</View>
<View style={styles.ordercontainer2}>
  <View >
          <Text style={styles.orderitems}>Samosa</Text>
           <Text style={styles.orderitems}>150$</Text>
           <Text style={styles.orderitems}>Qty: 1 Unit</Text>
           </View>
</View>
</View>
<View style={styles.ordercontainer}>
  <View>
<Image source={require('../../assets/sands.jpeg')} style={styles.image} />
</View>
<View style={styles.ordercontainer2}>
  <View >
          <Text style={styles.orderitems}>Samosa</Text>
           <Text style={styles.orderitems}>250$</Text>
           <Text style={styles.orderitems}>Qty: 2 Unit</Text>
           </View>
</View>
</View>
<View style={styles.ordercontainer}>
  <View>
<Image source={require('../../assets/sands.jpeg')} style={styles.image} />
</View>
<View style={styles.ordercontainer2}>
  <View >
          <Text style={styles.orderitems}>Samosa</Text>
           <Text style={styles.orderitems}>350$</Text>
           <Text style={styles.orderitems}>Qty: 3 Unit</Text>
           </View>
</View>
</View>

           <Text style={styles.total}>Total : 300$</Text>

        </View>
        
      </ScrollView>
    </View>
  )
}

export default TrackOrders

const styles = StyleSheet.create({
main:{
marginBottom:10,
marginHorizontal:10,
elevation:2,
backgroundColor:"white",
paddingVertical:10,
borderRadius:20
},
id:{
  fontSize:16,
  color:"grey",
  paddingHorizontal:5,
  borderBottomWidth:1,
  paddingVertical:5,
  borderColor:"#d9d9d9"
},
time:{
  paddingHorizontal:5,
  paddingVertical:5,

},
total:{
  fontSize:18,
  marginVertical:5,
  marginRight:10,
  textAlign:"right",
  fontWeight:"bold"
},
image: {
  width: 90,
  height: 80,
 borderBottomLeftRadius:10,
 borderTopLeftRadius:10
},
ordercontainer:{
  flexDirection:"row", 
  backgroundColor:"#f2f2f2", 
  marginVertical:5 ,
   width:'95%' ,
    alignSelf:"center",
     borderRadius:20 , 
     elevation:2
},
ordercontainer2:{
  paddingHorizontal:10,
  flexDirection:"row",
  justifyContent:"space-between",
},
orderitems:{
  fontSize:18,
  fontWeight:"bold"
}
})