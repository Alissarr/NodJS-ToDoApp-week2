var fs = require('fs')
var args = process.argv.slice(2)
if (args.length === 0) {
  showHelp()
}else {
  switch (args[0]) {
    case 'help':
      showHelp()
      break
    case 'open':
      openToDo()
      break
    case 'add':
      var item = args.slice(1).join(' ')
      addTask(item)
      break
    case 'remove':
      var itemNo = parseInt(args[1], 10)
      deleteitem(itemNo)
      break
    case 'reset':
      clearList()
      break
    default:
      console.error('Unknown command: ' + args[0])
      break
  }
}

function openToDo () {
  fs.readFile(__dirname + '/todo.txt', 'utf8', (error, data) => {

    if (error == null) {
      var items = data.split(/\n/)
      console.log('Things to do :-' + '\n')
      var j = 1 
      for (i = 0;i < items.length;i++) {
        if (items[i].length > 1) {
          console.log('item ' + j + ': ' + items[i])
          j = j + 1
        }
      }
    } else if (error.code == 'ENOENT') {
      return console.error('The todo list is empty ')
    } else {
      return console.error('Error reading todo list ')
    }
  })
}

function deleteItem (itemRe) {
  fs.readFile(__dirname + '/todo.txt', 'utf-8', function (error, data) {
    if (error == null) {
      var lines = data.split(/\n/)
      var line = lines[itemNo - 1]
      lines[itemNo - 1] = ''

      function checkLine (line) {
        return line.length > 1
      }
      data = lines.filter(checkLine)
      data = data.join('\n')

      fs.writeFile(__dirname + '/todo.txt', data + '\n')
    } else if (error.code == 'ENOENT') {
      return console.error('File does not exist. ', error)
    } else {
      return console.error('Open todo file failed. ', error)
    }
  })
}


function showHelp () {
  fs.readFile(__dirname + '/help.txt', 'utf8', (error, data) => {
    if (error) {
      return console.log('Error reading help ', error)
    }
    console.log(data)
  })
}

function addItem (item) {
  fs.appendFile(__dirname + '/todo.txt', item + '\n')
}

function clearList () {
  fs.writeFile('./todo.txt', '', encoding = 'utf8', function (error) {
    if (error) throw error;
  })
}

