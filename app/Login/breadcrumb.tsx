import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import styles from '../css/styles';

const Breadcrumb = ({ entities, flowDepth }) => {
    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', padding: 10 }}>
            {
                entities.map((item, index) => (
                    <Text key={index} style={{ marginRight: 5, color: flowDepth === index ? 'blue' : 'gray' }}>
                        {item} {index < entities.length - 1 ? '>' : ''}
                    </Text>
                ))
            }
            </View>
        </SafeAreaView>
    );
};

export default Breadcrumb;
