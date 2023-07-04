import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'

const { width } = Dimensions.get("window");

const BookCard = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/image-placeholder.png')}
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.title}>레이블라우스</Text>
        <View style={styles.priceDetails}>
          <Text style={styles.discount}>10%</Text>
          <Text style={styles.price}>
            57,600 
            <Text style={{fontWeight: '500', fontSize: 14}}> 원</Text>
          </Text>
        </View>
      </View>
    </View>
  )
}

export default BookCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  image: {
    width: '100%',
    height: (width -1) / 2
  },
  details: {
    padding: 10,
    gap: 10
  },
  title: {
    fontWeight: '600'
  },
  priceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  discount: {
    color: '#FF003E'
  },
  price: {
    fontWeight: '700',
    fontSize: 16
  }
})