import { h, render, Component } from 'preact';
import Router from 'preact-router';
import SqliteProxy from './sqlite-proxy';

import List from './components/list';
import Editor from './components/editor';
import Preview from './components/preview';

const app = {
  name: 'notes'
};
const db = new SqliteProxy(app);

// Tell Babel to transform JSX into h() calls:
/** @jsx h */

class App extends Component {
  constructor () {
    super();

    // Loading state
    this.state.notes = [];

    // Init database
    this.initialize();
  }

  componentDidMount () {
    // Load the styles into the <head /> using node-lessify - todo fix for CSP
    require('./css/mui.css');
    require('./css/style.less');

    // Set viewport meta tag
    document.head.innerHTML += '<meta name="viewport" content="width=device-width, initial-scale=1">';
  }

  initialize () {
    this.migrate();
    this.reload();
  }

  migrate () {
    return;

    db.run('CREATE TABLE notes (text TEXT)', (err) => {
      if (err) {
        console.error(err);
      }

      db.run('INSERT INTO notes VALUES (?)', '# hi mum');

      this.reload();
    });
  }

  reload () {
    this.setState({ notes: [] });

    db.each('SELECT rowid AS id, text FROM notes ORDER BY text', (err, row) => {
      if (err) {
        throw err;
      }

      console.log(row);

      this.setState({
        notes: this.state.notes.concat(row)
      });
    });
  }

  getNote (id) {
    return this.state.notes[0];
  }

  onSave (note) {
    console.log('Saving');

    db.run('UPDATE notes SET text=? WHERE rowid=?', [note.text, note.id], () => {
      this.reload();
    });
  }

  render (props, state) {
    return (
      <div>
        <div className='mui-appbar'>
          <h1><a href='/'>Notes</a></h1>
        </div>

        <br />

        <div className='mui-container'>
          <Router>
              <List path='/' notes={this.state.notes} />
              <Editor path='/notes/:id' parent={this} onSave={this.onSave.bind(this)} />
              <Preview path='/notes/:id/preview' parent={this} />
          </Router>
        </div>
      </div>
    );
  }
}

// render an instance of the app into <body>:
render(<App />, document.body);
