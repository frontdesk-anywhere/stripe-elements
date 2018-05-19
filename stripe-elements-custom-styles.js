import '@polymer/polymer/lib/elements/custom-style.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<custom-style>
  <style id="stripe-styles" is="custom-style">
  .StripeElement {
    background-color: white;
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid transparent;
    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
    min-width: var(--stripe-elements-width, 300px);
    @apply --stripe-elements-element;
  }

  .StripeElement--focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
    @apply --stripe-elements-element-focus;
  }

  .StripeElement--invalid {
    border-color: #fa755a;
    @apply --stripe-elements-element-invalid;
  }

  .StripeElement--webkit-autofill {
    background-color: #fefde5 !important;
    @apply --stripe-elements-element-webkit-autofill;
  }
  </style>
</custom-style>`;

document.head.appendChild($_documentContainer.content);
