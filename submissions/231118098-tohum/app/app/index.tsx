import { StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, spacing, typography } from '@/constants/theme';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>Tohum</Text>
      <Text style={styles.tagline}>Fikrin bir nokta ile başlar.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
    paddingHorizontal: spacing.xxl,
  },
  brand: {
    fontFamily: typography.headline,
    fontSize: fontSize.display,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: -1,
  },
  tagline: {
    fontFamily: typography.body,
    marginTop: spacing.md,
    fontSize: fontSize.md,
    color: colors.secondary,
    textAlign: 'center',
  },
});
