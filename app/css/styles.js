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
    backgroundColor: 'transparent',
  },

  transparentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

translucentContainer: {
  marginVertical: 2,
      padding: 10,
      borderRadius: 8,
      alignItems: 'flex-start',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
    marginBottom: 5,
    marginTop: 100
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

  calendar: {
    width: 600,
    alignSelf: "center",
    borderRadius: 10,
    padding: 10,
    elevation: 5, // Adds shadow for better visibility
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 50,
    marginBottom: 50
  },

  calendarTheme: {
    backgroundColor: "rgba(255, 255, 255, 0.95)", // Slightly opaque white background
    calendarBackground: "rgba(255, 255, 255, 0.9)",
    textSectionTitleColor: "#333",
    selectedDayBackgroundColor: "#358f71",
    selectedDayTextColor: "#fff",
    todayTextColor: "#358f71",
    dayTextColor: "#000",
    arrowColor: "#358f71",
    textDisabledColor: "gray",
    monthTextColor: "#333",
    textDayFontSize: 18, // Larger day numbers
    textMonthFontSize: 20,
    textDayHeaderFontSize: 16,
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
  width: 500,
  height: 100, // Slightly increased height for a larger touch area
  fontSize: 28, // Slightly bigger text for readability
  borderBottomWidth: 4, // More pronounced border
  borderBottomColor: 'white',
  textAlign: 'center',
  color: 'white',
  marginBottom: 20, // More spacing around for easier access
  paddingVertical: 20, // More padding for a better touch experience
  paddingHorizontal: 10, // Adds a bit of padding inside for better touch
  borderRadius: 10, // Slightly rounded edges for a softer touch feel
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

 breadcrumbContainer: {
     flexDirection: 'row',
     alignItems: 'center',
     paddingVertical: 8,
     marginVertical: 10
   },
   breadcrumbItem: {
     flexDirection: 'row',
     alignItems: 'center',
   },
   breadcrumbText: {
     fontSize: 16,
     fontWeight: '600',
     color: '#F5F5F5', // Light color for contrast
   },
   breadcrumbSeparator: {
     marginHorizontal: 5,
     fontSize: 16,
     color: '#C0C0C0', // Soft gray for contrast
   },

  textLink: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    paddingBottom: 20,
  },
cardContainer: {
    marginTop: 60,
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    elevation: 5, // Shadow for Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 24, // Increased font size
    fontWeight: "bold",
    textAlign: "left", // Left-aligned
    color: "#333",
  },
  detailsContainer: {
    marginTop: 10,
  },
  detailRow: {
    flexDirection: "column", // Stack label and value vertically
  },
  detailLabel: {
    fontSize: 18, // Increased font size
    fontWeight: "bold",
    color: "#444",
    textAlign: "left",
  },
  detailValue: {
    fontSize: 18, // Increased font size
    fontWeight: "bold",
    color: "#666",
  },

  confirmButton: {
    backgroundColor: "#358f71",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  confirmButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
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
    paddingVertical: 16, // Good vertical padding for height
    paddingHorizontal: 24, // Good horizontal padding for width
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },

radioButtonText: {
  fontSize: 400,
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

summaryText: {
  fontSize: 18,
  color: 'black',
  textAlign: 'left', // Change to 'center' if you need centering
  fontWeight: 'bold',
  lineHeight: 24, // Helps with readability
  marginVertical: 5, // Adds spacing above/below
  paddingHorizontal: 10, // Ensures consistent spacing inside
  },
  errorText: {
  color: '#FF6347',
  marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
},

scrollView: {
  width: '100%',
  maxHeight: 400,
  marginTop: 20,
},
dateHeader: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#fff',
  marginTop: 15,
  marginBottom: 5,
},
availabilityText: {
  color: '#fff',
  fontSize: 16,
  marginVertical: 2,
},
errorText: {
  color: '#ff4444',
  marginTop: 10,
  textAlign: 'center',
},

});

export default styles;
