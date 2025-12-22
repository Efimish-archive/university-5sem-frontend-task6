import axiosInstance from './axios'

export const createPostsApi = () => ({
  getAll() {
    return axiosInstance.get('posts')
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
  delete(slug) {
    return axiosInstance.delete(`posts/${slug}`)
  },
})
