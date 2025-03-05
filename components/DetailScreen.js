import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { Flex } from "../shared/style";

import Input from "../shared/input/Input";
import Button from "../shared/button/Button";

import AuthSlice from "../store/AuthSlice";

export default function DetailScreen({ route }) {
    const user = route.params.data
    console.log(user);


    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <Text>DetailScreen</Text>

            <Text>{user.first_name}</Text>
            <Text>{user.last_name}</Text>

            <Button
                title="Go to Home"
                onPress={() => {
                    navigation.navigate("Home");
                }}
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: Flex.aic,
        justifyContent: Flex.jcc,
    },
});
