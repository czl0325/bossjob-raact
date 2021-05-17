import Cookies from 'js-cookie'

export const getPictureUrl = (url) => "http://localhost:4000/public/images/"+url

export const getUserId = () => {
  const user_id = Cookies.get('user_id')
  if (!user_id) {
    return ''
  }
  return /j:"(.*?)"/g.exec(user_id)[1]
}
