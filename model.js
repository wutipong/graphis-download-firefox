browser.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.command === 'download') {
      sendURL(sendResponse)
    } else if (request.command === 'populate') {
      sendModelInfo(sendResponse)
    }
  })

function sendURL (sendResponse) {
  const response = {
    urls: []
  }
  const modelBoxes = document.querySelectorAll('.model-box2 > img')
  if (modelBoxes.length > 0) {
    response.urls.push({
      name: 'model.jpg',
      url: modelBoxes[0].getAttribute('src')
    })
  }
  addUrlsFromGalleryBox('.photo-gallery-box', 'pic', response.urls)
  addUrlsFromGalleryBox('.video-gallery-box', 'movs', response.urls)
  response.profile = getProfile()
  response.comments = getComments()

  sendResponse(response)
}

function sendModelInfo (sendResponse) {
  const navLinks = document.querySelectorAll('.pan-link')

  sendResponse({
    name: navLinks[0].textContent.split('>')[2]
  })
}

function addUrlsFromGalleryBox (selector, name, array) {
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

function getProfile () {
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

function getComments () {
  const commentUl = document.body.querySelector('.comment-box > div > ul')
  const comments = {
    jp: commentUl.querySelector('.text-jp').textContent.trim(),
    en: commentUl.querySelector('.text-en').textContent.trim()
  }

  return comments
}
