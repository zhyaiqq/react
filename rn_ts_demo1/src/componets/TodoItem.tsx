import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import * as actions from '../stores/actions'
import { IStoreState } from '../stores/types';

interface IStateProps {
  id: number;
  isCompleted: boolean;
  title: string;
}

interface IDispatchProps {
  deleteTodo: () => void;
  toggleTodo: () => void;
  editTodo: (text: string) => void;
}

// 注意： 这里如果不加上state: IStoreState参数，会获取不到值  *****
const mapStateToProps = (state: IStoreState, ownProps: IStateProps): IStateProps => ({
  id: ownProps.id,
  isCompleted: ownProps.isCompleted,
  title: ownProps.title
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IStateProps) : IDispatchProps => ({
  deleteTodo: () => dispatch(actions.deleteTodo(ownProps.id)),
  toggleTodo: () => dispatch(actions.toggleTodo(ownProps.id)),
  editTodo: (text: string) => dispatch(actions.editTodo(ownProps.id, text)),
})

export type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const TodoItem = ({isCompleted, title, deleteTodo, toggleTodo, editTodo}: ReduxType) => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <TouchableOpacity style={styles.handle} activeOpacity={0.7} onPress={deleteTodo}>
        <Text style={{fontSize: 12, color: '#ffd'}}>x</Text>
      </TouchableOpacity>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 5,
    height: 40,
    borderColor: '#ccc',
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  handle: {
    position: 'absolute',
    right: 10,
    backgroundColor: '#ccc',
    width: 14,
    height: 14,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center'
  }
})