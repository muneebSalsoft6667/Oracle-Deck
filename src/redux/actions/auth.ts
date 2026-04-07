import { secureStorage } from "@/utils/secureStorage";
import { changeFirstTime, clearData } from "../reducers/auth";
import store from "../store";

const { dispatch } = store;

export const changeFirstTimeState = (isFirstTime: boolean) => {
    // Dispatch immediately for instant UI update
    dispatch(changeFirstTime(isFirstTime));
    // Save to storage in background
    secureStorage.setItem("IS_FIRST_TIME", isFirstTime.toString()).catch((error) => {
        console.error('Error saving IS_FIRST_TIME:', error);
    });
};

export const clearDataAction = () => {
    secureStorage.clearAll();
    dispatch(clearData());
}