const CrypotJs = require("crypto-js");
const JsEncrypt = require('node-jsencrypt');
const { migu_request } = require("../../../util/migu_request");
const APIError = require("../../../middlewares/rest").APIError;


let song = async (ctx) => {
    // var
    //     cid = ctx.request.body.cid || '69910406417',
    //     br = ctx.request.body.br || '1';
    if (ctx.request.method === 'GET') {
        var cid = ctx.request.query.cid || '69910406417';
        var br = ctx.request.query.br || '1';
    } else if (ctx.request.method === 'POST') {
        var cid = ctx.request.body.cid || '69910406417';
        var br = ctx.request.body.br || '1';
    }

    // 一套神奇的加密环节
    const publicKey = `-----BEGIN PUBLIC KEY-----
        MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8asrfSaoOb4je+DSmKdriQJKW
        VJ2oDZrs3wi5W67m3LwTB9QVR+cE3XWU21Nx+YBxS0yun8wDcjgQvYt625ZCcgin
        2ro/eOkNyUOTBIbuj9CvMnhUYiR61lC1f1IGbrSYYimqBVSjpifVufxtx/I3exRe
        ZosTByYp4Xwpb1+WAQIDAQAB
        -----END PUBLIC KEY-----`;

    const o = `{"copyrightId":"${cid.trim()}","type":${br.trim()},"auditionsFlag":0}`;
    const s = new JsEncrypt;
    s.setPublicKey(publicKey);
    const a = 1e3 * Math.random();
    const u = CrypotJs.SHA256(String(a)).toString();
    const c = CrypotJs.AES.encrypt(o, u).toString();
    const f = s.encrypt(u);

    let result = await migu_request('http://music.migu.cn/v3/api/music/audioPlayer/getPlayInfo', {
        dataType: 2,
        data: c,
        secKey: f
    })
    // console.log(result);
    // 捕获序列化json出错，防止程序异常退出
    
    ctx.rest(result.data);
    result = null;
    // try {
    //     ctx.body = JSON.stringify(result.data);
    // } catch (error) {
    //     ctx.body = JSON.stringify({
    //         error: '服务端数据解析错误',
    //         status: 400
    //     })
    // }
    // ctx.type = 'application/json';
    // ctx.body = "true";
}

module.exports = {
    song
}