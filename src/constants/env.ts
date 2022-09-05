const dev = import.meta.env.DEV
export const BASE_URL = dev ? 'http://127.0.0.1:5173' : 'https://low-code-platform-vite.vercel.app'
export const API_URL = dev ? 'http://127.0.0.1:1337' : 'https://low-code-platform-vite.vercel.app'
