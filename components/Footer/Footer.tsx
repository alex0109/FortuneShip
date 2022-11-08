import { StyleSheet, View, Text, Button, Pressable, Alert, Modal } from 'react-native'
import React, { useState } from "react"

import projectStyle from '../../styles/projectStyle'

export default function Footer() {

    const [modalVisible, setModalVisible] = useState(false)

    const createTwoButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

  return (
    <>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Hello World!</Text>
                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
                >
                <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
            </View>
            </View>
        </Modal>
        <View style={styles.footer}>
            <View style={styles.buttonBlock}>
                <Pressable style={styles.buttonn}>
                    <Text style={styles.mainText}>1</Text>
                </Pressable>
            </View>
            <View style={styles.buttonBlock}>
                <Pressable style={styles.buttonn}>
                    <Text style={styles.mainText}>2</Text>
                </Pressable>
            </View>
            <View style={styles.buttonBlock}>
                <Pressable style={styles.buttonn}>
                    <Text style={styles.mainText}>3</Text>
                </Pressable>
            </View>
        </View>
    </>
    
  )
}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: projectStyle.color.blackBar,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    mainText: {
        color: projectStyle.color.white
    },
    buttonBlock: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    buttonn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '70%',
        width: '40%',
        borderRadius: 20,
        backgroundColor: projectStyle.color.blackMain
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})