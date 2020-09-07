
!(function(t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : (t.Codegen = e());
})(this, function() {
  "use strict";
  var s = function(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    },
    n = function(t, e) {
      if ("function" != typeof e && null !== e)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof e
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      })),
        e &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(t, e)
            : (t.__proto__ = e));
    },
    o = function(t, e) {
      if (!t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !e || ("object" != typeof e && "function" != typeof e) ? t : e;
    },
    l = (function() {
      function t() {
        s(this, t);
      }
      return (
        (t.createElement = function(t) {
          var e = document.createElement("DIV");
          return (e.innerHTML = t), e.firstChild;
        }),
        (t.prepend = function(t, e) {
          t.firstChild ? t.insertBefore(e, t.firstChild) : t.append(e);
        }),
        (t.append = function(t, e) {
          t.appendChild(e);
        }),
        (t.after = function(t, e) {
          t.parentNode.insertBefore(e, t.nextSibling);
        }),
        (t.before = function(t, e) {
          t.parentNode.insertBefore(e, t);
        }),
        (t.remove = function(t) {
          t && t.parentNode && t.parentNode.removeChild(t);
        }),
        (t.offset = function(t) {
          var e = t.getBoundingClientRect();
          return {
            top: e.top,
            left: e.left
          };
        }),
        (t.outerHeight = function(t) {
          var e =
              1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            i = t.offsetHeight;
          if (e) {
            var n = getComputedStyle(t);
            return (i +=
              parseInt(n.marginTop, 10) + parseInt(n.marginBottom, 10));
          }
          return i;
        }),
        (t.outerWidth = function(t) {
          var e =
              1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            i = t.offsetWidth;
          if (e) {
            var n = getComputedStyle(t);
            return (i +=
              parseInt(n.marginLeft, 10) + parseInt(n.marginRight, 10));
          }
          return 0;
        }),
        (t.underscores = function(t) {
          return t
            .toLowerCase()
            .split(" ")
            .join("_");
        }),
        (t.scrollTo = function(t) {
          t.scrollIntoView({
            behavior: "smooth",
            block: "end"
          });
        }),
        (t.setDownloadCount = function(e, i) {
          e.pageToolbar.el
            .querySelectorAll(".codegen-download-btn")
            .forEach(function(t) {
              e.opts.showDownloadCounter &&
                t &&
                (t.querySelector("span").innerText = "Downloads (" + i + ")");
            });
        }),
        (t.setDownloadBtnsStatus = function(t, e, i) {}),
        t
      );
    })(),
    t = function t(e) {
      s(this, t),
        (this.page = e),
        (this.events = e.events),
        (this.doc = e.doc),
        (this.opts = e.opts);
      for (
        var i = arguments.length, n = Array(1 < i ? i - 1 : 0), o = 1;
        o < i;
        o++
      )
        n[o - 1] = arguments[o];
      this.init.apply(this, n);
    },
    a = (function(t) {
      function i() {
        return s(this, i), o(this, t.apply(this, arguments));
      }
      return (
        n(i, t),
        (i.prototype.init = function(t) {
          var e = this;
          (this.designBlock = t),
            (this.id = ++i.ID),
            (this.el = l.createElement(
              t.render({
                imagesDir: this.opts.designsImagesDir
              })
            )),
            this.el.setAttribute("data-block-type", l.underscores(t.blockType)),
            this.el.setAttribute("data-id", this.id),
            this.events.on(this.el, "mouseenter", function() {
              return e._mouseEnter();
            });
        }),
        (i.prototype._mouseEnter = function() {
          this.events.emit("block.mouseenter", this);
        }),
        i
      );
    })(t);
  a.ID = 0;
  var c = (function(t) {
    function e() {
      return s(this, e), o(this, t.apply(this, arguments));
    }
    return (
      n(e, t),
      (e.prototype.init = function(t, e) {
        var i = this;
        (this.el = document.createElement("IMG")),
          this.el.setAttribute("draggable", !0),
          (this.blockType = t),
          (this.template = e.template),
          (this.image = e.image),
          this.el.setAttribute(
            "src",
            "" + (this.opts.designsThumbsDir || "") + this.image
          ),
          this.events.on(this.el, "click", function() {
            return i.click();
          }),
          this.events.on(this.el, "dragstart", function(t) {
            return i.dragstart(t);
          });
      }),
      (e.prototype.click = function() {
        this.events.emit("designBlock.click", this);
      }),
      (e.prototype.dragstart = function(t) {
        (this.dragImage = this.doc.createElement("IMG")),
          (this.dragImage.src = this.el.src),
          this.dragImage.setAttribute("height", 50),
          (this.dragImage.style.position = "absolute"),
          l.append(this.page.body, this.dragImage),
          t.dataTransfer.setDragImage(this.dragImage, 0, 0),
          t.dataTransfer.setData("text/html", null),
          this.events.emit("designBlock.willDrag", this);
      }),
      (e.prototype.render = function(i) {
        return this.template.replace(/{{[a-zA-Z_]*}}/g, function(t) {
          var e = t.replace(/{|}/g, "").trim();
          return i[e];
        });
      }),
      e
    );
  })(t);
  (c.BLOCKS = {}),
    (c.HEADER = "Headers"),
    (c.FOOTER = "Footers"),
    (c.Register = function(t, e, i) {
      c.BLOCKS[t] || (c.BLOCKS[t] = []),
        c.BLOCKS[t].push({
          template: e,
          image: i
        });
    });
  var p = 1,
    r = 2,
    e = 100,
    i = 1024,
    h = 768,
    d = 375,
    f = (function(t) {
      function i() {
        return s(this, i), o(this, t.apply(this, arguments));
      }
      return (
        n(i, t),
        (i.prototype.init = function(t) {
          var e = this;
          if (((this.props = i._[t]), !this.props))
            throw new Error(
              "A button with the name " + t + " could not be found"
            );
          this._render(t),
            this.events.on(this.el, "click", function() {
              return e._click();
            }),
            this.events.listen("button.refresh", function() {
              return e._refresh();
            }),
            this.props.afterBuild && this.props.afterBuild.apply(this);
        }),
        (i.prototype._refresh = function() {
          this.props.refresh && this.props.refresh.apply(this);
        }),
        (i.prototype._render = function(t) {
          (this.el = this.doc.createElement("BUTTON")),
            (this.el.innerHTML = this.props.icon.template),
            this.el.classList.add(
              "codegen-btn",
              "codegen-" + t + "-btn",
              "fr-btn-type-" + this.props.icon.type
            ),
            this.el.setAttribute("title", this.props.title);
        }),
        (i.prototype._click = function() {
          this.props.callback.apply(this), this.events.emit("button.refresh");
        }),
        i
      );
    })(t);
  (f.Register = function(t, e) {
    f._ || (f._ = {}), (f._[t] = e);
  }),
    f.Register("layout", {
      title: "Layout",
      icon: {
        type: "svg",
        template:
          '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n                <path d="M0 0h24v24H0z" fill="none"/>\n                <path d="M2 21h19v-3H2v3zM20 8H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zM2 3v3h19V3H2z"/>\n              </svg>'
      },
      callback: function() {
        this.page.setView(p), this.page.designsPanel.show();
      },
      refresh: function() {
        this.el.classList.toggle("codegen-active", this.page.activeView === p);
      }
    }),
    f.Register("moveUp", {
      title: "Move Up",
      icon: {
        type: "svg",
        template:
          '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>\n            <path d="M0 0h24v24H0z" fill="none"/>\n          </svg>'
      },
      callback: function() {
        for (
          var t = this.page.activeBlock, e = t.el.previousSibling;
          e && (!e.classList || !e.classList.contains("fdb-block"));

        )
          e = e.previousSibling;
        (window.a = e),
          (window.b = t.el),
          e && l.before(e, t.el),
          this.page.activeView === r && l.scrollTo(t.el),
          this.page.blockToolbar.hide(),
          this.page.blockToolbar.refreshPosition();
      },
      refresh: function() {
        if (this.page.activeBlock) {
          this.el.classList.toggle(
            "codegen-hidden",
            0 <=
              [c.HEADER, c.FOOTER].indexOf(
                this.page.activeBlock.designBlock.blockType
              )
          );
          for (
            var t = this.page.activeBlock.el.previousSibling;
            t && (!t.classList || !t.classList.contains("fdb-block"));

          )
            t = t.previousSibling;
          t
            ? (this.el.classList.remove("codegen-disabled"),
              this.el.removeAttribute("disabled"))
            : (this.el.classList.add("codegen-disabled"),
              this.el.setAttribute("disabled", "disabled"));
        }
      }
    }),
    f.Register("remove", {
      title: "Remove",
      icon: {
        type: "svg",
        template:
          '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>\n              <path d="M0 0h24v24H0z" fill="none"/>\n          </svg>'
      },
      callback: function() {
        if (
          this.page.activeBlock &&
          confirm("Are you sure you want to remove this design block?")
        ) {
          var t = this.page.activeBlock;
          this.page.blockToolbar.hide(),
            l.remove(t.el),
            this.page.refreshBlocks();
        }
      },
      afterBuild: function() {
        this.el.classList.add("codegen-remove-btn");
      }
    }),
    f.Register("edit", {
      title: "Edit",
      icon: {
        type: "svg",
        template:
          '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>\n          <path d="M0 0h24v24H0z" fill="none"/>\n    </svg>'
      },
      callback: function() {
        this.page.setView(r),
          this.page.designsPanel.hide(),
          this.page.editor.enable();
      },
      refresh: function() {
        this.el.classList.toggle("codegen-active", this.page.activeView === r);
      }
    }),
    f.Register("download", {
      title: "Download",
      icon: {
        type: "html",
        template:
          '\n    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>\n        <path d="M0 0h24v24H0z" fill="none"/>\n    </svg>\n    <span>Download</span>'
      },
      callback: function() {
        pages.getHTML().then(
          function(t) {
            var e = new Blob([t], {
                type: "text/html"
              }),
              i = window.URL.createObjectURL(e),
              n = document.createElement("a");
            (n.href = i),
              (n.download = "froala_design_blocks_website.html"),
              n.click();
          },
          function(t) {
            var e = new Blob([t], {
                type: "text/html"
              }),
              i = window.URL.createObjectURL(e),
              n = document.createElement("a");
            (n.href = i),
              (n.download = "froala_design_blocks_website.html"),
              n.click();
            console.log(t);
          }
        );
      }
    }),
    f.Register("desktop", {
      title: "Desktop",
      icon: {
        type: "svg",
        template:
          '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n                <path d="M0 0h24v24H0z" fill="none"/>\n                <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H3V4h18v10z"/>\n              </svg>'
      },
      callback: function() {
        (this.page.screenSize = e),
          (this.page.iframe.style.width = null),
          this.page.el.classList.remove("codegen-view-small"),
          this.page.refreshIframeSize();
      },
      refresh: function() {
        this.el.classList.toggle("codegen-active", this.page.screenSize === e);
      },
      afterBuild: function() {
        this.page.screenSize = e;
      }
    }),
    f.Register("tablet_landscape", {
      title: "Tablet Landscape",
      icon: {
        type: "svg",
        template:
          '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n    <path d="M0 0h24v24H0z" fill="none"/>\n    <path d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 1.99-.9 1.99-2L23 6c0-1.1-.9-2-2-2zm-2 14H5V6h14v12z"/>\n              </svg>'
      },
      callback: function() {
        (this.page.screenSize = i),
          (this.page.iframe.style.width = i + "px"),
          this.page.el.classList.add("codegen-view-small"),
          this.page.refreshIframeSize();
      },
      refresh: function() {
        this.el.classList.toggle("codegen-active", this.page.screenSize === i);
      }
    }),
    f.Register("tablet_portrait", {
      title: "Tablet Portrait",
      icon: {
        type: "svg",
        template:
          '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n                  <path d="M18.5 0h-14C3.12 0 2 1.12 2 2.5v19C2 22.88 3.12 24 4.5 24h14c1.38 0 2.5-1.12 2.5-2.5v-19C21 1.12 19.88 0 18.5 0zm-7 23c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm7.5-4H4V3h15v16z"/>\n              </svg>'
      },
      callback: function() {
        (this.page.screenSize = h),
          (this.page.iframe.style.width = h + "px"),
          this.page.el.classList.add("codegen-view-small"),
          this.page.refreshIframeSize();
      },
      refresh: function() {
        this.el.classList.toggle("codegen-active", this.page.screenSize === h);
      }
    }),
    f.Register("phone", {
      title: "Phone",
      icon: {
        type: "svg",
        template:
          '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n                <path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z"/>\n                <path d="M0 0h24v24H0z" fill="none"/>\n              </svg>'
      },
      callback: function() {
        (this.page.screenSize = d),
          (this.page.iframe.style.width = d + "px"),
          this.page.el.classList.add("codegen-view-small"),
          this.page.refreshIframeSize();
      },
      refresh: function() {
        this.el.classList.toggle("codegen-active", this.page.screenSize === d);
      }
    });
  var u = (function(t) {
      function e() {
        return s(this, e), o(this, t.apply(this, arguments));
      }
      return (
        n(e, t),
        (e.prototype.init = function() {
          (this.el = this.doc.createElement("DIV")),
            this.el.classList.add("codegen-block-toolbar"),
            l.append(this.page.body, this.el),
            this._addButtons(),
            this._initEvents();
        }),
        (e.prototype._initEvents = function() {
          var e = this;
          this.events.listen("block.mouseenter", function(t) {
            return e.showForBlock(t);
          }),
            this.events.on(this.page.iframeDoc, "mouseleave", function() {
              return e._doLeave();
            }),
            this.events.on(this.el, "mouseenter", function() {
              return clearTimeout(e.leaveTimeout);
            }),
            this.events.on(this.el, "mouseleave", function() {
              return e._doLeave();
            }),
            this.events.on(this.page.iframeDoc, "scroll", function() {
              return e.refreshPosition();
            }),
            this.events.on(this.page.el, "scroll", function() {
              return e.refreshPosition();
            });
        }),
        (e.prototype._doLeave = function() {
          var t = this;
          this.leaveTimeout = setTimeout(function() {
            return t.hide();
          }, 50);
        }),
        (e.prototype._addButtons = function() {
          var i = this;
          this.opts.blockButtons.forEach(function(t) {
            var e = new f(i.page, t);
            l.append(i.el, e.el);
          });
        }),
        (e.prototype.refreshPosition = function() {
          this.isVisible() && this.showForBlock(this.page.activeBlock),
            this.events.emit("button.refresh");
        }),
        (e.prototype.showForBlock = function(t) {
          clearTimeout(this.leaveTimeout);
          var e = l.offset(t.el);
          this.page.activeBlock = t;
          var i = this.page.iframeBody.querySelector(".codegen-active");
          i && i.classList.remove("codegen-active"),
            t.el.classList.add("codegen-active"),
            this.show(e.left, e.top);
        }),
        (e.prototype.show = function(t, e) {
          this.el.classList.add("codegen-visible"),
            (this.el.style.left = t + l.offset(this.page.iframe).left + "px"),
            (this.el.style.top =
              Math.max(0, e) / (this.page.activeView === p ? 4 : 1) +
              l.offset(this.page.iframe).top +
              "px"),
            this.events.emit("button.refresh");
        }),
        (e.prototype.hide = function() {
          this.el.classList.remove("codegen-visible");
        }),
        (e.prototype.isVisible = function() {
          return this.el.classList.contains("codegen-visible");
        }),
        e
      );
    })(t),
    // g = "noB-13D-11zxH2J4B11xgfB1ufzwB-22yA2ytqB2C-7oiB5tD3G4ugi1mzA7==",
    // v =
    //   "FE2bnB-7A24yC-21uakG3B2kI1zzqsoE5A1G4J4C10B10A7hievkH1C10C3C3B2D4F3C3I-8bA-21fdxD-11A-9F3G2wukvvnhxI4I1tdzwE4djnogD5hiczjbG2A7C5uA2B-9eA-7C-7E3B3tijosD1A20A21srqB5nF-10ejj1lA11lE-13C-11D1cursdC3ihrD-8tpxB8A8qwA-9icD1B8ykohdh1hH3C6C7clA2C4G4haB11xsqqmB1E4I4EBCC1smqB-7D3hhmf1bpfzF-7B-22D6A2vvtB-7A26J-7C-21A-16kfplqkbA2C9B6OMG2F1D1I1C8uD-17e1dywnJ4B3xwsE-11uD4fnlwB5voA-9mE2H3C3A2C-13vF3G3A2frfrscA4B1EypC-22ptF6F1WmhlebfzooG3naC-21iE4D-11uD2aA-62rA3c1htA-9qC-7A2Pc1efwG4F4RA-65lB8bxA4bjwpI-7C-21mA3tnF2ioiC-21uE-13lioeG4eC10jnkldxiA3A5D9qA3C3C1pI-8j1A8==",
    m = (function() {
      for (
        var t = 0,
          e = document.domain,
          i = e.split("."),
          n = "_gd" + new Date().getTime();
        t < i.length - 1 && -1 == document.cookie.indexOf(n + "=" + n);

      )
        (e = i.slice(-1 - ++t).join(".")),
          (document.cookie = n + "=" + n + ";domain=" + e + ";");
      return (
        (document.cookie =
          n + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=" + e + ";"),
        (e || "").replace(/(^\.*)|(\.*$)/g, "")
      );
    })(),
    y = (function(t) {
      function e() {
        return s(this, e), o(this, t.apply(this, arguments));
      }
      return (
        n(e, t),
        (e.prototype.init = function() {
          var t = this,
            e = t.page.opts.key,
            i = t.page.pageToolbar,
            n = t._decrypt(
              t._foo(
                "ziRA1E3B9pA5B-11D-11xg1A3ZB5D1D4B-11ED2EG2pdeoC1clIH4wB-22yQD5uF4YE3E3A9=="
              )
            );
          i.ul = !0;
          var o = !1,
            s = 0;
          if (e) {
            var r = t._parse(e),
              a = r[2];
            (a ===
              t._decrypt(
                t._foo(t._decrypt("LGnD1KNZf1CPBYCAZB-8F3UDSLLSG1VFf1A3C2=="))
              ) ||
              0 <= a.indexOf(m, a.length - m.length)) &&
              (t._isExpired(r[1]) && 0 < (m || "").length
                ? ((o = !0),
                  (v =
                    "lB3bnD-13A4yD-8uakB4A3kE1zzqsoB8C2A5F6A4D4I4hievkE1A4G2I2B1A7A4D5C-11bB-8fdxA-21B-16B4A2wukvvnhxC5F1tdzwA12djnogH3hiczjbE3A3G3uI2B-21eB-16E-13E5G2tijosC2A4D4srqG3nD-17ejf1lH5lJ-7C-22A1cursdI2ihrE-13tpxB4E4qwB-16icA1B3ykohde1hF4A2B3clA4C7E6haA4xsqqmD2E6D5EBCA2smqD-13D5hhmj1bpfzB-11F-10D3I2vvtC-16E6F-11C-9A-8kfplqkbD1H4E3OMA2C1A1E1G4uH-8j1dywnE5G2xwsB-21uB6fnlwD3voB-16mE3F4B1B1A-7vC5B4E4frfrscC10C2EypA-8ptB16B1GA-13tltblA12idA-16tF4g1vC2fB-22qA3PewxvzB2ME-13xerD3G4TicfB-11lF4yickxD4ezvD2yJ-7tB-16wiB-9B2A4C2I-7A1A1A4gmsA1=="),
                  (s = r[0] || -1))
                : (t._updateDownloadCount(t), (i.ul = !1)));
          }
          //   if (!0 === i.ul) {
          //     var l = new Image();
          //     t._add(v),
          //       (l.src = o
          //         ? t._foo(t._decrypt(n)) + "e=" + s
          //         : t._foo(t._decrypt(n)) + "u");
          //   }
          //   navigator.connection &&
          //     navigator.connection.addEventListener("change", function() {
          //       t._testConnection(t);
          //     });
        }),
        // (e.prototype._updateDownloadCount = function(i) {
        //   var t = i._decrypt(i._foo(g)) + "get_count";
        //   i.makeRequest(t, "POST", function(t) {
        //     var e = t && JSON.parse(t);
        //     e.available_quantity <= 0 &&
        //       ((e.available_quantity = 0),
        //       window.open("https://www.froala.com/pages/pricing"));
        //     l.setDownloadCount(i.page, e.available_quantity);
        //   });
        // }),
        // (e.prototype._testConnection = function(t) {
        //   var e = t._decrypt(t._foo(g)) + "keep_alive";
        //   t.makeRequest(e, "GET");
        // }),
        // (e.prototype._remove = function() {
        //   var t = document.getElementsByClassName("codegen-connectin-error");
        //   if (t.length) {
        //     for (var e = 0; e < t.length; e++) t[e].remove();
        //     var i = !this.page.iframeBody.querySelector("[data-block-type]");
        //     l.setDownloadBtnsStatus(this.page, i, i);
        //   }
        // }),
        (e.prototype._add = function(t, e) {
          var i = this._decrypt(this._foo(t)),
            n = l.createElement(i);
          (e = e || ""),
            n &&
              (n.setAttribute("class", "codegen-license-error " + e),
              l.prepend(this.page.body, n),
              l.setDownloadBtnsStatus(this.page, 0, 0));
        }),
        (e.prototype._decrypt = function(t) {
          if (!t) return t;
          for (
            var e = "",
              i = this._foo("charCodeAt"),
              n = this._foo("fromCharCode"),
              o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".indexOf(
                t[0]
              ),
              s = 1;
            s < t.length - 2;
            s++
          ) {
            for (
              var r = this._sumDigits(++o), a = t[i](s), l = "";
              /[0-9-]/.test(t[s + 1]);

            )
              l += t[++s];
            (l = parseInt(l, 10) || 0),
              (a = this._fromRange(a, r, l)),
              (a ^= (o - 1) & 31),
              (e += String[n](a));
          }
          console.debug("CODE: ", t, "PARSED: ", e);
          return e;
        }),
        (e.prototype._isAllowedSubdomain = function(t) {
          for (
            var e = [this._decrypt("9qqG-7amjlwq==")], i = 0;
            i < e.length;
            i++
          )
            if (
              (String.prototype.endsWith ||
                (String.prototype.endsWith = function(t, e) {
                  return (
                    (void 0 === e || e > this.length) && (e = this.length),
                    this.substring(e - t.length, e) === t
                  );
                }),
              t.endsWith(e[i]))
            )
              return !0;
          return !1;
        }),
        (e.prototype._parse = function(t) {
          var e = (this._decrypt(t) || "").split("|");
          return 4 === e.length && "PagesV1" === e[0]
            ? [e[1], e[3], e[2]]
            : [null, null, ""];
        }),
        (e.prototype._isExpired = function(t) {
          return (
            null === t ||
            new Date(t) < new Date(this._decrypt("rA1E1F1C4B8C7B5E1E5C4=="))
          );
        }),
        (e.prototype._sumDigits = function(t) {
          for (var e = t.toString(), i = 0, n = 0; n < e.length; n++)
            i += parseInt(e.charAt(n), 10);
          return 10 < i ? (i % 9) + 1 : i;
        }),
        (e.prototype._fromRange = function(t, e, i) {
          for (var n = Math.abs(i); 0 < n--; ) t -= e;
          return i < 0 && (t += 123), t;
        }),
        (e.prototype._foo = function(t) {
          return t;
        }),
        (e._handleHtml = function(o, t, e) {
          //   var s = o.page,
          //     i = o._decrypt(o._foo(g)) + "get_count",
          //     r = o._decrypt(o._foo(g)) + "update_count";
          var s = o.page;
          l.setDownloadBtnsStatus(s, 0);

          s.editor.disable();
          var t =
            "<!DOCTYPE html>\n                <html>\n                <head>\n                " +
            s._getHeadHTML() +
            "\n                </head>\n                <body>\n                " +
            s._getBodyHTML() +
            "\n                </body>\n                </html>\n                ";
          s.editor.enable(),
            (n.available_quantity -= 1),
            e(t),
            l.setDownloadCount(s, n.available_quantity),
            l.setDownloadBtnsStatus(s, 1);
          var s = this,
            r = new XMLHttpRequest();
          r.open(e, t);
        }),
        e
      );
    })(t),
    config = {
      designsThumbsDir:
        "https://cdn.jsdelivr.net/gh/froala/design-blocks@master/screenshots/",
      designsImagesDir:
        "https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs/",
      designsDefaultBlocks: "Contents",
      designStylesheets: [
        "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
        "https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/css/froala_blocks.min.css",
        "https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i",
        "https://cdn.jsdelivr.net/npm/froala-editor/css/froala_editor.pkgd.min.css",
        "https://cdn.jsdelivr.net/npm/froala-editor/css/froala_style.min.css"
      ],
      designJavascripts: [
        "https://code.jquery.com/jquery-3.3.1.slim.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
        "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js",
        "https://cdn.jsdelivr.net/npm/froala-editor/js/froala_editor.pkgd.min.js",
        "https://use.fontawesome.com/releases/v5.5.0/js/all.js"
      ],
      appStyle:
        '\nbody, html {\n  margin: 0;\n  height: 100%;\n}\n\nbody.no-block {\n  flex-flow: column;\n  overflow-x: hidden;\n  display: flex;\n}\n\nbody {\n  background: #DEDEDE;\n}\n\n.codegen-no-block {\n  align-items: center;\n  justify-content: center;\n  font-size: 20px;\n  flex-direction: column;\n  cursor: pointer;\n  color: #444;\n  display: none;\n  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;\n  text-align: center;\n  background: #FFF;\n  transition: margin 0.25s linear 0.25s;\n}\n\n.codegen-no-block:hover {\n  background: #EFEFEF;\n}\n\n.codegen-no-block.codegen-visible {\n  display: flex;\n}\n\n.codegen-no-sections {\n  flex: 2;\n}\n\n.codegen-no-block p {\n  margin: 0;\n}\n\n.codegen-no-sections p + p {\n  font-size: 16px;\n  margin-top: 5px;\n}\n\n.fdb-block {\n  box-shadow: 0;\n  margin-bottom: 0;\n  transition: margin 0.25s linear 0.25s;\n}\n\n.codegen-active {\n  box-shadow: 0px 0px 20px rgba(0,0,0,0.14), 0 0px 6px rgba(0,0,0,0.16);\n  -moz-box-shadow: 0px 0px 20px rgba(0,0,0,0.14), 0 0px 6px rgba(0,0,0,0.16);\n  -webkit-box-shadow: 0px 0px 20px rgba(0,0,0,0.14), 0 0px 6px rgba(0,0,0,0.16);\n  z-index: 9999;\n}\n\nbody.codegen-add-view [data-block-type],\nbody.codegen-add-view .codegen-no-block {\n  margin-bottom: 20px;\n}\n\nbody.codegen-add-view [data-block-type] {\n  user-select: none;\n  position: relative;\n}\n\nbody.codegen-add-view section[data-block-type] {\n  cursor: move;\n}\n\nbody.codegen-add-view [data-block-type]:after {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  display: block;\n  z-index: 10000;\n  content: "";\n}\n\n.codegen-drop-placeholder {\n  height: 200px;\n  width: 100%;\n  border: solid 10px  #0098f7;\n  background: #FFF;\n  margin-bottom: 20px;\n}\n\n.codegen-dragging {\n  display: none;\n}\n\n.fr-popup {\n  z-index: 10000 !important;\n}\n',
      blockButtons: ["moveUp", "remove"],
      key: "",
      showDownloadCounter: !0,
      pageLeftButtons: [
        ["edit", "layout"],
        ["desktop", "tablet_landscape", "tablet_portrait", "phone"]
      ],
      pageCenterButtons: [
        '<div style="display: flex;"><span style="margin-top: 5px;">Powered by </span><a href="https://www.froala.com" style="display: inline-block; height: 20px; margin-left: 10px;" title="Froala" target="_blank"><svg style="height: 100%;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 822.8 225.8"><defs><style>.cls-1,.cls-2{fill:#0098f7;}.cls-2{stroke:#231f20;stroke-miterlimit:10;stroke-width:5px;}</style></defs><title>Froala Pages</title><path class="cls-1" d="M123.58,78.65A16.16,16.16,0,0,0,111.13,73H16.6C7.6,73,0,80.78,0,89.94V128.3a16.45,16.45,0,0,0,32.9,0V104.14h78.5A15.63,15.63,0,0,0,126.87,91.2,15.14,15.14,0,0,0,123.58,78.65Z" transform="translate(0 -61.94)"/><path class="cls-1" d="M103.54,170a16.05,16.05,0,0,0-11.44-4.85H15.79A15.81,15.81,0,0,0,0,180.93v88.69a16.88,16.88,0,0,0,5,11.92,16,16,0,0,0,11.35,4.7h.17a16.45,16.45,0,0,0,16.41-16.6v-73.4H92.2A15.61,15.61,0,0,0,107.89,181,15.1,15.1,0,0,0,103.54,170Z" transform="translate(0 -61.94)"/><path class="cls-2" d="M30.4,167.64" transform="translate(0 -61.94)"/><path class="cls-1" d="M233,144.17c-5.29-6.22-16-7.52-24.14-7.52-16.68,0-28.72,7.71-36.5,23.47v-5.67a16.15,16.15,0,1,0-32.3,0v115.5a16.15,16.15,0,1,0,32.3,0v-38.7c0-19.09,3.5-63.5,35.9-63.5a44.73,44.73,0,0,1,5.95.27h.12c12.79,1.2,20.06-2.73,21.6-11.69C236.76,151.48,235.78,147.39,233,144.17Z" transform="translate(0 -61.94)"/><path class="cls-1" d="M371.83,157c-13.93-13.11-32.9-20.33-53.43-20.33S279,143.86,265.12,157c-14.67,13.88-22.42,32.82-22.42,54.77,0,21.68,8,41.28,22.4,55.2,13.92,13.41,32.85,20.8,53.3,20.8s39.44-7.38,53.44-20.79c14.55-13.94,22.56-33.54,22.56-55.21S386.39,170.67,371.83,157Zm-9.73,54.77c0,25.84-18.38,44.6-43.7,44.6s-43.7-18.76-43.7-44.6c0-25.15,18.38-43.4,43.7-43.4S362.1,186.59,362.1,211.74Z" transform="translate(0 -61.94)"/><path class="cls-1" d="M552.7,138.14a16.17,16.17,0,0,0-16,16.3v1C526.41,143.85,509,136.64,490,136.64c-19.83,0-38.19,7.24-51.69,20.4C424,171,416.4,190,416.4,212c0,21.61,7.78,41.16,21.9,55,13.56,13.33,31.92,20.67,51.7,20.67,18.83,0,36.29-7.41,46.7-19.37v1.57a16.15,16.15,0,1,0,32.3,0V154.44A16.32,16.32,0,0,0,552.7,138.14Zm-16.3,73.6c0,30.44-22.81,44.3-44,44.3-24.57,0-43.1-19-43.1-44.3s18.13-43.4,43.1-43.4C513.73,168.34,536.4,183.55,536.4,211.74Z" transform="translate(0 -61.94)"/><path class="cls-1" d="M623.5,61.94a16.17,16.17,0,0,0-16,16.3v191.7a16.15,16.15,0,1,0,32.3,0V78.24A16.32,16.32,0,0,0,623.5,61.94Z" transform="translate(0 -61.94)"/><path class="cls-1" d="M806.5,138.14a16.17,16.17,0,0,0-16,16.3v1c-10.29-11.63-27.74-18.84-46.7-18.84-19.83,0-38.19,7.24-51.69,20.4-14.33,14-21.91,33-21.91,55,0,21.61,7.78,41.16,21.9,55,13.56,13.33,31.92,20.67,51.7,20.67,18.83,0,36.29-7.41,46.7-19.37v1.57a16.15,16.15,0,1,0,32.3,0V154.44A16.32,16.32,0,0,0,806.5,138.14Zm-16.3,73.6c0,30.44-22.81,44.3-44,44.3-24.57,0-43.1-19-43.1-44.3s18.13-43.4,43.1-43.4C767.53,168.34,790.2,183.55,790.2,211.74Z" transform="translate(0 -61.94)"/></svg></a></div>'
      ],
      pageRightButtons: [["download"]],
      editorOptions: {
        iconsTemplate: "font_awesome_5"
      }
    },
    k = (function(t) {
      function e() {
        return s(this, e), o(this, t.apply(this, arguments));
      }
      return (
        n(e, t),
        (e.prototype.render = function() {
          this._initFilters(), this._initPanel(), (this.loadedDesigns = {});
        }),
        (e.prototype._initFilters = function() {
          var i = this,
            n = document.createElement("DIV");
          n.classList.add("codegen-panel-filter"), l.append(this.head, n);
          var t = function(t) {
            if (Object.prototype.hasOwnProperty.call(c.BLOCKS, t)) {
              var e = i.doc.createElement("A");
              e.setAttribute("data-block-type", l.underscores(t)),
                (e.innerHTML = t),
                l.append(n, e),
                i.events.on(e, "click", function() {
                  return i.setActiveBlock(t);
                });
            }
          };
          for (var e in c.BLOCKS) t(e);
          this.filter = n;
        }),
        (e.prototype._initPanel = function() {
          var t = document.createElement("DIV");
          t.classList.add("codegen-panel-panel"),
            (this.panel = t),
            l.append(this.body, t);
        }),
        (e.prototype._refreshFilters = function(t) {
          var e = this.panel.querySelector(
            ".codegen-panel-blocks-wrapper.codegen-visible"
          );
          e &&
            (e.classList.remove("codegen-visible"),
            this.filter
              .querySelector("a.codegen-active")
              .classList.remove("codegen-active")),
            this.filter
              .querySelector('a[data-block-type="' + l.underscores(t) + '"]')
              .classList.add("codegen-active");
        }),
        (e.prototype._refreshDesigns = function(t) {
          var e = void 0;
          if (this.loadedDesigns[l.underscores(t)])
            e = this.panel.querySelector(
              'div.codegen-panel-blocks-wrapper[data-block-type="' +
                l.underscores(t) +
                '"]'
            );
          else {
            (e = document.createElement("DIV")).setAttribute(
              "data-block-type",
              l.underscores(t)
            ),
              e.classList.add("codegen-panel-blocks-wrapper"),
              l.append(this.panel, e);
            for (var i = 1; i <= c.BLOCKS[t].length; i++) {
              var n = new c(this, t, c.BLOCKS[t][i - 1]);
              l.append(e, n.el);
            }
            this.loadedDesigns[l.underscores(t)] = !0;
          }
          e.classList.add("codegen-visible");
        }),
        (e.prototype.setActiveBlock = function() {
          var t =
            0 < arguments.length && void 0 !== arguments[0]
              ? arguments[0]
              : "Sections";
          "Sections" === t && (t = this.opts.designsDefaultBlocks),
            this._refreshFilters(t),
            this._refreshDesigns(t);
        }),
        e
      );
    })(
      (function(t) {
        function e() {
          return s(this, e), o(this, t.apply(this, arguments));
        }
        return (
          n(e, t),
          (e.prototype.init = function(t, e) {
            (this.el = this.doc.createElement("DIV")),
              this.el.setAttribute("class", "codegen-panel"),
              this._addTitle(t),
              this._addContent(e),
              l.append(this.page.container, this.el),
              this.render();
          }),
          (e.prototype._addContent = function(t) {
            var e = this.doc.createElement("DIV");
            e.setAttribute("class", "codegen-panel-body"),
              t && (e.innerHTML = t),
              l.append(this.el, e),
              (this.body = e);
          }),
          (e.prototype._addTitle = function(t) {
            var e = this.doc.createElement("DIV");
            if ((e.setAttribute("class", "codegen-panel-head"), t)) {
              var i = this.doc.createElement("H2");
              (i.innerHTML = t), l.append(e, i);
            }
            l.append(this.el, e), (this.head = e);
          }),
          (e.prototype.show = function() {
            this.el.classList.add("codegen-visible");
          }),
          (e.prototype.hide = function() {
            this.el.classList.remove("codegen-visible");
          }),
          (e.prototype.isVisible = function() {
            return this.el.classList.contains("codegen-visible");
          }),
          e
        );
      })(t)
    ),
    w = (function(t) {
      function e() {
        return s(this, e), o(this, t.apply(this, arguments));
      }
      return (
        n(e, t),
        (e.prototype.init = function() {}),
        (e.prototype._preventTypingInLinks = function(e) {
          e.events.on(
            "keydown",
            function(t) {
              return !e.link.get() || (t.preventDefault(), !1);
            },
            !0
          );
        }),
        (e.prototype.enable = function() {
          var e = this;
          (this.FroalaEditor = this.page.iframeDoc.defaultView.FroalaEditor),
            this._defineLinkButtons();
          var i = this;
          this.page.iframeBody
            .querySelectorAll("[data-block-type]")
            .forEach(function(t) {
              t.querySelectorAll('[class*="col"]').forEach(function(t) {
                t.querySelector(".nav-link") ||
                  (e.froalaEditor = new e.FroalaEditor(
                    '[class*="col"]',
                    Object.assign(e.opts.editorOptions, {
                      toolbarInline: !0,
                      pluginsEnabled: [
                        "image",
                        "link",
                        "align",
                        "colors",
                        "emoticons",
                        "paragraphFormat"
                      ],
                      toolbarButtons: [
                        "bold",
                        "italic",
                        "textColor",
                        "backgroundColor",
                        "paragraphFormat",
                        "align",
                        "-",
                        "emoticons",
                        "insertLink",
                        "insertImage",
                        "undo",
                        "redo"
                      ],
                      zIndex: 1e4,
                      initOnClick: !0,
                      colorsHEXInput: !1,
                      keepFormatOnDelete: !0,
                      toolbarVisibleWithoutSelection: !0,
                      imageEditButtons: ["imageReplace"],
                      linkEditButtons: ["linkEdit", "linkButton", "linkRemove"],
                      events: {
                        initialized: function() {
                          i._preventTypingInLinks(this);
                        }
                      }
                    })
                  ));
              }),
                t
                  .querySelectorAll("header .nav-link, header nav a.btn")
                  .forEach(function(t) {
                    e.froalaEditor = new e.FroalaEditor(
                      "header .nav-link, header nav a.btn",
                      Object.assign(e.opts.editorOptions, {
                        linkEditButtons: [
                          "linkEdit",
                          "linkButton",
                          "linkAdd",
                          "linkDestroy"
                        ],
                        linkInsertButtons: [],
                        events: {
                          initialized: function() {
                            i._preventTypingInLinks(this);
                          }
                        }
                      })
                    );
                  }),
                t
                  .querySelectorAll("footer .nav-link, header nav a.btn")
                  .forEach(function(t) {
                    e.froalaEditor = new e.FroalaEditor(
                      "footer .nav-link, header nav a.btn",
                      Object.assign(e.opts.editorOptions, {
                        linkEditButtons: ["linkEdit", "linkAdd", "linkDestroy"],
                        linkInsertButtons: [],
                        events: {
                          initialized: function() {
                            i._preventTypingInLinks(this);
                          }
                        }
                      })
                    );
                  });
            });
        }),
        (e.prototype.disable = function() {
          var e = this;
          this.page.iframeBody
            .querySelectorAll("[data-block-type]")
            .forEach(function(t) {
              t.querySelectorAll('[class*="col"]').forEach(function(t) {
                e.froalaEditor &&
                  e.froalaEditor.forEach(function(t) {
                    t && !t.destrying && t.destroy();
                  });
              }),
                t
                  .querySelectorAll(
                    "footer .nav-link, header .nav-link, header nav a.btn"
                  )
                  .forEach(function(t) {
                    t.contentEditable = !1;
                  });
            });
        }),
        (e.prototype._defineLinkButtons = function() {
          var e = this;
          this.FroalaEditor.DefineIcon("linkDestroy", {
            NAME: "trash"
          }),
            this.FroalaEditor.RegisterCommand("linkDestroy", {
              type: "button",
              title: "Remove Link",
              callback: function() {
                var t = this.$oel;
                this.destroy(),
                  0 === t.parents(".nav-item").length
                    ? t.remove()
                    : t.parent().remove();
              },
              refresh: function(t) {
                0 === this.$oel.parent(".nav-item").length
                  ? t
                      .get(0)
                      .classList.toggle(
                        "fr-disabled",
                        0 === this.$oel.siblings(".nav-link").length
                      )
                  : t
                      .get(0)
                      .classList.toggle(
                        "fr-disabled",
                        0 ===
                          this.$oel.parents(".nav-item").siblings(".nav-item")
                            .length
                      ),
                  e.enable();
              }
            }),
            this.FroalaEditor.DefineIcon("linkAdd", {
              NAME: "plus"
            }),
            this.FroalaEditor.RegisterCommand("linkAdd", {
              type: "button",
              title: "Add Link",
              callback: function() {
                var t = this.$oel;
                0 === t.parents(".nav-item").length
                  ? t.after(
                      '<a class="nav-link" href="https://www.froala.com">Link</a>'
                    )
                  : t
                      .parent()
                      .after(
                        '<li class="nav-item"><a class="nav-link" href="https://www.froala.com">Link</a></li>'
                      );
              }
            }),
            this.FroalaEditor.DefineIcon("linkButton", {
              NAME: "star"
            }),
            this.FroalaEditor.RegisterCommand("linkButton", {
              type: "dropdown",
              title: "Choose Style",
              options: {
                link: "Link",
                button: "Button",
                outline: "Outline"
              },
              callback: function(t, e) {
                var i = this.link.get();
                "link" === e
                  ? (i.classList.add("nav-link"),
                    i.classList.remove(
                      "btn",
                      "btn-primary",
                      "btn-outline-primary"
                    ))
                  : "button" === e
                  ? (i.classList.remove("nav-link", "btn-outline-primary"),
                    i.classList.add("btn", "btn-primary"))
                  : "outline" === e &&
                    (i.classList.remove("nav-link", "btn-primary"),
                    i.classList.add("btn", "btn-outline-primary"));
              }
            });
        }),
        e
      );
    })(t),
    B = (function(t) {
      function e() {
        return s(this, e), o(this, t.apply(this, arguments));
      }
      return (
        n(e, t),
        (e.prototype.init = function(t) {
          var e = this;
          (this.name = t.name), (this.template = t.template);
          var i = this.doc.createElement("DIV");
          i.classList.add("codegen-no-block", "codegen-no-" + this.name.toLowerCase()),
            i.setAttribute("data-fp", "true"),
            (i.innerHTML = this.template),
            (this.el = i),
            this.events.on(i, "click", function() {
              return e.click();
            }),
            this.events.on(i, "mouseenter", function() {
              return e._mouseEnter();
            });
        }),
        (e.prototype.click = function() {
          this.events.emit("emptyBlock.click", this);
        }),
        (e.prototype._mouseEnter = function() {
          this.page.blockToolbar.hide();
        }),
        e
      );
    })(t);
  (B.HEADER = {
    name: "Headers",
    template: "<p>Header</p>"
  }),
    (B.FOOTER = {
      name: "Footers",
      template: "<p>Footer</p>"
    }),
    (B.SECTION = {
      name: "Sections",
      template: "<h1>Blank Website</h1><p>(click to add a design block)</p>"
    });
  var A = (function() {
      function t() {
        s(this, t), (this.domEvents = {}), (this.internalEvents = {});
      }
      return (
        (t.prototype._id = function(t) {
          return (
            this._ids || (this._ids = {}),
            this._ids[t] || (this._ids[t] = Object.keys(this._ids).length + 1),
            this._ids[t]
          );
        }),
        (t.prototype.on = function(i, t, n) {
          var o = this,
            s =
              3 < arguments.length && void 0 !== arguments[3]
                ? arguments[3]
                : {};
          t.split(" ").forEach(function(t) {
            var e = o._id(i);
            o.domEvents[e] || (o.domEvents[e] = {}),
              o.domEvents[e][t] || (o.domEvents[e][t] = []),
              o.domEvents[e][t].push({
                callback: n,
                options: s
              }),
              i.addEventListener(t, n, s);
          });
        }),
        (t.prototype.off = function(i, t) {
          var n = this;
          t.split(" ").forEach(function(e) {
            var t = n._id(i);
            n.domEvents[t] &&
              n.domEvents[t][e] &&
              n.domEvents[t][e].forEach(function(t) {
                i.removeEventListener(e, t.callback, t.options);
              });
          });
        }),
        (t.prototype.once = function(t, e, i) {
          var n =
            3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : {};
          (n.once = !0), this.on(t, e, i, n);
        }),
        (t.prototype.listen = function(t, e) {
          var i = this;
          t.split(" ").forEach(function(t) {
            i.internalEvents[t] || (i.internalEvents[t] = []),
              i.internalEvents[t].push(e);
          });
        }),
        (t.prototype.emit = function(t) {
          for (
            var e = arguments.length, i = Array(1 < e ? e - 1 : 0), n = 1;
            n < e;
            n++
          )
            i[n - 1] = arguments[n];
          this.internalEvents[t] &&
            this.internalEvents[t].forEach(function(t) {
              t.apply(void 0, i);
            });
        }),
        t
      );
    })(),
    E = (function(t) {
      function e() {
        return s(this, e), o(this, t.apply(this, arguments));
      }
      return (
        n(e, t),
        (e.prototype.init = function() {
          (this.el = this.doc.createElement("DIV")),
            this.el.classList.add("codegen-page-toolbar"),
            l.append(this.page.selector, this.el),
            this._addButtons(this.opts.pageLeftButtons, "codegen-lp-zone"),
            this._addButtons(this.opts.pageCenterButtons, "codegen-cp-zone"),
            this._addButtons(this.opts.pageRightButtons, "codegen-rp-zone"),
            this.events.emit("button.refresh");
        }),
        (e.prototype._addButtons = function(t, e) {
          var n = this,
            o = this.doc.createElement("DIV");
          o.classList.add("codegen-btn-zone"),
            e && o.setAttribute("id", e),
            t.forEach(function(t) {
              if (Array.isArray(t)) {
                var i = n.doc.createElement("DIV");
                i.classList.add("codegen-btn-group"),
                  t.forEach(function(t) {
                    var e = new f(n.page, t);
                    l.append(i, e.el);
                  }),
                  l.append(o, i);
              } else o.innerHTML += t;
            }),
            l.append(this.el, o);
        }),
        e
      );
    })(t),
    D = (function() {
      function i(t, e) {
        s(this, i),
          (this.opts = Object.assign({}, config, e)),
          (this.doc = document),
          (this.body = document.body),
          (this.container = this.doc.createElement("DIV")),
          this.container.classList.add("codegen-container"),
          (this.selector = this.doc.getElementById(t) || this.body),
          l.append(this.selector, this.container),
          (this.el = this.doc.createElement("DIV")),
          this.el.classList.add("codegen-element"),
          l.append(this.container, this.el),
          (this.events = new A()),
          (this.designsPanel = new k(this)),
          this.render();
      }
      return (
        (i.prototype.render = function() {
          this._initIframe(),
            this._initEmptyBlocks(),
            this._initPageToolbar(),
            this._initDropZone(),
            this._initBlockToolbar(),
            this._initEvents(),
            this._initEditor(),
            this.refreshBlocks(),
            this.setView(r);
        }),
        (i.prototype._initEditor = function() {
          this.editor = new w(this);
        }),
        (i.prototype._initBlockToolbar = function() {
          this.blockToolbar = new u(this);
        }),
        (i.prototype._initPageToolbar = function() {
          (this.activeView = r),
            (this.pageToolbar = new E(this)),
            this.selector === this.body ||
              this.selector.style.height ||
              (this.selector.style.height = "100%"),
            (this.container.style.height =
              "calc(100% - " +
              this.pageToolbar.el.getBoundingClientRect().height +
              "px)"),
            (this.data = new y(this));
        }),
        (i.prototype._buildStylesheets = function() {
          return this.opts.designStylesheets
            .map(function(t) {
              return '<link rel="stylesheet" href="' + t + '" />';
            })
            .join("");
        }),
        (i.prototype._buildJavascripts = function() {
          return this.opts.designJavascripts
            .map(function(t) {
              return '<script src="' + t + '"></script>';
            })
            .join("");
        }),
        (i.prototype._initIframe = function() {
          var t = document.createElement("IFRAME");
          (this.iframe = t).setAttribute("src", "about:blank"),
            t.setAttribute("id", "froala-pages"),
            l.append(this.el, t),
            (this.iframeDoc = t.contentWindow.document),
            this.iframeDoc.open(),
            this.iframeDoc.write("<!DOCTYPE html>"),
            this.iframeDoc.write(
              '<html>\n                            <head>\n                              <meta name="viewport" content="width=device-width, initial-scale=1">\n                              ' +
                this._buildStylesheets() +
                "\n\n                              <style data-fp>" +
                this.opts.appStyle +
                "</style>\n                            </head>\n                            <body>\n                              " +
                this._buildJavascripts() +
                "\n                            </body>\n                          </html>"
            ),
            this.iframeDoc.close(),
            (this.iframeBody = this.iframeDoc.body),
            (this.iframeHead = this.iframeDoc.head);
        }),
        (i.prototype._initEmptyBlocks = function() {
          (this.emptySection = new B(this, B.SECTION)),
            l.append(this.iframeBody, this.emptySection.el);
        }),
        (i.prototype.refreshIframeSize = function() {
          this.iframe.style.height = this.iframeBody.scrollHeight + "px";
        }),
        (i.prototype.refreshBlocks = function() {
          var t = !this.iframeBody.querySelector("[data-block-type]");
          this.emptySection.el.classList.toggle("codegen-visible", t),
            this.iframeBody.classList.toggle("no-block", t),
            this.container.classList.toggle("codegen-no-block", t),
            this.refreshIframeSize();
          var e = this.pageToolbar.ul ? this.pageToolbar.ul : t;
          l.setDownloadBtnsStatus(this, t, e);
        }),
        (i.prototype.setView = function(t) {
          var e = this;
          (this.activeView = t),
            this.body.classList.toggle("codegen-add-view", this.activeView === p),
            this.body.classList.toggle("codegen-full-view", this.activeView === r),
            this.iframeBody.classList.toggle(
              "codegen-add-view",
              this.activeView === p
            ),
            this.iframeBody.classList.toggle(
              "codegen-full-view",
              this.activeView === r
            ),
            this.designsPanel.setActiveBlock(),
            this.activeView === p
              ? this.designsPanel.show()
              : this.designsPanel.hide(),
            Array.from(
              this.iframeBody.querySelectorAll(
                "[data-block-type]:not(header):not(footer)"
              )
            ).forEach(function(t) {
              e.activeView === p
                ? t.setAttribute("draggable", "true")
                : t.removeAttribute("draggable");
            }),
            this.events.emit("button.refresh");
        }),
        (i.prototype._initEvents = function() {
          var e = this;
          this.events.listen("emptyBlock.click", function() {
            e.setView(p);
          }),
            this.events.listen("designBlock.click", function(t) {
              return e.insertBlock(t);
            }),
            this.events.listen("designBlock.willDrag", function(t) {
              (e.draggingDesignBlock = t),
                (e.dragImage = t.dragImage),
                e.dropPlaceholder && (e.dropPlaceholder.style.height = "");
            });
        }),
        (i.prototype._dragend = function() {
          this.dropPlaceholder &&
            (l.remove(this.dropPlaceholder),
            (this.dropPlaceholder.isVisible = !1)),
            this.body.classList.remove("codegen-dragging");
        }),
        (i.prototype._drop = function() {
          this.activeView === p &&
            (this.draggingBlock &&
              this.dropPlaceholder &&
              this.dropPlaceholder.isVisible &&
              (this.draggingBlock.classList.remove("codegen-dragging"),
              l.after(this.dropPlaceholder, this.draggingBlock),
              l.remove(this.dropPlaceholder),
              l.remove(this.dragImage)),
            this.draggingDesignBlock &&
              ((this.dropPlaceholder && this.dropPlaceholder.isVisible) ||
                this.container.classList.contains("codegen-no-block")) &&
              (this.insertBlock(this.draggingDesignBlock, this.dropPlaceholder),
              l.remove(this.dropPlaceholder),
              l.remove(this.dragImage)),
            (this.dropPlaceholder.isVisible = !1),
            (this.draggingDesignBlock = null),
            (this.draggingBlock = null)),
            this.body.classList.remove("codegen-dragging");
        }),
        (i.prototype._initDropZone = function() {
          var e = this;
          (this.dropZone = this.doc.createElement("DIV")),
            this.dropZone.classList.add("codegen-drop-zone"),
            (this.dropZone.innerHTML =
              '<p>Drag & Drop a Design Block</p>\n                                <p>(or click one)</p>\n                                <div id="codegen-drop-visual">\n                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200.26 68.42">\n                                    <path d="M6.19,9.4Q4.9,7.87,3.62,6.3L5.18,5Q6.44,6.6,7.72,8.11Z"/>\n                                    <path d="M139.15,68.42q-2,0-4,0l0-2q4.09.08,8.16,0l0,2Q141.29,68.42,139.15,68.42ZM128,68.13c-2.75-.15-5.52-.35-8.22-.61l.19-2c2.68.25,5.42.45,8.14.6Zm22.65,0-.11-2c2.7-.14,5.44-.33,8.15-.58l.18,2C156.12,67.78,153.36,68,150.63,68.12ZM166,66.79l-.24-2c2.69-.32,5.41-.7,8.09-1.11l.31,2C171.48,66.09,168.73,66.47,166,66.79Zm-53.43-.08c-2.73-.36-5.47-.78-8.15-1.25l.35-2c2.64.47,5.36.88,8.06,1.24Zm68.69-2.25-.37-2c2.66-.49,5.35-1,8-1.62l.43,2C186.68,63.41,184,64,181.28,64.46Zm-83.92-.4c-2.68-.58-5.38-1.24-8-1.94l.52-1.93c2.6.69,5.27,1.34,7.93,1.92Zm-15-3.94c-2.63-.82-5.26-1.71-7.81-2.65l.69-1.88c2.53.93,5.12,1.81,7.72,2.62ZM67.87,54.84c-2.54-1.06-5.07-2.19-7.53-3.37l.86-1.8C63.63,50.83,66.13,52,68.64,53Zm-14-6.62c-2.41-1.29-4.82-2.66-7.17-4.07l1-1.71c2.32,1.4,4.71,2.75,7.08,4ZM40.62,40.27c-2.28-1.52-4.55-3.12-6.74-4.75l1.19-1.6c2.17,1.62,4.41,3.19,6.66,4.69ZM28.19,31.08c-2.11-1.73-4.22-3.54-6.25-5.38l1.34-1.48c2,1.82,4.09,3.61,6.18,5.31ZM16.69,20.75c-1.94-1.91-3.86-3.91-5.73-5.93l1.47-1.35c1.84,2,3.74,4,5.66,5.86Z"/>\n                                    <path d="M196.38,61.16l-.49-1.94q1.94-.49,3.85-1l.52,1.93Q198.33,60.67,196.38,61.16Z"/>\n                                    <polygon points="1.39 9.88 0 0 9.24 3.73 1.39 9.88"/>\n                                  </svg>\n                                </div>\n                                '),
            l.append(this.container, this.dropZone),
            this.events.on(this.dropZone, "dragover dragenter", function(t) {
              t.preventDefault(), e.dropZone.classList.add("codegen-hover");
            }),
            this.events.on(this.dropZone, "dragleave dragend", function() {
              e.dropZone.classList.remove("codegen-hover");
            }),
            this.events.on(this.dropZone, "drop", function(t) {
              return e._drop(t);
            });
        }),
        (i.prototype._makeBlockDraggable = function(t) {
          var o = this,
            s = t.el,
            r = t.designBlock.blockType === c.HEADER,
            a = t.designBlock.blockType === c.FOOTER;
          this.dropPlaceholder ||
            ((this.dropPlaceholder = this.doc.createElement("DIV")),
            this.dropPlaceholder.classList.add("codegen-drop-placeholder"),
            this.events.on(this.iframeDoc, "drop", function(t) {
              return o._drop(t);
            }),
            this.events.on(this.doc, "drop", function(t) {
              return o._drop(t);
            }),
            this.events.on(this.iframeDoc, "dragend", function(t) {
              return o._drop(t);
            }),
            this.events.on(this.doc, "dragend", function(t) {
              return o._drop(t);
            }),
            this.events.on(this.iframeDoc, "dragenter dragover", function(t) {
              return t.preventDefault();
            }),
            this.events.on(this.doc, "dragenter dragover", function(t) {
              return t.preventDefault();
            })),
            r || a || s.setAttribute("draggable", "true"),
            this.events.on(s, "dragover dragenter", function(t) {
              if ((t.preventDefault(), o.activeView === p)) {
                var e = t.clientY,
                  i = l.offset(s).top,
                  n = l.outerHeight(s);
                r && i < e
                  ? l.after(s, o.dropPlaceholder)
                  : a && i < e
                  ? l.before(s, o.dropPlaceholder)
                  : i + n / 2 < e
                  ? l.after(s, o.dropPlaceholder)
                  : l.before(s, o.dropPlaceholder),
                  (o.dropPlaceholder.isVisible = !0),
                  o.refreshIframeSize();
              }
            }),
            this.events.on(s, "dragstart", function(t) {
              if (o.activeView === p) {
                if (r || a) return t.preventDefault(), t.stopPropagation(), !1;
                o.body.classList.add("codegen-dragging"),
                  (o.dragImage = o.doc.createElement("IMG")),
                  (o.dragImage.src =
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="),
                  (o.dragImage.style.position = "aboslute"),
                  l.append(o.body, o.dragImage),
                  t.dataTransfer.setDragImage(o.dragImage, 0, 0),
                  t.dataTransfer.setData("text/html", null),
                  setTimeout(function() {
                    l.after(s, o.dropPlaceholder),
                      (o.dropPlaceholder.style.height =
                        l.outerHeight(s, !0) + "px"),
                      (o.dropPlaceholder.isVisible = !0),
                      s.classList.add("codegen-dragging");
                  }),
                  (o.draggingBlock = s);
              }
              return !0;
            });
        }),
        (i.prototype.insertBlock = function(t, e) {
          var i = this,
            n = new a(this, t);
          if (
            (Array.from(n.el.querySelectorAll("img")).forEach(function(t) {
              i.events.once(t, "load", function() {
                return i.refreshIframeSize();
              }),
                l.scrollTo(n.el);
            }),
            t.blockType === c.HEADER)
          ) {
            var o = this.iframeBody.querySelector("header");
            o && l.remove(o), l.prepend(this.iframeBody, n.el);
          } else if (t.blockType === c.FOOTER) {
            var s = this.iframeBody.querySelector("footer");
            s && l.remove(s), l.append(this.iframeBody, n.el);
          } else if (e && e.isVisible) l.after(e, n.el);
          else {
            var r = this.iframeBody.querySelector("footer");
            r ? l.before(r, n.el) : l.append(this.iframeBody, n.el);
          }
          this.refreshBlocks(),
            this._makeBlockDraggable(n),
            this.events.on(n.el, "click", function(t) {
              return t.target && "A" === t.target.tagName
                ? (t.preventDefault(), !1)
                : !t.target ||
                    "A" !== t.target.tagName ||
                    (t.preventDefault(), !1);
            }),
            this.events.emit("block.inserted", n);
        }),
        (i.prototype.setBlockPlaceholder = function(t) {
          this._blockPlaceholder = t;
        }),
        (i.prototype._getHeadHTML = function() {
          return Array.from(
            this.iframeDoc.querySelectorAll("head > *:not([data-fp])")
          )
            .map(function(t) {
              return t.outerHTML;
            })
            .join("\n  ");
        }),
        (i.prototype._getBodyHTML = function() {
          return (
            Array.from(
              this.iframeDoc.querySelectorAll("body > [data-block-type]")
            )
              .map(function(t) {
                return t.outerHTML;
              })
              .join("\n") +
            "\n      " +
            Array.from(
              this.iframeDoc.querySelectorAll(
                "body > *:not([data-fp]):not([data-block-type])"
              )
            )
              .map(function(t) {
                return t.outerHTML;
              })
              .join("\n") +
            "\n    "
          );
        }),
        (i.prototype.getHTML = function() {
          var i = this;
          return new Promise(function(t, e) {
            y._handleHtml(i.data, t, e);
          });
        }),
        (i.prototype.getJSON = function() {}),
        (i.prototype.loadHTML = function() {}),
        (i.prototype.loadJSON = function() {}),
        i
      );
    })();
  return (
    (D.Events = A),
    (D.Helpers = l),
    (D.RegisterDesignBlock = c.Register),
    (D.Button = f),
    D
  );
});
