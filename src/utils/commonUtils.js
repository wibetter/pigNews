/**
 * 在url中增加_apptarget=_blank参数，告知APP以新的webview打开此页面
 * @param String url
 * @return String
 */
export const addAPPtarget = (url) => {
  let newUrl = url;
  const charA = url.indexOf('?');
  const charB = url.indexOf('#');
  if (charA > 0) {
    const newPageUrl = url.substring(0, charA);
    const params = url.substring(charA + 1);
    newUrl = `${newPageUrl}?_apptarget=_blank&${params}`;
  } else if (charB > 0) {
    const newPageUrl = url.substring(0, charB);
    const params = url.substring(charB + 1);
    newUrl = `${newPageUrl}?_apptarget=_blank#${params}`;
  }
  return newUrl;
};

/**
 * double num   // 返回值类型唯一，都是字符串
 * @param {Number} num
 */
export const doubleNum = (num) => (num < 10 ? `0${num}` : `${num}`);

/**
 * timeStamp：13位时间戳
 * format: 链接格式如'.','-',/''
 */
export const formatDate = (timeStamp, format = '/') => {
  const time = new Date(timeStamp);
  const timeObj = {
    year: time.getFullYear(),
    month: time.getMonth() + 1,
    day: time.getDate(),
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds(),
    millisecond: time.getMilliseconds(),
  };
  return `${timeObj.year}${format}${timeObj.month}${format}${
    timeObj.day
  } ${doubleNum(timeObj.hour)}:${doubleNum(timeObj.minute)}`;
};

/**
 * 返回文件名后缀
 * @param {String} name
 */
export const getFileSuffix = (name) => {
  const arr = name.split('.');
  return arr[arr.length - 1];
};

/**
 * 获取查询参数
 */
export const getQueryString = (name) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};

/**
 * @param {Number} rm  服务器取的剩余时间
 * 倒计时函数
 */
export const countDown = (rm) => {
  const interval = 1000; // 每秒更新一次
  let timer;
  let count = 0; // 记录倒计时执行多少次， 用于矫正偏差
  const startTime = new Date().getTime(); // 开始时间， 用于矫正偏差

  if (rm > 0) {
    _countDown(); // 首先执行一次
  }

  const _countDown = function () {
    let offset = new Date().getTime() - (startTime + count * interval);
    console.log(`偏差${offset}, 还剩余${formatTime(rm)}`);
    count++;

    if (offset < 0) {
      offset = 0;
    }
    const wait = interval - offset;
    rm -= interval;

    if (rm < 0) {
      clearTimeout(timer);
    } else {
      timer = setTimeout(countDown, wait);
    }
  };
  const formatTime = (timeStamp) => {
    const h = parseInt(timeStamp / 1000 / 60 / 60);
    const m = parseInt((timeStamp / 1000 / 60) % 60);
    const s = parseInt((timeStamp / 1000) % 60);
    return `${h}:${m}:${s}`;
  };
};

const isPicture = function (curImg) {
  let isPic = false;
  const strFilter = '.jpeg|.gif|.jpg|.png|.bmp|.pic|';
  if (curImg && curImg.indexOf('.') > -1) {
    const p = curImg.lastIndexOf('.');
    let strPostfix = `${curImg.substring(p, curImg.length)}|`;
    strPostfix = strPostfix.toLowerCase();
    if (strFilter.indexOf(strPostfix) > -1) {
      isPic = true;
    }
  }
  return isPic;
};
