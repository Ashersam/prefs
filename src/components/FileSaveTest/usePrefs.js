import { useCallback, useEffect, useState } from 'react';
import { getInitialValue } from '../../core/backend';
import { deleteLocalStorage, tolocalStorageCreate, updateLocalStorage } from '../../core/tolocaStorage';
import useValidation from './useValidator';

const isFunction = async(backendfn) => {
  try {
    if (backendfn instanceof Function) {
      return backendfn
    }
  } catch (error) {
      return error
    }
}
 
export default function usePrefs({ 
  key, 
  values, 
  backendfn, 
  tag 
}) {
  const { 
    validator, 
    validationMessage, 
    keyExists, 
    setValidator } 
    = useValidation({ 
      key: key, 
      backendStore: backendfn.type
    })

    const [ initialValue ] = useState(getInitialValue(key, values))

    useEffect(() => {
      setBackendStore()
    }, [backendfn])

    useEffect(() => {
      keyExists()
    },[])

    const setBackendStore = useCallback(() => {
      isFunction(backendfn).then((res) => {
        console.log(res)
        if(res){
          storeToCuston(res)
        }
        else{
          tolocalStorageCreate(backendfn, values, tag, validator, key, keyExists)
        }
      })
    },[key, backendfn, values, tag, validator])

    const storeToCuston = (customFn) => {
      customFn(key, JSON.stringify(values))
    }

    const updateStorage = () => {
      updateLocalStorage(backendfn, values, validator, key)
    }
    
    const deleteStorage = useCallback(() => {
      deleteLocalStorage(backendfn, validator, key, tag)
    }, [deleteStorage, backendfn])

  return {
    state: { 
      validator,
      validationMessage,
      initialValue
    },
    action: { 
      setBackendStore, 
      updateStorage,
      deleteStorage
    }
  };
}
