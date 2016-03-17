import test from 'ava';

import { spawn } from 'child_process';
import concat from 'concat-stream';

import Configstore from 'configstore';

test('press enter', async t => {
  const proc = spawn('node', ['cli', 'webpack'], { stdio: [null, null, null] });
  proc.stdin.setEncoding('utf-8');

  function getStream(stream) {
    return new Promise(resolve => {
      stream.pipe( concat(result => resolve( result.toString() )) );
    });
  };

  const err = await getStream(proc.stderr);

  if (err) {
    t.fail(err);
  }

  await getStream(proc.stdout);

  const conf = new Configstore('cached-npm-repo');
  t.ok(conf.get('webpack') === 'https://github.com/webpack/webpack');
});
