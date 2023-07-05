import { SafeAreaView, StyleSheet, View, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import BookCard from '../components/BookCard'
import { FlashList } from "@shopify/flash-list";

const DATA_PER_PAGE = 10; // Number of items to fetch per page
const VIEWABILITY_THRESHOLD = 0.8; // Threshold for triggering data fetch

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const flatListRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      // Simulate API call
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos/?_limit=${page * DATA_PER_PAGE}`);
      const newData = await response.json();

      setData([...data, ...newData]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false)
    }
  };

  function renderFooter() {
    if (!isLoading) return null;

    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        data={data}
        numColumns={2}
        ref={flatListRef}
        estimatedItemSize={10}
        keyExtractor={(item, i) => `${item?.id}-${i}`}
        renderItem={({item, index}) => <BookCard item={item} style={{marginRight: index % 2 === 0 ? 1 : 0}} />}
        onEndReached={fetchData}
        onEndReachedThreshold={0.8} // Define how close to the end before
        refreshControl={(
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={fetchData} // Trigger fetchData when the user pulls down to refresh
          />
        )}
        ListFooterComponent={renderFooter}
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