import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Home from './src/screens/Home';
import BookDetails from './src/screens/BookDetails';

type RootStackParamList = {
  home: undefined;
  'book-details': { id: string };
};

const Stack = createStackNavigator<RootStackParamList>();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='home' 
          component={Home} 
          options={{
            headerTitle: '자유톡'
          }}
        />
        <Stack.Screen 
          name='book-details'
          component={BookDetails} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
