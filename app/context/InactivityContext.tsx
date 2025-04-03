import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View, AppState, AppStateStatus } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import * as FileSystem from 'expo-file-system';

interface InactivityContextType {
  resetInactivityTimer: () => void;
  pauseInactivityTimer: () => void;
  resumeInactivityTimer: () => void;
}

const InactivityContext = createContext<InactivityContextType | null>(null);

export const useInactivity = () => {
  const context = useContext(InactivityContext);
  if (!context) {
    throw new Error('useInactivity must be used within an InactivityProvider');
  }
  return context;
};

interface InactivityProviderProps {
  children: React.ReactNode;
  timeoutMinutes?: number;
  warningSeconds?: number;
}

export const InactivityProvider: React.FC<InactivityProviderProps> = ({
  children,
  timeoutMinutes = 2,
  warningSeconds = 10,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [showWarning, setShowWarning] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(warningSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check if current path is the home/start screen
  const isHomeScreen = pathname === '/' || pathname === '/index';

  const clearAllTimers = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
      warningTimeoutRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  };

  const pauseInactivityTimer = () => {
    clearAllTimers();
    setIsPaused(true);
    setShowWarning(false);
  };

  const resumeInactivityTimer = () => {
    setIsPaused(false);
    resetInactivityTimer();
  };

  const resetInactivityTimer = () => {
    // Don't set timers if paused or on home screen
    if (isPaused || isHomeScreen) {
      return;
    }

    // Clear all existing timers
    clearAllTimers();
    
    setShowWarning(false);
    
    // Set timeout for warning (total timeout - warning duration)
    const warningDelay = (timeoutMinutes * 60 - warningSeconds) * 1000;
    warningTimeoutRef.current = setTimeout(() => {
      setShowWarning(true);
      setRemainingSeconds(warningSeconds);
      
      // Start countdown
      countdownIntervalRef.current = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            clearInterval(countdownIntervalRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
    }, warningDelay);
    
    // Set timeout for redirect
    timeoutRef.current = setTimeout(handleTimeout, timeoutMinutes * 60 * 1000);
  };
  
  const handleTimeout = async () => {
    try {
      // First, hide the warning popup
      setShowWarning(false);
      
      // Clear all timers
      clearAllTimers();
      
      // Clear user data
      const filePath = FileSystem.documentDirectory + "user.json";
      await FileSystem.writeAsStringAsync(filePath, JSON.stringify([], null, 2));
      
      // Small delay to ensure the modal animation completes
      setTimeout(() => {
        // Navigate to home screen
        router.replace('/');
      }, 300);
      
    } catch (error) {
      console.error('Error handling timeout:', error);
    }
  };
  
  const continueSession = () => {
    resetInactivityTimer();
  };
  
  useEffect(() => {
    // If on home screen, pause the timer
    if (isHomeScreen) {
      pauseInactivityTimer();
    } else if (isPaused) {
      // If we're not on home screen but timer was paused, resume it
      resumeInactivityTimer();
    } else {
      // Otherwise just reset the timer
      resetInactivityTimer();
    }
  }, [pathname, isHomeScreen]);
  
  useEffect(() => {
    // Initial setup
    if (!isHomeScreen) {
      resetInactivityTimer();
    }
    
    // Setup app state listener for background/foreground changes
    const appStateListener = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active' && !isHomeScreen && !isPaused) {
        // App came to foreground and not on home screen
        resetInactivityTimer();
      }
    });
    
    // Cleanup
    return () => {
      clearAllTimers();
      appStateListener.remove();
    };
  }, [timeoutMinutes, warningSeconds, isHomeScreen, isPaused]);
  
  return (
    <InactivityContext.Provider value={{ 
      resetInactivityTimer, 
      pauseInactivityTimer, 
      resumeInactivityTimer 
    }}>
      <View 
        style={{ flex: 1 }} 
        onTouchStart={!isHomeScreen ? resetInactivityTimer : undefined} 
        onTouchMove={!isHomeScreen ? resetInactivityTimer : undefined}
      >
        {children}
        <Modal
          transparent={true}
          visible={showWarning}
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Session Timeout Warning</Text>
              <Text style={styles.modalText}>
                Due to inactivity, your session will expire in {remainingSeconds} seconds.
              </Text>
              <Text style={styles.modalSubtext}>
                Your data will be cleared for security purposes.
              </Text>
              <Pressable
                style={styles.continueButton}
                onPress={continueSession}
              >
                <Text style={styles.continueButtonText}>Continue Session</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </InactivityContext.Provider>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF6347',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalSubtext: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 