browser.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.command === 'download') {
      sendUrl(sendResponse)
    } else if (request.command === 'populate') {
      sendModelInfo(sendResponse)
    }
  })

function sendUrl (sendResponse) {
  const dlbuttons = document.querySelectorAll('.dl-button')
  if (dlbuttons.length <= 0) return

  const dlButton = dlbuttons[0]
  const url = dlButton.getAttribute('href')
  const response = {
    urls: [
      {
        name: url.substring(url.lastIndexOf('/') + 1),
        url: url
      }
    ]
  }
  sendResponse(response)
}

function sendModelInfo (sendResponse) {
  const navLinks = document.querySelectorAll('.pan-link > a')

  sendResponse({
    name: navLinks[2].textContent
  })
}
