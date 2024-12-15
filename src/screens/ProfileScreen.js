import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { db, storage } from '../../firebase'; // Adjust the path to your Firebase config
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen({ navigation }) {
  const theme = useTheme();
  const [isEditable, setIsEditable] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    photoURL: '',
  });
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant camera roll permissions to upload an image.');
      }
    };
    requestPermissions();
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const docRef = doc(db, 'profiles', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile(docSnap.data());
      } else {
        console.log('No profile found.');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const saveProfile = async () => {
    try {
      const docRef = doc(db, 'profiles', user.uid);
      await setDoc(docRef, profile);
      Alert.alert('Success', 'Profile updated successfully');
      setIsEditable(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const toggleEdit = () => {
    if (isEditable) {
      saveProfile();
    } else {
      setIsEditable(true);
    }
  };

  const handleInputChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        uploadImage(uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const storageRef = ref(storage, `profile_images/${user.uid}`);
      await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);
      setProfile((prev) => ({ ...prev, photoURL: downloadURL }));

      Alert.alert('Success', 'Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image');
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Alert.alert('Logged Out', 'You have been logged out successfully.');
        navigation.replace('Login');
      })
      .catch((error) => {
        console.error('Error logging out:', error);
        Alert.alert('Error', 'Failed to log out');
      });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <Text style={styles.headerText}>My Profile</Text>
        <TouchableOpacity style={styles.logoutIcon} onPress={handleLogout}>
          <FontAwesome5 name="user" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        {profile.photoURL ? (
          <Image source={{ uri: profile.photoURL }} style={styles.profileImage} />
        ) : (
          <FontAwesome5 name="user-circle" size={100} color={theme.colors.text} />
        )}
        {isEditable && (
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.imageButtonText}>Change Photo</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={[styles.inputContainer, { borderColor: theme.colors.border }]}>
        <FontAwesome5 name="user-alt" size={20} color={theme.colors.text} style={styles.icon} />
        <TextInput
          style={[styles.input, { color: theme.colors.text }]}
          placeholder="Full Name"
          value={profile.name}
          editable={isEditable}
          onChangeText={(text) => handleInputChange('name', text)}
          placeholderTextColor={theme.colors.placeholder}
        />
      </View>
      <View style={[styles.inputContainer, { borderColor: theme.colors.border }]}>
        <FontAwesome5 name="envelope" size={20} color={theme.colors.text} style={styles.icon} />
        <TextInput
          style={[styles.input, { color: theme.colors.text }]}
          placeholder="Email"
          value={profile.email}
          editable={isEditable}
          onChangeText={(text) => handleInputChange('email', text)}
          placeholderTextColor={theme.colors.placeholder}
        />
      </View>
      <View style={[styles.inputContainer, { borderColor: theme.colors.border }]}>
        <FontAwesome5 name="phone" size={20} color={theme.colors.text} style={styles.icon} />
        <TextInput
          style={[styles.input, { color: theme.colors.text }]}
          placeholder="Phone"
          value={profile.phone}
          editable={isEditable}
          onChangeText={(text) => handleInputChange('phone', text)}
          placeholderTextColor={theme.colors.placeholder}
        />
      </View>
      <View style={[styles.inputContainer, { borderColor: theme.colors.border }]}>
        <FontAwesome5 name="map-marker-alt" size={20} color={theme.colors.text} style={styles.icon} />
        <TextInput
          style={[styles.input, { color: theme.colors.text }]}
          placeholder="Address"
          value={profile.address}
          editable={isEditable}
          onChangeText={(text) => handleInputChange('address', text)}
          placeholderTextColor={theme.colors.placeholder}
        />
      </View>

      <TouchableOpacity
        style={[styles.editButton, { backgroundColor: isEditable ? theme.colors.secondary : theme.colors.primary }]}
        onPress={toggleEdit}
      >
        <Text style={styles.buttonText}>{isEditable ? 'Save Changes' : 'Edit Profile'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutIcon: {
    padding: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  imageButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 20,
  },
  imageButtonText: {
    color: 'white',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 30,
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  editButton: {
    margin: 16,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
