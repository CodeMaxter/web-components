'use strict'

class SimpleCarousel extends Component {
  constructor (attributes) {
    super(attributes)

    this.nextSlide = this.nextSlide.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.previousSlide = this.previousSlide.bind(this)
    this.selectSlide = this.selectSlide.bind(this)

    this.slides = this.shadowRoot.querySelectorAll('img')

    // this.state = {
    //   active: this.findFirstActiveSlide() || 0
    // }
  }

  static get observedAttributes () {
    return ['active'];
  }

  attributeChangedCallback (name, oldValue, newValue, namespaceURI) {
    console.log(arguments)
  }

  connectedCallback () {
    const next = this.shadowRoot.querySelector('.next')

    const prev = this.shadowRoot.querySelector('.prev')

    const dot = this.shadowRoot.querySelector('.dot-navigator')

    const carousel = this.shadowRoot.querySelector('.carousel-container')

    // next.addEventListener('click', this.nextSlide)

    // prev.addEventListener('click', this.previousSlide)

    // this.onEvent('click', next, this.nextSlide)
    this.onEvent('click', '.next', this.nextSlide)

    // this.onEvent('click', prev, this.previousSlide)
    this.onEvent('click', '.prev', this.previousSlide)

    // this.onEvent('click', dot, this.selectSlide)
    this.onEvent('click', '.dot', this.selectSlide)

    // this.onEvent('keydown', carousel, this.onKeyDown)
    // this.onEvent('keydown', '.carousel-container', this.onKeyDown)
    document.querySelector('body').addEventListener('keydown', this.onKeyDown)

    // this.selectSlide(this.findFirstActiveSlide() || 0)
    // this.selectSlide(this.state.active)
  }

  disconnectedCallback () {
    this.removeEvent('click', this.nextSlide)

    this.removeEvent('click', this.previousSlide)

    this.removeEvent('click', this.selectSlide)

    // this.removeEvent('keydown', this.onKeyDown)
    document.querySelector('body').removeEvent('keydown', this.onKeyDown)
  }

  findFirstActiveSlide () {
    let activeIndex

    for (let [index, slide] of this.slides.entries()) {
      slide.setAttribute('role', 'slide')

      // Allow users to declaratively select a tab
      // Highlight last tab which has the selected attribute.
      if (slide.hasAttribute('active')) {
        activeIndex = index
      }
    }

    return activeIndex
  }

  nextSlide () {
    const active = (parseInt(this.state.active, 10) + 1) % this.slides.length

    this.setState({
      active
    })

    // const index = parseInt(this.getAttribute('active'), 10) + 1

    // this.selectSlide(index % this.slides.length)
  }

  onKeyDown(event) {
    switch (event.code) {
      case 'ArrowUp':
      case 'ArrowLeft':
        this.previousSlide()

        break

      case 'ArrowDown':
      case 'ArrowRight':
        this.nextSlide()

        break

      default:
        break
    }
  }

  previousSlide () {
    let active = parseInt(this.getAttribute('active'), 10) - 1

    active = active < 0 ? this.slides.length - 1 : active

    // this.selectSlide(index)

    this.setState({
      active
    })
  }

  selectSlide (event) {
    const active = event.path[0].getAttribute('aria-slide')
      || this.state.active

    if (parseInt(this.state.active, 10) === parseInt(active, 10)) {
      return
    }

    this.setState({
      active
    })

    // this.setAttribute('active', activeIndex)

    // for (let index = 0, slide; slide = this.slides[index]; ++index) {
    //   let select = index === activeIndex

    //   // slide.setAttribute('slideindex', select ? 0 : -1);

    //   slide.setAttribute('aria-active', select)

    //   this.slides[index].setAttribute('aria-hidden', !select)
    // }
  }

  renderDots (index) {
    const select = parseInt(this.state.active, 10) === index

    return `
      <span class="dot ${select ? 'active' : ''}" aria-slide="${index}"></span>
    `
  }

  renderSlide(src, index) {
    const select = parseInt(this.state.active, 10) === index

    return `<img src="${src}" class="slide fade"
      ${select ? 'aria-active="true"' : ''}
      ${`aria-hidden="${!select}"`}
      />`
  }

  render () {
    const activeSlide = parseInt(this.state.active, 10) + 1
    const slidesLength = this.children.length

    return `
      <style>
      /* Slideshow container */
      .carousel-container {
        display: inline-block;
        margin: auto;
        max-width: 1000px;
        position: relative;
      }
      .slide {
        display: none;
      }
      /* Fading animation */
      .fade {
        -webkit-animation-duration: 1.5s;
        -webkit-animation-name: fade;
        animation-duration: 1.5s;
        animation-name: fade;
      }
      .carousel-container [aria-active="true"] {
        display: block;
      }
      /* Next & previous buttons */
      .prev, .next {
        border-radius: 0 3px 3px 0;
        color: white;
        cursor: pointer;
        font-size: 18px;
        font-weight: bold;
        margin-top: -22px;
        padding: 16px;
        position: absolute;
        top: 50%;
        transition: 0.6s ease;
        width: auto;
      }
      /* Position the "next button" to the right */
      .next {
        border-radius: 3px 0 0 3px;
        right: 0;
      }
      /* On hover, add a black background color with a little bit see-through */
      .prev:hover, .next:hover {
        background-color: rgba(0,0,0,0.8);
      }
      /* Number text (1/3 etc) */
      .number-text {
        color: #f2f2f2;
        font-size: 12px;
        padding: 8px 12px;
        position: absolute;
        top: 0;
      }
      .dot-navigator {
        margin: 20px auto 0;
        position: absolute;
        text-align: center;
        width: 100%;
      }
      /* The dots/bullets/indicators */
      .dot {
        background-color: #bbb;
        border-radius: 50%;
        cursor:pointer;
        display: inline-block;
        height: 13px;
        margin: 0 2px;
        transition: background-color 0.6s ease;
        width: 13px;
      }
      .dot.active, .dot:hover {
        background-color: #717171;
      }
      @-webkit-keyframes fade {
        from {opacity: .4}
        to {opacity: 1}
      }

      @keyframes fade {
        from {opacity: .4}
        to {opacity: 1}
      }
      </style>
      <div class="carousel-container">
        <div class="number-text fade">${activeSlide} / ${slidesLength}</div>

        ${Array.from(this.children).map((slide, index) => {
          return this.renderSlide(slide.src, index)
        }).join('')}

        <a class="prev">&#10094;</a>
        <a class="next">&#10095;</a>

        <div class="dot-navigator">
          ${Array.from(this.children).map((slide, index) => {
            return this.renderDots(index)
          }).join('')}
        </div>
      </div>
    `
  }

  // render () {
  //   // return `<slot></slot>`
  //   // this.state.active = this.findFirstActiveSlide() || 0

  //   return `
  //     <style>
  //     /* Slideshow container */
  //     .carousel-container {
  //       display: inline-block;
  //       margin: auto;
  //       max-width: 1000px;
  //       position: relative;
  //     }
  //     .slide {
  //       display: none;
  //     }
  //     /* Fading animation */
  //     .fade {
  //       -webkit-animation-duration: 1.5s;
  //       -webkit-animation-name: fade;
  //       animation-duration: 1.5s;
  //       animation-name: fade;
  //     }
  //     .carousel-container [aria-active="true"] {
  //       display: block;
  //     }
  //     /* Next & previous buttons */
  //     .prev, .next {
  //       border-radius: 0 3px 3px 0;
  //       color: white;
  //       cursor: pointer;
  //       font-size: 18px;
  //       font-weight: bold;
  //       margin-top: -22px;
  //       padding: 16px;
  //       position: absolute;
  //       top: 50%;
  //       transition: 0.6s ease;
  //       width: auto;
  //     }
  //     /* Position the "next button" to the right */
  //     .next {
  //       border-radius: 3px 0 0 3px;
  //       right: 0;
  //     }
  //     /* On hover, add a black background color with a little bit see-through */
  //     .prev:hover, .next:hover {
  //       background-color: rgba(0,0,0,0.8);
  //     }
  //     </style>
  //     <div class="carousel-container">
  //       <img src="img/image1.jpg" class="slide fade" active>
  //       <img src="img/image2.jpg" class="slide fade">
  //       <img src="img/image3.jpg" class="slide fade">
  //       <img src="img/image4.jpg" class="slide fade">
  //       <img src="img/image5.jpg" class="slide fade">

  //       <a class="prev">&#10094;</a>
  //       <a class="next">&#10095;</a>
  //     </div>
  //   `
  // }
}
