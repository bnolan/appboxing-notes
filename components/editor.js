import { h, Component } from 'preact';
import throttle from 'lodash.throttle';

/** @jsx h */

export default class Editor extends Component {
  constructor (props) {
    super();

    this.debouncedSaved = throttle(() => this.save(), 100);

    this.state = {
      note: props.parent.getNote(props.id)
    };
  }

  setText (text) {
    const note = Object.assign({}, this.state.note, {text: text});

    this.setState({note: note});

    this.debouncedSaved();
  }

  save () {
    this.props.onSave(this.state.note);
  }

  render () {
    const n = this.state.note;

    return (
      <div className='mui-panel'>
        <ul className='mui-tabs__bar'>
          <li class='mui--is-active'><a href={`/notes/${n.id}`}>Edit</a></li>
          <li><a href={`/notes/${n.id}/preview`}>Preview</a></li>
        </ul>

        <textarea onChange={(e) => this.setText(e.target.value)} value={n.text} />
      </div>
   );
  }
}
