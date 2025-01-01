import { useGlobalContext } from '@/lib/global-provider';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';
import { Redirect, Slot } from 'expo-router';

function AppLayout() {
    const { loading, isLoggedin } = useGlobalContext();

    // if(loading) {
    //     return (
    //         <SafeAreaView>
    //             <ActivityIndicator className='flex-1 justify-center items-center' />
    //         </SafeAreaView>
    //     )
    // }

    // if(!isLoggedin) {
    //     return <Redirect href='/sign-in'/>
    // }

    return (
        <Slot />
    )
}

export default AppLayout