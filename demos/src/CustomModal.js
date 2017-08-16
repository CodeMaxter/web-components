'use strict'

class CustomModal extends Component {
  constructor (attributes) {
    super(attributes)

    this.close = this.close.bind(this)
  }

  connectedCallback () {
    this.shadowRoot.querySelector('.close')
      .addEventListener('click', this.close)
  }
  
  disconnectedCallback () {
    this.shadowRoot.querySelector('.close')
      .removeEventListener('click', this.close)
  }

  close () {
    this.shadowRoot.querySelector('.modal').classList.remove('open')
  }
  
  open () {
    this.shadowRoot.querySelector('.modal').classList.add('open')
  }
  
  render() {
    return `
      <style>
        /* The Modal (background) */
        .modal {
          background-color: rgb(0,0,0); /* Fallback color */
          background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
          display: none; /* Hidden by default */
          height: 100%; /* Full height */
          left: 0;
          overflow: auto; /* Enable scroll if needed */
          padding-top: 100px; /* Location of the box */
          position: fixed; /* Stay in place */
          top: 0;
          width: 100%; /* Full width */
          z-index: 1; /* Sit on top */
        }
        .open {
          display: block;
        }
        /* Modal Content */
        .content {
          background-color: #fefefe;
          border: 1px solid #888;
          margin: auto;
          padding: 20px;
          width: 80%;
        }
        /* The Close Button */
        .close {
          color: #aaaaaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
        }
        .close:hover,
        .close:focus {
          color: #000;
          cursor: pointer;
          text-decoration: none;
        }
      </style>
      <div class="modal">
        <!-- Modal content -->
        <div class="content">
          <span class="close">&times;</span>
          <p>Some text in the Modal..</p>
        </div>
      </div>
    `
  }
}