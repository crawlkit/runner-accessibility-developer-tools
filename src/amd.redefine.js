(function redfineAmd(root) {
    if (typeof root.define !== 'undefined' && typeof root.define.tampered !== 'undefined') {
        root.define.amd = root.define.tampered;
        delete root.define.tampered;
    }
})(this);
