import { useState, useEffect } from "react";

/**
 * It returns the value of the key in localStorage, or the defaultValue if the key doesn't exist
 * @param key - The key to use to store the value in localStorage.
 * @param defaultValue - The value to return if the key doesn't exist in localStorage.
 * @returns The value of the key in localStorage or the defaultValue if the key is not found.
 */
function getStorageValue(key, defaultValue) {
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial || defaultValue;
}

/**
 * "useLocalStorage is a custom hook that returns a value from localStorage and a function to update
 * that value."
 * 
 * The first thing we do is call useState with a function that returns the value from localStorage.
 * This is a way to get the initial value of the state from localStorage
 * @param key - The key to use in localStorage.
 * @param defaultValue - The default value to use if the localStorage value is null.
 * @returns An array with two elements. The first element is the value of the local storage item. The
 * second element is a function that sets the value of the local storage item.
 */
const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  /* Setting the value of the key in localStorage to the value of the state. */
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage