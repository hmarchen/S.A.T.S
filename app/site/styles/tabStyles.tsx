import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    headerIcon: {
        width: 14,
        height: 14,
        marginRight: 10, 
        resizeMode: 'contain',
    },
    popup: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.20)', // Semi-transparent background
    },
    popupBox: {
        width: '40%',
        height: '40%',
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
    },
    popupHeader: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#E8E7E7',
        paddingLeft: 10,
    },
    popupBody: {
        padding: 20,
    },
    popupClose: {
        width: 40,
        height: 40,
        padding: 5,
    },
    popupIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
        resizeMode: 'contain',
    },
    popupTitle: {
        fontSize: 18,
        fontFamily: 'Lato',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#3e2b2f',
    },
    popupText: {
        fontSize: 18,
    },

    // MANAGE USERS ------------------------------------
    userContainer:{
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 20,
    },
    userHeader: {
        width: '100%',
        borderRadius: 4,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#F2F1F1',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    userBody: {
        flex: 1,
        width: '100%',
        borderRadius: 4,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#F2F1F1',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    userScroll: {
        flex: 1,
        padding: 10,
    },
    userAddButton: {
        width: 125,
        borderRadius: 8,
        padding: 5,
        backgroundColor: '#0B8261',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 3,
    },
    userAddButtonText: {
        fontSize: 14,
        fontFamily: 'Lato',
        color: '#E1FFED',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },

    


    // MANAGE REASONS ----------------------------------
});

export default styles;
  