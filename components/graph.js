import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { BarChart } from 'react-native-chart-kit'

export default function MyBarChart(props) {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [20, 35, 30, 28, 36, 40, 38, 45, 50, 42, 34, 30],
      },
    ],
  }

  return (
    <View>
      <Text>
        My Bar Chart
      </Text>
      <BarChart
        data={data}
        width={Dimensions.get('window').width}
        height={200}
        yAxisSuffix={'k'}
        chartConfig={{
          backgroundGradientFrom: '#1E2923',
          backgroundGradientTo: '#08130D',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  )
}