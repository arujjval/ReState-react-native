import { View, Text, Image, ScrollView, Touchable, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { getProperty } from '@/lib/appwrite';
import { useAppwrite } from '@/lib/useAppwrite';
import icons from '@/constants/icons';
import images from '@/constants/images';
import { SafeAreaView } from 'react-native-safe-area-context';

const Property = () => {
    const { id } = useLocalSearchParams();

    const { data: property, loading: loadingProperty } = useAppwrite({
        fn: getProperty,
        params: {
            id: id as string,
        },
      });

    const images = property?.gallery

    if(loadingProperty) {
        return (
            <SafeAreaView className='h-full w-full'>
                <ScrollView 
                    contentContainerClassName='h-full w-full flex justify-center items-center'>
                        <ActivityIndicator 
                            size='large' 
                            className='text-primary-300 mt-5'
                        />
                </ScrollView>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView className='h-full w-full'>
            <ScrollView 
            className='h-full w-full'>
                <View className='h-96'>
                    <Image 
                        source={{ uri: property?.image }} 
                        resizeMode='cover'
                        className='w-full h-full relative'
                    />

                    <View className='flex flex-row justify-between 
                        items-center px-5 absolute w-full mt-6'>
                        <TouchableOpacity className='flex justify-center items-center
                        bg-white bg-opacity-50 rounded-full p-1'
                        onPress={() => router.back()}>
                            <Image 
                                source={icons.backArrow} 
                                className='h-8 w-8'
                            />
                        </TouchableOpacity>

                        <View className='flex flex-row gap-5 justify-center items-center'>
                            <TouchableOpacity className='flex justify-center items-center
                            bg-white bg-opacity-50 rounded-full p-1'>
                                <Image 
                                    source={icons.heart} 
                                    style={{ tintColor: 'black' }}
                                    className='h-8 w-8'/>
                            </TouchableOpacity>
                            <TouchableOpacity className='flex justify-center items-center
                            bg-white bg-opacity-50 rounded-full p-1'>
                                <Image 
                                    source={icons.send}
                                    className='h-8 w-8'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View className='px-5'>
                    <View className='flex flex-col gap-4 py-6 border-b border-primary-200'>
                        <Text className='font-rubik-bold text-2xl'>{property?.name}</Text>

                        <View className='flex flex-row items-center gap-2'>
                            <View className='flex flex-row justify-center items-center bg-primary-200
                            rounded-full px-3 py-1'>
                                <Text className='text-primary-300 uppercase font-rubik-medium'>
                                    {property?.type}
                                </Text>
                            </View>

                            <View className='flex flex-row gap-1 justify-center items-center'>
                                <Image source={icons.star} className='h-5 w-5'/>
                                <Text className='font-rubik-medium text-lg text-gray-500 '>
                                    {property?.rating.toFixed(1)}
                                </Text>
                                <Text className='font-rubik-medium text-lg text-gray-500'>
                                    ({property?.reviews.length} reviews)
                                </Text>
                            </View>
                        </View>

                        <View className='flex flex-row items-center gap-2 justify-between'>
                            <View className='flex flex-row items-center gap-2'>
                                <View className='bg-primary-200 rounded-full px-3 py-3'>
                                    <Image source={icons.bed} className='h-4 w-4'/>
                                </View>
                                <Text className='font-rubik-medium text-lg text-black-300'>
                                    {property?.bedrooms} Beds
                                </Text>
                            </View>

                            <View className='flex flex-row items-center gap-2'>
                                <View className='bg-primary-200 rounded-full px-3 py-3'>
                                    <Image source={icons.bath} className='h-4 w-4'/>
                                </View>
                                <Text className='font-rubik-medium text-lg text-black-300'>
                                    {property?.bathrooms} Baths
                                </Text>
                            </View>

                            <View className='flex flex-row items-center gap-2'>
                                <View className='bg-primary-200 rounded-full px-3 py-3'>
                                    <Image source={icons.area} className='h-4 w-4'/>
                                </View>
                                <Text className='font-rubik-medium text-lg text-black-300'>
                                    {property?.area} sqft
                                </Text>
                            </View>
                        </View>
                    </View>
                    
                    <View className='py-6 gap-4'>
                        <Text className='font-rubik-bold text-xl'>
                            Agent
                        </Text>
                        <View className='flex flex-row items-center gap-5'>
                            <Image source={{ uri: property?.agent.avatar }} 
                                className='h-12 w-12 rounded-full'/>
                            <View className='flex flex-col justify-center ml-2'>
                                <Text className='font-rubik-bold text-lg text-black-300'>
                                    {property?.agent.name}
                                </Text>
                                <Text className='font-rubik-medium text-lg text-black-200'>
                                    Owner
                                </Text>
                            </View>
                            <View className='flex flex-row items-center gap-2 ml-auto'>
                                <Image source={icons.chat} className='h-10 w-10'/>
                                <Image source={icons.phone} className='h-10 w-10'/>
                            </View>
                        </View>
                    </View>

                    <View className='py-6 gap-4'>
                        <Text className='font-rubik-bold text-xl'>
                            Overview
                        </Text>
                        <Text className='font-rubik-regular text-lg text-black-200'> 
                            {property?.description}
                        </Text>
                    </View>

                    <View className='py-6 gap-4'>
                        <Text className='font-rubik-bold text-xl'>
                            Facilities
                        </Text>
                        <View className='flex flex-row flex-wrap gap-y-4'>
                            {property?.facilities.map((facility: string, index: number) => (
                                <View key={index} className='flex flex-col items-center gap-2 w-1/4'>
                                    <View className='bg-primary-200 rounded-full px-3 py-3'>
                                        <Image source={icons[facility.toLowerCase()]} className='h-6 w-6'/>
                                    </View>
                                    <Text className='font-rubik-regular text-lg text-black-200
                                    min-w-20 text-center'>
                                        {facility.length > 10 ? `${facility.substring(0, 10)}...` : facility}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View className='py-6 gap-4'>
                        <Text className='font-rubik-bold text-xl'>
                            Location
                        </Text>
                        <View className='flex flex-row items-center gap-2'>
                            <Image source={icons.location} className='h-8 w-8'/>
                            <Text className='font-rubik-medium text-black-200'>
                                {property?.address}
                            </Text>
                        </View>
                        <View>
                            <Image 
                                source={images.map} 
                                className='w-full h-auto rounded-full' 
                                resizeMode='contain'
                            />
                        </View>
                    </View>

                    <View className='py-6 gap-4'>
                        <View className='flex flex-row items-center justify-between'>
                            <View className='flex flex-row items-center gap-2'>
                                <Image source={icons.star} className='size-8' />
                                <Text className='font-rubik-bold text-xl'>
                                    {property?.rating.toFixed(1)} {' '}
                                    ({property?.reviews.length} reviews)  
                                </Text>
                            </View>
                            <Text className='text-primary-300 font-rubik-bold text-lg'>
                                See All
                            </Text>
                        </View>

                        {property?.reviews.slice(0, 3).map((review: any, index: number) => (
                            <View key={index} className={`flex flex-col gap-2 py-4 
                                ${index !== property.reviews.slice(0, 3).length - 1 ? 
                                'border-b border-primary-200' : ''}`}>
                                <View className='flex flex-row items-center gap-2'>
                                    <Image source={{ uri: review.avatar }} className='size-12 rounded-full'/>
                                    <Text className='font-rubik-medium text-lg text-black-300'>
                                        {review.name}
                                    </Text>
                                </View>
                                <Text className='font-rubik-regular text-lg text-black-200'>
                                    {review.review}
                                </Text>
                                <Text className='font-rubik-regular text-sm text-gray-500 text-right'>
                                    {new Date(review.$createdAt).toLocaleString()}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View className='flex flex-row border border-primary-200
                    pt-6 pb-8 px-6 rounded-full items-center justify-between'>
                    <View className='flex flex-col'>
                        <Text className='uppercase font-rubik-medium text-black-200 
                        tracking-widest text-sm'>
                            Price
                        </Text>
                        <Text className='text-primary-300 font-rubik-bold text-2xl'>
                            ₹{property?.price}
                        </Text>
                    </View>

                    <TouchableOpacity className='bg-primary-300 rounded-full 
                        px-5 py-3 w-60'>
                        <Text className='text-center text-white font-rubik 
                            font-bold text-lg'>
                            Booking Now
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Property