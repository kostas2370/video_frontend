import httpClient from "./axiosPrivate";
// Example function to get data from an API endpoint
export const getAvatars = async () => {
    try {
        const response = await httpClient.get('avatars/'); // replace with your endpoint
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        
    }
};

export const generateVideo = async (data) => {
    try{
        const response = await httpClient.post('generate/', data);
      
        return response.data

    }catch (error){
        console.error('Error fetching data:', error);

    }
    
    
}

export const generateTwitchVideo = async (data) => {
    try{
        const response = await httpClient.post('twitch_generate/', data);
      
        return response.data

    }catch (error){
        console.error('Error fetching data:', error);

    }
    
    
}