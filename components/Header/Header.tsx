import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

import projectStyle from '../../styles/projectStyle'

export default function Header() {
  return (
    <View style={styles.header}>
        <View style={styles.headerContent}>
            <View style={styles.headerContentItem}><Text style={styles.mainText}>Menu</Text></View> 
            <View style={styles.headerContentItem}><Text style={styles.mainText}>All - $783</Text></View> 
            <View style={styles.headerContentItem}><Text style={styles.mainText}>Switch</Text></View> 
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
        alignItems: 'center',
      },
      mainText: {
        color: projectStyle.color.white
      }
})