import AsyncStorage from "@react-native-async-storage/async-storage";
import cache from "../utils/cache";
export const API_URL = false
          ? "http://app.mediabox.bi:1805"
          : "http://192.168.43.51:3000";
         
/**
 * consomer une api avec les options par défaut
 * @param {string} url - le lien à appeler
 * @param {object} options - autres options comme les headers et le body
 * @returns {Promise}
 */
const initialOptions = {
          method: 'GET',
          cacheData: false,
          checkInCacheFirst: false
}
export default async function fetchApi(url, options = initialOptions) {
          options = {
                    ...initialOptions,
                    ...options
          }
          const cacheFirst = options.method == "GET" && options.checkInCacheFirst
          if(cacheFirst) {
                    const data = await cache.get(url)
                    if(data) {
                              return data
                    }
          }
          const userF = await AsyncStorage.getItem("user");
          const user = JSON.parse(userF);
          if (user) {
                    options = {
                              ...options,
                              headers: { ...options.headers, authorization: `bearer ${user.token}` },
                    };
          }
          const response = await fetch(API_URL + url, {
                    ...options,
          });

          const canIcache = options.method == "GET" && options.cacheData
          if (response.ok) {
                    const data = await response.json();
                    if(canIcache) {
                              cache.store(url, data)
                    }
                    return data
          } else {
                    throw await response.json();
          }
}
