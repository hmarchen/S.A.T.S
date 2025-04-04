<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Alert, ImageBackground, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import Breadcrumb from "./breadcrumb";
import styles from "../css/styles";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
=======
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../css/styles';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system';
>>>>>>> f2ce5511a0e46cbc1cd88c913bde165ac763111a

const filePath = FileSystem.documentDirectory + "user.json";

interface LayoutProps {
  setRoute: (route: string) => void;
}

const Reason: React.FC<LayoutProps> = ({setRoute}) => {
// Router and State values
  const router = useRouter();
  const isWeb = Platform.OS === 'web';
  const [reasons, setReasons] = useState<Reason[]>([]);
  const [reason, SetReason] = useState<Reason>();
  const [isLoading, setIsLoading] = useState(true);

  type Reason = {
    id: number;
    category: string;
    details: string;
  }


  const getReasons = async() => {
    try {
<<<<<<< HEAD
      setIsLoading(true);
      const response = await fetch(`http://10.0.2.2:3001/reasons`)

=======
      const route = isWeb ? 'http://localhost:3000/reasons': 'http://10.0.2.2:3000/reasons'
      const response = await fetch(route)
>>>>>>> f2ce5511a0e46cbc1cd88c913bde165ac763111a
      .then(res => {return res.json()})
      .then(data => {console.log(data.reasons); return data.reasons});
      console.log(response);
      return response;
    }
    catch(e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    const fetchReasons = async () => {
      const data = await getReasons();
      if (data) setReasons(data);
    };
    fetchReasons();
  }, []);
    
<<<<<<< HEAD




  const handlePress = async (item: Reason) => {
    try {
      const fileExists = await FileSystem.getInfoAsync(filePath);
      let updatedData = fileExists.exists
        ? JSON.parse(await FileSystem.readAsStringAsync(filePath))
        : [];

      if (updatedData.length > 0) {
        updatedData[0].reason = item.category; // Save selected reason
      } else {
        updatedData.push({
          firstname: "",
          lastname: "",
          studentID: "",
          DCMail: "",
          campus: "",
          program: "",
          reason: item.category,
          appointmentDate: "",
          appointmentTime: "",
          appointmentType: "",
        });
      }

      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
      router.push("/Login/Calendar");
    } catch (error) {
      console.error("Error writing to file:", error);
      Alert.alert("Error", "Failed to save data.");
    }
  };

  const { width } = Dimensions.get("window");
  const itemWidth = width / 3 - 20; // Adjusted width to allow margin between columns
=======
  const handlePress = async(item: Reason) => {
    try{
      SetReason(item);
      if (isWeb) {
        const existingData = localStorage.getItem('student');
        const updatedData = existingData ? JSON.parse(existingData) : [];

        updatedData.length > 0
          ? (updatedData[0].reason = item.category)
          : updatedData.push({ firstname: "", lastname: "", studentID: "", DCMail: "", campus: "", program: "", reason: item.category });

        localStorage.setItem('student', JSON.stringify(updatedData));
        console.log(updatedData);
        alert(`Form Submitted\nDCMail: ${item.category}`);
        setRoute('endScreen');
      } else {
        const fileExists = await FileSystem.getInfoAsync(filePath);
        let updatedData = fileExists.exists ? JSON.parse(await FileSystem.readAsStringAsync(filePath)) : [];
  
        updatedData.length > 0
          ? (updatedData[0].reason = item.category)
          : updatedData.push({ firstname: "", lastname: "", studentID: "", DCMail: "", campus: "", program: "", reason: item.category });
  
        await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
        Alert.alert("Form Submitted", `${item.category}`);
        console.log("Navigating to EndScreen...");
        router.push("/Login/EndScreen");
        
        console.log(item.category);
      }
    } catch (error) {
    console.error("Error writing to file:", error);
    Alert.alert("Error", "Failed to save data.");
    }
  };
>>>>>>> f2ce5511a0e46cbc1cd88c913bde165ac763111a

  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.transparentContainer}>
        <Text style={styles.whiteTitle}>Choose a Reason for Your Visit</Text>

<<<<<<< HEAD
        {isLoading ? (
          <ActivityIndicator size="large" color="#358f71" />
        ) : (
          <FlatList
            data={reasons}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            contentContainerStyle={{
              paddingVertical: 20,
              justifyContent: "center",
            }}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 20,
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handlePress(item)}
                style={{
                  width: "30%",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: "white",
                  paddingVertical: 20,
                  alignItems: "center",
                  marginVertical: 5,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 14,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {item.category}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}

        <Text
          style={styles.textLink}
          onPress={() => router.push("/Login/OtherReason")}
        >
          Didn't find what you wanted?
        </Text>

        <View style={styles.breadcrumbContainer}>
          <Breadcrumb entities={[ "Disclaimer", "StudentNumber", "Firstname", "Lastname",  "DCMail", "Institution", "Program", "Reason" ]} flowDepth={7} />
        </View>
      </View>
    </ImageBackground>
  );
}
=======
        />
        {isWeb ? (
          <Text style={styles.textLink} onPress={() => setRoute('otherReason')}>Didn't find what you wanted?</Text>
        ) : (
          <Text style={styles.textLink} onPress={() => router.push('/Login/OtherReason')}>Didn't find what you wanted?</Text>
        )}
</SafeAreaView>
  );
}

export default Reason;
>>>>>>> f2ce5511a0e46cbc1cd88c913bde165ac763111a
