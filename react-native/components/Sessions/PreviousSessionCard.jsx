import React from "react";
import { Text, View} from 'react-native';
import {
    Avatar,
    Button,
    Card,
  } from 'react-native-paper';
export default function PreviousSessionCard() {
  return (
    <div>
      <Card style={styles.resCard}>
        <View>
          <View style={[styles.inlineView, { justifyContent: "space-around" }]}>
            <View
              style={{
                backgroundColor: "skyblue",
                margin: 5,
                padding: 5,
                borderRadius: 10,
                flex: 0.3,
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Avatar.Icon size={40} icon="search" />
              <Text style={styles.helperText}>24th July,</Text>
              <Text style={styles.helperText}>2pm - 4pm</Text>
            </View>
            <View style={{ flex: 0.8, padding: 5 }}>
              <Text style={styles.text}>Mental Health due to stress</Text>
              <Text style={styles.helperText}>taken by Dr. Anirudh</Text>
              <View style={{ marginVertical: 10 }} />
              <View style={styles.inlineView}>
                <Button mode="contained" style={{ width: 70 }}>
                  Rate
                </Button>
                <Button mode="contained" style={{ width: 140 }}>
                  Suggestion
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Card>
    </div>
  );
}
