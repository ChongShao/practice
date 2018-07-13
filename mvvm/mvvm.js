function MVVM(options) {
  this.$options = options || {};
  let data = this._data = options.data;

  Object.keys(data).forEach((key) => {
    this._proxy(key);
  })

  observer(data);

  this.$compile = new Compile(options.el || document.body, this);
}

MVVM.prototype = {
  _proxy: function(key) {
    Object.defineProperty(this, key, {
      configurable: false,
      enumerable: true,
      get() {
        return this._data[key];
      },
      set(newVal) {
        this._data[key] = newVal;
      }
    });
  }
}