import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fontSize, radius, spacing, typography } from '@/constants/theme';

// Chat ekranı stub — bir sonraki commit'te askNokta() ile bağlanacak,
// mesaj balonları ve öneri chip'leri render edilecek.
export default function Chat() {
  const { seed } = useLocalSearchParams<{ seed: string }>();

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <Text style={styles.title}>Nokta Chat</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.body}>
        <Text style={styles.label}>İlk nokta</Text>
        <View style={styles.seedBox}>
          <Text style={styles.seedText}>{seed}</Text>
        </View>
        <Text style={styles.placeholder}>
          Chat akışı bir sonraki adımda bağlanacak. Şimdilik bu seed buraya
          güvenle ulaştı — navigation çalışıyor.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: fontSize.xl,
    color: colors.text,
  },
  title: {
    fontFamily: typography.headlineMedium,
    fontSize: fontSize.lg,
    color: colors.text,
    fontWeight: '600',
  },
  headerRight: { width: 36 },
  body: {
    flex: 1,
    padding: spacing.xxl,
    gap: spacing.lg,
  },
  label: {
    fontFamily: typography.label,
    fontSize: fontSize.xs,
    color: colors.textMuted,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  seedBox: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  seedText: {
    fontFamily: typography.body,
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 22,
  },
  placeholder: {
    fontFamily: typography.body,
    fontSize: fontSize.sm,
    color: colors.textMuted,
    lineHeight: 20,
    fontStyle: 'italic',
  },
});
