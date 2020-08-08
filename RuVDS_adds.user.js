// ==UserScript==
// @name         testGit
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       Kerq
// @downloadURL  https://github.com/Mokerq/test/raw/master/RuVDS_adds.user.js
// @match        https://ru-admin.10x00.com/*
// @grant        none
// ==/UserScript==
const RuVDS_addons = function () { return this }
RuVDS_addons.Obj = RuVDS_addons.prototype = {
    show: function (params) {
        if (params.window == 'resourcesPricePanel') {
            let panel = document.querySelector('.pricePanel')
            if (!panel.classList.contains('active')) {
                setTimeout(() => panel.classList.add('active'), 0)
            }
            else setTimeout(() => panel.classList.remove('active'), 0)
        }
    },

    close: function () {
    },

    windows: {
        resourcesPricePanel: function () {
            let panelWrapper = document.createElement('div')
            panelWrapper.classList.add('wrapper', 'pricePanel')
            panelWrapper.innerHTML += `
            <table class="pricePanelTable">
            <tr>
                <th>Tariffs</th>
                <th>CPU</th>
                <th>RAM</th>
                <th>VRAM</th>
                <th>DriveHDD</th>
                <th>DriveSSD</th>
                <th>IP</th>
            </tr>
            <tr>
                <td>Regular</td>
                <td>79</td>
                <td>195</td>
                <td>1,953125</td>
                <td>5,5</td>
                <td>15</td>
                <td>100</td>
            </tr>
            <tr>
                <td>Premium</td>
                <td>198</td>
                <td>195</td>
                <td>1,953125</td>
                <td>5,5</td>
                <td>15</td>
                <td>100</td>
            </tr>
            </table>
            `
            return panelWrapper
        }
    },

    init: function () {
        const leftMenu = document.querySelector('.leftMenu').querySelector('div')
        const workspace = document.querySelectorAll('td')[1]
        let styles = `
        .leftMenu {
            position: relative;
        }

        .wrapper {
            width: 100vw;
            height: 200px;
            border-radius: 10px;
            border-left: 1px solid rgba(255, 255, 255, 0.25);
            box-shadow: 0px 7px 7px -5px;
            background: #bde4d5;
            position: absolute;
            // left: 0;
            // position: fixed;
            top: -210px;
            opacity: 1;
            transition: .75s;
        }

        .wrapper.active {
			top: 0px;
        }

        .active {
            opacity: 1;
        }


        .pricePanelTable {
            width: inherit;
            height: inherit;
            font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
            border-collapse: collapse;
            text-align: center;
        }

        .pricePanelTable th, .pricePanelTable td {
            box-shadow: inset 0 0 3px white;
            padding: 10px 20px;
        }

        .pricePanelTable th, .pricePanelTable td:first-child {
            background: #3ac1ef;
            color: white;
        }

        .pricePanelTable th:last-child {
            border-top-right-radius: 10px;
        }

        .pricePanelTable tr:last-child > th:first:child {
            border-bottom-left-radius: 10px
        }
        `
        let styleSheet = document.createElement("style")
        styleSheet.type = "text/css"
        styleSheet.innerText = styles
        document.head.appendChild(styleSheet)
        let link = document.createElement('a')
        link.onclick = () => RuVDS_addonsMgr.show({window: 'resourcesPricePanel'})
        link.innerText = 'Стоимость ресурсов'
        link.style.cursor = 'pointer'
        leftMenu.append(link)
        workspace.append(this.windows.resourcesPricePanel())
        console.log('Resources price panel initialization done successful');
    }
}
const RuVDS_addonsMgr = window.RuVDS_addonsMgr = new RuVDS_addons()
RuVDS_addonsMgr.init()