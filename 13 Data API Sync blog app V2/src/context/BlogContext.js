//this is for global data management and we want to isolate the data from our view
import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'get_blogposts':
      return action.payload;    //because api reutrns total data

    case 'edit_blogpost':
      return state.map((blogPost)=>{
        return blogPost.id === action.payload.id ? action.payload: blogPost;
      });

    case 'delete_blogpost':
      return state.filter((blogpost)=> blogpost.id !== action.payload );

    default:
      return state;
  }
};

const getBlogPosts = dispatch =>{   //*api called
  return async () =>{
    const response = await jsonServer.get('/blogposts');
    //response.data === []  our data
    dispatch({type:'get_blogposts',payload:response.data})
  };
};

const addBlogPost = dispatch => {
  return async (title,content,callback) => {
    await jsonServer.post('/blogposts', {title,content});
  };

  //dispatch({type:'add_blogpost',payload:{title,content}});
  if ((callback)) {
    callback();
  }
};

const deleteBolgPost = dispatch =>{
  return async (id) =>{
    await jsonServer.delete(`/blogposts/${id}`)
    dispatch({type:'delete_blogpost', payload: id});
  };
};

const editBlogPost = dispatch =>{
  return async (id,title,content,callback) =>{
    await jsonServer.put(`/blogposts/${id}`,{title,content})
    dispatch({type:'edit_blogpost',payload: {id: id, title:title, content: content}});
    if ((callback)) {   
      callback();
    }
  }
}

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost,deleteBolgPost,editBlogPost, getBlogPosts },
  []
);


//not needed now after create data context automates these---const BlogContext = React.createContext();      //responsible for move information to bloglist
/*
//here children is actually app itself as we imported it in App.js...now if we provide prop to provider any our child can access
export const BlogProvider = ({children}) =>{

        const [blogPosts,dispatch] = useReducer(blogReducer,[]);      //when state changes here whole app rerenders

        addBlogPost=()=>{
        dispatch({type:'add_blogpost'})
   };
    //structure ob blogposts
    // const blogPosts = [
    //     {title:'Blog Post #1'},
    //     {title:'Blog Post #2'}
    // ];


    return <BlogContext.Provider value={{data:blogPosts,addBlogPost}}>
        {children}                              
    </BlogContext.Provider>
};



export default BlogContext;
*/
