import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: '#f0f0f0',
    },

    // HEADER / NAVIGATION
    header: {
      height: 100,
      padding: 10,
      backgroundColor: '#007852',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    headerNav: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 30,
      // backgroundColor: '#EEEEEE',
    },
    navLink: {
      width: 50,
    },
    navText: {
      fontSize: 16,
      fontFamily: 'Oswald',
      textTransform: 'uppercase',
      color: '#ffffff',
    },
    navButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 150,
      padding: 2,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#EEEEEE',
    },
    navButtonText: {
      fontSize: 16,
      fontFamily: 'Oswald',
      textTransform: 'uppercase',
      color: '#525252',
    },
    navProfile: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      gap: 5
    },
    adminButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    adminButtonText: {
      fontSize: 16,
      fontFamily: 'Oswald',
      color: '#751111',
    },

    // HEADER SEPARATOR
    headerSeparator: {
      height: 15,
      backgroundColor: '#3e2b2f',
    },

    // BODY / CONTENT (all pages)
    body: {
      flex: 1,
      padding: 16,
    },
    logo: {
      width: 80,
      height: 80,
      marginRight: 10, 
      resizeMode: 'contain',
    },
    icon: {
      width: 20,
      height: 20,
      marginRight: 10, 
      resizeMode: 'contain',
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 2,
      paddingHorizontal: 20,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#EEEEEE',
    },
    buttonText: {
      fontSize: 16,
      fontFamily: 'Oswald',
      textTransform: 'uppercase',
      color: '#525252',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      fontFamily: 'Oswald',
      color: '#007852',
    },
    subtitle: {
      fontSize: 18,
      color: '#555',
      textAlign: 'center',
    },
    whisper: {
      fontSize: 12,
      color: '#555',
      textAlign: 'center',
      fontStyle: 'italic',
    },
    horizontalLine: {
      width: '100%',
      height: 2,
      backgroundColor: '#BCBBBB',
      marginVertical: 20,
    },
    textInput: {
      height: 40,
      borderColor: '#007852',
      borderWidth: 1,
      borderRadius: 8,
      paddingLeft: 10,
      width: '100%', 
    },

    // ------------------------------------------
    // PAGES ------------------------------------

    // home page
    homeContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    // appointment page
    apptContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    // faq page
    faqContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    // login page
    loginContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loginBox:{
      width: '40%',
      padding: 20,
      borderRadius: 10,
      backgroundColor: '#ffffff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
    },
    loginBody:{
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    loginButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '15%',
      backgroundColor: '#007852',
      padding: 10,
      borderRadius: 4,
    },
    loginButtonText: {
      fontSize: 16,
      fontFamily: 'Oswald',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      color: '#ffffff',
    },

    // ------------------------------------------
    // FOOTER
    footer: {
      height: 100,
      padding: 20,
      backgroundColor: '#007852',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    footerText: {
      fontSize: 14,
      color: '#888',
      textAlign: 'center',
      marginTop: 20,
    },
});

export default styles;
  