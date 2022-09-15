import axios from "axios";

// console.log(process.env.REACT_APP_RAPID_API_KEY)
const BASE_URL='https://youtube-v31.p.rapidapi.com'
const options = {
   
   
    params: {
      
      maxResults: '50'
    },
    headers: {
      'X-RapidAPI-Key':'71fc0cf23amshc5358da3033f688p147819jsn0fe53a3f616e',
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  };

export const fetchFromAPI= async(url)=>{
const {data}=  await  axios.get(`${BASE_URL}/${url}`,
options);

return data;
}