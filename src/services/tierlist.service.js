import api from './api'

export const tierListService = {
  async getTierList() {
    const response = await api.get('/tierlist')
    return response.data
  },

  async updateTierList(tiers) {
    const response = await api.put('/tierlist', { tiers })
    return response.data
  },

  async generatePDF() {
    const response = await api.get('/tierlist/pdf')
    return response.data
  },

  async getAvailableLogos() {
    const response = await api.get('/logos/available')
    return response.data
  },

  async addLogo(nom, imageURL) {
    const response = await api.post('/logos/available', { nom, imageURL })
    return response.data
  },

  async searchLogo(domain) {
    const response = await api.get('/logos/search', { params: { domain } })
    return response.data
  }
}
