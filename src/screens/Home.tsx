import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import BookCard from '../components/BookCard'

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Array(10).fill('')}
        numColumns={2}
        columnWrapperStyle={{gap: 1}}
        renderItem={({item}) => <BookCard />}
      />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  }
})