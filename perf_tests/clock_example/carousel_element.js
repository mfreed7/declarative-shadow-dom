const myStyles = `
  :host {
    display:flex;
    flex-direction: row;
    align-items: center;
    height:120px;
  }
  #border {
    border: 2px solid blue;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 2px;
  }
  button {
    wfidth: 2em;
    height: 1.8em;
    border: 1px solid black;
  }`;
const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(myStyles);

class Carousel extends HTMLElement {
  constructor() {
    super();

    const useInlineStyles = styleType === "inline";
    if (!useInlineStyles && styleType !== "adopted") {
      console.error("You must define styleType to be either 'inline' or 'adopted'");
      return;
    }

    if (this.shadowRoot) {
      this.shadowRoot_ = this.shadowRoot;
    } else {
      this.shadowRoot_ = this.attachShadow({mode: 'open'});
      this.shadowRoot_.innerHTML = `
         <div id=border>
           <button id=goleft></button>
           <slot id=contents>Empty Carousel</slot>
           <button id=goright></button>
         </div>
         <style id=inlinestyles></style>
         `;
      if (useInlineStyles) {
        const styleTag = this.shadowRoot_.getElementById('inlinestyles');
        styleTag.innerHTML = myStyles;
      }
    }

    this.selectedItem = Number(this.attributes["selectedItem"]?.value) || 0;

    this.goLeft = this.shadowRoot_.getElementById('goleft');
    this.goRight = this.shadowRoot_.getElementById('goright');
    this.contents = this.shadowRoot_.getElementById('contents');

    this.updateView();
    const that = this;
    this.goLeft.addEventListener("click",function() {
      that.selectedItem--;
      if (that.selectedItem < 0)
        that.selectedItem = that.numberOfElements()-1;
      that.updateView();
    });
    this.goRight.addEventListener("click",function() {
      that.selectedItem++;
      if (that.selectedItem >= that.numberOfElements())
        that.selectedItem = 0;
      that.updateView();
    });

    if (!useInlineStyles) {
      // adoptedStylesheets are not serialized:
      this.shadowRoot_.adoptedStyleSheets = [styleSheet];
    }
  }

  connectedCallback() {
  }

  disconnectedCallback() {
  }

  updateView() {
    for (var i=0;i<this.numberOfElements();i++) {
      this.contents.assignedElements()[i].style.display=(i==this.selectedItem) ? "block" : "none";
    }
    const moreLeft = this.selectedItem;
    if (moreLeft == 0) {
      this.goLeft.innerHTML = `&lt;`;
      this.goLeft.disabled=true;
    } else {
      this.goLeft.innerHTML = `<b>&lt;</b>${moreLeft}`;
      this.goLeft.disabled=false;
    }
    const moreRight = this.numberOfElements() - this.selectedItem - 1;
    if (moreRight == 0) {
      this.goRight.innerHTML = `&gt;`;
      this.goRight.disabled=true;
    } else {
      this.goRight.innerHTML = `${moreRight}<b>&gt;</b>`;
      this.goRight.disabled=false;
    }
  }
  numberOfElements() {
    return this.contents.assignedElements().length;
  }
}

customElements.define('my-carousel', Carousel);
