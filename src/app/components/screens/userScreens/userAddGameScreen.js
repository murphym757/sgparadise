import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';


// App Styling
import {
  MainContainer,
  MainFont
} from '../index.js'

export default function UserSavesScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <ScrollView 
            scrollEventThrottle={16}
        >
            <View style={{ flex: 1 }}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <Text>
                        Add Game
                    </Text>
                </ScrollView>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}