import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import style from './style';
import giveClassesBgImage from '../../assets/images/give-classes-background.png'
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';



function GiveClasses() {
    const { goBack } = useNavigation();

    function handleNavigateBack() {
        goBack();
    }
    
    return (
    <View style={style.container}>
        <ImageBackground 
            resizeMode="contain" 
            source={giveClassesBgImage} 
            style={style.content}
        >
        <Text style={style.title}>Quer ser um proffy?</Text>
        <Text style={style.description}>Para começar, você precisa se cadastrar como professor na nossa plataforma web. </Text>

        </ImageBackground>

        <RectButton onPress={handleNavigateBack} style={style.okButton}>
            <Text style={style.okButtonText}>Tudo bem</Text>
        </RectButton>
    </View>
    )
}

export default GiveClasses;