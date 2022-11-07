import * as browser from 'webextension-polyfill'

browser.runtime.onMessage.addListener(
    function (request, sender) {
        if (request.command === 'query') {
            return Promise.resolve(sendDetails());
        } else if (request.command === 'populateName') {
            return Promise.resolve(sendModelName());
        }
    })

async function sendDetails() {
    const response = {
        urls: [],
        children:[],
        profile: {},
        comments: {}
    }
    const modelBoxes = document.querySelectorAll('.model-box2 > img')
    if (modelBoxes.length > 0) {
        response.urls.push({
            name: 'model.jpg',
            url: modelBoxes[0].getAttribute('src')
        })
    }
    addThumbnailUrlsFromGalleryBox('.photo-gallery-box', 'pic', response.urls)
    addThumbnailUrlsFromGalleryBox('.video-gallery-box', 'movs', response.urls)

    addChildUrlsFromGalleryBox('.photo-gallery-box', 'pic', response.children)
    addChildUrlsFromGalleryBox('.video-gallery-box', 'movs', response.children)

    response.profile = getProfile()
    response.comments = getComments()

    return response
}

function sendModelName() {
    const navLinks = document.querySelectorAll('.pan-link')

    return {
        name: navLinks[0].textContent.split('>')[2]
    };
}

function addThumbnailUrlsFromGalleryBox(selector, name, array) {
    const selectorElem = document.querySelectorAll(selector)
    if (selectorElem.length <= 0) {
        return
    }

    const photoThumb = selectorElem[0].querySelectorAll('.photo-thumb')
    if (photoThumb.length <= 0) {
        return
    }

    const children = photoThumb[0].children
    for (let i = 0; i < children.length; i++) {
        const div = children[i]
        const img = div.querySelectorAll('ul > li > a > img')
        if (img.length > 0) {
            array.push({
                name: name + (i + 1) + '.jpg',
                url: img[0].getAttribute('src')
            })
        }
    }
}

function addChildUrlsFromGalleryBox(selector, name, array) {
    const selectorElem = document.querySelectorAll(selector)
    if (selectorElem.length <= 0) {
        return
    }

    const photoThumb = selectorElem[0].querySelectorAll('.photo-thumb')
    if (photoThumb.length <= 0) {
        return
    }

    const tabUrl = new URL(window.document.URL)
    const baseUrl = `${tabUrl.protocol}//${tabUrl.host}`

    const children = photoThumb[0].children
    for (let i = 0; i < children.length; i++) {
        const div = children[i]
        const anchor = div.querySelectorAll('ul > li > a')
        if (anchor.length > 0) {
            const url = new URL(anchor[0].getAttribute('href'), baseUrl)
            array.push(url.toString())
        }
    }
}

function getProfile() {
    const profileItems = document.querySelectorAll('.model-prof > div > ul > li')
    const profileMap = []
    profileItems.forEach(function (node) {
        const key = node.firstChild.textContent
        const value = node.lastChild.textContent
        profileMap[key] = value
    })

    const profile = {
        age: profileMap['年齢 /age：'],
        height: profileMap['身長 /height：'],
        bwh: profileMap['スリーサイズ /BWH：'],
        hobby: profileMap['趣味 /hobby：'],
        numberOfShots: profileMap['登場回数 /Number of shots：']
    }

    return profile
}

function getComments() {
    const commentUl = document.body.querySelector('.comment-box > div > ul')
    const comments = {
        jp: commentUl.querySelector('.text-jp').textContent.trim(),
        en: commentUl.querySelector('.text-en').textContent.trim()
    }

    return comments
}
