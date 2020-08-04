import React, {useState} from 'react'
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import * as actions from '../stores/actions'

const mapDispatcherToProps = (dispatch: Dispatch): { addTodo: (text: string) => void } => ({
  addTodo: (text: string) => dispatch(actions.addTodo(text))
});

type ReduxType = ReturnType<typeof mapDispatcherToProps> & {
};

const AddTodoInput = ({addTodo}: ReduxType) => {
  const [text, onChangeText] = useState('')

  return <View style={styles.container}>
    <TextInput
      style={styles.textInput}
      onChangeText={value => onChangeText(value)}
      value={text}
      clearButtonMode="always"/>
      <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={() => {addTodo(text)}}>
        <Text style={styles.btnTxt}>添加</Text>
      </TouchableOpacity>
  </View>
}

export default connect(null, mapDispatcherToProps)(AddTodoInput);


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15
  },
  textInput: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: StyleSheet.hairlineWidth,
    marginVertical: 15,
    borderRadius: 2
  },
  btn: {
    width: '100%',
    height: 40,
    backgroundColor: 'tomato',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnTxt: {
    color: '#fff',
    fontSize: 14
  }
})