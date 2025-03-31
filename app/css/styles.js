import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Background styling
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Generic container for overlays on the background
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'transparent',
  },

  transparentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'transparent',
  },

  // Typography
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 30,
  },

  whiteTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 30,
  },

  paragraph: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 10,
  },

  whiteParagraph: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 15,
  },

  listItem: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 5,
  },

  whiteListItem: {
    fontSize: 20,
    color: '#fff',
    marginVertical: 5,
  },

  listContainer: {
    marginVertical: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
  },

  transparentList: {
    marginVertical: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
  },

  // Input
  input: {
    width: 320,
    height: 70,
    fontSize: 26,
    borderBottomWidth: 3,
    borderBottomColor: 'white',
    textAlign: 'center',
    color: 'white',
    marginBottom: 30,
  },

  // Buttons
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 30,
  },

  button: {
    backgroundColor: '#358f71',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
    height: 50,
    elevation: 3,
  },

  clearButton: {
    backgroundColor: '#534044',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
  },

  loginButton: {
    marginVertical: 80,
    backgroundColor: '#841584',
    borderRadius: 8,
    paddingVertical: 24,
    width: 300,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Arrows
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
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 5,
  },

  activeArrow: {
    opacity: 1,
  },

  disabledArrow: {
    opacity: 0.3,
  },

  ArrowText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },

  // Breadcrumb
  breadcrumbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 30,
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
  },

  breadcrumbText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },

  textLink: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    paddingBottom: 20,
  },

  // Radio Buttons
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

radioButton: {
  paddingVertical: 16,
  paddingHorizontal: 24,
  borderRadius: 10,
  marginVertical: 10,
  marginHorizontal: 5,
  borderWidth: 2,
  borderColor: '#ffffff',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  alignItems: 'center',
  justifyContent: 'center', // This centers vertically
  minWidth: 120, // Optional: consistent size
},

radioButtonText: {
  fontSize: 18,
  color: '#fff',
  textAlign: 'center', // Ensures horizontal centering
  fontWeight: 'bold',
},


  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
  },

  // Grid styles (optional)
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
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },

  gridItemText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  messageBox: {
    marginBottom: 16,
    borderWidth: 1,
    padding: 12,
    width: '50%',
    maxWidth: 500,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },

  // Misc
  timeslotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 30,
  },

  timeslotItem: {
    width: '30%',
    alignItems: 'center',
  },

  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 10,
    marginTop: 5,
  },

  charCounter: {
    fontSize: 14,
    marginRight: 5,
  },

  statusSymbol: {
    fontSize: 16,
  },

arrowWrapper: {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center', // ✅ centers vertically
  paddingHorizontal: 20,
  zIndex: 1,
},

arrowContainer: {
  position: 'absolute',
  top: '45%', // Adjusted based on your screenshot suggestion
  left: 0,
  right: 0,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 30,
  zIndex: 999,
},

arrowButton: {
  width: 70,
  height: 70,
  borderRadius: 35,
  borderWidth: 2,
  borderColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'transparent',
},


activeArrow: {
  opacity: 1,
},

disabledArrow: {
  opacity: 0.3,
},


});

export default styles;
