import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, Dimensions } from 'react-native'
import React, { useEffect } from 'react'

const { height, width } = Dimensions.get('window')

function Header() {
  return (
    <View>
      <FlatList 
        data={['', '', '']}
        horizontal
        pagingEnabled
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Image
            source={require("../../assets/images/image-placeholder.png")}
            style={{
              height: height * 0.4,
              resizeMode: "cover",
              width: width
            }}
          />
        )}
      />
    </View>
  )
}

const BookDetails = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      title: 'Book title',
      headerBackTitleVisible: false,
      headerTintColor: '#313B49'
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={['', '', '']}
        renderItem={({item}) => <View />}
        ListHeaderComponent={Header()}
      />
    </SafeAreaView>
  )
}

export default BookDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})