import favoriteList from './reducer_favorites'
import { createStore } from 'redux';

const store= createStore(favoriteList)
export default store