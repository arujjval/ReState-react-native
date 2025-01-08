import { Card } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getProperties } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Explore() {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const { data: properties, loading: loadingProperties, refetch } = useAppwrite({
    fn: getProperties,
    params:{
      filter: params.filter || 'All',
      query: params.query || '',
      limit: 20,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter || 'All',
      query: params.query || '',
      limit: 20,
    })
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => router.push(`/property/${id}` as any);

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
          loadingProperties ? (
            <ActivityIndicator size={'large'} className="
            text-primary-300 mt-5"/>
          ) : <NoResults />
        }
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row justify-between 
              items-center mt-5">
                <TouchableOpacity onPress={() => router.back()} 
                  className="flex flex-row bg-primary-200 rounded-full size-11
                  items-center justify-center">
                    <Image source={icons.backArrow} className="size-5"/>
                </TouchableOpacity>

                <Text className="text-center text-base 
                  mr-2 font-rubik-medium text-black-300">
                    Search for your Ideal Home
                </Text>

                <TouchableOpacity>
                    <Image source={icons.bell} className="w-6 h-6"/>
                </TouchableOpacity>
            </View>

            <Search />

            <View className="mt-5">
              <Filters />

              <Text className="text-xl font-rubik-bold mt-5 text-black-300">
                {loadingProperties? 'Gathering properties for you...' : 
                `Found ${properties?.length} properties`}
              </Text>
            </View>
          </View>
        } />
    </SafeAreaView>
  );
}
