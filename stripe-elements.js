import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { TemplateStamp } from '@polymer/polymer/lib/mixins/template-stamp.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import './stripe-elements-custom-styles.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
/**
 * `stripe-elements`
 * Polymer wrapper for Stripe.js v3 Elements
 *
 * ## Usage
 *
 * ```html
 *   <paper-input label="Stripe Publishable Key" value="{{key}}"></paper-input>
 *   <stripe-elements
 *       publishable-key="[[key]]"
 *       token="{{token}}"
 *   ></stripe-elements>
 *   <show-json hide-copy-button json="[[token]]"></show-json>
 * ```
 *
 * ## Styling
 *
 * Use the `--paper-button` mixin to apply styles to the submit button, e.g.
 *
 * ```css
 * stripe-elements {
 *   --paper-button: {
 *     background-color: blue;
 *     color: white;
 *   }
 * }
 * ```
 *
 * A word about nomenclature before we list custom properties and mixins.
 * Stripe v3 Introduces 'Stripe Elements'. These are not custom elements,
 * but rather forms hosted by stripe and injected into your page via an iFrame.
 * When we refer to the 'Stripe Element' in this document, we are referring
 * to the hosted Stripe form, not the `<stripe-element>` custom element.
 *
 * The following custom properties and mixins are available for styling the
 * `<stripe-elements>` component:
 *
 * | Custom property | Description | Default |
 * | --- | --- | --- |
 * | `--stripe-elements-width` | Min-width of the stripe-element | 300px |
 * | `--stripe-elements-height` | Min-width of the stripe-element | 50px |
 * | `--stripe-elements-element` | Mixin applied to the Stripe Element | {} |
 * | `--stripe-elements-element-focus` | Mixin applied to the Stripe Element in its focused state. | {} |
 * | `--stripe-elements-element-invalid` | Mixin applied to the Stripe Element in its invalid state | {} |
 * | `--stripe-elements-element-webkit-autofill` | Mixin applied to the Stripe Element's webkit autofill. | {} |
 *
 * When you apply CSS to the custom properties below, they're parsed and sent
 * to Stripe, who should apply them to the Stripe Element they return in the
 * iFrame.
 * `base` styles are inherited by all other variants.
 * `complete` styles are applied when the Stripe Element has valid input.
 * `empty` styles are applied when the Stripe Element has no user input.
 * `invalid` styles are applied when the Stripe Element has invalid input.
 *
 * | Custom property |
 * | --- |
 * | `--stripe-elements-base-color` |
 * | `--stripe-elements-base-font-family` |
 * | `--stripe-elements-base-font-size` |
 * | `--stripe-elements-base-font-smoothing` |
 * | `--stripe-elements-base-font-variant` |
 * | `--stripe-elements-base-icon-color` |
 * | `--stripe-elements-base-line-height` |
 * | `--stripe-elements-base-letter-spacing` |
 * | `--stripe-elements-base-text-decoration` |
 * | `--stripe-elements-base-text-shadow` |
 * | `--stripe-elements-base-text-transform` |
 * | `--stripe-elements-complete-color` |
 * | `--stripe-elements-complete-font-family` |
 * | `--stripe-elements-complete-font-size` |
 * | `--stripe-elements-complete-font-smoothing` |
 * | `--stripe-elements-complete-font-variant` |
 * | `--stripe-elements-complete-icon-color` |
 * | `--stripe-elements-complete-line-height` |
 * | `--stripe-elements-complete-letter-spacing` |
 * | `--stripe-elements-complete-text-decoration` |
 * | `--stripe-elements-complete-text-shadow` |
 * | `--stripe-elements-complete-text-transform` |
 * | `--stripe-elements-empty-color` |
 * | `--stripe-elements-empty-font-family` |
 * | `--stripe-elements-empty-font-size` |
 * | `--stripe-elements-empty-font-smoothing` |
 * | `--stripe-elements-empty-font-variant` |
 * | `--stripe-elements-empty-icon-color` |
 * | `--stripe-elements-empty-line-height` |
 * | `--stripe-elements-empty-letter-spacing` |
 * | `--stripe-elements-empty-text-decoration` |
 * | `--stripe-elements-empty-text-shadow` |
 * | `--stripe-elements-empty-text-transform` |
 * | `--stripe-elements-invalid-color` |
 * | `--stripe-elements-invalid-font-family` |
 * | `--stripe-elements-invalid-font-size` |
 * | `--stripe-elements-invalid-font-smoothing` |
 * | `--stripe-elements-invalid-font-variant` |
 * | `--stripe-elements-invalid-icon-color` |
 * | `--stripe-elements-invalid-line-height` |
 * | `--stripe-elements-invalid-letter-spacing` |
 * | `--stripe-elements-invalid-text-decoration` |
 * | `--stripe-elements-invalid-text-shadow` |
 * | `--stripe-elements-invalid-text-transform` |
 *
 * @demo demo/index.html
 * @polymer
 * @customElement
 * @extends Polymer.Element
 * @appliesMixin Polymer.TemplateStamp
 * @fires 'stripe-token'
 * @fires 'stripe-error'
 */
class StripeElements extends TemplateStamp(PolymerElement) {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
        flex: 1;
        min-width: var(--stripe-elements-width, 300px);
        min-height: var(--stripe-elements-height, 50px);
      }

      paper-toast {
        margin: 0;
        max-width: 100%;
        display: flex;
      }

    </style>

    <template id="stripeCardTemplate">
      <div slot="stripe-card">
        <form id="form" action="[[action]]" method="post">

          <div id="[[mountElementId]]" aria-label="Credit or Debit Card">
            <!-- Stripe will inject form here -->
          </div>

          <input type="hidden" name="stripeToken" value="[[token]]">

        </form>
      </div>
    </template>

    <slot name="stripe-card"></slot>

    <div id="error">[[error.message]]</div>

    <paper-toast id="toast" text="[[error.message]]" duration="Infinity" opened="{{toastOpened}}" no-overlap="" vertical-align="bottom">
      <paper-button toggles="" active="{{toastOpened}}">OK</paper-button>
    </paper-toast>
`;
  }

  static get is() {return 'stripe-elements';}
  static get properties() {
    return {

      /**
       * The URL to the form action. Example '/charges'.
       * If blank or undefined will not submit charges immediately.
       */
      action: {
        type: String,
        value: '',
      },

      /**
       * Mount Point Element id
       * @type {String}
       * @protected
       */
      mountElementId: {
        type: String,
        readOnly: true,
      },

      /**
       * Card billing info to be passed to createToken() (optional)
       * More information here https://stripe.com/docs/stripe-js/reference#stripe-create-token
       * @type {Object}
       */
      cardData: {
        type: Object,
      },

      /**
       * Permitted style names.
       * @type {Array}
       * @protected
       */
      allowedStyles: {
        type: Array,
        readOnly: true,
        value: [
          'color',
          'fontFamily',
          'fontSize',
          'fontStyle',
          'fontSmoothing',
          'fontVariant',
          'iconColor',
          'lineHeight',
          'letterSpacing',
          'textDecoration',
          'textShadow',
          'textTransform',
        ],
      },

      /**
       * Reference to the card.
       * @protected
       */
      card: {
        type: Object,
        readOnly: true,
      },


      /** Whether the submit button is disabled. */
      disabled: {
        type: Boolean,
        notify: true,
        value: false,
      },

      /**
       * Stripe elements instance
       * @protected
       */
      elements: {
        type: Object,
        readOnly: true,
      },

      /** Error message from Stripe. */
      error: {
        type: String,
        notify: true,
        readOnly: true,
        observer: 'errorChanged',
      },

      /**
       * Check if the form is empty.
       * @protected
       */
      isEmpty: {
        type: Boolean,
        value: true,
        readOnly: true,
      },

      /**
       * Check if the form is complete.
       * @protected
       */
      isComplete: {
        type: Boolean,
        value: false,
        readOnly: true,
      },

      /**
       * Check if the form has an error.
       * @protected
       */
      hasError: {
        type: Boolean,
        value: false,
        readOnly: true,
      },

      /**
       * The card brand detected by Stripe
       * @protected
       */
      brand: {
        type: String,
        readOnly: true,
      },

      /** Whether to hide icons in the Stripe form. */
      hideIcon: {
        type: Boolean,
        value: false,
      },

      /**
       * Whether or not to hide the postal code field.
       * Useful when you gather shipping info elsewhere.
       */
      hidePostalCode: {
        type: Boolean,
        value: false,
      },

      /** Stripe icon style. 'solid' or 'default'. */
      iconStyle: {
        type: Object,
        value: 'default',
      },

      /** Stripe Publishable Key. EG. pk_test_XXXXXXXXXXXXXXXXXXXXXXXX */
      publishableKey: {
        type: String,
        observer: 'publishableKeyChanged',
      },

      /**
       * Stripe instance
       * @protected
       */
      stripe: {
        type: Object,
        readOnly: true,
      },

      /** True when the stripe element is ready to receive focus. */
      stripeReady: {
        type: Boolean,
        readOnly: true,
        notify: true,
        reflectToAttribute: true,
        value: false,
      },

      /** Stripe token. */
      token: {
        type: Object,
        notify: true,
        readOnly: true,
      },

      /** Prefilled values for form. Example {postalCode: '90210'} */
      value: {
        type: Object,
        value: () => ({}),
      },

    };
  }

  connectedCallback() {
    super.connectedCallback();
    this._setMountElementId(this.generateRandomMountElementId());
    this.prepare({shady: !!window.ShadyDOM});
    if (this.publishableKey) this.publishableKeyChanged(this.publishableKey);
  }

  /**
   * Opens the toast with the error message
   * @param  {Object} error Stripe error.
   * @protected
   */
  errorChanged(error) {
    if (error) {
      this.$.toast.open();
      this.$.toast.positionTarget = this;
    } else {
      this.$.toast.close();
    }
  }

  /**
   * Returns a Stripe-friendly style object computed from CSS custom properties
   * @return {Object} Stripe Style initialization object.
   * @protected
   */
  getStripeElementsStyles() {
    const retVal = {base: {}, complete: {}, empty: {}, invalid: {}};
    this.allowedStyles.forEach((style) => {
      const dash = style.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
      ['base', 'complete', 'empty', 'invalid'].forEach((prefix) => {
        retVal[prefix][style] = ShadyCSS
          ? ShadyCSS.getComputedStyleValue(this, `--stripe-elements-${prefix}-${dash}`)
          : getComputedStyle(this).getPropertyValue(`--stripe-elements-${prefix}-${dash}`);
      });
    });
    return retVal;
  }
  /**
   * Sets the error and opens the toast.
   * @param  {Object} error
   * @protected
   */
  handleError(error) {
    const bubbles = true;
    const composed = true;
    this.dispatchEvent(new ErrorEvent('stripe-error', {error, bubbles, composed}));
    if (typeof error !== "object") {
      // eslint-disable-next-line no-console
      console.error("Unexpected error value: %o", error);
    }
    // Show error in UI
    this._setError(error.message);
  }

  /**
   * Sets the token or error from the response.
   * @param  {Object} response.error Stripe error
   * @param  {Object} response.token Stripe token
   * @protected
   */
  handleResponse({error, token}) {
    const bubbles = true;
    const composed = true;
    if (error) {
      this._setError(error);
      this.dispatchEvent(new ErrorEvent('stripe-error', {error, bubbles, composed}));
    } else {
      this._setToken(token);
      this.dispatchEvent(new CustomEvent('stripe-token', {token, bubbles, composed}));
      // Submit the form
      this.action && this.$.form.submit();
    }
  }

  /**
   * Initializes Stripe and elements.
   * @param {String} publishableKey Stripe publishable key.
   * @protected
   */
  initStripe(publishableKey = this.publishableKey) {
    if (this.stripe) this._setStripe(null);
    if (window.Stripe) {
      const stripe = Stripe(publishableKey);
      const elements = stripe.elements();
      this._setStripe(stripe);
      this._setElements(elements);
    } else {
      // eslint-disable-next-line no-console
      console.warn(`<stripe-elements> requires that Stripe.js be loaded in index.html`);
    }
  }

  /**
   * Creates and mounts Stripe Elements card.
   * @protected
   */
  mountCard() {
    const mount = document.getElementById(this.mountElementId);
    if (mount) {
      const {hidePostalCode, hideIcon, iconStyle, value} = this;
      const style = this.getStripeElementsStyles();
      const init = {hidePostalCode, hideIcon, iconStyle, style, value};
      const card = this.elements.create('card', init);
      this._setCard(card);
      card.mount(mount);
      card.addEventListener('ready', this.onReady.bind(this));
      card.addEventListener('change', this.onChange.bind(this));
    }
  }

  /**
   * Sets the error and opens the toast, if needed
   * @param  {Boolean}       event.empty     true if value is empty
   * @param  {Boolean}       event.complete  true if value is well-formed and potentially complete.
   * @param  {String}        event.brand     brand of the card being entered e.g. 'visa' or 'amex'
   * @param  {Object}        event.error     The current validation error, if any.
   * @param  {String|Object} event.value     Value of the form. Only non-sensitive information e.g. postalCode is present.
   */
  onChange({empty, complete, brand, error, value} = {}) {

    this._setIsEmpty(empty);
    this._setIsComplete(complete);
    this._setBrand(brand);

    if (error) {
      this._setHasError(true);
      this._setError(error);
    }

    if (error === undefined && this.error !== undefined) {
      this._setHasError(false);
      this._setError(undefined);
    }

  }

  /**
   * Sets the stripeReady property when the stripe element is ready to receive focus.
   * @param  {Event} event
   */
  onReady(event) {
    this._setStripeReady(true);
  }

  /**
   * Prepares to mount Stripe Elements in light DOM so Stripe.js can
   * access it with a document selector.
   * @param  {Boolean} $0.shady If shady DOM is in use.
   * @protected
   */
  prepare({shady}) {
    // trace each shadow boundary between us and the document
    let host = this;
    let shadowHosts = [this];

    while (host = host.getRootNode().host) {
        host && shadowHosts.push(host);
    }

    if (shady) {
      if (!this.__shadyDomMount) {
        const mount = document.createElement('div');
              mount.id = this.mountElementId;
        this.__shadyDomMount = mount;
      }

      this.__shadyDomMount = this._stampTemplate(this.$.stripeCardTemplate);
      shadowHosts.pop().appendChild(this.__shadyDomMount);

    } else {
      // append template to `app-shell` (as light DOM)
      // stamp stripe template
      this.__stripeTemplate = this._stampTemplate(this.$.stripeCardTemplate);
      shadowHosts.pop().appendChild(this.__stripeTemplate);
    }

    // leave breadcrumbs
    shadowHosts.forEach((host) => {
      const slot = document.createElement('slot');
            slot.setAttribute('slot', 'stripe-card');
            slot.setAttribute('name', 'stripe-card');
      host.appendChild(slot);
    });
  }

  /**
   * Reinitializes Stripe and mounts the card.
   * @param  {String} publishableKey Stripe publishable key
   * @protected
   */
  publishableKeyChanged(publishableKey) {
    this.unmountCard();
    if (publishableKey) {
      this.initStripe(this.publishableKey);
      this.mountCard();
    }
  }

  /**
   * Generates a random mount point (UUID v4) for Stripe Elements. This will allow multiple
   * Elements forms to be embedded on a single page.
   * @return {String} mount element id
   */
  generateRandomMountElementId() {
    return 'stripe-elements-mount-point-'+([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  /**
   * Checks if the Stripe form is valid.
   * @return {Boolean} true if the Stripe form is valid
   */
  validate() {
    const isValid = this.isComplete && !this.isEmpty && !this.hasError;
    if (!isValid) {
      this._setError({message: "Credit card information is invalid."});
    }
    return isValid;
  }

  /**
   * Checks for potential validity. A potentially valid form is one that
   * is not empty, not complete and has no error. A validated form also counts
   * as potentially valid.
   * @return {Boolean} true if the Stripe form is potentially valid
   */
  isPotentiallyValid() {
    return (!this.isComplete && !this.isEmpty && !this.hasError) || this.validate();
  }

  /** Resets the Stripe card. */
  reset() {
    try {
      this.card && this.card.clear && this.card.clear();
      this._setError(undefined);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Submit credit card information to generate a token
   * @param  {Event} event Submit event.
   */
  submit(event) {
    this.stripe.createToken(this.card, this.cardData)
      .then(this.handleResponse.bind(this))
      .catch(this.handleError.bind(this));
  }

  /**
   * Unmounts and nullifies the card.
   * @protected
   */
  unmountCard() {
    try {
      this.card && this.card.unmount && this.card.unmount();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      this._setCard(null);
      this._setStripeReady(false);
    }
  }
}

customElements.define(StripeElements.is, StripeElements);
