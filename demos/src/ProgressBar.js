'use strict'

class ProgressBar extends Component {
  constructor (attributes) {
    super(attributes)

    // this.state = {
    //   progress: 20// this.getAttribute('progress')
    // }
  }

  render () {
    return `
      <style>
        :host { display: inline-block; width: 5rem; height: 1rem; }
        .progress { display: inline-block; position: relative; border: solid 1px #000; padding: 1px; width: 100%; height: 100%; }
        .progress > .bar { background: #9cf; height: 100%; }
        .progress > .label { position: absolute; top: 0; left: 0; width: 100%;
            text-align: center; font-size: 0.8rem; line-height: 1.1rem; }
      </style>
      <div class="progress" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
        <div class="bar" style="width: ${this.state.progress}%;"></div>
        <div class="label">${this.state.progress}%</div>
      </div>
    `
  }
}

// Component.define(ProgressBar)