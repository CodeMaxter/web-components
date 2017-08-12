class ShareButtons extends Component {
  constructor (attributes) {
    super(attributes)

    console.log(this.localName)
  }

  render () {
    return `<slot></slot>`
  }
}

Component.define(ShareButtons)