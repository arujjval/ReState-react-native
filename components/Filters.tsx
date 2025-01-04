import { categories } from '@/constants/data'
import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { ScrollView, Text, TouchableOpacity } from 'react-native'

function Filters() {
    const params = useLocalSearchParams<{filter? : string}>()
    const [selectedFilter , setSelectedFilter] = useState(params.filter || 'All')

    const handleFilter = (category: string) =>{
        if(selectedFilter === category) {
            setSelectedFilter('All');
            router.setParams({filter: 'All'});
            return;
        }

        setSelectedFilter(category);
        router.setParams({filter: category});
    }

    return (
        <ScrollView horizontal 
            showsHorizontalScrollIndicator={false} 
            className="mt-5">
            {categories.map((category, index) => (
                <TouchableOpacity 
                    className={`flex justify-center items-center
                    px-3 py-1 mx-1 rounded-full
                    ${selectedFilter === category.title ? 
                        'bg-primary-300 border border-primary-300' 
                        : 'bg-primary-100 border border-primary-200'}`}
                    key={index}
                    onPress={() => handleFilter(category.title)}>
                        <Text className={(category.title === selectedFilter) ? 
                            'text-white' : 'text-black'}>
                                {category.title}
                        </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default Filters