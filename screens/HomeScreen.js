// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { getAllItems, deleteItem, } from '../Database';

const HomeScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items when the component mounts
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const allItems = await getAllItems();
      setItems(allItems);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteItem(id);
      console.log('Item deleted with ID:', id);
      // Refresh the items list after deletion
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEditItem = (id) => {
    // Navigate to the EditScreen with the item ID
    navigation.navigate('Edit', { itemId: id });
  };

  return (
    <View>
      <Text>YEAR3 COMPUTER AND SOFTWARE ENGINEERING</Text>
      <Button
        title="Go to Add Student"
        onPress={() => navigation.navigate('Add')}
      />
      <Text >Student</Text>
      {items.map((item) => (
        <View key={item.id}>
          <Text>{item.name}</Text>
          <Button color="violet" title="Edit" onPress={() => handleEditItem(item.id)} />
          <Button color="red" title="Delete" onPress={() => handleDeleteItem(item.id)} />
          
        </View>
      ))}
    </View>
  );
};

export default HomeScreen;
