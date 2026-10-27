
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { useTheme } from '../theme/ThemeContext';

export default function About() {
  const { colors } = useTheme();
  const version = Constants.expoConfig?.version ?? 'Unknown';

  // Replace this with your full name before submission.
  const studentName = 'YOUR NAME';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Text style={[styles.appName, { color: colors.primary }]}>
        Tic-Tac-Toe
      </Text>

      <Text style={[styles.description, { color: colors.text }]}>
        A React Native game with move history, time travel,
        drawer navigation, and light and dark themes.
      </Text>

      <View
        style={[
          styles.infoCard,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={[styles.infoText, { color: colors.text }]}>
          Application: Tic-Tac-Toe
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          Version: {version}
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          Developer: {studentName}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 28,
  },
  infoCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
  },
  infoText: {
    fontSize: 16,
    marginVertical: 8,
  },
});
