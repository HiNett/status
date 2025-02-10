// Configuration de l'API pour le frontend
const API_BASE_URL = 'http://status.fpht.eu:3000/api'

export const API = {
  ADMIN: {
    CHECK: `${API_BASE_URL}/admin/check`,
    LOGIN: `${API_BASE_URL}/admin/login`,
    REGISTER: `${API_BASE_URL}/admin/register`
  }
} 