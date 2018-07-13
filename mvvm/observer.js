function Observer(data) {
  for (let key in data) {
    let val = data[key];

    observer(val);

    Object.defineProperty(data, key, {
      enumerable: true,
      get() {
        return val;
      },
      set(newVal) {
        if (val === newVal) {
          return ;
        }
        val = newVal;
        observer(val);
      }
    });
  }
}

function observer(data) {
  if (!data || typeof data !== 'object') {
    return;
  }

  return new Observer(data);
}