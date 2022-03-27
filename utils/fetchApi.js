import axios from 'axios'

export const baseUrl = 'https://bayut.p.rapidapi.com'

export const fetchApi = async (url) =>{
    const {data} = await axios.get((url),{
        headers:{
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
          'X-RapidAPI-Key': 'ddecef2253msh51991b94fe36979p1ce7c1jsn8525053917dc' 
        }
    })
    return data
}