import { View, Text, Image } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { getProperty } from '@/lib/appwrite';
import { useAppwrite } from '@/lib/useAppwrite';

const Property = () => {
    const { id } = useLocalSearchParams();

    const { data: property, loading: loadingProperty } = useAppwrite({
        fn: getProperty,
        params: {
            id: id as string,
        },
      });

    return (
        <View className='h-full w-full'>
            <View className='w-full'>
                <Image source={{ uri: property?.image }} 
                    className='h-11/12 w-full' resizeMode='contain'/>
                <Text>{property?.name}</Text>
            </View>
            
            <View>
                <Text>{property?.agent}</Text>
            </View>
        </View>
    )
}

export default Property