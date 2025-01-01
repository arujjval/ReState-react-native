import images from "@/constants/images";
import { TouchableOpacity, Text, View, Image } from "react-native";

interface Props {
    onPress?: () => void;
}

export const FeaturedCard = ({ onPress }: Props) => {
    return (
        <TouchableOpacity className="flex flex-col items-start w-60 
        h-80 relative" onPress={onPress}>
            
        </TouchableOpacity>
    )
}

export const Card= () => {
    return (
        <Text>Card</Text>
    )
}