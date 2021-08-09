import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';


const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.text}>Welcome To OTT</Text>
      <Button  title="Login" color="#F21170"
      onPress={()=>navigation.navigate('Login')}/>
      <Button title="Register" color="#F21170"
      onPress={()=>navigation.navigate('Register')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    alignSelf:'center'
  }
});

export default HomeScreen;