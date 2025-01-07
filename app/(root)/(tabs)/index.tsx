import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView, FlatList, Button, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user, loading } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const { data: latestProperties, loading: loadingLatestProperties } = useAppwrite({
    fn: getLatestProperties,
  });

  const { data: properties, loading: loadingProperties, refetch } = useAppwrite({
    fn: getProperties,
    params:{
      filter: params.filter || 'All',
      query: params.query || '',
      limit: 6,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter || 'All',
      query: params.query || '',
      limit: 6,
    })
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => router.push(`/properties/${id}` as any);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList 
        data={properties} 
        renderItem={({item, index}) => <Card item={item} 
            onPress={() => handleCardPress(item.$id)} key={index}/>} 
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size={'large'} className="
            text-primary-300 mt-5"/>
          ) : <NoResults />
        }
        ListHeaderComponent={
          <View className="px-5">
        <View className='HEADER flex flex-row items-center 
        justify-between mt-5'>
          <View className="flex flex-row items-center">
            <Image source={{ uri: user?.avatar }} className="size-12 rounded-full"/>
            <View className="flex flex-col items-start ml-2
            justify-center">
              <Text className="text-xs font-rubik text-black-100">Good morning</Text>
              <Text className="text-base font-rubik-medium text-black-300">{user?.name}</Text>
            </View>
          </View>
          <Image source={icons.bell} className="size-6"/>
        </View>
        <Search />
        <View className="my-5">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xl font-rubik-bold
            text-black-300">Featured</Text>
            <TouchableOpacity>
              <Text className="text-base font-rubik-bold text-primary-300">
                See All
              </Text>
            </TouchableOpacity>
          </View>
          
          {loadingLatestProperties ? (
            <ActivityIndicator size='large' className="text-primary-300" /> 
          ) : (
            !latestProperties || latestProperties.length === 0 ? (
              <NoResults />
            ) : (
              <FlatList 
                data={latestProperties} 
                renderItem={({item, index}) => <FeaturedCard item={item} key={index} />} 
                keyExtractor={(item) => item.toString()}
                horizontal
                bounces={false}
                ListEmptyComponent={NoResults}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex gap-5 mt-5"
              />
            )
          )}
        </View>

        <View className="my-5">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xl font-rubik-bold
            text-black-300">Recommendations</Text>
            <TouchableOpacity>
              <Text className="text-base font-rubik-bold text-primary-300">
                See All
              </Text>
            </TouchableOpacity>
          </View>

          <Filters />

        </View>
      </View>
        } />
    </SafeAreaView>
  );
}
