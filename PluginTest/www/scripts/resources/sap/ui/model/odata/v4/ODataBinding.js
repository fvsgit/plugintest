/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./lib/_Helper","./lib/_SyncPromise"],function(_,a){"use strict";function O(){}O.prototype.fetchCache=function(c){var C,o,t=this;if(this.oOperation){return;}if(!this.bRelative){c=undefined;}if(this.oCachePromise.isFulfilled()){o=this.oCachePromise.getResult();if(o){o.setActive(false);}}C=this.fetchQueryOptionsForOwnCache(c).then(function(q){var v;if(q&&!(c&&c.getIndex&&c.getIndex()===-2)){v=a.resolve(c&&(c.fetchCanonicalPath?c.fetchCanonicalPath():c.getPath()));return v.then(function(s){var b,m,e;if(!C||t.oCachePromise===C){m=jQuery.extend(true,{},t.oModel.mUriParameters,q);if(s){t.mCacheByContext=t.mCacheByContext||{};b=t.mCacheByContext[s];if(b){b.setActive(true);}else{b=t.doCreateCache(_.buildPath(s,t.sPath).slice(1),m,c);t.mCacheByContext[s]=b;b.$canonicalPath=s;}}else{b=t.doCreateCache(t.sPath.slice(1),m,c);}return b;}else{e=new Error("Cache discarded as a new cache has been created");e.canceled=true;throw e;}});}});C["catch"](function(e){t.oModel.reportError("Failed to create cache for binding "+t,"sap.ui.model.odata.v4.ODataBinding",e);});this.oCachePromise=C;};O.prototype.fetchQueryOptionsForOwnCache=function(c){var h,q,t=this;if(this.oOperation){return a.resolve(undefined);}if(this.bRelative&&!c){return a.resolve(undefined);}q=this.doFetchQueryOptions(c);if(this.oModel.bAutoExpandSelect&&this.aChildCanUseCachePromises){q=a.all([q,Promise.resolve().then(function(){return a.all(t.aChildCanUseCachePromises);})]).then(function(r){t.aChildCanUseCachePromises=[];t.updateAggregatedQueryOptions(r[0]);return t.mAggregatedQueryOptions;});}if(!t.bRelative||c&&!c.fetchValue){return q;}if(this.oModel.bAutoExpandSelect){h=t.mParameters&&Object.keys(t.mParameters).some(function(k){return k[0]!=="$"||k[1]=="$";});if(h){return q;}return c.getBinding().fetchIfChildCanUseCache(c,t.sPath,q).then(function(C){return C?undefined:q;});}if(this.mParameters&&Object.keys(this.mParameters).length){return q;}return q.then(function(Q){return Object.keys(Q).length===0?undefined:Q;});};O.prototype.getGroupId=function(){return this.sGroupId||(this.bRelative&&this.oContext&&this.oContext.getGroupId&&this.oContext.getGroupId())||this.oModel.getGroupId();};O.prototype.getUpdateGroupId=function(){return this.sUpdateGroupId||(this.bRelative&&this.oContext&&this.oContext.getUpdateGroupId&&this.oContext.getUpdateGroupId())||this.oModel.getUpdateGroupId();};O.prototype.hasPendingChanges=function(){return this.hasPendingChangesForPath("")||this.hasPendingChangesInDependents();};O.prototype.hasPendingChangesForPath=function(p){var c;if(!this.oCachePromise.isFulfilled()){return false;}c=this.oCachePromise.getResult();if(c){return c.hasPendingChangesForPath(p);}if(this.oContext&&this.oContext.hasPendingChangesForPath){return this.oContext.hasPendingChangesForPath(_.buildPath(this.sPath,p));}return false;};O.prototype.hasPendingChangesInDependents=function(){return this.oModel.getDependentBindings(this).some(function(d){var c,h;if(d.oCachePromise.isFulfilled()){c=d.oCachePromise.getResult();if(c&&c.hasPendingChangesForPath("")){return true;}}if(d.mCacheByContext){h=Object.keys(d.mCacheByContext).some(function(p){return d.mCacheByContext[p].hasPendingChangesForPath("");});if(h){return true;}}return d.hasPendingChangesInDependents();});};O.prototype.isInitial=function(){throw new Error("Unsupported operation: isInitial");};O.prototype.isRefreshable=function(){return!this.bRelative||this.oContext&&!this.oContext.getBinding;};O.prototype.refresh=function(g){if(!this.isRefreshable()){throw new Error("Refresh on this binding is not supported");}if(this.hasPendingChanges()){throw new Error("Cannot refresh due to pending changes");}this.oModel.checkGroupId(g);this.refreshInternal(g,true);};O.prototype.resetChanges=function(){this.resetChangesForPath("");this.resetChangesInDependents();this.resetInvalidDataState();};O.prototype.resetChangesForPath=function(p){var c;if(!this.oCachePromise.isFulfilled()){return;}c=this.oCachePromise.getResult();if(c){c.resetChangesForPath(p);}else if(this.oContext&&this.oContext.resetChangesForPath){this.oContext.resetChangesForPath(_.buildPath(this.sPath,p));}};O.prototype.resetChangesInDependents=function(){this.oModel.getDependentBindings(this).forEach(function(d){var c;if(d.oCachePromise.isFulfilled()){c=d.oCachePromise.getResult();if(c){c.resetChangesForPath("");}d.resetInvalidDataState();}if(d.mCacheByContext){Object.keys(d.mCacheByContext).forEach(function(p){d.mCacheByContext[p].resetChangesForPath("");});}d.resetChangesInDependents();});};O.prototype.resetInvalidDataState=function(){};O.prototype.resume=function(){throw new Error("Unsupported operation: resume");};O.prototype.suspend=function(){throw new Error("Unsupported operation: suspend");};return function(p){jQuery.extend(p,O.prototype);};},false);