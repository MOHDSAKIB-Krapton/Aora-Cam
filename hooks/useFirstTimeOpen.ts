import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

const useFirstTimeOpen = () => {

    // Keeps track of the user if the user has already been in the application before or its his first time to be
    const [isFirstTimeOpen, setIsFirstTimeOpen] = React.useState<Boolean>(false);

    // Since fetching data of user from async storage is going to be asynchronous so we can add a loading state
    const [isLoading, setIsLoading] = React.useState<Boolean>(true);


    // This will check the state of user everytime this component being used
    React.useEffect(() => {

        // Function which will check if the user is first time here or not?
        const checkIsFirstTimeOpen = async () => {

            try {
                // AsyncStorages is a function from react-native-async-storage which will try to get the hasopened item from its storage.
                const hasOpened: string | null = await AsyncStorage.getItem("hadOpened");

                // if the user is here for the first time AsyncStorage.getItem will return a null value 
                if (hasOpened === null) {
                    setIsFirstTimeOpen(true);
                } else {
                    setIsFirstTimeOpen(false);
                }

            } catch (error) {
                console.log("Failed to get local first time: ", error)
            } finally {

                // loading state will be true from starting and set it to be false once we get the state of firstTimeUserOpen 
                setIsLoading(false);
            }
        }
        checkIsFirstTimeOpen();

    }, []);

    // Returning these two state..
    return { isFirstTimeOpen, isLoading };

}

export default useFirstTimeOpen