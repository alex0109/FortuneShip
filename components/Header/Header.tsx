import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

import projectStyle from '../../styles/projectStyle'
import Menu from '../../assets/images/menu.svg'
import Sun from '../../assets/images/sun.svg'
import SunTwo from '../../assets/images/sun2.svg'
import Moon from '../../assets/images/moon.svg'
import MoonTwo from '../../assets/images/moon2.svg'

export default function Header() {
  return (
    <View style={styles.header}>
        <View style={styles.headerContent}>
            <View style={styles.headerContentItemMenu}>
              <Menu width={30} height={30} fill="black"/>  
            </View> 
            <View style={styles.headerContentItem}><Text style={styles.mainText}>All - $783</Text></View> 
            <View style={styles.headerContentItemSwitch}>
              <MoonTwo width={30} height={30} fill="black"/>  
            </View> 
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        backgroundColor: projectStyle.color.blackBar,
        color: projectStyle.color.white
      },
      headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
      },
      headerContentItem: {
        flex: 1,
        alignItems: 'center'
      },
      headerContentItemMenu: {
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft: 20,
        paddingBottom: 5
      },
      headerContentItemSwitch: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 20,
        paddingBottom: 5
      },
      mainText: {
        color: projectStyle.color.white
      }
})