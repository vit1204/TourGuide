import { SafeAreaView, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";

import ListItem from "@/components/ListItem";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";

const Filter = () => {
  const {
    languages,
    gender,
    setGender,
    setLanguages,
    hometown,
    setHometown,
    hobbies,
    setHobbies,
  } = useGlobalContext();
  return (
    <ScrollView>
      <View className="w-full h-[160px] bg-primary">
        <Text className="text-center text-[20px] text-black font-Nmedium mt-[90px]">
          Filter
        </Text>
      </View>
      <SafeAreaView className="h-full">
        <View className="mt-[50px]">
          <Text className="mb-[20px] text-[25px] ml-[20px] font-Nbold">
            {" "}
            Languages{" "}
          </Text>
          <View className="flex flex-row items-center justify-around">
            <ListItem
              selectedValue={languages}
              title="<18"
              value="U18"
              onChange={(e) => setLanguages(e)}
            />
            <ListItem
              selectedValue={languages}
              title="English"
              value="English"
              onChange={(e) => setLanguages(e)}
            />
            <ListItem
              selectedValue={languages}
              title="Chinese"
              value="Chinese"
              onChange={(e) => setLanguages(e)}
            />
          </View>
        </View>

        <View className="mt-[20px] ">
          <Text className="mb-[20px] text-[25px] ml-[20px] font-Nbold">
            {" "}
            Gender{" "}
          </Text>
          <View className="flex flex-row items-center justify-evenly">
            <ListItem
              selectedValue={gender}
              title="Male"
              value="nam"
              onChange={(e) => setGender(e)}
            />
            <ListItem
              selectedValue={gender}
              title="Female"
              value="nữ"
              onChange={(e) => setGender(e)}
            />
          </View>
        </View>

        <View className="mt-[20px]">
          <Text className="mb-[20px] text-[25px] ml-[20px] font-Nbold">
            {" "}
            Hobbies{" "}
          </Text>
          <View className="flex flex-row   flex-wrap items-center justify-evenly">
            <ListItem
              selectedValue={hobbies}
              title="Culture"
              value="Khám phá văn hóa"
              onChange={(e) => setHobbies(e)}
            />
            <ListItem
              selectedValue={hobbies}
              title="Cuisine"
              value="Ẩm thực"
              onChange={(e) => setHobbies(e)}
            />
            <ListItem
              selectedValue={hobbies}
              title="Nature"
              value="Thiên nhiên"
              onChange={(e) => setHobbies(e)}
            />
            <ListItem
              selectedValue={hobbies}
              title="Healing"
              value="Nghỉ dưỡng"
              onChange={(e) => setHobbies(e)}
            />
            <ListItem
              selectedValue={hobbies}
              title="Adventure"
              value="Phiêu lưu"
              onChange={(e) => setHobbies(e)}
            />
            <ListItem
              selectedValue={hobbies}
              title="Adventure"
              value="Mua sắm"
              onChange={(e) => setHobbies(e)}
            />
             <ListItem
              selectedValue={hobbies}
              title="Art"
              value="Nghệ thuật và kiến ​​trúc"
              onChange={(e) => setHobbies(e)}
            />
             <ListItem
              selectedValue={hobbies}
              title="Ecotourism"
              value="Du lịch sinh thái"
              onChange={(e) => setHobbies(e)}
            />
            
          </View>
        </View>

        <View className="mt-[20px] mb-[200px]">
          <Text className="mb-[20px] text-[25px] ml-[20px] font-Nbold">
            {" "}
            Hometown:{" "}
          </Text>
          <View className=" h-16 ml-[60px] px-4 w-[300px]  rounded-2xl border-2 border-gray-300 focus:border-secondary flex flex-row items-center">
            <TextInput value={hometown} onChangeText={(e) => setHometown(e)}  className="flex-1 text-white font-psemibold text-base" placeholder="Please enter your wish hometown" /> 
          </View>
        </View>

        <TouchableOpacity onPress={() => router.push("Query/query")}>
          <View className="flex items-center justify-center">
            <View className="w-[150px] h-[50px] bg-primary rounded-2xl">
              <Text className="text-center mt-[10px] text-[18px] font-Nmedium text-white">
                {" "}
                Apply{" "}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Filter;
