import {
  people,
  animals,
  foodDrink,
  activitySports,
  travelPlaces,
  objects,
  symbols
} from 'assets/emoji-categories';

const Gtk = imports.gi.Gtk;
const Gio = imports.gi.Gio;

Gtk.init(null);

class Application {

  constructor() {
    this.application = new Gio.Application ({application_id: "cmonagle.emojipicker"});
    this.application.register(null);
    this.layout = this.setLayout();
    this.window = this.initWindow();
    this.window.add(this.layout);
    this.initClipboard();
    this.window.show_all();
    Gtk.main();
  }

  initWindow() {
    const window = new Gtk.Window({title: "Emoji Selector"});
    window.set_default_size(700, 400);
    window.connect("destroy", Gtk.main_quit);
    return window;
  }

  setLayout() {
    const Stack = new Gtk.Stack({})
    const vbox = new Gtk.Box({orientation: Gtk.Orientation.VERTICAL, spacing: 6});
    const categories = [
      { name:"People",
        label: "☺️",
        chars: people},
      { name:"Animals",
        label: "🐱",
        chars: animals},
      { name:"Food & Drink",
        label: "🍏",
        chars: foodDrink},
      { name:"Activity & Sports",
        label: "⚽️",
        chars: activitySports},
      { name:"Travel & Places",
        label: "🚗",
        chars: travelPlaces},
      { name:"Objects",
        label: "✏️",
        chars: objects},
      { name:"Symbols",
        label: "❤️",
        chars: symbols}
    ];

    categories.forEach(category=>{
      let EmojiSection = this.  displayCategory(category.chars)
      Stack.add_titled(EmojiSection, category.name, category.label);
    })

    let StackSwitcher = new Gtk.StackSwitcher();
    const css = new Gtk.CssProvider();
    css.load_from_data(' * {font-size: 15px; padding: 3px }');
    StackSwitcher.get_style_context().add_provider(css, 0);

    StackSwitcher.stack = Stack;
    StackSwitcher.halign = Gtk.Align.CENTER;
    vbox.pack_start(Stack, true, true, 0);
    vbox.pack_start(StackSwitcher, false, false, 5);
    return vbox;
  }
  initClipboard() {
    this.Clipboard = Gtk.Clipboard.get_default(this.window.get_display());
  }

  handleClick(emoji) {
    this.Clipboard.set_text(emoji, -1);
    const Notification = new Gio.Notification ();
    Notification.set_title (`${emoji} copied to clipboard!`);
    Notification.set_body ("Press CTRL V to paste.");
    var Icon = new Gio.ThemedIcon ({name: "face-smile-big"});
    Notification.set_icon (Icon);
    this.application.send_notification (null, Notification);
    Gtk.main_quit();
  }

  displayCategory(emojiSet) {
    const Scroller = new Gtk.ScrolledWindow();
    const Flow = new Gtk.FlowBox();
    const css = new Gtk.CssProvider();
    css.load_from_data(' * { color: #000; font-size: 20px; background-color:#fff; border-radius: 5px; }');
    Scroller.get_style_context().add_provider(css, 0);
    emojiSet.forEach((emoji, i) => {
      const Label = new Gtk.Label({
        label: emoji
      });
      Label.get_style_context().add_provider(css, 0);

      const EventBox = new Gtk.EventBox();
      EventBox.add(Label);
      EventBox.connect("button-press-event", () => {
        this.handleClick(emoji);
      });

      Flow.add(EventBox);
    })
    Scroller.add(Flow)
    return Scroller;
  }
};

new Application();
