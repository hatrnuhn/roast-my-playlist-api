import { InternalAxiosRequestConfig } from "axios";

export interface CustomAxiosConfig extends InternalAxiosRequestConfig {
    _retry?: boolean
}
