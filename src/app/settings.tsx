
import {
  View,
  Text,
  Switch,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function Settings() {
  const { isDark, toggleTheme, colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        Settings
      </Text>

      <View
        style={[
          styles.settingRow,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.labelContainer}>
          <Text style={[styles.label, { color: colors.text }]}>
            Dark theme
          </Text>
          <Text
            style={[
              styles.description,
              { color: colors.secondaryText },
            ]}
          >
            Current theme: {isDark ? 'Dark' : 'Light'}
          </Text>
        </View>

        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{
            false: colors.border,
            true: colors.primary,
          }}
          thumbColor={colors.surface}
          accessibilityLabel="Toggle dark theme"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
  },
  labelContainer: {
    flex: 1,
    marginRight: 12,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    marginTop: 6,
  },
});
