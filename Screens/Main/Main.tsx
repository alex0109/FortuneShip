import React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';

import customStyles from '../../styles/local.styles';

//need to fix navigation safety
<<<<<<< HEAD
export default function Main({navigation}: {navigation: any}) {

    return (
        <View style={styles.main}>
            <Text style={styles.mainText}>Main 2</Text>
            <Button onPress={() => navigation.navigate("Funds tab")} title="Go to Funds Screen" />
        </View>
    )
=======
export default function Main({ navigation }: { navigation: any }) {
  return (
    <View style={styles.main}>
      <Text style={styles.mainText}>Main</Text>
      <Button onPress={() => navigation.navigate('Accounts tab')} title='Go to Accounts Screen.' />
    </View>
  );
>>>>>>> 07363b57c6ee62da0c5b4ca25a73b36b85abd2ae
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: customStyles.colors.blackMain,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 10,
  },
  mainText: {
    color: customStyles.colors.white,
    fontFamily: 'Assistant',
  },
  testText: {
    color: customStyles.colors.white,
    fontFamily: 'Assistant',
    fontWeight: '900',
  },
});
