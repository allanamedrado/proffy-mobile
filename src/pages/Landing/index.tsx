import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import style from './style';
import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClasses from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler'; 
import api from '../../services/api';


function Landing() {
    const navigation = useNavigation();
    const [totalConnections, setTotalConnections] = useState(0);

    useEffect(() => {
        api.get('connections').then(res: Response => {
            const { total } = res.data;

            setTotalConnections(total)
        })
    }, []);

    function handleNavigateToGiveClassesPage() {
        navigation.navigate('GiveClasses');
    }

    function handleNavigateToStudyPages() {
        navigation.navigate('Study')
    }

    return (
        <View style={style.container}>
            <Image source={landingImg} style={style.banner} />

            <Text style={style.title}>
                Seja bem-vindo, {`\n`}
                <Text style={style.titleBold}>O que deseja fazer?</Text>
            </Text>

            <View style={style.buttonsContainer}>
                <RectButton 
                    onPress={handleNavigateToStudyPages}
                    style={[style.button, style.buttonPrimary]}>

                    <Image source={studyIcon} style={style.imageButton}/>
                    <Text style={style.buttonText}>Estudar</Text>

                </RectButton>

                <RectButton 
                    onPress={handleNavigateToGiveClassesPage} 
                    style={[style.button, style.buttonSecondary]}
                >
                    <Image source={giveClasses} />
                    <Text style={style.buttonText}>Dar aulas</Text>
                </RectButton>
            </View>

            <Text style={style.totalConnections}>
                Total de {totalConnections} conexões já realizadas {' '}
                <Image source={heartIcon} />
            </Text>

        </View>        
    )
}

export default Landing;