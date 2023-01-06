import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Vocabulary = (props) => {
    return(
        <View style={styles.VocabularyContainer}>
            <Text style={styles.VocabularyText}>Original: {props.original}</Text>
            <Text style={styles.VocabularyText}>Übersetzung: {props.translation}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    VocabularyContainer: {
        backgroundColor: '#FFF',
        margin: 20,
        padding: 10,
        paddingVertical: 10,
        borderRadius: 15,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity:  0.16,
        shadowRadius: 1.51,
        elevation: 2
    },
    VocabularyText: {
        fontWeight: 'bold',
        fontSize: 20,
        fontStyle: 'italic',
        padding: 5,
    },
});
export default Vocabulary;