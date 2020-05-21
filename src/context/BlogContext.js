import React, {useReducer} from 'react';
import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'get_blogpost':
      return action.payload;
    case 'edit_blogpost':
      return state.map(blogPost => {
        return blogPost.id == action.payload.id ? action.payload : blogPost;
      });
    case 'delete_blogpost':
      return state.filter(blogpost => blogpost.id !== action.payload);
    // case 'add_blogpost':
    //   return [
    //     ...state,
    //     {

    //       title: action.payload.title,
    //       content: action.payload.content,
    //     },
    //   ];
  }
};

const addBlogPost = dispatch => {
  return async (title, content, callback) => {
    await jsonServer.post('/blogPost', {title, content});
    if (callback) {
      callback();
    }
  };
};

const deleteBlogPost = dispatch => {
  return async id => {
    await jsonServer.delete(`/blogPost/${id}`);
    dispatch({type: 'delete_blogpost', payload: id});
  };
};

const editBlogPost = dispatch => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogPost/${id}`, {title, content});
    dispatch({type: 'edit_blogpost', payload: {id, title, content}});
    if (callback) {
      callback();
    }
  };
};
const getBlogPosts = dispatch => {
  return async () => {
    response = await jsonServer.get('/blogPost');
    dispatch({type: 'get_blogpost', payload: response.data});
  };
};

export const {Context, Provider} = createDataContext(
  blogReducer,
  {addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts},
  [],
);
