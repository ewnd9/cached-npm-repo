'use strict';

const hostedGitInfo = require('hosted-git-info');
const url = process.argv[2];
const info = hostedGitInfo.fromUrl(url);

console.log(info ? info.browse() : unknownHostedUrl(url));

// https://github.com/npm/npm/blob/8fa75cd0313e3cea8459f89b79208461e54b033b/lib/repo.js#L38-L51
function unknownHostedUrl (url) {
  const url_ = require('url');

  let idx = url.indexOf('@');
  if (idx !== -1) {
    url = url.slice(idx + 1).replace(/:([^\d]+)/, '/$1');
  }

  url = url_.parse(url);

  const protocol = url.protocol === 'https:' ? 'https:' : 'http:';
  return protocol + '//' + (url.host || '') + url.path.replace(/\.git$/, '');
}
