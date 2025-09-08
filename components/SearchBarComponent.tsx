import * as React from "react";
import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { setSearchNote } from "@/redux/noteSlice";
const SearchBarComponent = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = React.useState("");
  // const insets = useSafeAreaInsets();

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    dispatch(setSearchNote(query));
  };
  return (
    <TextInput
      placeholder="Search..."
      value={searchQuery}
      onChangeText={onChangeSearch}
      style={{
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        margin: 10,
      }}
      placeholderTextColor="#888"
    />
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
});
export default SearchBarComponent;
