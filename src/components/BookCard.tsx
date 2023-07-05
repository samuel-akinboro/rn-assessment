import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { sizes } from '../theme';

type Props = {
  item: {
    id: string;
    image: string;
    title: string;
    price: number;
    rating: {
      rate: number
    }
  };
  style: any
}

const BookCard = ({item, style}: Props) => {
  const navigation = useNavigation();

  const handlPress = () => {
    navigation.navigate('book-details', {id: item?.id})
  }

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={handlPress}>
      <View>
        <Image
          source={{uri: item?.image}}
          style={styles.image}
        />
        <View style={styles.details}>
          <Text style={styles.title}>레이블라우스</Text>
          <View style={styles.priceDetails}>
            <Text style={styles.discount}>{item?.rating?.rate}%</Text>
            <Text style={styles.price}>
              {item?.price} 
              <Text style={{fontWeight: '500', fontSize: 14}}> 원</Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
    height: (sizes.width -1) / 2
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