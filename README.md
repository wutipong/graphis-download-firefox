# Graphis Download Helper

![main](https://github.com/wutipong/graphis-download-firefox/workflows/main/badge.svg)

Graphis Download Helper is a tool that assist the Graphis webiste member to download media files quickly and easily orgnize the downloads. The member is still required to pay and to recieve a proper membership level in order to download the files. It does not help you to download files that you don't have access to.

## What is 'Graphis'

(Adult Contents Alert) [Graphis](http://graphis.ne.jp/) is a Japanese commercial website which provides nude gravure pictures and movie. Membership is free, however, monthly fee is required in order to view/download any media from the website. Alternatively, it also provides pay per view media as well.

## Why downloader

Graphis updates it website regulary, and only parts of the collection is uploaded at a time. Although it provide Zip files, they are on separated pages inside the model collection. Besides, managing multiple files from multiple model can be labor intensive. 

## What the downloader does.

First of all, the downloader only enabled insides the model page, and the item (viewer) page, of the Graphis website. Other than that it will stay disabled on the toolbar.

The downloader operates differently between those two pages.

* Model page will download the model heading image and any viewer page's thumbnail.
* The viewer page will download the zip file, or the HD movie file, depends on what kind of media you're viewing.

Last but not least, the Download subfolder can be specified in the tool. The files that are added from the tool will be keep inside the folder, which is inside the Dowload directory Firefox is setup to. This will make organizing downloaded files easier.

## What the downloader doesn't do.

* The downloader won't allow you to download media which you have no right/access to it.
* The downloader won't tell anyone the file that you have downloaded, nor telling anyone you've subscribe to Graphis's service.

## NPM Scripts
The Download Helper use several NPM scripts to do certain tasks. 

### Bundling the extension
use `npm run build` to bundle the extension. The output dir is `build`. You can load unzipped extension on Firefox using this path.

### Creating XPI file.
use `npm run release` to create the xpi file. The output dir is `out`.
