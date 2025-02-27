import React, { useState } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

interface Advisor {
  advisor: string;
  email: string;
  programs: string;
}

export default function ProgramLists() {
  const [data, setData] = useState<Advisor[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPrograms, setShowPrograms] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const fetchAdvisors = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/advisors');
      const advisors = await response.json();

      // Log the response to check its structure
      console.log('Fetched advisors:', advisors);

      // Set the data directly from the response
      setData(advisors);
    } catch (error) {
      console.error('Error fetching advisors:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPrograms = () => {
    setShowPrograms(true);
    setShowAll(false);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
    setShowPrograms(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable 
          style={styles.fetchButton}
          onPress={fetchAdvisors}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Fetch Advisors</Text>
          )}
        </Pressable>

        <Pressable 
          style={[styles.fetchButton, { marginLeft: 10 }]}
          onPress={toggleShowPrograms}
        >
          <Text style={styles.buttonText}>Show Programs</Text>
        </Pressable>

        <Pressable 
          style={[styles.fetchButton, { marginLeft: 10 }]}
          onPress={toggleShowAll}
        >
          <Text style={styles.buttonText}>{showAll ? 'Show Advisors' : 'Show All'}</Text>
        </Pressable>
      </View>

      <FlatList
        data={data}
        keyExtractor={(_, index: number) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.advisor}</Text>
            {showAll ? (
              <>
                <Text style={styles.email}>{item.email}</Text>
                <Text style={styles.programs}>{item.programs.replace("PROGRAMS:\n", "").trim()}</Text>
              </>
            ) : showPrograms ? (
              <Text style={styles.programs}>{item.programs.replace("PROGRAMS:\n", "").trim()}</Text>
            ) : (
              <Text style={styles.email}>{item.email}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  fetchButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    color: 'blue',
    marginVertical: 4,
  },
  programs: {
    color: '#666',
  },
}); 