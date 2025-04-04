import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Alert, ImageBackground, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import Breadcrumb from "./breadcrumb";
import styles from "../css/styles";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";

const filePath = FileSystem.documentDirectory + "user.json";

export default function Reason() {
// Router and State values
  const router = useRouter();
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
      setIsLoading(true);
      const response = await fetch(`http://10.0.2.2:3001/reasons`)

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

  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.transparentContainer}>
        <Text style={styles.whiteTitle}>Choose a Reason for Your Visit</Text>

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
