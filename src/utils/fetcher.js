import axios from 'axios'

export const fetcher = async (method, path, payload) => {

    try {
        const response = await axios.request({
            url: `/api${path}`,
            method,
            data: payload,
        });
        const data = response.data;
        const title = data.message;
        const name = data.data.name;

        return { title, name }
    } catch (error) {
        return Promise.reject(error)
    }


};
