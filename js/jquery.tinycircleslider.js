var menus = ["شارژ مستقیم", "کارت شارژ", "شارژ وایمکس ایرانسل", "پرداخت قبض", "گیفت کارت", "طرح ترافیک", "آنتی ویروس"];
var types = ["TopUp", "PIN", "WiMax", "Bill", "GiftCard", "TrafficCard", "Antivirus"];
(function(e) {
    if (typeof define === "function" && define.amd) {
        define(jQuery || ["jquery"], e)
    } else if (typeof exports === "object") {
        e(jQuery || require("jquery"))
    } else {
        e(jQuery)
    }
})(function(e) {
    function r(r, i) {
        function E() {
            if (s.options.dotsSnap) {
                C()
            }
            u.append(a.first().clone());
            u.css("width", d.width * (a.length + 1));
            S();
            s.move(0, s.options.interval);
            return s
        }

        function S() {
            var t = w ? "touchstart" : "mousedown";
            if (w) {
                r[0].ontouchstart = P;
                r[0].ontouchmove = M;
                r[0].ontouchend = D
            } else {
                f.bind(t, P)
            }
            if (s.options.dotsSnap) {
                r.delegate(".dot", t, function(t) {
                    t.preventDefault();
                    t.stopImmediatePropagation();
                    clearTimeout(g);
                    if (0 === b) {
                        s.move(e(this).text() - 1)
                    }
                    s.start();
                    return false
                })
            }
        }

        function x(e) {
            g = setTimeout(function() {
                s.move(a[s.slideCurrent + 1] !== undefined ? s.slideCurrent + 1 : 0, true)
            }, e ? 50 : s.options.intervalTime)
        }

        function T(e) {
            return e * (Math.PI / 180)
        }

        function N(e) {
            return e * 180 / Math.PI
        }

        function C() {
            var t = document.createDocumentFragment();
            l.remove();
            a = a.remove();
            a.each(function(n, r) {
                var i = l.clone(),
                    o = s.options.dots ? n * 360 / a.length : parseInt(e(r).attr("data-degrees"), 10),
                    u = {
                        top: -Math.cos(T(o)) * s.options.radius + p.height / 2 - m.height / 2,
                        left: Math.sin(T(o)) * s.options.radius + p.width / 2 - m.width / 2
                    };
                i.addClass(e(r).attr("data-classname"));
                i.css(u);
                h.push({
                    angle: o,
                    slide: r,
                    dot: i
                });
                t.appendChild(i[0])
            });
            h.sort(function(e, t) {
                return e.angle - t.angle
            });
            e.each(h, function(t, n) {
                e(n.dot).addClass("dot-" + (t + 1));
                e(n.dot).attr("data-tooltip", menus[t]);
                e(n.dot).attr("data-type", types[t]);
                e(n.dot).html("<span>" + (t + 1) + "</span>");
                u.append(n.slide)
            });
            r.append(t);
            l = r.find(".dot")
        }

        function k(e, t) {
            var n, r, i;
            if (e > t) {
                n = e - t;
                r = -(t + 360 - e)
            } else {
                n = e + 360 - t;
                r = -(t - e)
            }
            i = n < Math.abs(r) ? n : r;
            return [i, r, n]
        }

        function L(t) {
            var n = 9999,
                r = 9999,
                i = 9999,
                s = 0,
                o = 0,
                u = 0;
            e.each(h, function(e, a) {
                var f = k(a.angle, t);
                if (Math.abs(f[0]) < Math.abs(i)) {
                    i = f[0];
                    u = e
                }
                if (Math.abs(f[1]) < Math.abs(n)) {
                    n = f[1];
                    s = e
                }
                if (Math.abs(f[2]) < Math.abs(r)) {
                    r = f[2];
                    o = e
                }
            });
            return [
                [u, s, o],
                [i, n, r]
            ]
        }

        function A(e) {
            return e < 0 ? 360 + e % -360 : e % 360
        }

        function O(e, t, n, r) {
            b += 1;
            var i = A(Math.round(b * e + s.angleCurrent));
            if (b === n && r) {
                s.start()
            }
            _(i, b === n);
            if (b < n) {
                y = setTimeout(function() {
                    O(e, t, n, r)
                }, 50)
            } else {
                b = 0;
                s.angleCurrent = t
            }
        }

        function M(e) {
            var t = r.offset(),
                n = {
                    left: e.pageX - t.left - p.width / 2,
                    top: e.pageY - t.top - p.height / 2
                };
            s.angleCurrent = A(N(Math.atan2(n.left, -n.top)));
            _(s.angleCurrent);
            return false
        }

        function _(e, t) {
            if (s.options.dots) {
                u.css("left", -(e / 360 * d.width * a.length))
            } else {
                closestSlidesAndAngles = L(e);
                closestSlides = closestSlidesAndAngles[0];
                closestAngles = closestSlidesAndAngles[1];
                u.css("left", -(closestSlides[1] * d.width + Math.abs(closestAngles[1]) * d.width / (Math.abs(closestAngles[1]) + Math.abs(closestAngles[2]))))
            }
            f.css({
                top: -Math.cos(T(e)) * s.options.radius + (p.height / 2 - v.height / 2),
                left: Math.sin(T(e)) * s.options.radius + (p.width / 2 - v.width / 2)
            });
            if (t) {
                r.trigger("move", [a[s.slideCurrent], s.slideCurrent])
            }
        }

        function D(t) {
            if (e(t.target).hasClass("dot")) {
                return false
            }
            t.preventDefault();
            clearTimeout(y);
            if (!w) {
                e(document).unbind("mousemove mouseup");
                f.unbind("mouseup")
            }
            if (s.options.dotsSnap) {
                if (s.options.dotsHide) {
                    l.stop(true, true).fadeOut("slow")
                }
                s.move(L(s.angleCurrent)[0][0])
            }
            s.start()
        }

        function P(t) {
            t.preventDefault();
            if (e(t.target).hasClass("dot")) {
                return false
            }
            clearTimeout(g);
            if (!w) {
                e(document).mousemove(M);
                e(document).mouseup(D);
                f.mouseup(D)
            }
            if (s.options.dotsSnap && s.options.dotsHide) {
                l.stop(true, true).fadeIn("slow")
            }
        }
        this.options = e.extend({}, n, i);
        this._defaults = n;
        this._name = t;
        var s = this,
            o = r.find(".viewport"),
            u = r.find(".overview"),
            a = u.children(),
            f = r.find(".thumb"),
            l = r.find(".dot"),
            c = a.find("a"),
            h = [],
            p = {
                width: r.outerWidth(true),
                height: r.outerHeight(true)
            },
            d = {
                width: a.first().outerWidth(true),
                height: a.first().outerHeight(true)
            },
            v = {
                width: f.outerWidth(true),
                height: f.outerHeight(true)
            },
            m = {
                width: l.outerWidth(),
                height: l.outerHeight()
            },
            g = null,
            y = null,
            b = 0,
            w = "ontouchstart" in document.documentElement;
        this.slideCurrent = 0;
        this.angleCurrent = 10;
        this.start = function(e) {
            if (s.options.interval) {
                x(e)
            }
            return s
        };
        this.stop = function() {
            clearTimeout(g);
            return s
        };
        this.move = function(e, t) {
            var n = h[e] && h[e].angle || 0,
                r = k(n, s.angleCurrent)[0],
                i = Math.ceil(Math.abs(r) / 10),
                o = r / i || 0;
            s.slideCurrent = e;
            O(o, n, i, t);
            return s
        };
        return E()
    }
    var t = "tinycircleslider",
        n = {
            interval: false,
            intervalTime: 3500,
            dots: true,
            dotsSnap: false,
            dotsHide: true,
            radius: 140
        };
    e.fn[t] = function(n) {
        return this.each(function() {
            if (!e.data(this, "plugin_" + t)) {
                e.data(this, "plugin_" + t, new r(e(this), n))
            }
        })
    }
})