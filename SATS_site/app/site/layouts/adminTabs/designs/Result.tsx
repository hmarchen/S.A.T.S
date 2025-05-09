import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from '../../../styles/style';

// MAIN LAYOUT COMPONENT
interface LayoutProps {
  success: boolean;
  status: string;
  closeUI: (status: string) => void
}

const Result: React.FC<LayoutProps> = ({ success, status, closeUI }) => {

    return (
        <View>
            <Pressable 
                style={[
                    styles.resultContainer,
                    success ? { backgroundColor: '#46B22D' }: { backgroundColor: '#ff4444' }
                ]} 
                onPress={() => {closeUI(status);}}
            >
                <Text style={styles.resultText}>{status}</Text>
            </Pressable>
        </View>
    )
}

export default Result;