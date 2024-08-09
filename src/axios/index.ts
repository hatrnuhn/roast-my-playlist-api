import axios, { AxiosError, AxiosInstance } from "axios";
import config from "../config/axiosConfig";
import { CustomAxiosConfig } from "../types/axios";

class CustomAxios {
    private axiosInstance: AxiosInstance
    private token?: string

    constructor(clientId: string, clientSecret: string, authURL: string) {
        this.axiosInstance = this.createAxiosInstance(clientId, clientSecret, authURL)
    }

    private createAxiosInstance = (clientId: string, clientSecret: string, authURL: string) => {
        const axiosInstance = axios.create(config)

        axiosInstance.interceptors.request.use((config) => {
            if (this.token)
                config.headers.Authorization = `Bearer ${this.token}`

            return config
        })

        axiosInstance.interceptors.response.use(res => res, async err => {
            if (err instanceof AxiosError && err.config) {
                const originalConfig: CustomAxiosConfig = { ...err.config }
                if (err.response?.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true
                    try {
                        const res = await axios.post(
                            authURL, 
                            `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`, 
                            {
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                }
                            }
                        )
                        this.token = res.data.access_token
                        return axiosInstance(originalConfig)
                    } catch (err) {
                        console.error('Error refreshing token: ', err)
                    }
                }
            }

            throw err
        })

        return axiosInstance
    }


    public get axios() {
        return this.axiosInstance
    }
}

export default new CustomAxios(
    process.env.SPOTIFY_CLIENT_ID!,
    process.env.SPOTIFY_CLIENT_SECRET!,
    process.env.SPOTIFY_AUTH_URL!
).axios