import { h, Component } from 'preact';
import marked from 'marked';

/** @jsx h */

// marked.setOptions({
//   renderer: new marked.Renderer(),
//   gfm: true,
//   tables: true,
//   breaks: false,
//   pedantic: false,
//   sanitize: true,
//   smartLists: true,
//   smartypants: false
// });

export default class Editor extends Component {
  constructor (props) {
    super();

    this.state = {
      note: props.parent.getNote(props.id)
    };
  }

  goBack () {
    history.go(-1);
    
  }
  render () {
    const n = this.state.note;
    const markup = marked(n.text);
    const content = `data:text/html;charset=utf-8,<html><head><style>body{font-family: sans-serif}</style></head><body>${markup}</body></html>`;

    return (
      <div className='mui-panel'>
        <ul className='mui-tabs__bar'>
          <li><a href='#' onClick={(e) => this.goBack()}>Edit</a></li>
          <li class='mui--is-active'><a href={`/notes/${n.id}/preview`}>Preview</a></li>
        </ul>
        <iframe src={content} sandbox />
      </div>
   );
  }
}

