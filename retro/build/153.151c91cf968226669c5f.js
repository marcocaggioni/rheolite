(self.webpackChunk_JUPYTERLAB_CORE_OUTPUT=self.webpackChunk_JUPYTERLAB_CORE_OUTPUT||[]).push([[153],{50153:(e,t,i)=>{"use strict";i.r(t),i.d(t,{DefaultSchemaValidator:()=>p,ISettingRegistry:()=>y,SettingRegistry:()=>m,Settings:()=>g});var s=i(81443),n=i(66065),r=i(98669),a=i(58137),o=i(84778),c=i.n(o),u=i(96111);const d=JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema","title":"JupyterLab Plugin Settings/Preferences Schema","description":"JupyterLab plugin settings/preferences schema","version":"1.0.0","type":"object","additionalProperties":true,"properties":{"jupyter.lab.menus":{"type":"object","properties":{"main":{"title":"Main menu entries","description":"List of menu items to add to the main menubar.","items":{"$ref":"#/definitions/menu"},"type":"array","default":[]},"context":{"title":"The application context menu.","description":"List of context menu items.","items":{"allOf":[{"$ref":"#/definitions/menuItem"},{"properties":{"selector":{"description":"The CSS selector for the context menu item.","type":"string"}}}]},"type":"array","default":[]}},"additionalProperties":false},"jupyter.lab.setting-deprecated":{"type":"boolean","default":false},"jupyter.lab.setting-icon":{"type":"string","default":""},"jupyter.lab.setting-icon-class":{"type":"string","default":""},"jupyter.lab.setting-icon-label":{"type":"string","default":"Plugin"},"jupyter.lab.shortcuts":{"items":{"$ref":"#/definitions/shortcut"},"type":"array","default":[]},"jupyter.lab.transform":{"type":"boolean","default":false}},"definitions":{"menu":{"properties":{"disabled":{"description":"Whether the menu is disabled or not","type":"boolean","default":false},"id":{"description":"Menu unique id","oneOf":[{"type":"string","enum":["jp-menu-file","jp-menu-file-new","jp-menu-edit","jp-menu-help","jp-menu-kernel","jp-menu-run","jp-menu-settings","jp-menu-view","jp-menu-tabs"]},{"type":"string","pattern":"[a-z][a-z0-9\\\\-_]+"}]},"items":{"description":"Menu items","type":"array","items":{"$ref":"#/definitions/menuItem"}},"label":{"description":"Menu label","type":"string"},"rank":{"description":"Menu rank","type":"number","minimum":0}},"required":["id"],"type":"object"},"menuItem":{"properties":{"args":{"description":"Command arguments","type":"object"},"command":{"description":"Command id","type":"string"},"disabled":{"description":"Whether the item is disabled or not","type":"boolean","default":false},"type":{"description":"Item type","type":"string","enum":["command","submenu","separator"],"default":"command"},"rank":{"description":"Item rank","type":"number","minimum":0},"submenu":{"oneOf":[{"$ref":"#/definitions/menu"},{"type":"null"}]}},"type":"object"},"shortcut":{"properties":{"args":{"type":"object"},"command":{"type":"string"},"disabled":{"type":"boolean","default":false},"keys":{"items":{"type":"string"},"minItems":1,"type":"array"},"selector":{"type":"string"}},"required":["command","keys","selector"],"type":"object"}}}'),l=n.JSONExt.deepCopy,h=String.fromCharCode(30);class p{constructor(){this._composer=new(c())({useDefaults:!0}),this._validator=new(c()),this._composer.addSchema(d,"jupyterlab-plugin-schema"),this._validator.addSchema(d,"jupyterlab-plugin-schema")}validateData(e,t=!0){const i=this._validator.getSchema(e.id),s=this._composer.getSchema(e.id);if(!i||!s)return"object"!==e.schema.type?[{dataPath:"type",keyword:"schema",schemaPath:"",message:`Setting registry schemas' root-level type must be 'object', rejecting type: ${e.schema.type}`}]:this._addSchema(e.id,e.schema)||this.validateData(e);let n;try{n=u.parse(e.raw)}catch(e){if(e instanceof SyntaxError)return[{dataPath:"",keyword:"syntax",schemaPath:"",message:e.message}];const{column:t,description:i}=e;return[{dataPath:"",keyword:"parse",schemaPath:"",message:`${i} (line ${e.lineNumber} column ${t})`}]}if(!i(n))return i.errors;const r=l(n);return s(r)?(t&&(e.data={composite:r,user:n}),null):s.errors}_addSchema(e,t){const i=this._composer,s=this._validator,n=s.getSchema("jupyterlab-plugin-schema");return n(t)?s.validateSchema(t)?(i.removeSchema(e),s.removeSchema(e),i.addSchema(t,e),s.addSchema(t,e),null):s.errors:n.errors}}class m{constructor(e){this.schema=d,this.plugins=Object.create(null),this._pluginChanged=new a.Signal(this),this._ready=Promise.resolve(),this._transformers=Object.create(null),this.connector=e.connector,this.validator=e.validator||new p,this._timeout=e.timeout||1e3,e.plugins&&(this._ready=this._preload(e.plugins))}get pluginChanged(){return this._pluginChanged}async get(e,t){await this._ready;const i=this.plugins;if(e in i){const{composite:s,user:n}=i[e].data;return{composite:void 0!==s[t]?l(s[t]):void 0,user:void 0!==n[t]?l(n[t]):void 0}}return this.load(e).then((()=>this.get(e,t)))}async load(e){await this._ready;const t=this.plugins;return e in t?new g({plugin:t[e],registry:this}):this.reload(e)}async reload(e){await this._ready;const t=await this.connector.fetch(e),i=this.plugins;if(void 0===t)throw[{dataPath:"",keyword:"id",message:`Could not fetch settings for ${e}.`,schemaPath:""}];return await this._load(await this._transform("fetch",t)),this._pluginChanged.emit(e),new g({plugin:i[e],registry:this})}async remove(e,t){await this._ready;const i=this.plugins;if(!(e in i))return;const s=u.parse(i[e].raw);return delete s[t],delete s[`// ${t}`],i[e].raw=f.annotatedPlugin(i[e],s),this._save(e)}async set(e,t,i){await this._ready;const s=this.plugins;if(!(e in s))return this.load(e).then((()=>this.set(e,t,i)));const n=u.parse(s[e].raw);return s[e].raw=f.annotatedPlugin(s[e],Object.assign(Object.assign({},n),{[t]:i})),this._save(e)}transform(e,t){const i=this._transformers;if(e in i)throw new Error(`${e} already has a transformer.`);return i[e]={fetch:t.fetch||(e=>e),compose:t.compose||(e=>e)},new r.DisposableDelegate((()=>{delete i[e]}))}async upload(e,t){await this._ready;const i=this.plugins;return e in i?(i[e].raw=t,this._save(e)):this.load(e).then((()=>this.upload(e,t)))}async _load(e){const t=e.id;try{await this._validate(e)}catch(e){const i=[`Validating ${t} failed:`];throw e.forEach(((e,t)=>{const{dataPath:s,schemaPath:n,keyword:r,message:a}=e;(s||n)&&i.push(`${t} - schema @ ${n}, data @ ${s}`),i.push(`{${r}} ${a}`)})),console.warn(i.join("\n")),e}}async _preload(e){await Promise.all(e.map((async e=>{var t;try{await this._load(await this._transform("fetch",e))}catch(e){"timeout"!==(null===(t=e[0])||void 0===t?void 0:t.keyword)&&console.warn("Ignored setting registry preload errors.",e)}})))}async _save(e){const t=this.plugins;if(!(e in t))throw new Error(`${e} does not exist in setting registry.`);try{await this._validate(t[e])}catch(t){throw console.warn(`${e} validation errors:`,t),new Error(`${e} failed to validate; check console.`)}await this.connector.save(e,t[e].raw);const i=await this.connector.fetch(e);if(void 0===i)throw[{dataPath:"",keyword:"id",message:`Could not fetch settings for ${e}.`,schemaPath:""}];await this._load(await this._transform("fetch",i)),this._pluginChanged.emit(e)}async _transform(e,t,i=(new Date).getTime()){const s=(new Date).getTime()-i,n=t.id,r=this._transformers,a=this._timeout;if(!t.schema["jupyter.lab.transform"])return t;if(n in r){const i=r[n][e].call(null,t);if(i.id!==n)throw[{dataPath:"",keyword:"id",message:"Plugin transformations cannot change plugin IDs.",schemaPath:""}];return i}if(s<a)return await new Promise((e=>{setTimeout((()=>{e()}),250)})),this._transform(e,t,i);throw[{dataPath:"",keyword:"timeout",message:`Transforming ${t.id} timed out.`,schemaPath:""}]}async _validate(e){const t=this.validator.validateData(e);if(t)throw t;this.plugins[e.id]=await this._transform("compose",e)}}class g{constructor(e){this._changed=new a.Signal(this),this._isDisposed=!1,this.id=e.plugin.id,this.registry=e.registry,this.registry.pluginChanged.connect(this._onPluginChanged,this)}get changed(){return this._changed}get composite(){return this.plugin.data.composite}get isDisposed(){return this._isDisposed}get plugin(){return this.registry.plugins[this.id]}get schema(){return this.plugin.schema}get raw(){return this.plugin.raw}get user(){return this.plugin.data.user}get version(){return this.plugin.version}annotatedDefaults(){return f.annotatedDefaults(this.schema,this.id)}default(e){return f.reifyDefault(this.schema,e)}dispose(){this._isDisposed||(this._isDisposed=!0,a.Signal.clearData(this))}get(e){const{composite:t,user:i}=this;return{composite:void 0!==t[e]?l(t[e]):void 0,user:void 0!==i[e]?l(i[e]):void 0}}remove(e){return this.registry.remove(this.plugin.id,e)}save(e){return this.registry.upload(this.plugin.id,e)}set(e,t){return this.registry.set(this.plugin.id,e,t)}validate(e){const{id:t,schema:i}=this.plugin,s=this.registry.validator,n=this.version;return s.validateData({data:{composite:{},user:{}},id:t,raw:e,schema:i,version:n},!1)}_onPluginChanged(e,t){t===this.plugin.id&&this._changed.emit(void 0)}}var f;!function(e){function t(e,t,s=!1,r=!0){if(!e)return t&&r?n.JSONExt.deepCopy(t):[];if(!t)return n.JSONExt.deepCopy(e);const a=n.JSONExt.deepCopy(e);return t.forEach((e=>{const t=a.findIndex((t=>t.id===e.id));t>=0?a[t]=Object.assign(Object.assign(Object.assign({},a[t]),e),{items:i(a[t].items,e.items,s,r)}):r&&a.push(e)})),a}function i(e,i,s=!1,r=!0){if(!e)return i?n.JSONExt.deepCopy(i):void 0;if(!i)return n.JSONExt.deepCopy(e);const a=n.JSONExt.deepCopy(e);return i.forEach((e=>{var i;switch(null!==(i=e.type)&&void 0!==i?i:"command"){case"separator":r&&a.push(Object.assign({},e));break;case"submenu":if(e.submenu){const i=a.findIndex((t=>{var i,s;return"submenu"===t.type&&(null===(i=t.submenu)||void 0===i?void 0:i.id)===(null===(s=e.submenu)||void 0===s?void 0:s.id)}));i<0?r&&a.push(n.JSONExt.deepCopy(e)):a[i]=Object.assign(Object.assign(Object.assign({},a[i]),e),{submenu:t(a[i].submenu?[a[i].submenu]:null,[e.submenu],s,r)[0]})}break;case"command":if(e.command){const t=a.findIndex((t=>{var i,s;return t.command===e.command&&t.selector===e.selector&&n.JSONExt.deepEqual(null!==(i=t.args)&&void 0!==i?i:{},null!==(s=e.args)&&void 0!==s?s:{})}));t<0?r&&a.push(Object.assign({},e)):(s&&console.warn(`Menu entry for command '${e.command}' is duplicated.`),a[t]=Object.assign(Object.assign({},a[t]),e))}}})),a}e.reconcileMenus=t,e.reconcileItems=i,e.filterDisabledItems=function e(t){return t.reduce(((t,i)=>{var s;const n=Object.assign({},i);if(!n.disabled){if("submenu"===n.type){const{submenu:t}=n;t&&!t.disabled&&(n.submenu=Object.assign(Object.assign({},t),{items:e(null!==(s=t.items)&&void 0!==s?s:[])}))}t.push(n)}return t}),[])},e.reconcileShortcuts=function(e,t){const i={};return t=t.filter((e=>{const t=s.CommandRegistry.normalizeKeys(e).join(h);if(!t)return console.warn("Skipping this shortcut because there are no actionable keys on this platform",e),!1;t in i||(i[t]={});const{selector:n}=e;return n in i[t]?(console.warn("Skipping this shortcut because it collides with another shortcut.",e),!1):(i[t][n]=!1,!0)})),e=[...e.filter((e=>!!e.disabled)),...e.filter((e=>!e.disabled))].filter((e=>{const t=s.CommandRegistry.normalizeKeys(e).join(h);if(!t)return!1;t in i||(i[t]={});const{disabled:n,selector:r}=e;return r in i[t]?(i[t][r]&&console.warn("Skipping this default shortcut because it collides with another default shortcut.",e),!1):(i[t][r]=!n,!0)})),t.concat(e).filter((e=>!e.disabled))}}(m||(m={})),function(e){const t="    ",i="[missing schema description]",s="[missing schema title]";function r(e){return e.reduce(((t,i,s)=>{const n=i.split("\n");return t+i+(0===n[n.length-1].trim().indexOf("//")||s===e.length-1?"":",")+(s===e.length-1?"":"\n\n")}),"")}function a(e,t="    // "){return t+e.split("\n").join(`\n${t}`)}function o(e,t){var i;if(!("default"in(e=(t?null===(i=e.properties)||void 0===i?void 0:i[t]:e)||{}))||"object"!==e.type)return e.default;const s=n.JSONExt.deepCopy(e.default),r=e.properties||{};for(const e in r)s[e]=o(r[e]);return s}e.annotatedDefaults=function(e,n){const{description:c,properties:u,title:d}=e,l=u?Object.keys(u).sort(((e,t)=>e.localeCompare(t))):[],h=Math.max((c||i).length,n.length);return["{",a(`${d||s}`),a(n),a(c||i),a("*".repeat(h)),"",r(l.map((s=>function(e,s){const n=e.properties&&e.properties[s]||{},r=n.type,c=n.description||i,u=n.title||"",d=o(e,s),l=t.length,h=void 0!==d?a(`"${s}": ${JSON.stringify(d,null,l)}`,t):a(`"${s}": ${r}`);return[a(u),a(c),h].filter((e=>e.length)).join("\n")}(e,s)))),"}"].join("\n")},e.annotatedPlugin=function(e,n){const{description:o,title:c}=e.schema,u=Object.keys(n).sort(((e,t)=>e.localeCompare(t))),d=Math.max((o||i).length,e.id.length);return["{",a(`${c||s}`),a(e.id),a(o||i),a("*".repeat(d)),"",r(u.map((r=>function(e,n,r){const o=e.properties&&e.properties[n],c=o&&o.description||i,u=o&&o.title||s,d=t.length,l=a(`"${n}": ${JSON.stringify(r,null,d)}`,t);return[a(u),a(c),l].join("\n")}(e.schema,r,n[r])))),"}"].join("\n")},e.reifyDefault=o}(f||(f={}));const y=new n.Token("@jupyterlab/coreutils:ISettingRegistry")}}]);
//# sourceMappingURL=153.151c91cf968226669c5f.js.map