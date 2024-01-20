// screens/AddScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { addItem } from '../Database';

const AddScreen = () => {
  const [itemName, setItemName] = useState('');

  const handleAddItem = async () => {
    try {
      const insertId = await addItem(itemName);
      console.log('Item added with ID:', insertId);
      fetchItems();
      // You can navigate to another screen or update the state here.
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <View>
      <Text>Add Student</Text>
      <TextInput
        placeholder="Enter item name"
        value={itemName}
        onChangeText={(text) => setItemName(text)}
      />
      <Button color="" title="Add" onPress={handleAddItem} />
    </View>
  );
};

export default AddScreen;
