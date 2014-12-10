/**
 * Selection
 */

var Button = require('./ui/button')
var Image  = require('./ui/image')
var React  = require('react')

var SHOULD_SELECT = 'Select an image'
var PICK_ANOTHER  = 'Choose another image'

var Selection = React.createClass({

  getPhoto() {
    var { caption, url } = this.props.photo

    return (
      <Image className="ars-selection-photo" alt={ caption } src={ url } />
    )
  },

  render() {
    var hasPhoto = this.props.photo

    return (
      <Button className="ars-selection" onClick={ this._onClick }>
        { hasPhoto && this.getPhoto() }

        <span className="ars-selection-caption">
          { hasPhoto ? PICK_ANOTHER : SHOULD_SELECT }
        </span>
      </Button>
    )
  },

  _onClick(e) {
    e.preventDefault()
    this.props.onClick(e)
  }

})

module.exports = Selection
