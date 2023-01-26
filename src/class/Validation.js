export default class Validation {
          constructor(data, validation, customMessages) {
                    this.data = data
                    this.validation = validation
                    this.customMessages = customMessages
                    this.errors = {}
          }

          isValidate() {
                    return Object.keys(this.getErrors()).length === 0 && this.getErrors().constructor === Object
          }

          setError(key, message) {
                    const errors = this.errors[key] ? [...this.errors[key], message] : [message]
                   this.errors = {...this.errors,  [key]: errors}
          }

          getError(key) {
                    this.run()
                    return this.errors[key]
          }

          required(key, intitialValue) {
                    // const value = intitialValue.trim()
                    const value = intitialValue
                   if(!value || value === '' || value.length === 0) {
                             this.setError(key, this.customMessages?.[key]?.required || `This field is required`)
                   }
          }

          length(key, value, params) {
                    if(!value) return
                    const [min, max] = params
                    if(min && !max && value.length < min) {
                              this.setError(key, this.customMessages?.[key]?.length || `Enter et least ${min} characters`)
                    } else if (!min && max && value.length > max) {
                              this.setError(key, this.customMessages?.[key]?.length || `You can not exceed ${max} characters`)
                    }else if((min && max ) && (value.length < min || value.length > max)) {
                              this.setError(key, this.customMessages?.[key]?.length || `The value of this field must be between ${min} and ${max}`)
                    }
          }
          match(key, value, params) {
                    if(!value) return
                    if(this.data[params] !== value) {
                              this.setError(key, this.customMessages?.[key]?.match || `Value does not match the ${params} value`)
                    }
          }
          username(key, value) {
                    if(!value) return
                    const validUsername = /^[a-zA-Z0-9._]+$/.test(value)
                    if(!validUsername || value.length < 2) {
                              this.setError(key, this.customMessages?.[key]?.username || 'Incorrect username (letters, numbers, point or underscore)')
                    }
          }
          email(key, value) {
                    if(!value) return
                    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                    if(!validEmail) {
                              this.setError(key, this.customMessages?.[key]?.email || 'Incorrect email')
                    }
          }

          image(key, value, params) {
                    if(!value) return
                    const IMAGES_MIMES = ['image/jpeg', 'image/gif', 'image/png']
                    if(value) {
                              if(!IMAGES_MIMES.includes(value.type)) {
                                        this.setError(key, this.customMessages?.[key]?.image || 'Please choose a valid image')
                              } else if(params < value.size) {
                                        const megaBite = (params - 1000000) / 1000000
                                        this.setError(key, this.customMessages?.[key]?.size || `Your image is too large (max: ${megaBite} MB)`)
                              }
                    }
          }

          run() {
                    for(let key in this.validation) {
                              const value = this.getValue(key)
                              const [properties, params] = this.getProperties(this.validation[key])
                              properties.forEach(property => {
                                        this[property](key, value, params?.[property])
                              });
                    }
          }

          getErrors() {
                    this.run()
                    return this.errors
          }

          getProperties(value) {
                    switch (typeof(value)) {
                              case 'string':
                                        return [value.split(','), null]

                              case 'object':
                                        const properties = []
                                        for(let key in value) {
                                                  properties.push(key)
                                        }
                                        return [properties, value]
                    
                              default:
                                        return [value, null]
                    }
          }

          getValue(key)
          {
                    return this.data[key]
          }
}