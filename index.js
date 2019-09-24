import { useState, useEffect, useRef } from 'react';
import uniter from 'uniter';

const noop = function() {};

export function usePHP(php = '', expose = {}, onError = noop) {
  const phpRef = useRef(uniter.createEngine('PHP'));
  const [data, setData] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const { current: engine } = phpRef;
    if (!engine) {
      onError();
      return;
    }

    const stdout = engine.getStdout();
    const stderr = engine.getStderr();

    stdout.on('data', function(newData) {
      setData(newData);
    });
    stderr.on('data', function(err) {
      setError(err);
    });
    engine.expose(expose, 'reactHook');
    engine.execute(php).fail(onError);

    return function() {
      stdout.removeAllListeners();
      stderr.removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expose, php, onError]);

  return [data, error, { data: setData, error: setError }];
}

export default usePHP;
