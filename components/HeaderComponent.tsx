import * as React from 'react';
import { Modal } from 'react-native';
import { Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBarComponent from './SearchBarComponent';

const HeaderComponent = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Notes" style={{ alignItems: 'flex-start' }} />
        <Appbar.Action icon="magnify" onPress={() => setIsModalVisible(true)} />
        <Appbar.Action icon="information" onPress={() => console.log('pressed info')} />
      </Appbar.Header>
      <Modal
        visible={isModalVisible}
        onRequestClose={handleCloseModal}
        animationType="slide"
      >
        <SafeAreaView>
          <SearchBarComponent />
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default HeaderComponent;
