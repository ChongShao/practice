function Compile(el, vm) {
  this.$vm = vm;
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);

  if (this.$el) {
    const fragment = this.nodeToFragment(this.$el);
    
    this.compileElement(fragment, vm);
    this.$el.appendChild(fragment);
  }
}

Compile.prototype = {
  nodeToFragment(node) {
    const fragment = document.createDocumentFragment();
    let child;

    while (child = node.firstChild) {
      fragment.appendChild(child);
    }

    return fragment;
  },
  compileElement(el, vm) {
    const childNodes = el.childNodes;

    Array.from(childNodes).forEach((node) => {
      const text = node.textContent;
      const reg = /\{\{(.*)\}\}/;

      if (this.isTextNode(node) && reg.test(text)) {
        this.compileText(vm, node, text, RegExp.$1);
      }

      if (node.childNodes) {
        this.compileElement(node, vm);
      }
    });
  },
  compileText(vm, node, text, exp) {
    const syntaxArr = exp.split('.');
    let val = vm;

    syntaxArr.forEach((key) => {
      if (val[key]) {
        val = val[key];
      }
    });
    node.textContent = text.replace(/\{\{(.*)\}\}/, val);
  },
  isElementNode(node) {
    return node && node.nodeType === 1;
  },
  isTextNode(node) {
    return node && node.nodeType === 3;
  }
};
