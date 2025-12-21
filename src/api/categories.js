import axiosInstance from './axios'

export const createCaregoriesApi = () => ({
  getAll() {
    return axiosInstance.get('categories')
  },
  get(id) {
    return axiosInstance.get(`categories/${id}`)
  },
  post(payload) {
    return axiosInstance.post('categories', payload)
  },
  put(id, payload) {
    return axiosInstance.put(`categories/${id}`, payload)
  },
  delete(id) {
    return axiosInstance.delete(`categories/${id}`)
  },
})
