import { h, Component } from 'preact';

/** @jsx h */

export default class List extends Component {
  render () {
    const notes = this.props.notes.map((n) => {
      let summary = n.text.slice(0, 10) + '...';
      return (
        <div class="mui--divider-top">
          <h3><a href={`/notes/${n.id}`}>{summary}</a></h3>
        </div>
      );
    });

    return (
      <div className='mui-panel'>
        <h3>Notes:</h3>
        { notes }
     </div>
    );
  }
}