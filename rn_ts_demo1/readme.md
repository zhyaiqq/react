## react-native中使用hooks,配合typescript进行静态类型检查
以前在项目中写组件都是采用类的形式，react新版本提供了hooks写法，函数式组件让代码更简便能够完全替代类的写法，这里从零开始一个项目搭建，在项目中使用hooks。

### 1.搭建基于typescrit的react-native项目
官方文档[https://reactnative.cn/docs/typescript](https://reactnative.cn/docs/typescript)本来有介绍如何初始化一个ts的rn项目，使用下面命令行,但是我执行下面命令失败了说找不到`react-native-template-typescript`,生成了一个普通的rn项目。

`npx react-native init MyApp --template react-native-template-typescript`
```
warn Failed to clean up template temp files in node_modules/react-native-template-react-native-template-typescript. This is not a critical error, you can work on your app.
```

上述方式失败了，于是我只能想其他办法，先初始化一个项目，再引入ts。

`react-native init product_name`

`yarn add --dev typescript @types/jest @types/react @types/react-native @types/react-test-renderer`

在项目根目录下添加配置文件`tsconfig.json`
```
{
  "compilerOptions": {
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "jsx": "react",
    "lib": ["es6"],
    "moduleResolution": "node",
    "noEmit": true,
    "strict": true,
    "target": "esnext"
  },
  "exclude": [
    "node_modules",
    "babel.config.js",
    "metro.config.js",
    "jest.config.js"
  ]
}
```
至此配置就完成了，可以在项目中写.tsx为后缀的ts文件，其他默认的文件都可以改成.tsx文件，除了入口文件index.js，不然会报错。


### 2.路由导航插件react-navigation
react-navigation 5.x也是支持typescript和hooks了，具体看文档。

#### 安装
`yarn add @react-navigation/native`

`yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view`

`npx pod-install ios`

`yarn add @react-navigation/stack`

#### 例子

下面是看了文件一个简单的路由，存在问题，不知道怎么在路由里面定义公共头部返回组件里面获取`navigation`对象。这个后面研究清楚再解决。
```
import * as React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';

import HomeScreen from './screens/Home'
import DetailScreen from './screens/Detail'

type RootStackList = {
  Home: undefined;
  Detail: { id: String };
};
type IProps = {
  navigation: StackNavigationProp<RootStackList>;
}

const Stack = createStackNavigator<RootStackList>();

const options: StackNavigationOptions = {
  headerShown: true,
  headerTintColor: 'white',
  headerStyle: { backgroundColor: 'tomato' },
  headerLeft: () => {
    console.log('11');
    return <Button title="返回" onPress={() => {}}/>
  }
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={options}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} initialParams={{ id: '123' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
```
在组件里面获取路由信息
```
import React, { useLayoutEffect, useEffect, useReducer } from 'react'
import {
  View,
  Text,
  Button
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackList = {
  Home: undefined;
  Detail: { id: String };
};

type IProps = {
  navigation: StackNavigationProp<RootStackList>;
  route: RouteProp<RootStackList, 'Home'>;
}

const Home =  ({navigation, route}: IProps) => {
  useEffect(() => {
    // 重新设置导航头部
    navigation.setOptions({
      headerLeft: undefined
    });
  }, []);

  return (
    <View>
      <Text>Home</Text>
      <Button 
        title="跳转"
        color="#000"
        onPress={() => navigation.navigate('Detail', {id: '12'})}
      />
    </View>
  )
}

export default Home;
```
上述方式hooks写法
```
import React, {useState, useLayoutEffect} from 'react'
import {
  View,
  Text,
  Button
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useRoute, useNavigation } from '@react-navigation/native';

type RootStackList = {
  Home: undefined;
  Detail: { id: string };
};

type DetailScreenRouteProp = RouteProp<RootStackList, 'Detail'>
type DetailNavigationProp = StackNavigationProp<RootStackList, 'Detail'>

export default function Detail () {
  // hooks写法获取路由相关
  const route = useRoute<DetailScreenRouteProp>();
  const navigation = useNavigation<DetailNavigationProp>();
  const [id] = useState(route.params.id);

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
```

### 3.理解SFC
参考链接: [https://juejin.im/post/5b07caf16fb9a07aa83f2977](https://juejin.im/post/5b07caf16fb9a07aa83f2977)
在`@types/react中`已经预定义一个类型`type SFC<P>`，它也是类型`interface StatelessComponent<P>`的一个别名，此外，它已经有预定义的`children`和其他（defaultProps、displayName等等…），所以我们不用每次都自己编写！
```
import React, { MouseEvent, ReactNode } from 'react'
type Props = { 
 onClick(e: MouseEvent<HTMLElement>): void
 children?: ReactNode 
}
const Button = ({ onClick: handleClick, children }: Props) => (
  <button onClick={handleClick}>{children}</button>
)

// 改造使用SFC
import React, { MouseEvent, SFC } from 'react';
type Props = { onClick(e: MouseEvent<HTMLElement>): void };
const Button: SFC<Props> = ({ onClick: handleClick, children }) => (
  <button onClick={handleClick}>{children}</button>
); 
```

### 4.使用redux进行状态管理
研究了一个星期看了好多文档，因为没有一个文档详细讲了react-native使用hooks又使用tyscript的，杂七杂八看了很多终于搭建起了，详细看项目代码`index.js`文件怎么引入store, `src/screens/Home.tsx`文件中怎么使用。

安装:

`yarn add react-redux redux`

`yarn add @types/react-redux`

参考资料：

[https://react-redux.js.org/using-react-redux/static-typing](https://react-redux.js.org/using-react-redux/static-typing)

[https://github.com/Flcwl/react-todos-with-typescript](https://github.com/Flcwl/react-todos-with-typescript)

### 5.todoList案例：

实现redux状态管理，组件传值， 完整运用了typescript hooks写法的一件简单demo。

写了两个组件`src/components/AddTodoInput.tsx` `src/components/TodoItem.tsx`,在`src/components/AddTodoInput.tsx`文件里实现了输入框添加一个todo, 在`src/screens/Home.tsx`文件里面获取todos数据遍历生成每一项将todo传入子组件，`src/components/TodoItem`如何获取父组件传值并渲染页面, 具体看项目代码。

```
// src/components/AddTodoInput.tsx
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

type ReduxType = ReturnType<typeof mapDispatcherToProps>;

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
```

```
// src/components/TodoItem.tsx
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
```


