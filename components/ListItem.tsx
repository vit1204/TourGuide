import { PropsWithChildren, useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";

type Props = PropsWithChildren<{
  title: string;
  value: string;
  selectedValue: string;
  onChange: (value: string) => void;
}>;

const RadioCheck = ({ title, value, selectedValue, onChange }: Props) => {
  const isSelected = value === selectedValue;

  return (
    <TouchableOpacity onPress={() => onChange(value)}>
      <View style={[styles.container, isSelected && styles.selectedButton   ]}>
        <Text style={styles.text}> {title} </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width:130,
    height:60,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderColor: '#000',
   borderWidth: 2,
  },
  selectedButton: {
    backgroundColor: '#FF8C00',
    color: '#fff',
  },
  text: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    marginTop: 15,
  },
});

export default RadioCheck;