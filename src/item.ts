import * as browser from 'webextension-polyfill'

browser.runtime.onMessage.addListener(
    function (request, sender) {
        if (request.command === 'download') {
            return Promise.resolve(sendUrl());
        } else if (request.command === 'populate') {
            return Promise.resolve(sendModelInfo());
        }
    });

function sendUrl() {
    const buttons = document.querySelectorAll('.dl-button');
    if (buttons.length <= 0) return;

    const dlButton = buttons[0];
    const url = dlButton.getAttribute('href');
    const response = {
        urls: [
            {
                name: url.substring(url.lastIndexOf('/') + 1),
                url: url
            }
        ]
    }
    return response;
}

function sendModelInfo() {
    const navLinks = document.querySelectorAll('.pan-link > a');

    return {
        name: navLinks[2].textContent
    };
}
