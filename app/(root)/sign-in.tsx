import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'
import icons from '@/constants/icons'
import { login } from '@/lib/appwrite'
import { Redirect } from 'expo-router'
import { useGlobalContext } from '@/lib/global-provider'

const SignIn = () => {
  const { refetch, loading, isLoggedin, user } = useGlobalContext();

  console.log("isloggedin: " + isLoggedin)

  if(isLoggedin) {
    return <Redirect href='/'/>
  }

  const handleLogin = async () => {
    const result = await login()

    if(result) {
      refetch();
    }
    else {
      Alert.alert('Error', 'Failed to login')
    } 
  }
  
  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView contentContainerStyle={{
        height: '100%',
      }}>
        <Image source={images.onboarding} className='w-full h-4/6' resizeMode='contain'/>

        <View className='px-10'>
          <Text className='font-rubik uppercase text-center text-black-200 text-base'>
            Welcome to Restate
          </Text>

          <Text className='font-rubik-bold text-3xl text-center'>
            Lets Get You Closer to {'\n'} 
            <Text className='text-primary-300'>Your Ideal Home</Text>
          </Text> 

          <Text className='text-lg font-rubik text-black-200 text-center mt-12'>
            Login to ReState with Google
          </Text>

          <TouchableOpacity 
          className='bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5'
          onPress={handleLogin}>
            <View className='flex flex-row items-center justify-center gap-3'>
              <Image source={icons.google} className='w-5 h-5' resizeMode='contain'/>
              <Text className='font-rubik-semibold'>
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
