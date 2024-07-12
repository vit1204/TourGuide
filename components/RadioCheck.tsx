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
      <View style={styles.container}>
        <View style={[styles.radio, isSelected && styles.selectedRadio]} />
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  radio: {
    width: 29,
    height: 29,
    backgroundColor: "#D9D9D9",
    borderRadius: 50,
    marginRight: 10,
  },
  selectedRadio: {
    backgroundColor: "black",
  },
  text: {
    fontSize: 18,
    color: "black",
  },
});

export default RadioCheck;