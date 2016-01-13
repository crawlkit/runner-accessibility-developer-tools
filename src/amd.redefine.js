(function redfineAmd(root) {
  if (typeof root.define !== 'undefined' && typeof root.define.tampered !== 'undefined') {
    /* eslint-disable no-param-reassign */
    root.define.amd = root.define.tampered;
    delete root.define.tampered;
    /* eslint-enable no-param-reassign */
  }
})(this);
