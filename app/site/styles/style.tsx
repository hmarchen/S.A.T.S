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
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
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
    headerSeparator: {
      height: 15,
      backgroundColor: '#3e2b2f',
    },

    // BODY / CONTENT
    body: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    logo: {
      width: 80,
      height: 80,
      marginRight: 10, 
      resizeMode: 'contain',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 18,
      color: '#555',
      textAlign: 'center',
      marginBottom: 20,
    },

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
  