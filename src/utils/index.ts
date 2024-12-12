/**
 * 获取接口前缀
 */
export function getAPI(code = 'api') {
  const host: string = import.meta.env.PROD ? import.meta.env.VITE_APP_API_HOST : location.host;
  const origin = `${location.protocol}//${host}`;
  const basePath = import.meta.env.PROD ? '/prod-api' : '/dev-api';
  const api = `${origin}${basePath}`; // 基础接口
  console.log(basePath);
  
  // const src = `${origin}${process.env.VITE_BASE_API}`;

  switch (code) {
    case 'host':
      return host;
    case 'origin':
      return origin;
    case 'basePath':
      return basePath;
    default:
      return api;
  }
}
/**
* 参数处理
* @param {*} params  参数
*/
export function tansParams(params: { [x: string]: any; }) {
	let result = ''
	for (const propName of Object.keys(params)) {
		const value = params[propName];
		var part = encodeURIComponent(propName) + "=";
		if (value !== null && typeof (value) !== "undefined") {
			if (typeof value === 'object') {
				for (const key of Object.keys(value)) {
					if (value[key] !== null && typeof (value[key]) !== 'undefined') {
						let params = propName + '[' + key + ']';
						var subPart = encodeURIComponent(params) + "=";
						result += subPart + encodeURIComponent(value[key]) + "&";
					}
				}
			} else {
				result += part + encodeURIComponent(value) + "&";
			}
		}
	}
	return result
}