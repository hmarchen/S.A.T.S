import React, { useState } from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './styles/style';
import Structure from './layouts/structure';

// form components
import Disclaimer from '../Login/Disclaimer';
import StudentNumber from '../Login/StudentNumber';
import StudentFirstName from '../Login/StudentFirstName';
import StudentLastName from '../Login/StudentLastName';
import DCMail from '../Login/DCMail';
import Institution from '../Login/Institution';
import Program from '../Login/Program';
import Reason from '../Login/Reason';
import OtherReason from '../Login/OtherReason';
import EndScreen from '../Login/EndScreen';

interface LayoutProps {
  setRoute: (route: string) => void;
}

const COMPONENT_MAP: Record<string, React.FC<LayoutProps>> = {
  disclaimer: Disclaimer,
  studentNumber: StudentNumber,
  studentFirstName: StudentFirstName,
  studentLastName: StudentLastName,
  dcMail: DCMail,
  institution: Institution,
  program: Program,
  reason: Reason,
  otherReason: OtherReason,
  endScreen: EndScreen,
};

export default function Appointment() {
  const router = useRouter();

  const [screen, setScreen] = useState('disclaimer');
  const [history, setHistory] = useState<string[]>([]);

  const setRoute = (route: string) => {
    setHistory((prev) => [...prev, screen]); // Add current screen to history
    setScreen(route);
  };

  const goBack = () => {
    setHistory((prev) => {
      const newHistory = [...prev];
      const previousScreen = newHistory.pop(); // Remove the last screen from history
      if (previousScreen) {
        setScreen(previousScreen);
      }
      return newHistory;
    });
  };

  const ComponentToRender = COMPONENT_MAP[screen];

  return (
    <Structure>
      <View style={styles.apptContainer}>
        <View style={styles.apptView}>
          {ComponentToRender ? (
            React.createElement(ComponentToRender, { setRoute })
          ) : (
            <Text>Failed to load booking components...</Text>
          )}

          <View>
            {history.length > 0 && (
              <Pressable style={styles.button} onPress={goBack}>
                <Text style={styles.buttonText}>Go Back</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Structure>
  );
}
