var html = require('bel')
var clone = require('clone')
var update = require('nanomorph/update')

var listEditor = require('../index')()

var helpers = require('../helpers')

var items = ['a', 'b', 'c']

function onChange (data) {
  console.log('onChange', data)
  items = helpers.change(items, data)
  action(items)
}

function onAdd (data) {
  console.log('onAdd', data)
  items = helpers.add(items, data)
  action(items)
}

function onRemove (data) {
  console.log('onRemove', data)
  items = helpers.remove(items, data)
  action(items)
}

function action (state) {
  var newTree = render({
    items: state,
    onAdd: onAdd,
    onChange: onChange,
    onRemove, onRemove
  })

  morph(newTree, tree)
}

function render (params) {
  return listEditor(params)
}

var tree = render({
  items: items,
  onAdd: onAdd,
  onChange: onChange,
  onRemove, onRemove
})

var morph = update(tree)
document.body.appendChild(tree)
