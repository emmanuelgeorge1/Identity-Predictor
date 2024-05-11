import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const agifyApi = axios.create({
    baseURL: process.env.AGIFY_API_BASE_URL
});

const genderizeApi = axios.create({
    baseURL: process.env.GENDERIZE_API_BASE_URL
});

const nationalizeApi = axios.create({
    baseURL:process.env.NATIONALIZE_API_BASE_URL
});

export const predictAge = async (name: string) => {
    const url = `${agifyApi.defaults.baseURL}/?name=${name}`;
    console.log("Agify API URL:", url);

    try {
        const response = await agifyApi.get(`/?name=${name}`);
        return { age: response.data.age };
    } catch (error) {
        console.error("Error predicting age:", error);
        throw new Error("Failed to predict age.");
    }
};

export const predictGender = async (name: string) => {
    const url = `${genderizeApi.defaults.baseURL}/?name=${name}`;
    console.log("Genderize API URL:", url);

    try {
        const response = await genderizeApi.get(`/?name=${name}`);
        return { gender: response.data.gender };
    } catch (error) {
        console.error("Error predicting gender:", error);
        throw new Error("Failed to predict gender.");
    }
};

export const predictNationality = async (name: string) => {
    const url = `${nationalizeApi.defaults.baseURL}/?name=${name}`;
    console.log("Nationalize API URL:", url);

    try {
        const response = await nationalizeApi.get(`/?name=${name}`);
        return response.data.country.map((country: { country_id: string }) => country.country_id);
    } catch (error) {
        console.error("Error predicting nationality:", error);
        throw new Error("Failed to predict nationality.");
    }
};


export const predictDetails = async (name: string) => {
    try {
        const [agifyRes, genderizeRes, nationalizeRes] = await Promise.all([
            predictAge(name),
            predictGender(name),
            predictNationality(name),
        ]);
        return { agify: agifyRes, genderize: genderizeRes, nationalize: nationalizeRes };
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Failed to predict details.");
    }
};
