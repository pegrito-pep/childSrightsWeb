"use strict";

import Vue from 'vue';
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
    //baseURL: process.env.baseURL || process.env.apiUrl || "http://localhost:4003/api"
    baseURL: process.env.baseURL || process.env.apiUrl || "https://fs-chlidrights.herokuapp.com/api/"
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent

        const token = storage.get('access_token')
        if (token != '' && token != null) {
            config.headers['Authorization'] = `Bearer ${token}`
        }

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response.data;
    },
    function (error) {
        // Do something with response error

        let response = error.response || null
        if (response == null) {
            return Promise.reject(error)
        }
        let data = response.data || null
        if (data == null) {
            return Promise.reject(response)
        }
        if (data.code == 498) {
            storage.clear()
            window.location.href = '/login'
        }
        return Promise.reject(data)
    }
);

Plugin.install = function (Vue, options) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            }
        },
        $axios: {
            get() {
                return _axios;
            }
        },
    });
};

Vue.use(Plugin)

export default Plugin;