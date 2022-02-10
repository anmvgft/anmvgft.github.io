/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t =
    window.ShadowRoot &&
    (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) &&
    'adoptedStyleSheets' in Document.prototype &&
    'replace' in CSSStyleSheet.prototype,
  e = Symbol(),
  s = new Map();
class i {
  constructor(t, s) {
    if (((this._$cssResult$ = !0), s !== e))
      throw Error(
        'CSSResult is not constructable. Use `unsafeCSS` or `css` instead.'
      );
    this.cssText = t;
  }
  get styleSheet() {
    let e = s.get(this.cssText);
    return (
      t &&
        void 0 === e &&
        (s.set(this.cssText, (e = new CSSStyleSheet())),
        e.replaceSync(this.cssText)),
      e
    );
  }
  toString() {
    return this.cssText;
  }
}
const n = (t, ...s) => {
    const n =
      1 === t.length
        ? t[0]
        : s.reduce(
            (e, s, i) =>
              e +
              (t => {
                if (!0 === t._$cssResult$) return t.cssText;
                if ('number' == typeof t) return t;
                throw Error(
                  "Value passed to 'css' function must be a 'css' function result: " +
                    t +
                    ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
                );
              })(s) +
              t[i + 1],
            t[0]
          );
    return new i(n, e);
  },
  r = t
    ? t => t
    : t =>
        t instanceof CSSStyleSheet
          ? (t => {
              let s = '';
              for (const e of t.cssRules) s += e.cssText;
              return (t => new i('string' == typeof t ? t : t + '', e))(s);
            })(t)
          : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var o;
const a = window.trustedTypes,
  l = a ? a.emptyScript : '',
  h = window.reactiveElementPolyfillSupport,
  c = {
    toAttribute(t, e) {
      switch (e) {
        case Boolean:
          t = t ? l : null;
          break;
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t);
      }
      return t;
    },
    fromAttribute(t, e) {
      let s = t;
      switch (e) {
        case Boolean:
          s = null !== t;
          break;
        case Number:
          s = null === t ? null : Number(t);
          break;
        case Object:
        case Array:
          try {
            s = JSON.parse(t);
          } catch (t) {
            s = null;
          }
      }
      return s;
    },
  },
  d = (t, e) => e !== t && (e == e || t == t),
  u = { attribute: !0, type: String, converter: c, reflect: !1, hasChanged: d };
class p extends HTMLElement {
  constructor() {
    super(),
      (this._$Et = new Map()),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$Ei = null),
      this.o();
  }
  static addInitializer(t) {
    var e;
    (null !== (e = this.l) && void 0 !== e) || (this.l = []), this.l.push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return (
      this.elementProperties.forEach((e, s) => {
        const i = this._$Eh(s, e);
        void 0 !== i && (this._$Eu.set(i, s), t.push(i));
      }),
      t
    );
  }
  static createProperty(t, e = u) {
    if (
      (e.state && (e.attribute = !1),
      this.finalize(),
      this.elementProperties.set(t, e),
      !e.noAccessor && !this.prototype.hasOwnProperty(t))
    ) {
      const s = 'symbol' == typeof t ? Symbol() : '__' + t,
        i = this.getPropertyDescriptor(t, s, e);
      void 0 !== i && Object.defineProperty(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    return {
      get() {
        return this[e];
      },
      set(i) {
        const n = this[t];
        (this[e] = i), this.requestUpdate(t, n, s);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || u;
  }
  static finalize() {
    if (this.hasOwnProperty('finalized')) return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (
      (t.finalize(),
      (this.elementProperties = new Map(t.elementProperties)),
      (this._$Eu = new Map()),
      this.hasOwnProperty('properties'))
    ) {
      const t = this.properties,
        e = [
          ...Object.getOwnPropertyNames(t),
          ...Object.getOwnPropertySymbols(t),
        ];
      for (const s of e) this.createProperty(s, t[s]);
    }
    return (this.elementStyles = this.finalizeStyles(this.styles)), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const t of s) e.unshift(r(t));
    } else void 0 !== t && e.push(r(t));
    return e;
  }
  static _$Eh(t, e) {
    const s = e.attribute;
    return !1 === s
      ? void 0
      : 'string' == typeof s
      ? s
      : 'string' == typeof t
      ? t.toLowerCase()
      : void 0;
  }
  o() {
    var t;
    (this._$Ep = new Promise(t => (this.enableUpdating = t))),
      (this._$AL = new Map()),
      this._$Em(),
      this.requestUpdate(),
      null === (t = this.constructor.l) ||
        void 0 === t ||
        t.forEach(t => t(this));
  }
  addController(t) {
    var e, s;
    (null !== (e = this._$Eg) && void 0 !== e ? e : (this._$Eg = [])).push(t),
      void 0 !== this.renderRoot &&
        this.isConnected &&
        (null === (s = t.hostConnected) || void 0 === s || s.call(t));
  }
  removeController(t) {
    var e;
    null === (e = this._$Eg) ||
      void 0 === e ||
      e.splice(this._$Eg.indexOf(t) >>> 0, 1);
  }
  _$Em() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Et.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var e;
    const s =
      null !== (e = this.shadowRoot) && void 0 !== e
        ? e
        : this.attachShadow(this.constructor.shadowRootOptions);
    return (
      ((e, s) => {
        t
          ? (e.adoptedStyleSheets = s.map(t =>
              t instanceof CSSStyleSheet ? t : t.styleSheet
            ))
          : s.forEach(t => {
              const s = document.createElement('style'),
                i = window.litNonce;
              void 0 !== i && s.setAttribute('nonce', i),
                (s.textContent = t.cssText),
                e.appendChild(s);
            });
      })(s, this.constructor.elementStyles),
      s
    );
  }
  connectedCallback() {
    var t;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(!0),
      null === (t = this._$Eg) ||
        void 0 === t ||
        t.forEach(t => {
          var e;
          return null === (e = t.hostConnected) || void 0 === e
            ? void 0
            : e.call(t);
        });
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    var t;
    null === (t = this._$Eg) ||
      void 0 === t ||
      t.forEach(t => {
        var e;
        return null === (e = t.hostDisconnected) || void 0 === e
          ? void 0
          : e.call(t);
      });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ES(t, e, s = u) {
    var i, n;
    const r = this.constructor._$Eh(t, s);
    if (void 0 !== r && !0 === s.reflect) {
      const o = (
        null !==
          (n =
            null === (i = s.converter) || void 0 === i
              ? void 0
              : i.toAttribute) && void 0 !== n
          ? n
          : c.toAttribute
      )(e, s.type);
      (this._$Ei = t),
        null == o ? this.removeAttribute(r) : this.setAttribute(r, o),
        (this._$Ei = null);
    }
  }
  _$AK(t, e) {
    var s, i, n;
    const r = this.constructor,
      o = r._$Eu.get(t);
    if (void 0 !== o && this._$Ei !== o) {
      const t = r.getPropertyOptions(o),
        a = t.converter,
        l =
          null !==
            (n =
              null !==
                (i =
                  null === (s = a) || void 0 === s
                    ? void 0
                    : s.fromAttribute) && void 0 !== i
                ? i
                : 'function' == typeof a
                ? a
                : null) && void 0 !== n
            ? n
            : c.fromAttribute;
      (this._$Ei = o), (this[o] = l(e, t.type)), (this._$Ei = null);
    }
  }
  requestUpdate(t, e, s) {
    let i = !0;
    void 0 !== t &&
      (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || d)(
        this[t],
        e
      )
        ? (this._$AL.has(t) || this._$AL.set(t, e),
          !0 === s.reflect &&
            this._$Ei !== t &&
            (void 0 === this._$E_ && (this._$E_ = new Map()),
            this._$E_.set(t, s)))
        : (i = !1)),
      !this.isUpdatePending && i && (this._$Ep = this._$EC());
  }
  async _$EC() {
    this.isUpdatePending = !0;
    try {
      await this._$Ep;
    } catch (t) {
      Promise.reject(t);
    }
    const t = this.scheduleUpdate();
    return null != t && (await t), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    this.hasUpdated,
      this._$Et &&
        (this._$Et.forEach((t, e) => (this[e] = t)), (this._$Et = void 0));
    let e = !1;
    const s = this._$AL;
    try {
      (e = this.shouldUpdate(s)),
        e
          ? (this.willUpdate(s),
            null === (t = this._$Eg) ||
              void 0 === t ||
              t.forEach(t => {
                var e;
                return null === (e = t.hostUpdate) || void 0 === e
                  ? void 0
                  : e.call(t);
              }),
            this.update(s))
          : this._$EU();
    } catch (t) {
      throw ((e = !1), this._$EU(), t);
    }
    e && this._$AE(s);
  }
  willUpdate(t) {}
  _$AE(t) {
    var e;
    null === (e = this._$Eg) ||
      void 0 === e ||
      e.forEach(t => {
        var e;
        return null === (e = t.hostUpdated) || void 0 === e
          ? void 0
          : e.call(t);
      }),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
      this.updated(t);
  }
  _$EU() {
    (this._$AL = new Map()), (this.isUpdatePending = !1);
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Ep;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    void 0 !== this._$E_ &&
      (this._$E_.forEach((t, e) => this._$ES(e, this[e], t)),
      (this._$E_ = void 0)),
      this._$EU();
  }
  updated(t) {}
  firstUpdated(t) {}
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var m;
(p.finalized = !0),
  (p.elementProperties = new Map()),
  (p.elementStyles = []),
  (p.shadowRootOptions = { mode: 'open' }),
  null == h || h({ ReactiveElement: p }),
  (null !== (o = globalThis.reactiveElementVersions) && void 0 !== o
    ? o
    : (globalThis.reactiveElementVersions = [])
  ).push('1.2.2');
const g = globalThis.trustedTypes,
  v = g ? g.createPolicy('lit-html', { createHTML: t => t }) : void 0,
  _ = `lit$${(Math.random() + '').slice(9)}$`,
  $ = '?' + _,
  A = `<${$}>`,
  y = document,
  f = (t = '') => y.createComment(t),
  S = t => null === t || ('object' != typeof t && 'function' != typeof t),
  b = Array.isArray,
  E = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  w = /-->/g,
  C = />/g,
  x =
    />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,
  T = /'/g,
  P = /"/g,
  I = /^(?:script|style|textarea|title)$/i,
  U = (
    t =>
    (e, ...s) => ({ _$litType$: t, strings: e, values: s })
  )(1),
  k = Symbol.for('lit-noChange'),
  O = Symbol.for('lit-nothing'),
  R = new WeakMap(),
  N = y.createTreeWalker(y, 129, null, !1),
  M = (t, e) => {
    const s = t.length - 1,
      i = [];
    let n,
      r = 2 === e ? '<svg>' : '',
      o = E;
    for (let e = 0; e < s; e++) {
      const s = t[e];
      let a,
        l,
        h = -1,
        c = 0;
      for (; c < s.length && ((o.lastIndex = c), (l = o.exec(s)), null !== l); )
        (c = o.lastIndex),
          o === E
            ? '!--' === l[1]
              ? (o = w)
              : void 0 !== l[1]
              ? (o = C)
              : void 0 !== l[2]
              ? (I.test(l[2]) && (n = RegExp('</' + l[2], 'g')), (o = x))
              : void 0 !== l[3] && (o = x)
            : o === x
            ? '>' === l[0]
              ? ((o = null != n ? n : E), (h = -1))
              : void 0 === l[1]
              ? (h = -2)
              : ((h = o.lastIndex - l[2].length),
                (a = l[1]),
                (o = void 0 === l[3] ? x : '"' === l[3] ? P : T))
            : o === P || o === T
            ? (o = x)
            : o === w || o === C
            ? (o = E)
            : ((o = x), (n = void 0));
      const d = o === x && t[e + 1].startsWith('/>') ? ' ' : '';
      r +=
        o === E
          ? s + A
          : h >= 0
          ? (i.push(a), s.slice(0, h) + '$lit$' + s.slice(h) + _ + d)
          : s + _ + (-2 === h ? (i.push(void 0), e) : d);
    }
    const a = r + (t[s] || '<?>') + (2 === e ? '</svg>' : '');
    if (!Array.isArray(t) || !t.hasOwnProperty('raw'))
      throw Error('invalid template strings array');
    return [void 0 !== v ? v.createHTML(a) : a, i];
  };
class H {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0,
      r = 0;
    const o = t.length - 1,
      a = this.parts,
      [l, h] = M(t, e);
    if (
      ((this.el = H.createElement(l, s)),
      (N.currentNode = this.el.content),
      2 === e)
    ) {
      const t = this.el.content,
        e = t.firstChild;
      e.remove(), t.append(...e.childNodes);
    }
    for (; null !== (i = N.nextNode()) && a.length < o; ) {
      if (1 === i.nodeType) {
        if (i.hasAttributes()) {
          const t = [];
          for (const e of i.getAttributeNames())
            if (e.endsWith('$lit$') || e.startsWith(_)) {
              const s = h[r++];
              if ((t.push(e), void 0 !== s)) {
                const t = i.getAttribute(s.toLowerCase() + '$lit$').split(_),
                  e = /([.?@])?(.*)/.exec(s);
                a.push({
                  type: 1,
                  index: n,
                  name: e[2],
                  strings: t,
                  ctor:
                    '.' === e[1] ? K : '?' === e[1] ? V : '@' === e[1] ? j : D,
                });
              } else a.push({ type: 6, index: n });
            }
          for (const e of t) i.removeAttribute(e);
        }
        if (I.test(i.tagName)) {
          const t = i.textContent.split(_),
            e = t.length - 1;
          if (e > 0) {
            i.textContent = g ? g.emptyScript : '';
            for (let s = 0; s < e; s++)
              i.append(t[s], f()),
                N.nextNode(),
                a.push({ type: 2, index: ++n });
            i.append(t[e], f());
          }
        }
      } else if (8 === i.nodeType)
        if (i.data === $) a.push({ type: 2, index: n });
        else {
          let t = -1;
          for (; -1 !== (t = i.data.indexOf(_, t + 1)); )
            a.push({ type: 7, index: n }), (t += _.length - 1);
        }
      n++;
    }
  }
  static createElement(t, e) {
    const s = y.createElement('template');
    return (s.innerHTML = t), s;
  }
}
function L(t, e, s = t, i) {
  var n, r, o, a;
  if (e === k) return e;
  let l =
    void 0 !== i
      ? null === (n = s._$Cl) || void 0 === n
        ? void 0
        : n[i]
      : s._$Cu;
  const h = S(e) ? void 0 : e._$litDirective$;
  return (
    (null == l ? void 0 : l.constructor) !== h &&
      (null === (r = null == l ? void 0 : l._$AO) ||
        void 0 === r ||
        r.call(l, !1),
      void 0 === h ? (l = void 0) : ((l = new h(t)), l._$AT(t, s, i)),
      void 0 !== i
        ? ((null !== (o = (a = s)._$Cl) && void 0 !== o ? o : (a._$Cl = []))[
            i
          ] = l)
        : (s._$Cu = l)),
    void 0 !== l && (e = L(t, l._$AS(t, e.values), l, i)),
    e
  );
}
class z {
  constructor(t, e) {
    (this.v = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = e);
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t) {
    var e;
    const {
        el: { content: s },
        parts: i,
      } = this._$AD,
      n = (
        null !== (e = null == t ? void 0 : t.creationScope) && void 0 !== e
          ? e
          : y
      ).importNode(s, !0);
    N.currentNode = n;
    let r = N.nextNode(),
      o = 0,
      a = 0,
      l = i[0];
    for (; void 0 !== l; ) {
      if (o === l.index) {
        let e;
        2 === l.type
          ? (e = new B(r, r.nextSibling, this, t))
          : 1 === l.type
          ? (e = new l.ctor(r, l.name, l.strings, this, t))
          : 6 === l.type && (e = new Y(r, this, t)),
          this.v.push(e),
          (l = i[++a]);
      }
      o !== (null == l ? void 0 : l.index) && ((r = N.nextNode()), o++);
    }
    return n;
  }
  m(t) {
    let e = 0;
    for (const s of this.v)
      void 0 !== s &&
        (void 0 !== s.strings
          ? (s._$AI(t, s, e), (e += s.strings.length - 2))
          : s._$AI(t[e])),
        e++;
  }
}
class B {
  constructor(t, e, s, i) {
    var n;
    (this.type = 2),
      (this._$AH = O),
      (this._$AN = void 0),
      (this._$AA = t),
      (this._$AB = e),
      (this._$AM = s),
      (this.options = i),
      (this._$Cg =
        null === (n = null == i ? void 0 : i.isConnected) || void 0 === n || n);
  }
  get _$AU() {
    var t, e;
    return null !==
      (e = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) &&
      void 0 !== e
      ? e
      : this._$Cg;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return void 0 !== e && 11 === t.nodeType && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    (t = L(this, t, e)),
      S(t)
        ? t === O || null == t || '' === t
          ? (this._$AH !== O && this._$AR(), (this._$AH = O))
          : t !== this._$AH && t !== k && this.$(t)
        : void 0 !== t._$litType$
        ? this.T(t)
        : void 0 !== t.nodeType
        ? this.S(t)
        : (t => {
            var e;
            return (
              b(t) ||
              'function' ==
                typeof (null === (e = t) || void 0 === e
                  ? void 0
                  : e[Symbol.iterator])
            );
          })(t)
        ? this.A(t)
        : this.$(t);
  }
  M(t, e = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, e);
  }
  S(t) {
    this._$AH !== t && (this._$AR(), (this._$AH = this.M(t)));
  }
  $(t) {
    this._$AH !== O && S(this._$AH)
      ? (this._$AA.nextSibling.data = t)
      : this.S(y.createTextNode(t)),
      (this._$AH = t);
  }
  T(t) {
    var e;
    const { values: s, _$litType$: i } = t,
      n =
        'number' == typeof i
          ? this._$AC(t)
          : (void 0 === i.el && (i.el = H.createElement(i.h, this.options)), i);
    if ((null === (e = this._$AH) || void 0 === e ? void 0 : e._$AD) === n)
      this._$AH.m(s);
    else {
      const t = new z(n, this),
        e = t.p(this.options);
      t.m(s), this.S(e), (this._$AH = t);
    }
  }
  _$AC(t) {
    let e = R.get(t.strings);
    return void 0 === e && R.set(t.strings, (e = new H(t))), e;
  }
  A(t) {
    b(this._$AH) || ((this._$AH = []), this._$AR());
    const e = this._$AH;
    let s,
      i = 0;
    for (const n of t)
      i === e.length
        ? e.push((s = new B(this.M(f()), this.M(f()), this, this.options)))
        : (s = e[i]),
        s._$AI(n),
        i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), (e.length = i));
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for (
      null === (s = this._$AP) || void 0 === s || s.call(this, !1, !0, e);
      t && t !== this._$AB;

    ) {
      const e = t.nextSibling;
      t.remove(), (t = e);
    }
  }
  setConnected(t) {
    var e;
    void 0 === this._$AM &&
      ((this._$Cg = t),
      null === (e = this._$AP) || void 0 === e || e.call(this, t));
  }
}
class D {
  constructor(t, e, s, i, n) {
    (this.type = 1),
      (this._$AH = O),
      (this._$AN = void 0),
      (this.element = t),
      (this.name = e),
      (this._$AM = i),
      (this.options = n),
      s.length > 2 || '' !== s[0] || '' !== s[1]
        ? ((this._$AH = Array(s.length - 1).fill(new String())),
          (this.strings = s))
        : (this._$AH = O);
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let r = !1;
    if (void 0 === n)
      (t = L(this, t, e, 0)),
        (r = !S(t) || (t !== this._$AH && t !== k)),
        r && (this._$AH = t);
    else {
      const i = t;
      let o, a;
      for (t = n[0], o = 0; o < n.length - 1; o++)
        (a = L(this, i[s + o], e, o)),
          a === k && (a = this._$AH[o]),
          r || (r = !S(a) || a !== this._$AH[o]),
          a === O ? (t = O) : t !== O && (t += (null != a ? a : '') + n[o + 1]),
          (this._$AH[o] = a);
    }
    r && !i && this.k(t);
  }
  k(t) {
    t === O
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, null != t ? t : '');
  }
}
class K extends D {
  constructor() {
    super(...arguments), (this.type = 3);
  }
  k(t) {
    this.element[this.name] = t === O ? void 0 : t;
  }
}
const G = g ? g.emptyScript : '';
class V extends D {
  constructor() {
    super(...arguments), (this.type = 4);
  }
  k(t) {
    t && t !== O
      ? this.element.setAttribute(this.name, G)
      : this.element.removeAttribute(this.name);
  }
}
class j extends D {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), (this.type = 5);
  }
  _$AI(t, e = this) {
    var s;
    if ((t = null !== (s = L(this, t, e, 0)) && void 0 !== s ? s : O) === k)
      return;
    const i = this._$AH,
      n =
        (t === O && i !== O) ||
        t.capture !== i.capture ||
        t.once !== i.once ||
        t.passive !== i.passive,
      r = t !== O && (i === O || n);
    n && this.element.removeEventListener(this.name, this, i),
      r && this.element.addEventListener(this.name, this, t),
      (this._$AH = t);
  }
  handleEvent(t) {
    var e, s;
    'function' == typeof this._$AH
      ? this._$AH.call(
          null !==
            (s =
              null === (e = this.options) || void 0 === e ? void 0 : e.host) &&
            void 0 !== s
            ? s
            : this.element,
          t
        )
      : this._$AH.handleEvent(t);
  }
}
class Y {
  constructor(t, e, s) {
    (this.element = t),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = e),
      (this.options = s);
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    L(this, t);
  }
}
const W = window.litHtmlPolyfillSupport;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Z, F;
null == W || W(H, B),
  (null !== (m = globalThis.litHtmlVersions) && void 0 !== m
    ? m
    : (globalThis.litHtmlVersions = [])
  ).push('2.1.3');
class J extends p {
  constructor() {
    super(...arguments),
      (this.renderOptions = { host: this }),
      (this._$Dt = void 0);
  }
  createRenderRoot() {
    var t, e;
    const s = super.createRenderRoot();
    return (
      (null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t) ||
        (e.renderBefore = s.firstChild),
      s
    );
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(t),
      (this._$Dt = ((t, e, s) => {
        var i, n;
        const r =
          null !== (i = null == s ? void 0 : s.renderBefore) && void 0 !== i
            ? i
            : e;
        let o = r._$litPart$;
        if (void 0 === o) {
          const t =
            null !== (n = null == s ? void 0 : s.renderBefore) && void 0 !== n
              ? n
              : null;
          r._$litPart$ = o = new B(
            e.insertBefore(f(), t),
            t,
            void 0,
            null != s ? s : {}
          );
        }
        return o._$AI(t), o;
      })(e, this.renderRoot, this.renderOptions));
  }
  connectedCallback() {
    var t;
    super.connectedCallback(),
      null === (t = this._$Dt) || void 0 === t || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(),
      null === (t = this._$Dt) || void 0 === t || t.setConnected(!1);
  }
  render() {
    return k;
  }
}
(J.finalized = !0),
  (J._$litElement$ = !0),
  null === (Z = globalThis.litElementHydrateSupport) ||
    void 0 === Z ||
    Z.call(globalThis, { LitElement: J });
const X = globalThis.litElementPolyfillSupport;
null == X || X({ LitElement: J }),
  (null !== (F = globalThis.litElementVersions) && void 0 !== F
    ? F
    : (globalThis.litElementVersions = [])
  ).push('3.1.2');
const q = t =>
    class extends t {
      fire(t, e) {
        this.dispatchEvent(
          new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 })
        );
      }
    },
  Q = {
    ISPLAYING: 'isPlaying',
    ROCK: 'rock',
    PAPER: 'paper',
    SCISSORS: 'scissors',
    LIZARD: 'lizard',
    SPOCK: 'spock',
    GAMETYPES: { CLASSIC: 'classic', SPOCK: 'spock' },
    AI_RESPONSE_TIMEOUT: 1e3,
    RESULT_SHOW_TIMEOUT: 500,
    SAVE_REFIX: 'RPS-',
  },
  tt = [
    { name: Q.ROCK, looseAgainst: [Q.PAPER, Q.SPOCK] },
    { name: Q.PAPER, looseAgainst: [Q.SCISSORS, Q.LIZARD] },
    { name: Q.SCISSORS, looseAgainst: [Q.ROCK, Q.SPOCK] },
    { name: Q.LIZARD, looseAgainst: [Q.ROCK, Q.SCISSORS] },
    { name: Q.SPOCK, looseAgainst: [Q.PAPER, Q.LIZARD] },
  ],
  et = {
    classic: [Q.ROCK, Q.PAPER, Q.SCISSORS],
    spock: [Q.ROCK, Q.PAPER, Q.SCISSORS, Q.LIZARD, Q.SPOCK],
  };
class st {
  static load(t) {
    return JSON.parse(window.localStorage.getItem(`${Q.SAVEPREFIX} ${t}`));
  }
  static save(t, e) {
    window.localStorage.setItem(`${Q.SAVEPREFIX} ${t}`, JSON.stringify(e));
  }
  static remove(t) {
    window.localStorage.removeItem(`${Q.SAVEPREFIX} ${t}`);
  }
}
const it = n`

        .button {
          background: #fbca1f;
          font-family: inherit;
          padding: 0.6em 1.3em;
          font-weight: 900;
          font-size: 18px;
          border: 3px solid black;
          border-radius: 0.4em;
          box-shadow: 0.1em 0.1em;
        }

        .button:hover,
        .button:active {
          cursor: pointer;
          transform: translate(-0.05em, -0.05em);
          box-shadow: 0.15em 0.15em;
        }

        .button:disabled,
        .button[disabled] {
          border: 1px solid #999999;
          background-color: #cccccc;
          color: #b9b7b7;
        }
        .button:disabled:hover,
        .button:disabled:active,
        .button[disabled]:hover,
        .button[disabled]:active {
          cursor: default;
          background-color: #cccccc;
        }
  }`;
class nt extends q(J) {
  static get properties() {
    return { userName: { type: String }, gameType: { type: String } };
  }
  static get styles() {
    return [
      it,
      n`.home{margin-top:10vh;height:100vh;display:flex;flex-direction:column;align-items:center}#home__userNameInput{width:33vw;padding:5px;font-size:16px;border-width:1px;margin-bottom:20px;border-color:#ccc;background-color:#fff;color:#000;border-style:solid;border-radius:0;box-shadow:0 0 5px rgba(66,66,66,.75);text-shadow:0 0 5px rgba(66,66,66,.75)}#home__userNameInput:focus{outline:0}.home__gameTypeSelect{margin-bottom:30px}`,
    ];
  }
  constructor() {
    super(), (this.userName = ''), (this.gameType = Q.GAMETYPES.CLASSIC);
  }
  connectedCallback() {
    super.connectedCallback();
    const t = st.load(Q.ISPLAYING);
    t &&
      ((this.userName = t.user), (this.gameType = t.gameType), this.setUser());
  }
  setUser() {
    this.fire('set-user-event', {
      name: this.userName,
      gameType: this.gameType,
      points: 0,
    });
  }
  selectGameType(t) {
    this.gameType = t.target.value;
  }
  inputUser(t) {
    (this.userName = t.target.value),
      '' === this.userName ||
        this.userName ||
        this.userName.match(/^[a-z0-9]*$/i) ||
        (this.userName = '');
  }
  render() {
    return U` <main class="home"> <h2>Ready player 1</h2> <input id="home__userNameInput" type="text" @input="${
      this.inputUser
    }" aria-label="User"> <select class="home__gameTypeSelect" aria-label="Game type" @change="${
      this.selectGameType
    }"> ${Object.keys(Q.GAMETYPES).map(
      t => U` <option value="${Q.GAMETYPES[t]}"> ${Q.GAMETYPES[t]} </option> `
    )} </select> <button class="button" id="home__enterBtn" @click="${
      this.setUser
    }" ?disabled="${'' === this.userName}"> Enter </button> </main>`;
  }
}
class rt {
  constructor(t) {
    (this.name = t), (this.score = this.searchUserScore(this.name));
  }
  searchUserScore() {
    let t = st.load(this.name);
    return t || (t = { name: this.name, score: 0 }), t.score;
  }
  saveUserScore() {
    const t = { name: this.name, score: this.score };
    st.save(this.name, t);
  }
  addPoint() {
    (this.score += 1), this.saveUserScore();
  }
}
class ot extends q(J) {
  static get properties() {
    return {
      user: { type: String },
      gameType: { type: String },
      AIThinking: { type: Boolean },
      lastAIMove: { type: String },
      AIchoice: { type: String },
      playerChoiceStr: { type: String },
    };
  }
  static get styles() {
    return [
      it,
      n`.game{margin-top:10vh;height:100vh;display:flex;flex-direction:column;align-items:center}.game__optionsList{margin-bottom:40px;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center}.game__playerInfo{margin-bottom:20px}.game__resultBox{font-size:1.7em;color:#f8cd51;margin-bottom:30px}#game__result{text-align:center}`,
    ];
  }
  unsetUser() {
    st.remove(Q.ISPLAYING), this.fire('set-user-event', null);
  }
  connectedCallback() {
    super.connectedCallback(),
      (this.player = new rt(this.user)),
      st.save(Q.ISPLAYING, { user: this.user, gameType: this.gameType }),
      (this.gameOptions = tt.filter(t => et[this.gameType].includes(t.name)));
  }
  constructor() {
    super(), (this.lastAIMove = '');
  }
  resetFields() {
    (this.result = ''), (this.playerChoiceStr = ''), (this.AIchoiceStr = '');
  }
  play(t) {
    this.resetFields(), (this.AIThinking = !0);
    const e = t.detail;
    (this.playerChoiceStr = `You: ${t.detail.name}`),
      class {
        static play(t, e) {
          return new Promise(s => {
            setTimeout(() => {
              const i = e.map(t => t.name).filter(e => e !== t);
              s(i[Math.floor(Math.random() * i.length)]);
            }, Q.AI_RESPONSE_TIMEOUT);
          });
        }
      }
        .play(this.lastAIMove, this.gameOptions)
        .then(s => {
          (this.AIchoice = s),
            (this.AIchoiceStr = ` | Bot : ${s}`),
            (this.lastAIMove = this.AIchoice);
          const i = !e.loosesAgainst(this.AIchoice);
          setTimeout(() => {
            (this.result = 'Result : '),
              this.AIchoice === t.detail.name
                ? (this.result += "It's a tie!")
                : i
                ? ((this.result += 'You won'), this.player.addPoint())
                : (this.result += 'AI won'),
              (this.AIThinking = !1);
          }, Q.RESULT_SHOW_TIMEOUT);
        });
  }
  renderResult() {
    return U` <article>${this.playerChoiceStr} ${this.AIchoiceStr}</article> <article id="game__result">${this.result}</article> `;
  }
  render() {
    return U` <main class="game"> <section class="game__playerInfo"> <h1>Player : ${
      this.player.name
    } | Score : ${
      this.player.score
    }</h1> </section> <section class="game__optionsList"> ${this.gameOptions.map(
      t =>
        U` <game-option @option-selected-event="${this.play}" name="${t.name}" .looseAgainst="${t.looseAgainst}" ?AIThinking="${this.AIThinking}"></game-option> `
    )} </section> <section class="game__resultBox">${this.renderResult()}</section> <button class="button game__exitBtn" @click="${
      this.unsetUser
    }"> Exit </button> </main> `;
  }
}
class at extends q(J) {
  static get properties() {
    return {
      name: { type: String },
      looseAgainst: { type: Array },
      AIThinking: { type: Boolean },
    };
  }
  static get styles() {
    return n`:host{margin-left:10px;margin-right:10px;border-radius:50%;height:100px;background-color:#004481}.option__btn{cursor:pointer;background-color:#1973b8;display:inline-block;width:100px;height:100px}.option__btn:active,.option__btn:hover{background-color:#fff}.option__btn--rock{mask:url(assets/rock.svg) no-repeat center/contain;-webkit-mask:url(assets/rock.svg) no-repeat center/contain}.option__btn--paper{mask:url(assets/paper.svg) no-repeat center/contain;-webkit-mask:url(assets/paper.svg) no-repeat center/contain}.option__btn--scissors{mask:url(assets/scissors.svg) no-repeat center/contain;-webkit-mask:url(assets/scissors.svg) no-repeat center/contain}.option__btn--lizard{mask:url(assets/lizard.svg) no-repeat center/contain;-webkit-mask:url(assets/lizard.svg) no-repeat center/contain}.option__btn--spock{mask:url(assets/spock.svg) no-repeat center/contain;-webkit-mask:url(assets/spock.svg) no-repeat center/contain}`;
  }
  selectOption() {
    this.AIThinking || this.fire('option-selected-event', this);
  }
  loosesAgainst(t) {
    return this.looseAgainst.includes(t);
  }
  render() {
    return U` <section class="option"> <article onclick="" @click="${this.selectOption}" @keydown="${this.selectOption}" class="option__btn option__btn--${this.name}"></article> </section> `;
  }
}
customElements.define(
  'rock-paper-scissors-app',
  class extends J {
    static get properties() {
      return { currentView: { type: String }, currentUser: { type: Object } };
    }
    setUser(t) {
      this.currentUser = t.detail;
    }
    render() {
      return U` ${
        this.currentUser
          ? U`<game-view gameType="${this.currentUser.gameType}" @set-user-event="${this.setUser}" user="${this.currentUser.name}"></game-view>`
          : U`<home-view @set-user-event="${this.setUser}"></home-view>`
      } `;
    }
  }
),
  customElements.define('home-view', nt),
  customElements.define('game-view', ot),
  customElements.define('game-option', at);
