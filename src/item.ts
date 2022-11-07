import * as browser from 'webextension-polyfill'

browser.runtime.onMessage.addListener(
    function (request, sender) {
        if (request.command === 'query') {
            return Promise.resolve(sendUrl());
        } else if (request.command === 'populateName') {
            return Promise.resolve(sendModelName());
        }
    });

function sendUrl() {
    const buttons = document.querySelectorAll('.dl-button');
    if (buttons.length <= 0) return;

    const dlButton = buttons[0];
    const url = dlButton.getAttribute('href');
    return {
        urls: [{
            name: url.substring(url.lastIndexOf('/') + 1),
            url: url
        }]
    };
}

function sendModelName() {
    const navLinks = document.querySelectorAll('.pan-link > a');

    return {
        name: navLinks[2].textContent
    };
}
