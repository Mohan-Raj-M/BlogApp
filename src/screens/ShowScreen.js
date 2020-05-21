import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Context} from '../context/BlogContext';
import {Icon} from 'react-native-elements';

const ShowScreen = ({navigation}) => {
  const {state} = useContext(Context);

  const blogpost = state.find(
    blogpost => blogpost.id == navigation.getParam('id'),
  );
  return (
    <View>
      <Text style={{marginHorizontal:10,marginTop:12,fontSize:18,fontWeight:"bold"}}>Title :</Text>
      <Text style={styles.title}>{blogpost.title}</Text>
      <Text style={{marginHorizontal:10,marginTop:12,fontSize:18,fontWeight:"bold"}}>Content :</Text>
      <Text style={styles.content}>{blogpost.content}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({navigation}) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Edit', {id: navigation.getParam('id')})
        }>
        <Icon name="pencil" type="evilicon" size={35}/>
      </TouchableOpacity>
    ),
  };
};
const styles = StyleSheet.create({
  title:{
    padding:15,
    marginHorizontal:10,
    fontSize:16
  },
  content:{
    padding:15,
    marginHorizontal:10,
    fontSize:16

  }
});

export default ShowScreen;
