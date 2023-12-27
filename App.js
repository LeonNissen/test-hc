import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { initialize, requestPermission, readRecords, getSdkStatus, SdkAvailabilityStatus } from 'react-native-health-connect';


export default function App() {

  const [result, setResult] = useState("")

  async function init() {
    const initialized = await initialize()
    console.log({ initialized })

    console.log(await getSdkStatus())
    console.log(SdkAvailabilityStatus)

    const grantedPermissions = await requestPermission([
      { accessType: 'read', recordType: 'ActiveCaloriesBurned' },
    ]);
    console.log(grantedPermissions)

    const result = await readRecords('ActiveCaloriesBurned', {
      timeRangeFilter: {
        operator: 'between',
        startTime: '2023-01-09T12:00:00.405Z',
        endTime: '2023-01-09T23:53:15.405Z',
      },
    });
    console.log(result)
    setResult(JSON.stringify(result))
  }


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />

      <Button title='Init' onPress={init} />

      <Text>
        { result }
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
