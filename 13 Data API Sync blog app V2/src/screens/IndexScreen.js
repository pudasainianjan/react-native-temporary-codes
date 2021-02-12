import React,{useContext,useEffect} from 'react';         //use context gives us access to value prop sent by provider
import {View,Text,StyleSheet,FlatList,Button, TouchableOpacity} from 'react-native';
import {Context} from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';



const IndexScreen = ({navigation}) =>{

    const {state,addBlogPost,deleteBolgPost, getBlogPosts} = useContext(Context);       //data from blogposts provider value props
    // console.log(addBlogPost);

    useEffect(()=>{
        getBlogPosts();
        navigation.addListener('didFocus',()=>{     //anytime this component gains focus on device as primary screen
            getBlogPosts();     //fetch anytime we return to the screen
        });

        return ()=>{        //cleanup fnx--invoked only if our instance of indexscreen is stopped shoing on the screen----if we completely remove the screen, this will run and turn of any listeners we have created 
            listener.remove();      //may lead to memory leak if this isnt cleaned up as we may decide to not show our indexscreen in future
        }

    },[]);
    

    return <View>
        <Button title="Add Posts" onPress={()=>addBlogPost(`random blog ${Math.floor(Math.random()*99999)}` ,'some content',()=>console.log('post added'))} />
        <FlatList
            data={state}
            keyExtractor={(blogPost)=>blogPost.title}
            renderItem={({item})=>{
                return <TouchableOpacity onPress={()=>navigation.navigate('Show',{id: item.id})}>
                <View style={styles.row} >
                    <Text style={styles.title}>{item.title} - {item.id}</Text>
                    <TouchableOpacity onPress={()=>deleteBolgPost(item.id)}>
                        <Feather name="trash" size={35} color="black" style={styles.icon} />
                    </TouchableOpacity>
                </View>
                </TouchableOpacity> 
            }}
        />
    </View>
};

//by this fnx we can customize header and also it is called with navigation object
IndexScreen.navigationOptions = ({navigation}) =>{      //whenever our index screen is about to be displayed by react navigation, react navigation auto call this function   //we get navigation prop here also
    return{     //custonizing what is displayed to header
        headerRight: (<TouchableOpacity onPress={()=>navigation.navigate('Create')}>
            <Feather name="file-plus" size={24} color="black" size={30}/>
            </TouchableOpacity>)
    };
}

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:20,
        paddingHorizontal:10,
        borderTopWidth: 1,
    },
    title:{
        fontSize:18,
    },
    icon:{
        fontSize:24
    }
});

export default IndexScreen;