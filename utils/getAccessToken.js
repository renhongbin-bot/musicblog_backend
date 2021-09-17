const rp = require('request-promise')
const APPID = 'wxa2edde2b6ee34b44'
const APPSECRET = '11e3ade0823189fdb01d0a6b43b6e6b2'
const URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`
const fs = require('fs')
const path = require('path')
const fileName = path.resolve(__dirname, './access_token.json')


// 获得access_token
const updateAccessToken = async () => {
  const resStr = await rp(URL)
  const res = JSON.parse(resStr)
  console.log(res)
  // 把获取的access_token写文件 
  if (res.access_token) {
    fs.writeFileSync(fileName, JSON.stringify({
      access_token: res.access_token,
      createTime: new Date()
    }))
  } else {
    // 再次更新access_token
    await updateAccessToken()
  }
}

// 取access_token
const getAccessToken = async () => {
  // 读取文件
  try {
    const readRes = fs.readFileSync(fileName, 'utf8')
    const readObj = JSON.parse(readRes)
    // 创建access_token时间
    const createTime = new Date(readObj.createTime).getTime()
    // 当前时间
    const nowTime = new Date().getTime()
    // 判断access_token创建时间和当前时间的时间差
    if((nowTime - createTime) / 1000 / 60 / 60 >= 2) {
      await updateAccessToken()
      return await getAccessToken()
    }
    return readObj.access_token
  } catch (error) {
    await updateAccessToken()
    return await getAccessToken()
  }

}

setInterval(async () => {
  await updateAccessToken()
}, (7200-300) * 1000)

// 导出模块
module.exports = getAccessToken