import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  ScrollView,
} from "react-native";
import { CheckBox, Slider } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";

type Gender = 'male' | 'female' | 'nonbinary';

export default function FilterProfile() {
    const [preferredGender, setPreferredGender] = useState({
        male: false,
        female: true,
        nonbinary: false,
      });
      const [ageRange, setAgeRange] = useState(18);
      const [distance, setDistance] = useState(10);
      const [showExtendedRange, setShowExtendedRange] = useState(true);
      const [languages, setLanguages] = useState(["English", "Spanish"]);
    
      const toggleGender = (gender: Gender) => {
        setPreferredGender((prev) => ({ ...prev, [gender]: !prev[gender] }));
      };
    
      const removeLanguage = (language: string) => {
        setLanguages((prev) => prev.filter((lang) => lang !== language));
      };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.icon}>×</Text>
        <Text style={styles.headerTitle}>Filters</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Preferred Gender */}
      <View style={styles.section}>
        <Text style={styles.label}>What is your preferred gender?</Text>
        <View style={styles.checkboxGroup}>
          <CheckBox
            title="Male"
            checked={preferredGender.male}
            onPress={() => toggleGender("male")}
            containerStyle={styles.checkbox}
          />
          <CheckBox
            title="Female"
            checked={preferredGender.female}
            onPress={() => toggleGender("female")}
            containerStyle={styles.checkbox}
          />
          <CheckBox
            title="Nonbinary"
            checked={preferredGender.nonbinary}
            onPress={() => toggleGender("nonbinary")}
            containerStyle={styles.checkbox}
          />
        </View>
      </View>

      {/* Age Range */}
      <View style={styles.section}>
        <Text style={styles.label}>Age range:</Text>
        <View style={styles.sliderContainer}>
          <View style={styles.sliderLabels}>
            <Text>18</Text>
            <Text>80</Text>
          </View>
          <Slider
            value={ageRange}
            onValueChange={setAgeRange}
            minimumValue={18}
            maximumValue={80}
            step={1}
            thumbStyle={styles.sliderThumb}
          />
          <Text style={styles.rangeValue}>Selected: {ageRange}</Text>
        </View>
      </View>

      {/* Distance */}
      <View style={styles.section}>
        <Text style={styles.label}>Distance:</Text>
        <View style={styles.sliderContainer}>
          <View style={styles.sliderLabels}>
            <Text>10 km</Text>
            <Text>80 km</Text>
          </View>
          <Slider
            value={distance}
            onValueChange={setDistance}
            minimumValue={10}
            maximumValue={80}
            step={1}
            thumbStyle={styles.sliderThumb}
          />
          <Text style={styles.rangeValue}>Selected: {distance} km</Text>
          <View style={styles.switchContainer}>
            <Switch
              value={showExtendedRange}
              onValueChange={setShowExtendedRange}
            />
            <Text style={styles.switchLabel}>
              Show profiles within a 15-km range when run out of matches.
            </Text>
          </View>
        </View>
      </View>

      {/* Languages */}
      <View style={styles.section}>
        <Text style={styles.label}>Languages:</Text>
        <RNPickerSelect
          onValueChange={(value) => value && setLanguages([...languages, value])}
          items={[
            { label: "English", value: "English" },
            { label: "Spanish", value: "Spanish" },
            { label: "French", value: "French" },
          ]}
          placeholder={{ label: "Select languages", value: null }}
          style={{
            inputAndroid: styles.picker,
            inputIOS: styles.picker,
          }}
        />
        <View style={styles.languageTags}>
          {languages.map((language) => (
            <TouchableOpacity
              key={language}
              style={styles.languageTag}
              onPress={() => removeLanguage(language)}
            >
              <Text style={styles.languageText}>
                {language} ×
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.clearButton}>
          <Text style={styles.clearText}>Clear all</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyText}>Apply filters</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    fontSize: 24,
    color: "#000",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  checkboxGroup: {
    flexDirection: "column",
  },
  checkbox: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  sliderContainer: {
    marginTop: 8,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sliderThumb: {
    height: 20,
    width: 20,
  },
  rangeValue: {
    textAlign: "center",
    marginTop: 8,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  switchLabel: {
    marginLeft: 8,
    fontSize: 12,
  },
  picker: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
    backgroundColor: "#f9f9f9",
  },
  languageTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  languageTag: {
    backgroundColor: "#e0f2fe",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  languageText: {
    color: "#0284c7",
    fontSize: 12,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  clearButton: {
    backgroundColor: "#e5e5e5",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  applyButton: {
    backgroundColor: "#3b82f6",
    padding: 12,
    borderRadius: 8,
    flex: 1,
  },
  clearText: {
    textAlign: "center",
    color: "#333",
  },
  applyText: {
    textAlign: "center",
    color: "#fff",
  },
});
