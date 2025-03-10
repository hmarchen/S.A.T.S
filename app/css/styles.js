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
    marginBottom: 20,
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
    backgroundColor: '#358f71',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    height: 45,
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
    backgroundColor: '#534044',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  gridContainer: {
    margin: 5,
    width: 'auto',
    flexGrow: 1,
  },
  gridItem: {
    flex: 1,
    height: 220,
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
    height: 'auto', // Adjusts height based on content
    marginBottom: 12, // Space below the message box
    borderWidth: 1, // Width of the border
    padding: 10, // Inner padding for content
    width: '50%', // Width of the message box
    maxWidth: 500, // Maximum width to prevent overflow
    borderRadius: 5, // Rounded corners
    backgroundColor: '#fff', // Background color
    borderColor: '#ccc', // Border color
    borderStyle: 'solid', // Ensure the border is visible
    overflowWrap: 'break-word', // Ensures long words wrap
    wordWrap: 'break-word', // Fallback for older browsers
    boxSizing: 'border-box', // Includes padding and border in width calculations
  },
  breadcrumbContainer: {
    flexDirection: "row", // Align items in a row
    alignItems: "center", // Center items vertically
    padding: 10, // Add padding around the container
    backgroundColor: "#f8f8f8", // Light background color
    borderRadius: 5, // Rounded corners
    margin: 10, // Margin around the container
    elevation: 1, // Add shadow for Android
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.1, // Shadow opacity for iOS
    shadowRadius: 2, // Shadow radius for iOS
  },
  textLink: {
    textAlign: 'center',
    color: 'blue',
    fontSize: 20,
    paddingBottom: 40,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
},
radioButton: {
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 8,
  marginVertical: 8,
  borderWidth: 1,
  borderColor: '#358f71',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: 280,
},
radioButtonText: {
  fontSize: 16,
},

});

export default styles;
