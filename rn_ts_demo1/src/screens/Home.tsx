import React, { useLayoutEffect, useEffect, useReducer } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { IStoreState, FiltersEnum, ITodo } from '../stores/types';
import * as actions from '../stores/actions';
import { RootStackList } from '../router/type';

import AddTodoInput from '../componets/AddTodoInput';
import TodoItem from '../componets/TodoItem';

const mapStateToProps = (state: IStoreState): {isMarkAll: boolean, todos: ITodo[], currentFilter: FiltersEnum } => ({
  isMarkAll: state.todos.length > 0 && state.todos.every((todo: ITodo) => todo.isCompleted),
  todos: state.todos,
  currentFilter: state.currentFilter || FiltersEnum.ALL
});

const mapDispatcherToProps = (dispatch: Dispatch): { toggleAllTodos: () => void } => ({
  toggleAllTodos: () => dispatch(actions.toggleAllTodos())
});

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps> & {
  navigation: StackNavigationProp<RootStackList>;
  route: RouteProp<RootStackList, 'Home'>;
};


const Home =  ({navigation, todos}: ReduxType) => {
  useEffect(() => {
    // 重新设置导航头部
    navigation.setOptions({
      headerLeft: undefined
    });
  }, []);
  return (
    <View style={styles.container}>
      <AddTodoInput />
      {todos.map((todo, index) => <TodoItem key={index} {...todo} id={index} />)}
      <TouchableOpacity style={styles.botBtn} activeOpacity={0.7} onPress={() => navigation.navigate('Hooks')}>
        <Text style={{color: '#fff'}}>跳转</Text>
      </TouchableOpacity>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatcherToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  botBtn: {
    position: 'absolute',
    bottom: 20,
    right: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center'
  }
})