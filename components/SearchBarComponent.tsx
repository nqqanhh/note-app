import * as React from 'react';
import { Searchbar } from 'react-native-paper';
const SearchBarComponent=()=> {
  return (
    
    <Searchbar
     placeholder='Search by keyword'
     onChangeText={()=>console.log('opened search bar')}
     value='askdask'
     
    />
  )
}
export default SearchBarComponent;
