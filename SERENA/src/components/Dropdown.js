import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function Dropdown({ options, selectedValue, onValueChange, enabled }) {
  const [showOptions, setShowOptions] = useState(false);

  const selectedLabel = options.find(o => o.value === selectedValue)?.label || "¿Quién utiliza esta cuenta?";

  const toggleDropdown = () => {
    if (enabled) setShowOptions(!showOptions);
  };

  const onSelect = (value) => {
    onValueChange(value);
    setShowOptions(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.selector, !enabled && styles.disabled]}
        onPress={toggleDropdown}
        activeOpacity={0.7}
      >
        <View style={styles.selectorContent}>
          <Text style={styles.selectedText}>{selectedLabel}</Text>
          {enabled && <Text style={styles.arrow}>▼</Text>}
        </View>
      </TouchableOpacity>

      {showOptions && (
        <ScrollView style={styles.optionsContainer}>
          {options.map(item => (
            <TouchableOpacity
              key={String(item.value)}
              style={styles.option}
              onPress={() => onSelect(item.value)}
            >
              <Text style={styles.optionText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 12,
  },
  selector: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#B9D9EB',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  disabled: {
    backgroundColor: '#eee',
  },
  selectorContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 16,
    color: '#0A0D41',
  },
  arrow: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
  },
  optionsContainer: {
    maxHeight: 150,
    borderWidth: 1,
    borderColor: '#B9D9EB',
    borderRadius: 12,
    backgroundColor: '#fff',
    marginTop: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#0A0D41',
  },
});
