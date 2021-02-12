import React from 'react'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import {Provider} from './src/context/BlogContext';
import ShowScreen from './src/screens/ShowScreen';
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';

const navigator = createStackNavigator({
  Index:IndexScreen,
  Show: ShowScreen,
  Create: CreateScreen,
  Edit: EditScreen
},
  {
    initialRouteName:'Index',
    defaultNavigationOptions:{
      title:'Blogs'
    }
  }
);

const App = createAppContainer(navigator);    //*first put this in variable

//our blog provide is wrapping react stack navigator which includes all screen and components of our app..
export default ()=>{
  return <Provider>
    <App />
  </Provider> 
}