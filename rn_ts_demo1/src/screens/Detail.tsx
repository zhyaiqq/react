import React, {useState, useLayoutEffect} from 'react'
import {
  View,
  Text,
  Button
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import { RootStackList } from '../router/type'

type DetailScreenRouteProp = RouteProp<RootStackList, 'Detail'>
type DetailNavigationProp = StackNavigationProp<RootStackList, 'Detail'>

export default function Detail () {
  // hooks写法获取路由相关
  const route = useRoute<DetailScreenRouteProp>();
  const navigation = useNavigation<DetailNavigationProp>();
  const [id] = useState(route.params.id);
  const todo = useSelector(state => state)
  console.log('detail', todo);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Button title="返回" onPress={() => navigation.goBack()}/>,
      title: id === '' ? 'No title' : id,
    });
  }, [navigation, id]);

  return (
    <View>
      <Text>detail--{route.params.id}</Text>
    </View>
  )
}
