import * as React from "react";
import { Modal, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBarComponent from "./SearchBarComponent";
import { router, useRouter } from "expo-router";

const HeaderComponent = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const router = useRouter();
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Notes" style={{ alignItems: "flex-start" }} />
        {/* <Appbar.Action icon="magnify" onPress={() => setIsModalVisible(true)} /> */}
        <Appbar.Action
          icon="information"
          onPress={() => console.log("pressed info")}
        />
        {/* <Appbar.Action
          icon="information"
          onPress={() => router.push("/(tabs)/adnotes")}
        /> */}
      </Appbar.Header>
      {/* <Modal
        visible={isModalVisible}
        onRequestClose={handleCloseModal}
        animationType="slide"
        style={{ paddingTop: "10%" }}
      >
        <View style={styles.searchContainer}>
          <SearchBarComponent />
        </View>
      </Modal> */}
    </>
  );
};
const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: "#f8f9fa",
  },
});
export default HeaderComponent;
