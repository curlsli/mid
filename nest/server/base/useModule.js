'use strict'
const cryto = require('crypto');
let jsDepCache = {};
let isFirst = true;

function useModule(modules) {
    if (!Array.isArray(modules)) {
        modules = [modules];
    }

    let blockKey = TOOLS.md5(modules.toString()),
        getAllModules = mod => {
            !this._JSmods.includes(mod) && this._JSmods.push(mod);
            // combo
            if (ETC.debug) {
                !this._JSLinks.includes(mod) && this._JSLinks.push(mod);
                this._JSmods.length = 0;
            }
        };

    if (jsDepCache.hasOwnProperty(blockKey)) {
        let jss = jsDepCache[blockKey];
        if (false !== jss) {
            jss.map(getAllModules);
        }
        return;
    }

    if (isFirst) {
        isFirst = false;
        // modules = this._JSLinks.concat(modules);
        modules.unshift(...this._JSLinks);
        this._JSLinks.length = 0;
    }

    let fullModulesInvoke = modules.map(mod => {
        return `fml.use('${mod.trim()}');`
    })

    // this._JSstack = this._JSstack.concat(fullModulesInvoke);
    this._JSstack.push(...fullModulesInvoke);

    if (!SITE.jsDefer) {
        return;
    }

    jsDepCache[blockKey] = modules.length ? modules : false;
    modules.forEach(getAllModules);
}
module.exports = useModule;