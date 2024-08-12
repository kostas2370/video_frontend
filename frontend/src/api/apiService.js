import httpClient from "./axiosPrivate";
// Example function to get data from an API endpoint

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


export const getVoices = async () => {
    try {

        var url = "voices/"
      
        const response = await httpClient.get(url); // replace with your endpoint
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        
    }
};


export const createAvatar = async (data) => {
    try{
        const response = await httpClient.post('avatars/', data);
        return response.data


    }catch (error){
        console.error('Error fetching data:', error);

    }

}


export const getAvatars = async (name) => {
    try {

        var url = "avatars/"
        if (name){
            url = url+"?search=" +name
        }

        const response = await httpClient.get(url); // replace with your endpoint
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        
    }
};


export const deleteAvatar = async (id) =>  {
    try {

        var url = "avatars/" + id +"/"
      
        const response = await httpClient.delete(url); // replace with your endpoint
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        
    }
};


