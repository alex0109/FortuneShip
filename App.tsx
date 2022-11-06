import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, Button } from 'react-native';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

import projectStyle from './styles/projectStyle';

export default function App() {
  return (
    <>
      <Header/>
      <Main/>
      <Footer/>
    </>
  );
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
  }
})