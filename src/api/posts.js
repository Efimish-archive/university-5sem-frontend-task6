import axiosInstance from './axios'

export const createPostsApi = () => ({
  getAll() {
    return axiosInstance.get('posts')
  },
  get(id) {
    return axiosInstance.get(`posts/${id}`)
  },
  post(payload) {
    return axiosInstance.post('posts', payload)
  },
  put(id, payload) {
    return axiosInstance.put(`posts/${id}`, payload)
  },
  delete(id) {
    return axiosInstance.delete(`posts/${id}`)
  },
})
