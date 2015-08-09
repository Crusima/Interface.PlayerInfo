(function(plugin) {
    'use strict';

    var Module = (function() {
        var _version   = '0.1.0';
        var _namespace = 'CTW2.Plugin.Interface.PlayerInfo';

        var _world     = null;

        function addInfoLink(e) {
            setTimeout(function() {
                addLinkToVillageInfo(e.detail.character_id);
                addLinkToPlayerInfo(e.detail.character_id);
            }, 100);
        }

        function addLinkToVillageInfo(playerId) {
            var header = document.querySelector('.tbl-border-light.village-details > thead > tr > th');

            if (!header || header.querySelector('.ctw2-player-link')) {
                return;
            }

            header.innerHTML = header.innerHTML + ' | ';

            var infoLink = document.createElement('a');

            infoLink.setAttribute('href', 'http://www.tw2-tools.com/' + _world + '/player/' + playerId + '/');
            infoLink.setAttribute('class', 'ctw2-player-link');
            infoLink.setAttribute('target', '_blank');
            infoLink.appendChild(document.createTextNode('Show player information'));

            header.appendChild(infoLink);
        }

        function addLinkToPlayerInfo(playerId) {
            var header = document.querySelector('.screen-character-info > div > div > .box-paper > .scroll-wrap > div > table > thead > tr > th');

            if (!header || header.querySelector('.ctw2-player-link')) {
                return;
            }

            header.innerHTML = header.innerHTML + ' | ';

            var infoLink = document.createElement('a');

            infoLink.setAttribute('href', 'http://www.tw2-tools.com/' + _world + '/player/' + playerId + '/');
            infoLink.setAttribute('class', 'ctw2-player-link');
            infoLink.setAttribute('target', '_blank');
            infoLink.appendChild(document.createTextNode('Show player information'));

            header.appendChild(infoLink);
        }

        // Thanks https://css-tricks.com/snippets/javascript/get-url-variables/
        function getQueryVariable(variable) {
               var query = window.location.search.substring(1);
               var vars  = query.split('&');

               for (var i=0;i<vars.length;i++) {
                   var pair = vars[i].split('=');

                   if(pair[0] == variable) return pair[1];
               }

               return false;
        }

        function VillageInfo() {
            _world = getQueryVariable('world');
        }

        VillageInfo.prototype.getVersion = function() {
            return _version;
        };

        VillageInfo.prototype.getNamespace = function() {
            return _namespace;
        };

        VillageInfo.prototype.run = function() {
            document.addEventListener('ShowPlayerInfo', addInfoLink);
        };

        VillageInfo.prototype.stop = function() {
            document.removeEventListener('ShowPlayerInfo', addInfoLink);
        };

        return VillageInfo;
    }());

    var module = new Module();

    newPluginName = module.getNamespace();

    plugin.registerAndRun(module);
}(_mainPlugin));

