import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';

import style from './style'
import PageHeader from '../components/PageHeader';
import TeacherItem, { Teacher } from '../components/TeacherItem';
import { Feather } from '@expo/vector-icons'
import {  BorderlessButton, RectButton } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [isfiltersVisible, setIsFiltersVisible] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);

    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if(response) {
                const favoritedTeachers = JSON.parse(response)
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })
                setFavorites(favoritedTeachersIds);
            }
        })
    }    

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isfiltersVisible);
    }

    async function handleFiltersSubmit() {
        loadFavorites()

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        })

        setIsFiltersVisible(false)
        setTeachers(response.data)
    }

    return (
        <View style={style.container}>
            <PageHeader 
                title="Proffys disponíveis" 
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#FFF" />
                    </BorderlessButton>
                )               
                }>
                {isfiltersVisible && (
                    <View style={style.searchForm}>
                        <Text style={style.label}>Matéria</Text>
                        <TextInput 
                            style={style.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="Qual a matéria"
                        />

                        <View style={style.inputGroup}>
                            <View style={style.inputBlock}>
                                <Text style={style.label}>Dia da semana</Text>
                                <TextInput style={style.input}
                                value={week_day}
                                onChangeText={text => setWeekDay(text)}
                                    placeholder="Qual o dia"
                                />
                            </View>

                            <View style={style.inputBlock}>
                                <Text style={style.label}>Horario</Text>
                                <TextInput style={style.input}
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholder="Qual o horário"
                                />
                            </View>
                        </View>

                        <RectButton onPress={handleFiltersSubmit} style={style.submitButton}>
                            <Text style={style.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>

            <ScrollView style={style.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)} />
                    )
                })}
                
            </ScrollView>
        </View>
    )
}

export default TeacherList;