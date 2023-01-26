import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const PREFIX = "cache_"

const store = async (key, value) =>  {
          try  {
                    const data = JSON.stringify({
                              value,
                              timestamp: Date.now()
                    })
                    await AsyncStorage.setItem(`${PREFIX}${key}`, data)
          } catch (error) {
                    throw error
          }
}

const get = async (key) => {
          try  {
                    const value = await AsyncStorage.getItem(`${PREFIX}${key}`)
                    const item = JSON.parse(value)
                    if(!item) return null
                    if(isExpires(item)) {
                              await AsyncStorage.removeItem(`${PREFIX}${key}`)
                              return null
                    }
                    return item.value
          } catch (error) {
                    throw error
          }
}

const isExpires = (item) => {
          const now = moment(Date.now())
          const storedTime = moment(item.timestamp)
          return now.diff(storedTime, 'hours') > 5
}

export default  {
          store,
          get
}