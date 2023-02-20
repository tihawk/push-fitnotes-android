import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Appbar, Menu } from 'react-native-paper';

function CustomNavigationBar({navigation, back}: NativeStackHeaderProps) {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const navigate = (location: string) => {
    navigation.navigate(location)
    closeMenu()
  }
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="Push Fitnotes" />
      {!back ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="menu" color="white" onPress={openMenu} />
          }>
          <Menu.Item onPress={() => navigate('Settings')} title="Settings" />
        </Menu>
      ) : null}
    </Appbar.Header>
  );
}

export default CustomNavigationBar;