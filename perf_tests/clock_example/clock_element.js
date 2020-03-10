const myStyles = `
  #wrapper {
    vertical-align: middle;
  }
  #wrapper {
    border: 2px solid green;
    display: inline-block;
    padding: 2px;
  }
  #timezone {
    display: block;
  }
  button {
    display: flex;
    border: 1px solid black;
  }
  #buttons, #timedisp {
    display: inline-block;
  }`;
const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(myStyles);

class Clock extends HTMLElement {
  constructor() {
    super();

    const useInlineStyles = styleType === "inline";
    if (!useInlineStyles && styleType !== "adopted") {
      console.error("You must define styleType to be either 'inline' or 'adopted'");
      return;
    }


    if (!this.shadowRoot) {
      this.attachShadow({mode: 'open'});
      this.shadowRoot.innerHTML = `
         <div id=wrapper>
           <label id=timezone></label>
           <div id=timedisp>
             <span id=hours>hh</span> : <span id=minutes>mm</span> : <span id=seconds>ss</span>
           </div>
           <div id=buttons>
             <button id=sizeup><b>/\\</b></button>
             <button id=sizedown><b>\\/</b></button>
           </div>
         </div>
         <style id=inlinestyles></style>
         `;
      if (useInlineStyles) {
        const styleTag = this.shadowRoot.getElementById('inlinestyles');
        styleTag.innerHTML = myStyles;
      }
    }


    this.wrapper = this.shadowRoot.getElementById('wrapper');
    this.timezoneDisp = this.shadowRoot.getElementById('timezone');
    this.hours = this.shadowRoot.getElementById('hours');
    this.minutes = this.shadowRoot.getElementById('minutes');
    this.seconds = this.shadowRoot.getElementById('seconds');

    this.fontSize = Number(this.attributes["fontsize"]?.value) || 24;
    this.sizeUp = this.shadowRoot.getElementById('sizeup');
    this.sizeDown = this.shadowRoot.getElementById('sizedown');
    this.sizeUp.addEventListener("click",() => {
      this.fontSize += 2;
      this.setFont();
    });
    this.sizeDown.addEventListener("click",() => {
      this.fontSize -= 2;
      this.setFont();
    });

    if (!useInlineStyles) {
      // adoptedStylesheets are not serialized:
      this.shadowRoot.adoptedStyleSheets = [styleSheet];
    }
    this.setFont();
  }

  connectedCallback() {
    this.update();
    this.interval = setInterval(() => {
      this.update();
    }, 1000);
  }

  disconnectedCallback() {
    clearInterval(this.interval);
  }

  update() {
    let tzlabel = this.attributes["timezone"].value;
    this.timezoneDisp.textContent = tzlabel;
    let tzoffset = Number(this.attributes["tzoffset"].value);
    var d = new Date();
    let hourDiff = d.getTimezoneOffset()/60.0 + tzoffset;
    d = new Date(d.getTime() + hourDiff*60*60000);
    this.hours.textContent = d.getHours();
    this.minutes.textContent = String(d.getMinutes()).padStart(2,'0');
    this.seconds.textContent = String(d.getSeconds()).padStart(2,'0');
  }

  setFont() {
    this.wrapper.style.fontSize = `${this.fontSize}pt`;
    this.wrapper.style.lineHeight = `${this.fontSize}pt`;
  }
}

customElements.define('my-clock', Clock);
