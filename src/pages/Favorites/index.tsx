import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'
import style from './style'
import PageHeader from '../components/PageHeader';
import TeacherItem, { Teacher } from '../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';

function Favorites() {
    const [favorites, setFavorites] = useState([]);


    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if(response) {
                const favoritedTeachers = JSON.parse(response)
                
                setFavorites(favoritedTeachers);
            }
        })
    } 

    useFocusEffect(
        React.useCallback(() => {
          loadFavorites();
        }, [])
      )
    
    return (
        <View style={style.container}>
            <PageHeader title="Meus proffys favoritos"/>

            <ScrollView style={style.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
            
            {favorites.map((teacher: Teacher) => {
                return (
                    <TeacherItem
                        key={teacher.id}
                        teacher={teacher}
                        favorited
                    />
                )
            })}
            </ScrollView>
        </View>
    )
}

export default Favorites;