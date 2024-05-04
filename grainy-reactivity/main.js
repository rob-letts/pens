/*
  Unpicking Ryan Carniato's "Building a Reactive Library from Scratch" -
  https://dev.to/ryansolid/building-a-reactive-library-from-scratch-1i0p
*/
const context = [];

function createSignal(value) {
  const subscriptions = new Set();

  function get() {
    const running = context.at(-1);

    if (running) {
      subscriptions.add(running);
      running.dependencies.add(subscriptions);
    }

    return value;
  }

  function set(nextValue) {
    value = nextValue;

    [...subscriptions].forEach((item) => {
      item.execute();
    });
  }

  return [get, set];
}

function createEffect(effect) {
  const execute = () => {
    running.dependencies.forEach((item) => {
      item.delete(running);
    });
    running.dependencies.clear();

    context.push(running);

    try {
      effect();
    } finally {
      context.pop();
    }
  };

  const running = {
    execute,
    dependencies: new Set()
  };

  execute();
}

function createMemo(effect) {
  const [signal, setSignal] = createSignal();
  createEffect(() => setSignal(effect()));
  return signal;
}

function appendValue(value) {
  const elem = document.createElement("p");
  elem.innerText = value;
  document.body.appendChild(elem);
}

function main() {
  const [note, setNote] = createSignal("party");

  const memo = createMemo(() => {
    return `${note()} 🎉`;
  })

  createEffect(() => {
    appendValue(note());
  });

  createEffect(() => {
    appendValue(memo());
  });

  setNote("party hard");
}

main();