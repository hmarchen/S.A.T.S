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
    marginBottom: 30, // Increased bottom margin for better separation
  },
  paragraph: {
    fontSize: 20,
    fontWeight: '600', // Changed to numeric for consistency
    textAlign: 'center',
    color: 'black',
    marginBottom: 10, // Increased margin for more spacing
  },
  list: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginBottom: 10, // Increased margin for more spacing
  },
  input: {
    height: 48, // Increased height for better touch target
    marginBottom: 16, // Increased margin for better spacing
    borderWidth: 1,
    padding: 12, // Increased padding for better input experience
    width: '90%',
    borderRadius: 8, // Increased border radius for softer edges
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  studentNumber: {
    height: 48, // Increased height for consistency
    marginBottom: 16, // Increased margin for better spacing
    borderWidth: 1,
    padding: 12, // Increased padding for better input experience
    width: 'auto',  // Adjust this value
    borderRadius: 8, // Increased border radius for softer edges
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 30, // Increased margin for better separation
  },
  button: {
    backgroundColor: '#358f71',
    paddingVertical: 12, // Increased padding for better touch target
    paddingHorizontal: 24,
    borderRadius: 8, // Increased border radius for softer edges
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10, // Increased margin for better separation
    height: 50, // Increased height for better touch target
    elevation: 3, // Added elevation for a subtle shadow effect
  },
  loginButton: {
    marginVertical: 80,
    padding: 10,
    backgroundColor: '#841584',
    borderRadius: 8, // Increased border radius for softer edges
    paddingVertical: 24, // Increased padding for better touch target
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
  ArrowText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  arrowContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    transform: [{ translateY: -25 }],
  },
  arrowButton: {
    padding: 12, // Increased padding for better touch target
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
    overflow: 'hidden',
    shadowColor: '#000',
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
    marginBottom: 16, // Increased space below the message box
    borderWidth: 1, // Width of the border
    padding: 12, // Increased inner padding for content
    width: '50%', // Width of the message box
    maxWidth: 500, // Maximum width to prevent overflow
    borderRadius: 8, // Increased border radius for softer edges
    backgroundColor: '#fff', // Background color
    borderColor: '#ccc', // Border color
    borderStyle: 'solid', // Ensure the border is visible
    overflowWrap: 'break-word', // Ensures long words wrap
    wordWrap: 'break-word', // Fallback for older browsers
    boxSizing: 'border-box', // Includes padding and border in width calculations
  },
  breadcrumbContainer: {
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center items vertically
    padding: 12, // Increased padding around the container
    backgroundColor: '#f8f8f8', // Light background color
    borderRadius: 8, // Increased border radius for softer edges
    margin: 10, // Margin around the container
    elevation: 1, // Add shadow for Android
    shadowColor: '#000', // Shadow color for iOS
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
    borderRadius: 10, // Slightly increased radius for a softer look
    backgroundColor: '#ffffff', // Keep white background
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3, // Slightly increased opacity for better shadow effect
    shadowRadius: 4, // Softened shadow radius
  },
  radioButton: {
    paddingVertical: 16, // Increased vertical padding for a more comfortable touch target
    paddingHorizontal: 16,
    borderRadius: 10, // Slightly increased radius for a softer look
    marginVertical: 10, // Increased vertical margin for better spacing
    marginHorizontal: 10,
    borderWidth: 2, // Increased border width for better visibility
    borderColor: '#358f71',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 280,
    backgroundColor: '#f1f1f1', // Light background for radio buttons to enhance visibility
    transitionDuration: '0.2s', // Smooth transition effect (only works with some styling methods)
  },
  radioButtonText: {
    fontSize: 18, // Increased font size for better readability
    color: '#333', // Darker text color for better contrast
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Aligns to the right
    marginRight: 10,
    marginTop: 5,
  },
  charCounter: {
    fontSize: 14,
    marginRight: 5, // Space between counter and symbol
  },
  statusSymbol: {
    fontSize: 16,
  },
});

export default styles;
