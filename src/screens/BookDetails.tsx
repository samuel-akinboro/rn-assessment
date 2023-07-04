import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, Dimensions, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'

const { height, width } = Dimensions.get('window')


const CarouselIndicator = ({ currentIndex }) => {
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


function Header() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const onScrollHandler = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  return (
    <View>
      <View>
        <Animated.FlatList 
          data={['', '', '', '', '']}
          horizontal
          pagingEnabled
          decelerationRate={0}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          renderItem={({item}) => (
            <View>
              <Image
                source={require("../../assets/images/image-placeholder.png")}
                style={{
                  height: height * 0.35,
                  resizeMode: "cover",
                  width: width
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
})