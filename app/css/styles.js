import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 20, // Added for consistency with spacing
  },
  paragraph: {
    fontSize: 20,
    fontWeight: 'semibold',
    textAlign: 'center',
    color: 'black',
    marginBottom: 5
  },  
  list: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginBottom: 5
  },  
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    width: '90%',
    borderRadius: 5,
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },

  studentNumber: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    width: '40%',
    borderRadius: 5,
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007bff', // Changed to standard blue
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    height: 45, // Added for consistency with height
  },
  loginButton: {
    marginVertical: 80,
    padding: 10,
      backgroundColor: '#841584',
      borderRadius: 5,
      paddingVertical: 20,
      width: 300,
      height: 70,
  },
  clearButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20, // Standardized button text size
    textAlign: 'center', // Added for consistent text alignment
  },
  messageBox: {
    height: 300,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    width: '90%',
    borderRadius: 5,
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  gridContainer: {
    margin: 5,
    width: 'auto',
    flexGrow: 1,
  },
  gridItem: {
    flex: 1,
    height: 263,
    backgroundColor: '#0B8261',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    color: 'Blue',
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6, // For Android shadow
  },
  gridItemText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageBox: {
    height: 300,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    width: '90%',
    borderRadius: 5,
    backgroundColor: '#fff',
    borderColor: '#ccc',
  }
});

export default styles;
