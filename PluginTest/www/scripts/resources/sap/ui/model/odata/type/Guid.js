/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/model/FormatException','sap/ui/model/odata/type/ODataType','sap/ui/model/ParseException','sap/ui/model/ValidateException'],function(q,F,O,P,V){"use strict";var r=/[-\s]/g,a=/^[A-F0-9]{8}-([A-F0-9]{4}-){3}[A-F0-9]{12}$/i;function g(){return sap.ui.getCore().getLibraryResourceBundle().getText("EnterGuid");}function s(t,c){var n=c&&c.nullable;t.oConstraints=undefined;if(n===false||n==="false"){t.oConstraints={nullable:false};}else if(n!==undefined&&n!==true&&n!=="true"){q.sap.log.warning("Illegal nullable: "+n,null,t.getName());}}var E=O.extend("sap.ui.model.odata.type.Guid",{constructor:function(f,c){O.apply(this,arguments);s(this,c);}});E.prototype.formatValue=function(v,t){if(v===undefined||v===null){return null;}switch(this.getPrimitiveType(t)){case"any":case"string":return v;default:throw new F("Don't know how to format "+this.getName()+" to "+t);}};E.prototype.getName=function(){return"sap.ui.model.odata.type.Guid";};E.prototype.parseValue=function(v,S){var R;if(v===""||v===null){return null;}if(this.getPrimitiveType(S)!=="string"){throw new P("Don't know how to parse "+this.getName()+" from "+S);}R=v.replace(r,'');if(R.length!==32){return v;}R=R.slice(0,8)+'-'+R.slice(8,12)+'-'+R.slice(12,16)+'-'+R.slice(16,20)+'-'+R.slice(20);return R.toUpperCase();};E.prototype.validateValue=function(v){if(v===null){if(this.oConstraints&&this.oConstraints.nullable===false){throw new V(g());}return;}if(typeof v!=="string"){throw new V("Illegal "+this.getName()+" value: "+v);}if(!a.test(v)){throw new V(g());}};return E;});
