import { UU_login } from '@/api/user/user'

export const uu_cookie = async function () {
  let uu_token = localStorage.getItem('UUIDTOKEN')
  if (!uu_token) {
    const result = await UU_login()
    localStorage.setItem('UUIDTOKEN', encodeURIComponent(result.cookie))
  }
  return uu_token
}