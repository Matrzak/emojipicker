#!/usr/bin/gjs
var main =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _emojiCategories = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Gtk = imports.gi.Gtk;
var Gio = imports.gi.Gio;

Gtk.init(null);

var Application = function () {
  function Application() {
    _classCallCheck(this, Application);

    this.application = new Gio.Application({ application_id: "cmonagle.emojipicker" });
    this.application.register(null);
    this.layout = this.setLayout();
    this.window = this.initWindow();
    this.window.add(this.layout);
    this.initClipboard();
    this.window.show_all();
    Gtk.main();
  }

  _createClass(Application, [{
    key: "initWindow",
    value: function initWindow() {
      var window = new Gtk.Window({ title: "Emoji Selector" });
      window.set_default_size(700, 400);
      window.connect("destroy", Gtk.main_quit);
      return window;
    }
  }, {
    key: "setLayout",
    value: function setLayout() {
      var _this = this;

      var Stack = new Gtk.Stack({});
      var vbox = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL, spacing: 6 });
      var categories = [{ name: "People",
        label: "☺️",
        chars: _emojiCategories.people }, { name: "Animals",
        label: "🐱",
        chars: _emojiCategories.animals }, { name: "Food & Drink",
        label: "🍏",
        chars: _emojiCategories.foodDrink }, { name: "Activity & Sports",
        label: "⚽️",
        chars: _emojiCategories.activitySports }, { name: "Travel & Places",
        label: "🚗",
        chars: _emojiCategories.travelPlaces }, { name: "Objects",
        label: "✏️",
        chars: _emojiCategories.objects }, { name: "Symbols",
        label: "❤️",
        chars: _emojiCategories.symbols }];

      categories.forEach(function (category) {
        var EmojiSection = _this.displayCategory(category.chars);
        Stack.add_titled(EmojiSection, category.name, category.label);
      });

      var StackSwitcher = new Gtk.StackSwitcher();
      var css = new Gtk.CssProvider();
      css.load_from_data(' * {font-size: 15px; padding: 3px }');
      StackSwitcher.get_style_context().add_provider(css, 0);

      StackSwitcher.stack = Stack;
      StackSwitcher.halign = Gtk.Align.CENTER;
      vbox.pack_start(Stack, true, true, 0);
      vbox.pack_start(StackSwitcher, false, false, 5);
      return vbox;
    }
  }, {
    key: "initClipboard",
    value: function initClipboard() {
      this.Clipboard = Gtk.Clipboard.get_default(this.window.get_display());
    }
  }, {
    key: "handleClick",
    value: function handleClick(emoji) {
      this.Clipboard.set_text(emoji, -1);
      var Notification = new Gio.Notification();
      Notification.set_title(emoji + " copied to clipboard!");
      Notification.set_body("Press CTRL V to paste.");
      var Icon = new Gio.ThemedIcon({ name: "face-smile-big" });
      Notification.set_icon(Icon);
      this.application.send_notification(null, Notification);
      Gtk.main_quit();
    }
  }, {
    key: "displayCategory",
    value: function displayCategory(emojiSet) {
      var _this2 = this;

      var Scroller = new Gtk.ScrolledWindow();
      var Flow = new Gtk.FlowBox();
      var css = new Gtk.CssProvider();
      css.load_from_data(' * { color: #000; font-size: 20px; background-color:#fff; border-radius: 5px; }');
      Scroller.get_style_context().add_provider(css, 0);
      emojiSet.forEach(function (emoji, i) {
        var Label = new Gtk.Label({
          label: emoji
        });
        Label.get_style_context().add_provider(css, 0);

        var EventBox = new Gtk.EventBox();
        EventBox.add(Label);
        EventBox.connect("button-press-event", function () {
          _this2.handleClick(emoji);
        });

        Flow.add(EventBox);
      });
      Scroller.add(Flow);
      return Scroller;
    }
  }]);

  return Application;
}();

;

new Application();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var people = exports.people = ['😀', '😬', '😁', '😂', '😃', '😄', '😅', '😆', '😇', '😉', '😊', '🙂', '🙃', '☺️', '😋', '😌', '😍', '😘', '😗', '😙', '😚', '😜', '😝', '😛', '🤑', '🤓', '😎', '🤗', '😏', '😶', '😐', '😑', '😒', '🙄', '🤔', '😳', '😞', '😟', '😠', '😡', '😔', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '😤', '😮', '😱', '😨', '😰', '😯', '😦', '😧', '😢', '😥', '😪', '😓', '😭', '😵', '😲', '🤐', '😷', '🤒', '🤕', '😴', '💤', '💩', '😈', '👿', '👹', '👺', '💀', '👻', '👽', '🤖', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🙌', '👏', '👋', '👍', '👊', '✊', '✌️', '👌', '✋', '💪', '🙏', '☝️', '👆', '👇', '👈', '👉', '🖕', '🤘', '🖖', '✍️', '💅', '👄', '👅', '👂', '👃', '👁', '👀', '👤', '🗣', '👶', '👦', '👧', '👨', '👩', '👱', '👴', '👵', '👲', '👳', '👮', '👷', '💂', '🕵', '🎅', '👼', '👸', '👰', '🚶', '🏃', '💃', '👯', '👫', '👬', '👭', '🙇', '💁', '🙅', '🙆', '🙋', '🙎', '🙍', '💇', '💆', '💑', '👩‍❤️‍👩', '👨‍❤️‍👨', '💏', '👩‍❤️‍💋‍👩', '👨‍❤️‍💋‍👨', '👪', '👚', '👕', '👖', '👔', '👗', '👙', '👘', '💄', '💋', '👣', '👠', '👡', '👢', '👞', '👟', '👒', '🎩', '⛑', '🎓', '👑', '🎒', '👝', '👛', '👜', '💼', '👓', '🕶', '💍', '🌂'];

var animals = exports.animals = ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐙', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🐌', '🐞', '🐜', '🕷', '🦂', '🦀', '🐍', '🐢', '🐠', '🐟', '🐡', '🐬', '🐳', '🐋', '🐊', '🐆', '🐅', '🐃', '🐂', '🐄', '🐪', '🐫', '🐘', '🐐', '🐏', '🐑', '🐎', '🐖', '🐀', '🐁', '🐓', '🦃', '🕊', '🐕', '🐩', '🐈', '🐇', '🐿', '🐾', '🐉', '🐲', '🌵', '🎄', '🌲', '🌳', '🌴', '🌱', '🌿', '☘', '🍀', '🎍', '🎋', '🍃', '🍂', '🍁', '🌾', '🌺', '🌻', '🌹', '🌷', '🌼', '🌸', '💐', '🍄', '🌰', '🎃', '🐚', '🕸', '🌎', '🌍', '🌏', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌚', '🌝', '🌛', '🌜', '🌞', '🌙', '⭐️', '🌟', '💫', '✨', '☄', '☀️', '🌤', '⛅️', '🌥', '🌦', '☁️', '🌧', '⛈', '🌩', '⚡️', '🔥', '💥', '❄️', '🌨', '🔥', '💥', '❄️', '🌨', '☃️', '⛄️', '🌬', '💨', '🌪', '🌫', '☂️', '☔️', '💧', '💦', '🌊'];

var foodDrink = exports.foodDrink = ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🍍', '🍅', '🍆', '🌶', '🌽', '🍠', '🍯', '🍞', '🧀', '🍗', '🍖', '🍤', '🍳', '🍔', '🍟', '🌭', '🍕', '🍝', '🌮', '🌯', '🍜', '🍲', '🍥', '🍣', '🍱', '🍛', '🍙', '🍚', '🍘', '🍢', '🍡', '🍧', '🍨', '🍦', '🍰', '🎂', '🍮', '🍬', '🍭', '🍫', '🍿', '🍩', '🍪', '🍺', '🍻', '🍷', '🍸', '🍹', '🍾', '🍶', '🍵', '☕️', '🍼', '🍴', '🍽'];

var activitySports = exports.activitySports = ['⚽️', '🏀', '🏈', '⚾️', '🎾', '🏐', '🏉', '🎱', '⛳️', '🏌', '🏓', '🏸', '🏒', '🏑', '🏏', '🎿', '⛷', '🏂', '⛸', '🏹', '🎣', '🚣', '🏊', '🏄', '🛀', '⛹', '🏋', '🚴', '🚵', '🏇', '🕴', '🏆', '🎽', '🏅', '🎖', '🎗', '🏵', '🎫', '🎟', '🎭', '🎨', '🎪', '🎤', '🎧', '🎼', '🎹', '🎷', '🎺', '🎸', '🎻', '🎬', '🎮', '👾', '🎯', '🎲', '🎰', '🎳'];

var travelPlaces = exports.travelPlaces = ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎', '🚓', '🚑', '🚒', '🚐', '🚚', '🚛', '🚜', '🏍', '🚲', '🚨', '🚔', '🚍', '🚘', '🚖', '🚡', '🚠', '🚟', '🚃', '🚋', '🚝', '🚄', '🚅', '🚈', '🚞', '🚂', '🚆', '🚇', '🚊', '🚉', '🚁', '🛩', '✈️', '🛫', '🛬', '⛵️', '🛥', '🚤', '⛴', '🛳', '🚀', '🛰', '💺', '⚓️', '🚧', '⛽️', '🚏', '🚦', '🚥', '🏁', '🚢', '🎡', '🎢', '🎠', '🏗', '🌁', '🗼', '🏭', '⛲️', '🎑', '⛰', '🏔', '🗻', '🌋', '🗾', '🏕', '⛺️', '🏞', '🛣', '🛤', '🌅', '🌄', '🏜', '🏖', '🏝', '🌇', '🌆', '🏙', '🌃', '🌉', '🌌', '🌠', '🎇', '🎆', '🌈', '🏘', '🏰', '🏯', '🏟', '🗽', '🏠', '🏡', '🏚', '🏢', '🏬', '🏣', '🏤', '🏥', '🏦', '🏨', '🏪', '🏫', '🏩', '💒', '🏛', '⛪️', '🕌', '🕍', '🕋', '⛩'];

var objects = exports.objects = ['⌚️', '📱', '📲', '💻', '⌨', '🖥', '🖨', '🖱', '🖲', '🕹', '🗜', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽', '🎞', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙', '🎚', '🎛', '⏱', '⏲', '⏰', '🕰', '⏳', '⌛️', '📡', '🔋', '🔌', '💡', '🔦', '🕯', '🗑', '🛢', '💸', '💵', '💴', '💶', '💷', '💰', '💳', '💎', '⚖', '🔧', '🔨', '⚒', '🛠', '⛏', '🔩', '⚙', '⛓', '🔫', '💣', '🔪', '🗡', '⚔', '🛡', '🚬', '☠', '⚰', '⚱', '🏺', '🔮', '📿', '💈', '⚗', '🔭', '🔬', '🕳', '💊', '💉', '🌡', '🏷', '🔖', '🚽', '🚿', '🛁', '🔑', '🗝', '🛋', '🛌', '🛏', '🚪', '🛎', '🖼', '🗺', '⛱', '🗿', '🛍', '🎈', '🎏', '🎀', '🎁', '🎊', '🎉', '🎎', '🎐', '🎌', '🏮', '✉️', '📩', '📨', '📧', '💌', '📮', '📪', '📫', '📬', '📭', '📦', '📯', '📥', '📤', '📜', '📃', '📑', '📊', '📈', '📉', '📄', '📅', '📆', '🗓', '📇', '🗃', '🗳', '🗄', '📋', '🗒', '📁', '📂', '🗂', '🗞', '📰', '📓', '📕', '📗', '📘', '📙', '📔', '📒', '📚', '📖', '🔗', '📎', '🖇', '✂️', '📐', '📏', '📌', '📍', '🚩', '🏳', '🏴', '🔐', '🔒', '🔓', '🔏', '🖊', '🖊', '🖋', '✒️', '📝', '✏️', '🖍', '🖌', '🔍', '🔎'];

var symbols = exports.symbols = ['❤️', '💛', '💙', '💜', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮', '✝️', '☪', '🕉', '☸', '✡️', '🔯', '🕎', '☯️', '☦', '🛐', '⛎', '♈️', '♉️', '♊️', '♋️', '♌️', '♍️', '♎️', '♏️', '♐️', '♑️', '♒️', '♓️', '🆔', '⚛', '🈳', '🈹', '☢', '☣', '📴', '📳', '🈶', '🈚️', '🈸', '🈺', '🈷️', '✴️', '🆚', '🉑', '💮', '🉐', '㊙️', '㊗️', '🈴', '🈵', '🈲', '🅰️', '🅱️', '🆎', '🆑', '🅾️', '🆘', '⛔️', '📛', '🚫', '❌', '⭕️', '💢', '♨️', '🚷', '🚯', '🚳', '🚱', '🔞', '📵', '❗️', '❕', '❓', '❔', '‼️', '⁉️', '💯', '🔅', '🔆', '🔱', '⚜', '〽️', '⚠️', '🚸', '🔰', '♻️', '🈯️', '💹', '❇️', '✳️', '❎', '✅', '💠', '🌀', '➿', '🌐', 'Ⓜ️', '🏧', '🈂️', '🛂', '🛃', '🛄', '🛅', '♿️', '🚭', '🚾', '🅿️', '🚰', '🚹', '🚺', '🚼', '🚻', '🚮', '🎦', '📶', '🈁', '🆖', '🆗', '🆙', '🆒', '🆕', '🆓', '🔟', '🔢', '▶️', '⏸', '⏯', '⏹', '⏺', '⏭', '⏮', '⏩', '⏪', '🔀', '🔁', '🔂', '◀️', '🔼', '🔽', '⏫', '⏬', '➡️', '⬅️', '⬆️', '⬇️', '↗️', '↘️', '↙️', '↖️', '↕️', '↔️', '🔄', '↪️', '↩️', '⤴️', '⤵️', 'ℹ️', '🔤', '🔡', '🔠', '🔣', '🎵', '🎶', '〰️', '➰', '✔️', '🔃', '➕', '➖', '➗', '✖️', '💲', '💱', '©️', '®️', '™️', '🔚', '🔙', '🔛', '🔝', '🔜', '☑️', '🔘', '⚪️', '⚫️', '🔴', '🔵', '🔸', '🔹', '🔶', '🔷', '🔺', '▪️', '▫️', '⬛️', '⬜️', '🔻', '◼️', '◻️', '◾️', '◽️', '🔲', '🔳', '🔈', '🔉', '🔊', '🔇', '📣', '📢', '🔔', '🔕', '🃏', '🀄️', '♠️', '♣️', '♥️', '♦️', '🎴', '👁‍🗨', '💭', '🗯', '💬', '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛', '🕜', '🕝', '🕞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦', '🕧'];

/***/ })
/******/ ]);