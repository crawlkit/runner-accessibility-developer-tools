(function undefineAmd(root) {
    if (typeof root.define !== 'undefined' && root.define.amd) {
        root.define.tampered = root.define.amd;
        root.define.amd = false;
    }
})(this);
