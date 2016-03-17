#!/usr/bin/env node

'use strict';

const npm = require('npm');
const opener = require('opener');

const Configstore = require('configstore');
const conf = new Configstore('cached-npm-repo');

const pkg = process.argv[2];

function exitOnError(err) {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
};

if (!pkg) {
  exitOnError(new Error('usage "$ cached-npm-repo <pkg-name>"'));
}

if (pkg === '--delete') {
  conf.del(process.argv[3]);
  console.log(`"${process.argv[3]}" deleted from cache`);
}

npm.load({}, function(err) {
  if (err) {
    exitOnError(err);
  }

  const url = conf.get(pkg);
  url ? open(url) : fetchUrl(pkg);

  function fetchUrl(pkg) {
    const proxyquire = require('proxyquire');

    const repo = proxyquire('npm/lib/repo', {
      opener: function(url) {
        open(url);
        conf.set(pkg, url);
      }
    });

    repo([pkg], exitOnError);
  };

  function open(url) {
    opener(url, { command: npm.config.get('browser') }, exitOnError);
  }
});
