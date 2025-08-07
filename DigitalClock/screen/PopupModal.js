import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import styles from '../screen/Style';

const PopupModal = ({ visible, onClose, darkMode }) => {
  const themeStyles = darkMode ? styles.dark : styles.light;

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, themeStyles.modal]}>
          <Text style={[styles.modalText, themeStyles.text]}>
            ⏰ Time's up!
          </Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={[styles.closeButton, themeStyles.text]}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PopupModal;
