import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  clock: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    gap: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    padding: 12,
    marginBottom: 20,
    borderRadius: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  countdown: {
    fontSize: 26,
    fontWeight: '600',
    marginVertical: 20,
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 280,
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 20,
    color: '#007BFF',
  },
  light: {
    background: {
      backgroundColor: '#ffffff',
    },
    text: {
      color: '#000000',
    },
    input: {
      borderColor: '#000',
      color: '#000',
    },
    modal: {
      backgroundColor: '#fff',
    },
  },
  dark: {
    background: {
      backgroundColor: '#121212',
    },
    text: {
      color: '#ffffff',
    },
    input: {
      borderColor: '#fff',
      color: '#fff',
    },
    modal: {
      backgroundColor: '#333',
    },
  },
});

export default styles;
