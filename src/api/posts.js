import axiosInstance from './axios'

export const createPostsApi = () => ({
  getAll(query = '') {
    return axiosInstance.get(`posts?search=${query}`)
  },
  get(slug) {
    return axiosInstance.get(`posts/${slug}`)
  },
  post(payload) {
    return axiosInstance.post('posts', payload)
  },
  put(slug, payload) {
    return axiosInstance.put(`posts/${slug}`, payload)
  },
  delete_(slug) {
    return axiosInstance.delete(`posts/${slug}`)
  },
})
