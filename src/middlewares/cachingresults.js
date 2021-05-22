import cache from 'memory-cache'

const memCache = new cache.Cache()

class Caching {

    cacheMiddleware(req, res, next) {
        

            let key =  '__express__' + req.originalUrl || req.url
            let cacheContent = memCache.get(key);
            if(cacheContent){
                res.send( cacheContent );
                return
            }else{
                res.sendResponse = res.json
                res.json = (body) => {
                    memCache.put(key,body, 60 * 1000);
                    res.sendResponse(body)
                }
                next()
            }
    }
}

export default new Caching