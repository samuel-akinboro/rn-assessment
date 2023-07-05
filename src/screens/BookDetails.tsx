import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, Dimensions, Animated, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Comment from '../components/Comment';
import { sizes } from '../theme';


function CarouselIndicator({ currentIndex }) {
  const dotSize = 10;
  const dotSpacing = 8;

  const dots = [0, 1, 2, 3, 4]; // Number of dots in the carousel
  const [animatedValues] = useState(dots.map(() => new Animated.Value(0)));

  const animateDot = (index) => {
    Animated.sequence([
      Animated.timing(animatedValues[index], {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValues[index], {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const dotStyle = (index) => {
    const opacity = animatedValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    });

    return {
      width: dotSize,
      height: dotSize,
      borderRadius: dotSize / 2,
      marginHorizontal: dotSpacing / 2,
      opacity,
      backgroundColor: currentIndex === index ? '#fff' : '#a8a7a7',
    };
  };

  return (
    <View style={styles.dotContainer}>
      {dots.map((_, index) => (
        <Animated.View
          key={index}
          style={[styles.dot, dotStyle(index)]}
          onAnimationEnd={() => animateDot(index)}
        />
      ))}
    </View>
  );
};


const BookDetails = ({navigation, route}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const {id} = route.params;

  useEffect(() => {
    fetchData()
  }, [navigation]);

  useEffect(() => { 
    navigation.setOptions({
      title: data?.title ? data?.title : 'Loading',
      headerBackTitleVisible: false,
      headerTintColor: '#313B49'
    });
  }, [navigation, data])

  const fetchData = async() => {
    try {
      setLoading(true);

      // Simulate API call
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`);
      const newData = await response.json();
      setData(newData)
    }catch(error) {
      console.log('error fetching data', error)
    }finally {
      setLoading(false)
    }
  }

  function Header() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = React.useRef(new Animated.Value(0)).current;
  
    const onScrollHandler = (event) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / sizes.width);
      setCurrentIndex(index);
    };
  
    return (
      <View>
        <View>
          <Animated.FlatList 
            data={Array(5).fill(data?.url)}
            horizontal
            pagingEnabled
            decelerationRate={0}
            keyExtractor={(item, i) => `${item}-${i}`}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            renderItem={({item}) => (
              <View>
                <Image
                  source={{uri: item}}
                  style={{
                    height: sizes.height * 0.35,
                    resizeMode: "cover",
                    width: sizes.width
                  }}
                />
              </View>
            )}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true, listener: onScrollHandler }
            )}
          />
          <View style={{position: 'absolute', bottom: 20, alignSelf: 'center'}}>
            <CarouselIndicator currentIndex={currentIndex} />
          </View>
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>Book title</Text>
          <Text style={styles.description}>
            Description of the book...
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Text>
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

  if(loading) {
    return <ActivityIndicator />
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={['', '', '']}
        renderItem={({item}) => <Comment />}
        ListHeaderComponent={Header}
      />
    </SafeAreaView>
  )
}

export default BookDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  dot: {
    opacity: 0.5,
  },
  details: {
    padding: 15,
    gap: 10,
    borderBottomWidth: 2,
    borderColor: '#F7F8FA'
  },
  title: {
    fontSize: 16,
    fontWeight: '700'
  },
  description: {
    fontSize: 12,
    lineHeight: 17
  },
  priceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  discount: {
    color: '#FF003E'
  },
  price: {
    fontWeight: '700',
    fontSize: 16
  }
})