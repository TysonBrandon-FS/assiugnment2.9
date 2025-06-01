import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

const API_URL = 'https://assiugnment2-9.onrender.com/api/tvshows';

export default function App() {
  const [tvShows, setTvShows] = useState([]);
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState(null);


  const fetchShows = async () => {
    try {
      const response = await axios.get(API_URL);
      setTvShows(response.data);
    } catch (error) {
      console.log('Error fetching shows:', error);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);


  const addShow = async () => {
    try {
      await axios.post(API_URL, { title });
      setTitle('');
      fetchShows();
    } catch (error) {
      console.log('Error adding show:', error);
    }
  };

 
  const updateShow = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}`, { title });
      setTitle('');
      setEditingId(null);
      fetchShows();
    } catch (error) {
      console.log('Error updating show:', error);
    }
  };

  const deleteShow = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchShows();
    } catch (error) {
      console.log('Error deleting show:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TV Shows</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter TV show title"
        />
        <TouchableOpacity 
          style={styles.button}
          onPress={() => editingId ? updateShow(editingId) : addShow()}
        >
          <Text style={styles.buttonText}>
            {editingId ? 'Update' : 'Add'} Show
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.list}>
        {tvShows.map((show) => (
          <View key={show._id} style={styles.showItem}>
            <Text style={styles.showText}>{show.title}</Text>
            <Text style={styles.showText}>Rating: {show.rating}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.editButton]}
                onPress={() => {
                  setTitle(show.title);
                  setEditingId(show._id);
                }}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.deleteButton]}
                onPress={() => deleteShow(show._id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  showItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  showText: {
    flex: 1,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#34C759',
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
});
