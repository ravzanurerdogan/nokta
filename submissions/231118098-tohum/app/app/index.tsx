import { StyleSheet, Text, View } from 'react-native';

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
    backgroundColor: '#0D1117',
    paddingHorizontal: 24,
  },
  brand: {
    fontSize: 48,
    fontWeight: '700',
    color: '#2F7AC2',
    letterSpacing: -1,
  },
  tagline: {
    marginTop: 12,
    fontSize: 16,
    color: '#627997',
    textAlign: 'center',
  },
});
