const Router = require('koa-router');
const { index } = require('./index');
const { search, hotSearch, suggestSearch } = require('./search');
const { song } = require('./song');
const { lyric } = require('./lyric');
const { top, topCategory } = require('./top');
const { singer_Info, singer_songList } = require('./singer');
const { playList_info } = require('./playlist');

// 新建 咪咕 路由
const migu = new Router();

// add get method
migu.get('/index', index);

migu.get('/search', search);
migu.get('/hotSearch', hotSearch);
migu.get('/suggestSearch', suggestSearch);

migu.get('/song', song);

migu.get('/lyric', lyric);

migu.get('/top', top);
migu.get('/topCategory', topCategory);

migu.get('/singer/info', singer_Info);
migu.get('/singer/songList', singer_songList);

migu.get('/playlist/info', playList_info);

// add post method
migu.post('/song', song);

module.exports = migu;