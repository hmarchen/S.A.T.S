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
    profileButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileButtonText: {
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
      marginBottom: 5,
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

    errorContainer: {
      width: '50%',
      height: 50,
      position: 'absolute',
      bottom: '90%',
      zIndex: 9999,
      backgroundColor: '#ff4444',
      padding: 10,
      borderRadius: 8,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    errorText: {
      fontSize: 16,
      color: '#ffffff',
      textAlign: 'center',
      fontWeight: 'bold',
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

    // admin page
    adminContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
    },
    adminTitle: {
      fontSize: 24,
      fontFamily: 'Oswald',
      color: '#007852',
      textTransform: 'uppercase',
    },
    adminSubtitle: {
      fontSize: 24,
      fontFamily: 'Oswald',
      top: 20,
      paddingBottom: 20,
      paddingHorizontal: 20,
      color: '#3e2b2f',
      textTransform: 'uppercase',
    },
    adminButtonText: {
      fontSize: 14,
      fontWeight: 'bold',
      fontFamily: 'Lato',
      padding: 10,
      borderRadius: 4,
      textTransform: 'uppercase',
      color: '#807F7F',
    },
    adminNav: {
      height: '100%',
      width: '15%',
      padding: 20,
      borderRadius: 4,
      backgroundColor: '#ffffff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,

      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    adminMain: {
      height: '100%',
      width: '50%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      backgroundColor: '#FAFAFA',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
    },
    adminHeader: {
      height: 80,
      width: '100%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      backgroundColor: '#E8E7E7',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 3,
    },
    adminTab: {
      width: '100%',
      padding: 20,
      flex: 1,
    },
    adminScroll: {
      flex: 1,
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
  