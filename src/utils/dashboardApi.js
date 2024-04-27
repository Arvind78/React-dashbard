import axios from "axios";

export const getChartData =  (country,topic) => {
    return axios.get(`https://dashboard-8rzu.onrender.com/api/chart?country=${country}&topic=${topic}`)
}

export const getData =  () => {
    return axios.get(`https://dashboard-8rzu.onrender.com/api/data`)
}