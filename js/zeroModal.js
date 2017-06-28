/*!
 * zeroModal.js
 * http://git.oschina.net/cylansad/zeroModal
 *
 * Copyright 2016, Sad
 */
(function(a) {
	if(typeof module !== "undefined" && typeof exports === "object" && define.cmd) {
		module.exports = a
	} else {
		if(typeof define === "function" && define.amd) {
			define(function() {
				return a
			})
		} else {
			window.zeroModal = a
		}
	}
}((function(f, g) {
	var u = {};
	var r = {
		unique: "",
		title: "",
		content: "",
		url: false,
		iframe: false,
		width: "500px",
		height: "300px",
		transition: false,
		opacity: 0.2,
		overlay: true,
		overlayClose: false,
		drag: true,
		dragHandle: "top",
		max: false,
		resize: false,
		resizeAfterFn: g,
		ok: false,
		okTitle: "确定",
		okFn: false,
		cancel: false,
		cancelTitle: "关闭",
		cancelFn: true,
		buttonTopLine: true,
		buttons: [],
		esc: false,
		onOpen: false,
		onLoad: false,
		onComplete: false,
		onCleanup: false,
		onClosed: false
	};
	var e = false;
	var q = 10000;
	var k = {};
	u.show = function(w) {
		var x = m(w);
		i(x);
		e = true;
		f(window).resize(function() {
			if(e) {
				h(x)
			}
		});
		return x.unique
	};
	u.close = function(w) {
		b({
			unique: w
		});
		e = false;
		delete k[w]
	};
	u.closeAll = function() {
		f('[role="zeromodal-loading"]').remove();
		f(".zeromodal-overlay").remove();
		f(".zeromodal-container").each(function() {
			var y = f(this);
			var x = y.attr("zero-unique-container");
			if(x !== g && k[x] !== g) {
				var w = k[x];
				if(typeof w.onCleanup === "function") {
					w.onCleanup(w)
				}
				y.remove();
				if(typeof w.onClosed === "function") {
					w.onClosed(w)
				}
				delete k[x]
			}
		});
		e = false
	};
	u.loading = function(z) {
		var C = m();
		t(C);
		q++;
		var B = f(window).scrollTop() + Math.ceil(f(window).height() / 3);
		if(z === g) {
			z = 1
		}
		if(z === 1 || z === 2) {
			var A = "zeromodal-loading" + z;
			f("body").append('<div role="zeromodal-loading" zero-unique-loading="' + C.unique + '" class="' + A + '" style="z-index:' + q + ";top:" + B + 'px;"></div>')
		} else {
			if(j([3, 4, 5, 6], z)) {
				var w = {};
				switch(z) {
					case 3:
						w.className = "pacman";
						w.containerCount = 5;
						break;
					case 4:
						w.className = "line-scale-pulse-out";
						w.containerCount = 5;
						break;
					case 5:
						w.className = "line-spin-fade-loader";
						w.containerCount = 8;
						break;
					case 6:
						w.className = "square-spin";
						w.containerCount = 1;
						break
				}
				var x = '<div role="zeromodal-loading" zero-unique-loading="' + C.unique + '" class="' + w.className + '" style="z-index:' + q + ";left:46%;top:" + B + 'px;">';
				for(var y = 0; y < w.containerCount; y++) {
					x += "  <div></div>"
				}
				x += "  </div>";
				f("body").append(x)
			}
		}
		return C.unique
	};
	u.progress = function(C, w) {
		var z = m();
		t(z);
		q++;
		if(C === g) {
			C = 3
		}
		var E = f(window).scrollTop() + Math.ceil(f(window).height() / 3);
		var D = {};
		switch(C) {
			case 3:
				D.className = "pacman";
				D.containerCount = 5;
				break;
			case 4:
				D.className = "line-scale-pulse-out";
				D.containerCount = 5;
				break;
			case 5:
				D.className = "line-spin-fade-loader";
				D.containerCount = 8;
				break;
			case 6:
				D.className = "square-spin";
				D.containerCount = 1;
				break
		}
		var x = '<div zero-unique-loading="' + z.unique + '" class="' + D.className + '" style="z-index:' + q + ";left:46%;top:" + E + 'px;">';
		for(var B = 0; B < D.containerCount; B++) {
			x += "  <div></div>"
		}
		x += "  </div>";
		x += '  <div zero-unique-loading="' + z.unique + '" class="zeromodal-progress-content" style="z-index:' + q + ";top:" + (E + 64) + 'px;"><span id="progess_content_' + z.unique + '"></span></div>';
		x += "";
		f("body").append(x);
		var A = 0;
		var y = setInterval(function() {
			f.ajax({
				url: w.getProgressUrl + "?_=" + new Date().getTime(),
				dataType: "json",
				type: "get",
				success: function(F) {
					f("#progess_content_" + z.unique).html(F.progress);
					if(F.progress === "finish") {
						clearInterval(y);
						f.get(w.clearProgressUrl);
						u.close(z.unique)
					}
				}
			});
			A++;
			if(A >= 500) {
				clearInterval(y)
			}
		}, 500);
		return z.unique
	};
	u.progress_old = function(y) {
		var B = m();
		t(B);
		q++;
		var E = f(window).scrollTop() + Math.ceil(f(window).height() / 3);
		var F = f(window).width() / 2 - 200;
		var C = 1;
		if(y !== g && y > C && y < 10) {
			C = y
		}
		var x = '<div class="zeromodal-progress" style="top:' + E + "px;left:" + F + "px;z-index:" + q + '">';
		x += '      <div zeromodal-progress-bar="' + B.unique + '" class="zeromodal-progress-bar" style="width: 0%; background: #92c26a;">';
		x += '          <span class="zeromodal-progress-icon zeromodal-fa zeromodal-fa-check" style="border-color:#92c26a; color:#92c26a;"><div zeromodal-progress-val="' + B.unique + '" class="zeromodal-progress-val">&nbsp;0%</div></span>';
		x += "      </div>";
		x += "  </div>";
		f("body").append(x);
		var w = 0;
		var D = f('[zeromodal-progress-bar="' + B.unique + '"]');
		var A = f('[zeromodal-progress-val="' + B.unique + '"]');
		var z = setInterval(function() {
			w += 1;
			D.css("width", w + "%");
			A.html((w > 9 ? w : "&nbsp;" + w) + "%");
			if(w >= 100) {
				A.html('<span class="line tip"></span><span class="line long"></span>');
				clearInterval(z)
			}
		}, C * 100);
		return B.unique
	};
	u.alert = function(x) {
		var w = {
			iconClass: "show-zero2 zeromodal-icon-info",
			iconText: "!"
		};
		var y = {};
		f.extend(y, w);
		if(typeof x === "object") {
			f.extend(y, x)
		} else {
			y.content = x
		}
		o(y)
	};
	u.error = function(w) {
		var x = {
			iconDisplay: '<div class="show-zero2 zeromodal-icon zeromodal-error"><span class="x-mark"><span class="line left"></span><span class="line right"></span></span></div>'
		};
		if(typeof w === "object") {
			f.extend(x, w)
		} else {
			x.content = w
		}
		o(x)
	};
	u.success = function(w) {
		var x = {
			iconDisplay: '<div class="show-zero2 zeromodal-icon zeromodal-success"><span class="line tip"></span><span class="line long"></span><div class="placeholder"></div></div>'
		};
		if(typeof w === "object") {
			f.extend(x, w)
		} else {
			x.content = w
		}
		o(x)
	};
	u.confirm = function(y, x) {
		var w = {
			iconClass: "show-zero2 zeromodal-icon-question",
			iconText: "?",
		};
		var z = {};
		f.extend(z, w);
		if(typeof x === "function") {
			z.okFn = x
		}
		z.cancel = true;
		if(typeof y === "object") {
			f.extend(z, y)
		} else {
			z.content = y
		}
		o(z)
	};

	function m(w) {
		var x = {};
		f.extend(x, r);
		f.extend(x, w);
		if(typeof x.unique === "undefined" || x.unique === "") {
			x.unique = c()
		}
		k[x.unique] = x;
		return x
	}

	function i(w) {
		if(typeof w.onOpen === "function") {
			w.onOpen(w)
		}
		t(w);
		l(w)
	}

	function b(w) {
		if(typeof w === "object") {
			if(typeof w.onCleanup === "function") {
				w.onCleanup()
			}
			f('[zero-unique-overlay="' + w.unique + '"]').remove();
			f('[zero-unique-container="' + w.unique + '"]').remove();
			f('[zero-unique-loading="' + w.unique + '"]').remove();
			if(typeof w.onClosed === "function") {
				w.onClosed()
			}
		}
	}

	function t(z) {
		q++;
		var x = f(document).width();
		var y = f(document).height();
		if(z.overlay) {
			var w = f('<div zero-unique-overlay="' + z.unique + '" class="zeromodal-overlay" style="opacity:' + z.opacity + ";z-index:" + q + ";width:" + x + "px;height:" + y + 'px"></div>');
			f("body").append(w);
			if(z.overlayClose) {
				w.css("cursor", "pointer");
				w.click(function() {
					b(z)
				})
			} else {
				w.click(function() {
					s(f('[zero-unique-container="' + z.unique + '"]'))
				})
			}
		}
	}

	function l(z) {
		q++;
		var D = z.width.replace("px", "");
		var F = z.height.replace("px", "");
		var y = f(window).width();
		var E = f(window).height();
		if(D.indexOf("%") !== -1) {
			D = (y * parseInt(D.replace("%", "")) / 100)
		}
		if(F.indexOf("%") !== -1) {
			F = (E * parseInt(F.replace("%", "")) / 100)
		}
		if(typeof D === "string") {
			D = parseInt(D)
		}
		if(typeof F === "string") {
			F = parseInt(F)
		}
		var J = (y - D) / 2;
		var I = f(window).scrollTop() + Math.ceil((f(window).height() - F) / 3);
		var C = f('<div zero-unique-container="' + z.unique + '" class="zeromodal-container" style="z-index:' + q + ";width:" + D + "px;height:" + F + "px;left:" + J + "px;top:" + (z.transition ? I - 50 : I) + 'px"></div>');
		f("body").append(C);
		if(z.drag) {
			var x = f('<div zero-unique-top="' + z.unique + '" class="zeromodal-top"></div>');
			C.append(x);
			var w;
			if(z.dragHandle === "container") {
				w = f('[zero-unique-container="' + z.unique + '"]')[0]
			} else {
				w = f('[zero-unique-top="' + z.unique + '"]')[0]
			}
			new a(f('[zero-unique-container="' + z.unique + '"]')[0], {
				handle: w,
				limit: false
			})
		}
		var B = '<div zeromodal-unqiue-header="' + z.unique + '" class="zeromodal-header">';
		B += '        <div title="关闭" zero-close-unique="' + z.unique + '" class="zeromodal-close">×</div>';
		if(z.max) {
			B += '    <div title="最大化/取消最大化" zero-max-unique="' + z.unique + '" class="zeromodal-max"></div>'
		}
		B += '        <span class="modal-title">' + z.title + "</span>";
		B += "   </div>";
		var H = f(B);
		C.append(H);
		f('[zero-close-unique="' + z.unique + '"]').click(function() {
			b(k[f(this).attr("zero-close-unique")])
		});
		f('[zero-max-unique="' + z.unique + '"]').click(function() {
			if(f(this).attr("max") !== "1") {
				h(k[f(this).attr("zero-max-unique")], "90%", "85%");
				f(this).attr("max", "1")
			} else {
				h(k[f(this).attr("zero-max-unique")]);
				f(this).attr("max", "0")
			}
			n(z)
		});
		if(z.transition) {
			f(".zeromodal-container").animate({
				top: I
			}, 300)
		}
		var A = f('<div zero-unique-body="' + z.unique + '" class="zeromodal-body"></div>');
		C.append(A);
		n(z);
		if(z.resize) {
			C.append('<div zero-unique-sweep-tee="' + z.unique + '" class="zeromodal-sweep-tee"></div>');
			v(z.unique, z)
		}
		if(typeof z.onLoad === "function") {
			z.onLoad(z)
		}
		if(!z.url) {
			f('[zero-unique-body="' + z.unique + '"]').addClass("zeromodal-overflow-y");
			A.html(z.content);
			if(typeof z.onComplete === "function") {
				z.onComplete(z)
			}
		} else {
			A.html('<div class="zeromodal-loading1"></div>');
			if(z.iframe) {
				var G = f('<iframe src="' + z.url + '" class="zeromodal-frame"></iframe>');
				A.append(G);
				G.load(function() {
					f(".zeromodal-loading1").remove();
					if(typeof z.onComplete === "function") {
						z.onComplete(z)
					}
				})
			} else {
				f('[zero-unique-body="' + z.unique + '"]').addClass("zeromodal-overflow-y");
				f.ajax({
					url: z.url,
					dataType: "html",
					type: "get",
					success: function(K) {
						A.append(K);
						f(".zeromodal-loading1").remove();
						if(typeof z.onComplete === "function") {
							z.onComplete(z)
						}
					}
				})
			}
		}
		d(z, C);
		if(z.esc) {
			f("body").one("keyup", function(K) {
				if(K.keyCode === 27) {
					b(z)
				}
			})
		}
	}

	function d(B, y) {
		if(B.ok || B.cancel || (B.buttons !== g && B.buttons.length > 0)) {
			var x = '<div class="zeromodal-footer">';
			x += B.buttonTopLine ? '<div class="zeromodal-line"></div>' : "";
			x += '        <div zeromodal-btn-container="' + B.unique + '" class="zeromodal-btn-container"></div>';
			x += "   </div>";
			y.append(x);
			if(B.buttons !== g && B.buttons.length > 0) {
				for(var A = 0; A < B.buttons.length; A++) {
					var w = B.buttons[A];
					var z = f('<button zero-btn-unique="' + B.unique + '" class="' + (w.className || "") + '"' + (w.attr !== g ? " " + w.attr : "") + ">" + w.name + "</button>");
					if(typeof w.fn === "function") {
						(function(E) {
							z.click(function() {
								var F = E.fn(B);
								if(typeof F === "undefined" || F) {
									b(B)
								}
							})
						}(w))
					}
					f('[zeromodal-btn-container="' + B.unique + '"]').append(z)
				}
			} else {
				if(B.ok) {
					var C = f('<button zeromodal-btn-ok="' + B.unique + '" class="zeromodal-btn zeromodal-btn-primary">' + B.okTitle + "</button>");
					f('[zeromodal-btn-container="' + B.unique + '"]').append(C);
					C.click(function() {
						if(typeof B.okFn === "function") {
							var E = B.okFn();
							if(typeof E === "undefined" || E) {
								b(B)
							}
						} else {
							b(B)
						}
					})
				}
				if(B.cancel) {
					var D = f('<button zeromodal-btn-cancel="' + B.unique + '" class="zeromodal-btn zeromodal-btn-default">' + B.cancelTitle + "</button>");
					f('[zeromodal-btn-container="' + B.unique + '"]').append(D);
					D.click(function() {
						if(typeof B.cancelFn === "function") {
							var E = B.cancelFn();
							if(typeof E === "undefined" || E) {
								b(B)
							}
						} else {
							b(B)
						}
					})
				}
			}
		}
	}

	function o(y) {
		if(typeof y === "undefined" || typeof y.cancelTitle === "undefined") {
			y.cancelTitle = "取消"
		}
		var B = m(y);
		B.width = "360px";
		B.height = "300px";
		B.esc = true;
		B.ok = true;
		B.buttonTopLine = false;
		if(typeof _okFn !== "undefined") {
			B.okFn = _okFn
		}
		if(typeof cancelFn !== "undefined") {
			B.cancelFn = cancelFn
		}
		var x = B.content || "";
		var w = B.contentDetail || "";
		B.content = "";
		i(B);
		var z;
		if(typeof B.iconDisplay !== "undefined") {
			z = f(B.iconDisplay)
		} else {
			z = f('<div class="zeromodal-icon ' + B.iconClass + '">' + B.iconText + "</div>")
		}
		var A = f('<div class="zeromodal-title1">' + x + '</div><div class="zeromodal-title2">' + w + "</div>");
		f('[zero-unique-body="' + B.unique + '"]').append(z);
		f('[zero-unique-body="' + B.unique + '"]').append(A);
		f('[zero-unique-body="' + B.unique + '"]').removeClass("zeromodal-overflow-y");
		f('[zeromodal-btn-ok="' + B.unique + '"]').focus();
		e = true;
		f(window).resize(function() {
			if(e) {
				h(B)
			}
		})
	}

	function h(y, x, C) {
		f('[zero-unique-overlay="' + y.unique + '"]').css("width", f(document).width() + "px").css("height", f(document).height() + "px");
		var w = f(window).width();
		var A = f(window).height();
		var z = x !== g ? x.replace("px", "") : y.width.replace("px", "");
		var B = C !== g ? C.replace("px", "") : y.height.replace("px", "");
		if(z.indexOf("%") !== -1) {
			z = (w * parseInt(z.replace("%", "")) / 100)
		}
		if(B.indexOf("%") !== -1) {
			B = (A * parseInt(B.replace("%", "")) / 100)
		}
		if(typeof z === "string") {
			z = parseInt(z)
		}
		if(typeof B === "string") {
			B = parseInt(B)
		}
		var E = (w - z) / 2;
		var D = f(window).scrollTop() + Math.ceil((f(window).height() - B) / 3);
		f('[zero-unique-container="' + y.unique + '"]').css("width", z + "px").css("height", B + "px").css("left", E + "px").css("top", D + "px")
	}

	function p(A) {
		var x = f(window).width();
		var y = f(window).height();
		var w = parseInt(f('[zero-unique-container="' + A.unique + '"]').css("width").replace("px", ""));
		var z = parseInt(f('[zero-unique-container="' + A.unique + '"]').css("height").replace("px", ""));
		var B = (x - w) / 2;
		var C = f(window).scrollTop() + Math.ceil((f(window).height() - z) / 3);
		f('[zero-unique-container="' + A.unique + '"]').css("left", B + "px").css("top", C + "px")
	}

	function n(y) {
		var x = f('[zeromodal-unqiue-header="' + y.unique + '"]').height();
		var z = (y.ok || y.cancel || (y.buttons !== g && y.buttons.length > 0)) ? 60 : 0;
		var w = f('[zero-unique-container="' + y.unique + '"]').height() - x - 10 - z;
		f('[zero-unique-body="' + y.unique + '"]').css("height", w)
	}

	function s(y) {
		if(y.length === 0) {
			return
		}
		var x = y.position().left;
		for(var w = 0; w < 2; w++) {
			y.animate({
				left: x - 2
			}, 50);
			y.animate({
				left: x
			}, 50);
			y.animate({
				left: x + 2
			}, 50)
		}
		y.animate({
			left: x
		}, 50)
	}

	function j(w, y) {
		for(var x = 0; x < w.length; x++) {
			if(w[x] === y) {
				return true
			}
		}
		return false
	}

	function c() {
		var z = [];
		var w = "0123456789abcdef";
		for(var x = 0; x < 36; x++) {
			z[x] = w.substr(Math.floor(Math.random() * 16), 1)
		}
		z[14] = "4";
		z[19] = w.substr((z[19] & 3) | 8, 1);
		z[8] = z[13] = z[18] = z[23] = "";
		var y = z.join("");
		return y
	}

	function v(C, z) {
		var D;
		var x;
		var w;
		var A = false;
		var B = f('[zero-unique-sweep-tee="' + C + '"]')[0];
		var y = f('[zero-unique-body="' + C + '"]')[0];
		document.onmousemove = function(E) {
			if(f('[zero-unique-container="' + z.unique + '"]').size() === 0) {
				return
			}
			x = E.pageX;
			w = E.pageY;
			if(D !== g) {
				A = true
			}
		};
		B.onmousedown = function() {
			document.onselectstart = function() {
				return false
			};
			var E = w - B.offsetTop;
			var F = x - B.offsetLeft;
			D = setInterval(function() {
				if(D && A) {
					var H = x - F;
					var G = w - E;
					f(".zeromodal-container").css("width", H + 3 + "px").css("height", G + 3 + "px")
				}
			}, 5)
		};
		document.onmouseup = function() {
			if(f('[zero-unique-container="' + z.unique + '"]').size() === 0) {
				return
			}
			document.onselectstart = function() {
				return true
			};
			clearInterval(D);
			D = g;
			A = false;
			p(z);
			n(z);
			if(z.resizeAfterFn !== g && typeof z.resizeAfterFn === "function") {
				z.resizeAfterFn(z)
			}
		}
	}

	function a() {
		this.initialize.apply(this, arguments)
	}
	a.prototype = {
		initialize: function(x, w) {
			this.drag = x;
			this._x = this._y = 0;
			this._moveDrag = this.bind(this, this.moveDrag);
			this._stopDrag = this.bind(this, this.stopDrag);
			this.setOptions(w);
			this.handle = this.options.handle;
			this.maxContainer = this.options.maxContainer;
			this.maxTop = Math.max(this.maxContainer.clientHeight, this.maxContainer.scrollHeight) - this.drag.offsetHeight;
			this.maxLeft = Math.max(this.maxContainer.clientWidth, this.maxContainer.scrollWidth) - this.drag.offsetWidth;
			this.limit = this.options.limit;
			this.lockX = this.options.lockX;
			this.lockY = this.options.lockY;
			this.lock = this.options.lock;
			this.onStart = this.options.onStart;
			this.onMove = this.options.onMove;
			this.onStop = this.options.onStop;
			this.handle.style.cursor = "move";
			this.changeLayout();
			this.addHandler(this.handle, "mousedown", this.bind(this, this.startDrag))
		},
		changeLayout: function() {
			this.drag.style.top = this.drag.offsetTop + "px";
			this.drag.style.left = this.drag.offsetLeft + "px";
			this.drag.style.position = "absolute";
			this.drag.style.margin = "0"
		},
		startDrag: function(w) {
			var x = w || window.event;
			this._x = x.clientX - this.drag.offsetLeft;
			this._y = x.clientY - this.drag.offsetTop;
			this.addHandler(document, "mousemove", this._moveDrag);
			this.addHandler(document, "mouseup", this._stopDrag);
			if(x.preventDefault) {
				x.preventDefault()
			}
			if(this.handle.setCapture) {
				this.handle.setCapture()
			}
			this.onStart()
		},
		moveDrag: function(w) {
			var z = w || window.event;
			var y = z.clientY - this._y;
			var x = z.clientX - this._x;
			if(this.lock) {
				return
			}
			if(!this.lockY) {
				this.drag.style.top = y + "px"
			}
			if(!this.lockX) {
				this.drag.style.left = x + "px"
			}
			if(z.preventDefault) {
				z.preventDefault()
			}
			this.onMove()
		},
		stopDrag: function() {
			this.removeHandler(document, "mousemove", this._moveDrag);
			this.removeHandler(document, "mouseup", this._stopDrag);
			if(this.handle.releaseCapture) {
				this.handle.releaseCapture()
			}
			this.onStop()
		},
		setOptions: function(w) {
			this.options = {
				handle: this.drag,
				limit: true,
				lock: false,
				lockX: false,
				lockY: false,
				maxContainer: document.documentElement || document.body,
				onStart: function() {},
				onMove: function() {},
				onStop: function() {}
			};
			for(var x in w) {
				this.options[x] = w[x]
			}
		},
		addHandler: function(x, y, w) {
			return x.addEventListener ? x.addEventListener(y, w, false) : x.attachEvent("on" + y, w)
		},
		removeHandler: function(x, y, w) {
			return x.removeEventListener ? x.removeEventListener(y, w, false) : x.detachEvent("on" + y, w)
		},
		bind: function(x, w) {
			return function() {
				return w.apply(x, arguments)
			}
		}
	};
	return u
}(jQuery))));