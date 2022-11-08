import React from 'react'
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import Swiper from 'react-native-swiper';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import Funds from './components/Funds/Funds';
import Analytics from './components/Analytics/Analytics';

import projectStyle from './styles/projectStyle';


export default function App(){
    const [loaded] = useFonts({
        Assistant: require('./assets/fonts/Assistant-Regular.ttf') 
    });

    if (!loaded) {
        return null;
    }
    return (
      <React.Fragment>
        <Header/>
        <View style={styles.main}>
          <Swiper showsPagination={false} index={1} loop={false}>
            <Funds/>
            <Main/>
            <Analytics/>
          </Swiper>
        </View>
        <Footer/>
      </React.Fragment>
    )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: projectStyle.color.blackMain,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 10
  },
  mainText: {
    color: projectStyle.color.white
  },
  swiper: {
    flex: 1
  }
})