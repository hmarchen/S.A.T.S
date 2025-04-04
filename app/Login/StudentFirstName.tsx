import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, Pressable, ImageBackground, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import Breadcrumb from './breadcrumb';
import { Ionicons } from '@expo/vector-icons';
import styles from '../css/styles';
import * as FileSystem from 'expo-file-system';

const filePath = FileSystem.documentDirectory + 'user.json';

<<<<<<< HEAD
export default function StudentFirstName() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const FirstnameREGEX = /^[A-Z][a-zA-Z' -]+$/; // Regex for valid first names
  const isValid = FirstnameREGEX.test(firstName.trim());

  // Validate on every change once touched
  const validateInput = () => {
    const trimmedFirstName = firstName.trim();
    if (!trimmedFirstName) {
      setError("First name is required.");
      return false;
    }
    if (!FirstnameREGEX.test(trimmedFirstName)) {
      setError("Must start with a capital letter and contain only letters.");
      return false;
    }
    setError(null);
    return true;
  };

  // This ensures we check for errors on each keystroke after first interaction
  useEffect(() => {
    if (touched) {
      validateInput();
    }
  }, [firstName]);
=======
interface LayoutProps {
  setRoute: (route: string) => void;
}

const StudentFirstName: React.FC<LayoutProps> = ({setRoute}) => {
    const router = useRouter();
    const isWeb = Platform.OS === 'web';
    const [firstName, setFirstName] = useState('');

    const handleSubmit = async () => {
        try {
            if (isWeb) {
                const existingData = localStorage.getItem('student');
                const updatedData = existingData ? JSON.parse(existingData) : [];

                updatedData.length > 0
                    ? (updatedData[0].firstname = firstName)
                    : updatedData.push({ firstname: firstName, lastname: '', studentID: '', DCMail: '', campus: '', program: '', reason: '' });

                localStorage.setItem('student', JSON.stringify(updatedData));
                console.log(updatedData);
                alert(`Form Submitted\nFirstname: ${firstName}`);
                setRoute('studentLastName');
            } else {
                const fileExists = await FileSystem.getInfoAsync(filePath);
                let updatedData = fileExists.exists ? JSON.parse(await FileSystem.readAsStringAsync(filePath)) : [];

                updatedData.length > 0
                    ? (updatedData[0].firstname = firstName)
                    : updatedData.push({ firstname: firstName, lastname: '', studentID: '', DCMail: '', campus: '', program: '', reason: '' });

                await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
                Alert.alert('Form Submitted', `Firstname: ${firstName}`);
                console.log('Navigating to StudentLastName...');
                router.push('/Login/StudentLastName');
            }
        } catch (error) {
            console.error('Error writing to file:', error);
            Alert.alert('Error', 'Failed to save data.');
        }
    };
>>>>>>> f2ce5511a0e46cbc1cd88c913bde165ac763111a

  // Force a validation check when user starts typing
  const handleChangeText = (text: string) => {
    setFirstName(text);
    setTouched(true);
  };

  const handleBlur = () => {
    setTouched(true);
    validateInput();
  };

  const validateForm = () => {
    const trimmedFirstName = firstName.trim();
    if (!trimmedFirstName) return "First name is required.";
    if (!FirstnameREGEX.test(trimmedFirstName)) return "Invalid first name: Must start with a capital letter and contain only letters.";
    return null; // No error
  };

  const handleSubmit = async () => {
    const error = validateForm();
    if (error) {
      Alert.alert("Validation Error", error);
      return;
    }

    try {
      const fileExists = await FileSystem.getInfoAsync(filePath);
      const updatedData = fileExists.exists
        ? JSON.parse(await FileSystem.readAsStringAsync(filePath))
        : [];

      if (updatedData.length > 0) {
        updatedData[0].firstname = firstName; // Update existing data
      } else {
        updatedData.push({
          firstname: firstName,
          lastname: '',
          studentID: '',
          DCMail: '',
          campus: '',
          program: '',
          reason: '',
          appointmentDate: '',
          appointmentTime: '',
          appointmentType: '',
        });
      }

      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
      console.log("✅ Form Submitted: First Name:", firstName);
      router.push('/Login/StudentLastName');
    } catch (error) {
      console.error('❌ Error writing to file:', error);
      Alert.alert('Error', 'Failed to save data.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Arrow navigation */}
      <View style={styles.arrowContainer}>
        <Pressable style={styles.arrowButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </Pressable>

        <Pressable
          style={[styles.arrowButton, !isValid && styles.disabledArrow]}
          onPress={handleSubmit}
          disabled={!isValid}
        >
          <Ionicons name="arrow-forward" size={32} color="white" />
        </Pressable>
      </View>

      {/* Main transparent content */}
      <View style={styles.transparentContainer}>
        <Text style={styles.whiteTitle}>Enter your Legal First Name</Text>
        <SafeAreaView>
          <TextInput
            style={[
              styles.input, 
              (error && touched) ? { borderColor: '#FF6347', borderWidth: 2 } : {}
            ]}
            placeholder="First Name"
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={firstName}
            onChangeText={handleChangeText}
            onBlur={handleBlur}
          />
          
          {/* Enhanced error message styling */}
          {error && touched && (
            <Text style={{
              color: '#FF6347',
              backgroundColor: 'rgba(0,0,0,0.5)',
              padding: 10,
              borderRadius: 5,
              marginTop: 5,
              fontSize: 18,
              textAlign: 'center',
              marginBottom: 10,
              fontWeight: 'bold'
            }}>
              {error}
            </Text>
          )}
        </SafeAreaView>
        <View style={styles.breadcrumbContainer}>
          <Breadcrumb entities={['Disclaimer', 'StudentNumber', 'Firstname']} flowDepth={2} />
        </View>
      </View>
    </ImageBackground>
  );
}

export default StudentFirstName;