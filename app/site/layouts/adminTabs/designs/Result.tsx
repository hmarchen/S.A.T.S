import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from '../../../styles/style';

// MAIN LAYOUT COMPONENT
interface LayoutProps {
  success: boolean;
  status: string;
}

const Result: React.FC<LayoutProps> = ({ success, status }) => {
    const [isResultVisible, setIsResultVisible] = useState(true);

    const closeUI = () => {
        setIsResultVisible(false);
    };

    return (
        <View>
            {isResultVisible && (
                <Pressable 
                    style={[
                        styles.resultContainer,
                        success ? { backgroundColor: '#46B22D' }: { backgroundColor: '#ff4444' }
                    ]} 
                    onPress={closeUI}
                >
                    <Text style={styles.resultText}>{status}</Text>
                </Pressable>
            )}
        </View>
    )
}

export default Result;