/**
 * Copyright (c) 2015 Joe Podwys
 * Copyright (c) 2014-2015 Alexandre Dieulot (For segments taken from InstantClick.js)
 */

(function (root, factory) {
  if (typeof exports === 'object') module.exports = factory();
  else if (typeof define === 'function' && define.amd) define(factory);
  else root.Prefetch = factory();
})(this, function () {
  var entryService = require('./entry-service');

  function Prefetch(){
    var self = this;

    function removeHash(url){
      var index = url.indexOf('#');
      return (index < 0) ? url : url.substr(0, index);
    }

    function getLinkTarget(target){
      while(target && target.nodeName != 'A'){
        target = target.parentNode;
      }
      return target;
    }

    function isBlacklisted(elem){
      do{
        if(!elem.hasAttribute){
          break;
        }
        if(elem.hasAttribute('data-no-prefetch')){
          return true;
        }
      } while(elem = elem.parentNode);
      return false;
    }

    function isSamePage(a){
      return a.href.indexOf('#') > -1 && removeHash(a.href) === removeHash(location.href);
    }

    function isExcluded(a){
      for(var i = 0; i < self.$exclusions.length; ++i){
        if(a.href.indexOf(self.$exclusions[i]) > -1){
          return true;
        }
      }
      return false;
    }

    function isPrefetchable(a){
      if(a.hasAttribute('download')
        || !a.href
        || isBlacklisted(a)
        || isSamePage(a)
        || isExcluded(a)){
        return false;
      }
      return true;
    }

    function createLinkTag(url){
      var link = document.createElement('link');
      link.setAttribute('rel', 'prefetch');
      link.setAttribute('href', url);
      return link;
    }

    function injectPrefetchLink(a){
      if(!a) return;
      var url = (typeof a === 'object') ? a.href : a;
      // var link = (url) ? createLinkTag(url) : null;
      // if(link){
      //   document.getElementsByTagName('head')[0].appendChild(link);
      // }
      // if(typeof a === 'object'){
      //   a.setAttribute('data-no-prefetch', '');
      // }
      if(url && ~url.indexOf('entry')){
        var index = url.substring(url.indexOf('/entry/') + 7);
        entryService.getEntryById(index).end(function(){});
      }
      else if(url && ~url.indexOf('/entries')){
        var query = {};
        if(~url.indexOf('?')){
          var search = url.substring(url.indexOf('?') + 1);
          if(search.length){
            var kvArray = search.split('&');
            for(var i = 0; i < kvArray.length; i++){
              var kvString = kvArray[i].split('=');
              query[kvString[0]] = kvString[1];
            }
          }
        }
        entryService.getAllEntries(query).end(function(){});
      }
    }

    function touchstart(e){
      self.$lastTouchTimestamp = new Date().getTime();
      var a = getLinkTarget(e.target);
      injectPrefetchLink(a);
    }

    function mousedown(e){
      if(self.$lastTouchTimestamp > (new Date().getTime() - 500)) return;
      var a = getLinkTarget(e.target);
      injectPrefetchLink(a);
    }

    function mouseover(e){
      if(self.$lastTouchTimestamp > (new Date().getTime() - 500)) return;
      var a = getLinkTarget(e.target);
      if(a && isPrefetchable(a)){
        a.addEventListener('mouseout', mouseout);
        if(!self.$delayBeforePrefetch){
          injectPrefetchLink(a);
        }
        else{
          self.$anchorToPrefetch = a;
          self.$prefetchTimer = setTimeout(self.prefetch, self.$delayBeforePrefetch);
        }
      }
    }

    function mouseout(){
      if(self.$prefetchTimer){
        clearTimeout(self.$prefetchTimer);
        self.$prefetchTimer = false;
      }
    }

    function attachListener(el, type){
      el.addEventListener(type, function (e){
        if(e.target.matches('a') || getLinkTarget(e.target)){
          switch(type){
            case 'touchstart': touchstart(e); break;
            case 'mousedown':  mousedown(e);  break;
            case 'mouseover':  mouseover(e);  break;
          }
        }
      });
    }

    self.init = function(config){
      config = config || {};
      self.$prefetchOnMousedown = config.waitForMousedown || false;
      self.$enableTouch = config.enableTouch || false;
      self.$delayBeforePrefetch = config.hoverDelay || 50;
      self.$exclusions = config.exclusions || [];
      config.containers = config.containers || [];
      self.addContainers(config.containers);
      return self;
    }

    self.prefetch = function(a){
      a = a || self.$anchorToPrefetch;
      if(self.$prefetchTimer){
        clearTimeout(self.$prefetchTimer);
        self.$prefetchTimer = false;
      }
      if(Object.prototype.toString.call(a) === '[object Array]'){
        for(var i = 0; i < a.length; ++i){
          injectPrefetchLink(a[i]);
        }
      }
      else{
        injectPrefetchLink(a);
      }
    }

    self.addContainers = function(containers){
      for(var i = 0; i < containers.length; ++i){
        var el = document.querySelector(containers[i]);
        if(el){
          if(self.$enableTouch){
            attachListener(el, 'touchstart');
          }
          if(self.$prefetchOnMousedown){
            attachListener(el, 'mousedown');
          }
          else{
            attachListener(el, 'mouseover');
          }
        }
      }
    }

    self.addExclusions = function(exclusions){
      self.$exclusions = self.$exclusions.concat(exclusions);
    }
  }

  return new Prefetch().init();
});
