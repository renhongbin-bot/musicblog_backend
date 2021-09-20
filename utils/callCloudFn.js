const getAccessToken = require('./getAccessToken.js')
const rp = require('request-promise')

const callCloudFn = async (ctx, fnName, params) => {
  const access_token = await getAccessToken()
  const options = {
    method: 'POST',
    uri: `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${access_token}&env=${ctx.state.env}&name=${fnName}`,
    body: {
      ...params
    },
    json: true
  }

  return await rp(options)
    .then((res) => {
      return res
    })
    .catch(function (err){

    })
}

module.exports = callCloudFn

