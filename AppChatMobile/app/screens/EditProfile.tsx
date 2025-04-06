import React from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function EditProfile() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.headerTitle}>Edit profile</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.profileCompletion}>
        <View style={styles.profileCompletionText}>
          <Text style={styles.profileCompletionLabel}>Profile completion:</Text>
          <Text style={styles.profileCompletionPercentage}>45%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={styles.progress} />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Photos</Text>
        <Text style={styles.sectionSubtitle}>The main photo is how you appear to others on the swipe view.</Text>
        <View style={styles.photos}>
            <Image source={{ uri: 'https://picsum.photos/200/300' }} style={styles.photoLarge} />
            <View style={styles.addPhotoColumn}>
                <View style={styles.addPhoto}>
                <FontAwesome name="plus" size={24} color="gray" />
                </View>
                <View style={styles.addPhoto}>
                <FontAwesome name="plus" size={24} color="gray" />
                </View>
                <View style={styles.addPhoto}>
                <FontAwesome name="plus" size={24} color="gray" />
                </View>
            </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About me</Text>
        <Text style={styles.sectionSubtitle}>Make it easy for others to get a sense of who you are.</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Share a few words about yourself, your interests, and what you're looking for in a connection..."
          multiline
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My details</Text>
        <View style={styles.detailItem}>
          <Text>Occupation</Text>
          <Text style={styles.addText}>Add <MaterialIcons name="keyboard-arrow-right" size={24} color="blue" /></Text>
        </View>
        <View style={styles.detailItem}>
          <Text>Gender & Pronouns</Text>
          <Text style={styles.detailValue}>Male <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" /></Text>
        </View>
        <View style={styles.detailItem}>
          <Text>Education</Text>
          <Text style={styles.addText}>Add <MaterialIcons name="keyboard-arrow-right" size={24} color="blue" /></Text>
        </View>
        <View style={styles.detailItem}>
          <Text>Location</Text>
          <Text style={styles.detailValue}>NV 89104 <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" /></Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Most people also want to know:</Text>
        <View style={styles.detailItem}>
          <Text><MaterialIcons name="straighten" size={16} /> Height</Text>
          <Text style={styles.addText}>Add <MaterialIcons name="keyboard-arrow-right" size={24} color="blue" /></Text>
        </View>
        <View style={styles.detailItem}>
          <Text><FontAwesome name="ban" size={16} /> Smoking</Text>
          <Text style={styles.addText}>Add <MaterialIcons name="keyboard-arrow-right" size={24} color="blue" /></Text>
        </View>
        <View style={styles.detailItem}>
          <Text><FontAwesome name="glass" size={16} /> Drinking</Text>
          <Text style={styles.addText}>Add <MaterialIcons name="keyboard-arrow-right" size={24} color="blue" /></Text>
        </View>
        <View style={styles.detailItem}>
          <Text><FontAwesome name="paw" size={16} /> Pets</Text>
          <Text style={styles.addText}>Add <MaterialIcons name="keyboard-arrow-right" size={24} color="blue" /></Text>
        </View>
        <View style={styles.detailItem}>
          <Text><FontAwesome name="child" size={16} /> Children</Text>
          <Text style={styles.addText}>Add <MaterialIcons name="keyboard-arrow-right" size={24} color="blue" /></Text>
        </View>
        <View style={styles.detailItem}>
          <Text><FontAwesome name="star" size={16} /> Zodiac sign</Text>
          <Text style={styles.addText}>Add <MaterialIcons name="keyboard-arrow-right" size={24} color="blue" /></Text>
        </View>
        <View style={styles.detailItem}>
          <Text><FontAwesome name="hand-paper-o" size={16} /> Religion</Text>
          <Text style={styles.addText}>Add <MaterialIcons name="keyboard-arrow-right" size={24} color="blue" /></Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>I enjoy</Text>
        <Text style={styles.sectionSubtitle}>Adding your interest is a great way to find like-minded connections.</Text>
        <View style={styles.dropdown}>
          <Text>Sci-fi movies</Text>
        </View>
        <View style={styles.tags}>
          <View style={styles.tag}>
            <Text>Coffee brewing <FontAwesome name="times" size={16} /></Text>
          </View>
          <View style={styles.tag}>
            <Text>Trekking <FontAwesome name="times" size={16} /></Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>I communicate in</Text>
        <View style={styles.dropdown}>
          <Text>English</Text>
        </View>
        <View style={styles.tags}>
          <View style={styles.tag}>
            <Text>Finnish <FontAwesome name="times" size={16} /></Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Linked accounts</Text>
        <View style={styles.detailItem}>
          <Text><FontAwesome name="instagram" size={16} /> Instagram</Text>
          <Text style={styles.addText}>Add <MaterialIcons name="keyboard-arrow-right" size={24} color="blue" /></Text>
        </View>
        <View style={styles.detailItem}>
          <Text><FontAwesome name="facebook" size={16} /> Facebook</Text>
          <Text style={styles.addText}>Add <MaterialIcons name="keyboard-arrow-right" size={24} color="blue" /></Text>
        </View>
        <View style={styles.detailItem}>
          <Text><FontAwesome name="twitter" size={16} /> Twitter</Text>
          <Text style={styles.addText}>Add <MaterialIcons name="keyboard-arrow-right" size={24} color="blue" /></Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 16,
    marginTop: 30,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileCompletion: {
    marginBottom: 16,
  },
  profileCompletionText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileCompletionLabel: {
    color: '#666',
  },
  profileCompletionPercentage: {
    color: '#1e90ff',
    fontWeight: 'bold',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginTop: 4,
  },
  progress: {
    height: 10,
    width: '45%',
    backgroundColor: '#1e90ff',
    borderRadius: 5,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: '#666',
    marginBottom: 8,
  },
  photos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  photoLarge: {
    width: '60%',
    height: 290,
    borderRadius: 8,
  },
  addPhotoColumn: {
    width: '35%',
    justifyContent: 'space-between',
    height: 300,
  },
  addPhoto: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    textAlignVertical: 'top',
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  addText: {
    color: '#1e90ff',
  },
  detailValue: {
    color: '#666',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 8,
  },
});