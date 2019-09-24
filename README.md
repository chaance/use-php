# usePHP

A React hook so you can use PHP in your components. No, really. I don't know why.

For now, feel free to copy the code directly into your project and have a freaking ball with it. Maybe I'll make this not suck one day.

## Example usage

```js
import React, { useState } from 'react';
import usePHP from 'use-php';

// You'd probably want to use a webpack loader to parse PHP files,
// but for example's sake:
const testParsed = `
<?php
function lol() {
  return 'This is a very useful hook, probably!';
}
echo $reactHook['greeting'] . ' ' . lol();
`;

function Greeter() {
  const [name, setName] = useState('Friend');
  const [value, setValue] = useState('');

  // The variables will be available in your PHP as keys
  // on the $reactHook array 🤯
  const phpVars = {
    greeting: `Hello, ${name}.`,
  };
  const [phpData, phpError] = usePHP(testParsed, phpVars);

  return (
    <section>
      <h2>Greeter Form</h2>
      {phpData && <p>{phpData}</p>}
      {phpError && <p style={{ color: 'crimson' }}>Error: {phpError}</p>}
      <form
        onSubmit={e => {
          e.preventDefault();
          setName(value);
          setValue('');
        }}
      >
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button>Introduce Yourself</button>
      </form>
    </section>
  );
}
```
