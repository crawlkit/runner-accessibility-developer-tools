(function undefineAmd(root) {
  if (typeof root.define !== 'undefined' && root.define.amd) {
    /* eslint-disable no-param-reassign */
    root.define.tampered = root.define.amd;
    root.define.amd = false;
    /* eslint-enable no-param-reassign */
  }
}(this));
