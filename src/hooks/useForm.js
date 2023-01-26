import { useState } from "react"

/**
 * le hook pour controler les formulaires
 * @param {Object} initials les donnes par défault
 * @returns {Array} un tableau contenant les [nouveaux donnees, le handleChange, le setValeur des donnés]
 */
export const useForm = (initials) => {
          const [data, setData] = useState(initials)

          const handleChange = (name, value) => {
                    setData(d => ({...d, [name]: value}))
          }

          const setValue = (name, value) => {
                    setData(d => ({...d, [name]: value}))
          }
          return [data, handleChange, setValue]
}