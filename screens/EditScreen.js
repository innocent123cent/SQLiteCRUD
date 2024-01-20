// screens/EditScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { updateItem, getItemById } from '../Database';

const EditScreen = ({ route, navigation }) => {
  const { itemId } = route.params;
  const [newName, setNewName] = useState('');

  const handleUpdateItem = async () => {
    try {
      await updateItem(itemId, newName);
      console.log('Item updated with ID:', itemId);
      // Navigate back to the HomeScreen or any other screen
      navigation.goBack();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  // Fetch the current item data
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const item = await getItemById(itemId);
        setNewName(item.name);
      } catch (error) {
        console.error('Error fetching item data:', error);
      }
    };

    fetchItemData();
  }, [itemId]);

  return (
    <View>
      <Text>Edit Screen</Text>
      <TextInput
        placeholder="Enter new name"
        value={newName}
        onChangeText={(text) => setNewName(text)}
      />
      <Button title="Update Item" onPress={handleUpdateItem} />
    </View>
  );
};

export default EditScreen;
