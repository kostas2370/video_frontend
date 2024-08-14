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

export const getVideos = async (search, page) => {
    try {

        var url = "video/?"
        if (search){
            url = url+"search=" +search
        }
        if (page){
            url = url+"&page=" +page
        }


        const response = await httpClient.get(url); // replace with your endpoint
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        
    }
};

export const deleteVideo = async (id) =>  {
    try {

        var url = "video/" + id +"/"
      
        const response = await httpClient.delete(url); // replace with your endpoint
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        
    }
};

export const renderVideo = async (id) => {
    try {
        var url = "video/" + id +"/render_video/"
      
        const response = await httpClient.patch(url); // replace with your endpoint
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        
    }



}
